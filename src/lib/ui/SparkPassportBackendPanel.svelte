<script lang="ts">
  import { onMount } from 'svelte';
  import SparkButton from './SparkButton.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import {
    getCurrentPassport,
    getEvidenceRoot,
    getPassportEligibility,
    getProofEvents,
    issuePassport,
    SparkApiError,
    type CurrentPassportResponse,
    type EvidenceRootResponse,
    type PassportEligibilityResponse,
    type PassportLevel,
    type PassportLevelEligibility,
    type ProofEvent
  } from '$lib/api/spark-passport-api';

  let loading = $state(true);
  let issuing = $state(false);
  let error = $state('');
  let eligibility = $state<PassportEligibilityResponse | null>(null);
  let passport = $state<CurrentPassportResponse | null>(null);
  let evidenceRoot = $state<EvidenceRootResponse | null>(null);
  let proofEvents = $state<ProofEvent[]>([]);

  const activeLevel = $derived(resolveActiveLevel(eligibility));
  const currentCredential = $derived(passport?.credential ?? null);
  const evidenceCode = $derived(evidenceRoot?.evidence_root ?? eligibility?.evidence_root ?? currentCredential?.evidence_root ?? null);
  const evidenceCount = $derived(evidenceRoot?.event_count ?? eligibility?.evidence_event_count ?? currentCredential?.evidence_event_count ?? 0);
  const canIssue = $derived(Boolean(eligibility?.eligible && eligibility.highest_eligible_level && !issuing));
  const issued = $derived(currentCredential?.issue_status === 'issued');

  onMount(() => {
    void loadPassportReadModel();
  });

  function resolveActiveLevel(state: PassportEligibilityResponse | null): PassportLevelEligibility | null {
    if (!state) return null;
    const target = state.highest_eligible_level ?? 'beginner';
    return state.levels.find((item) => item.level === target) ?? state.levels[0] ?? null;
  }

  function levelLabel(level?: string | null) {
    if (level === 'beginner') return 'Beginner';
    if (level === 'intermediate') return 'Intermediate';
    if (level === 'advanced') return 'Advanced';
    return 'Draft';
  }

  function shortHash(value?: string | null) {
    if (!value) return 'Belum ada';
    if (value.length <= 18) return value;
    return `${value.slice(0, 10)}…${value.slice(-8)}`;
  }

  function eventLabel(value: string) {
    const normalized = value.toLowerCase();
    if (normalized.includes('learning')) return 'Bukti belajar tercatat';
    if (normalized.includes('practice')) return 'Bukti praktik tercatat';
    if (normalized.includes('safety')) return 'Bukti keamanan tercatat';
    if (normalized.includes('readiness')) return 'Kesiapan diperbarui';
    if (normalized.includes('passport')) return 'Passport diperbarui';
    return 'Aktivitas belajar tercatat';
  }

  function missingLabel(value: string) {
    if (value.includes('core level exam')) return 'Lulus ujian Core level terkait';
    if (value.includes('lab practice')) return 'Selesaikan praktik Lab level terkait';
    if (value.includes('lab safety')) return 'Capai safety score Lab minimal 70';
    if (value.includes('evidence') && value.includes('root')) return 'Kumpulkan bukti belajar dari aktivitasmu';
    return value;
  }

  async function loadPassportReadModel() {
    loading = true;
    error = '';

    try {
      const [nextEligibility, nextPassport, nextEvidenceRoot, nextEvents] = await Promise.all([
        getPassportEligibility(),
        getCurrentPassport(),
        getEvidenceRoot(),
        getProofEvents(8)
      ]);

      eligibility = nextEligibility;
      passport = nextPassport;
      evidenceRoot = nextEvidenceRoot;
      proofEvents = nextEvents.items;
    } catch (cause) {
      if (cause instanceof SparkApiError) {
        error = cause.message;
      } else {
        error = 'Belum bisa membaca data Passport. Coba lagi sebentar.';
      }
    } finally {
      loading = false;
    }
  }

  async function issueBackendPassport() {
    if (!eligibility?.highest_eligible_level) return;
    issuing = true;
    error = '';

    try {
      await issuePassport(eligibility.highest_eligible_level as PassportLevel);
      await loadPassportReadModel();
    } catch (cause) {
      if (cause instanceof SparkApiError) {
        error = cause.message;
      } else {
        error = 'Passport belum bisa diterbitkan. Coba lagi sebentar.';
      }
    } finally {
      issuing = false;
    }
  }
</script>

<section class="passport-backend-panel" aria-labelledby="passport-backend-title">
  <div class="passport-backend-head">
    <div>
      <span class="spark-eyebrow">Jejak belajar</span>
      <h2 id="passport-backend-title">Passport membaca bukti belajar yang tersimpan aman.</h2>
      <p>
        Panel ini memakai catatan belajar, praktik Lab, dan status Passport yang tersimpan aman. Detail sensitif tetap tidak dibagikan ke jaringan publik.
      </p>
    </div>

    <div class="passport-backend-actions">
      <SparkButton onclick={loadPassportReadModel} variant="secondary" loading={loading}>Perbarui</SparkButton>
      <SparkButton onclick={issueBackendPassport} disabled={!canIssue || issued} loading={issuing}>
        {issued ? 'Passport aktif' : 'Terbitkan Passport'}
      </SparkButton>
    </div>
  </div>

  {#if error}
    <div class="passport-backend-alert" role="alert">{error}</div>
  {/if}

  {#if loading}
    <div class="passport-backend-loading" aria-live="polite">
      <span></span>
      <div>
        <strong>Membaca bukti belajar…</strong>
        <p>Spark sedang mengambil status belajar dan Passport yang tersimpan.</p>
      </div>
    </div>
  {:else}
    <div class="passport-backend-grid">
      <article>
        <small>Status Passport</small>
        <strong>{issued ? 'Aktif' : eligibility?.eligible ? 'Siap diterbitkan' : 'Belum lengkap'}</strong>
        <p>{issued ? 'Passport sudah aktif.' : eligibility?.eligible ? 'Bukti belajar cukup untuk diterbitkan.' : 'Lengkapi bukti belajar terlebih dulu.'}</p>
        <div class="passport-backend-badges">
          <SparkTrustBadge label={levelLabel(eligibility?.highest_eligible_level ?? currentCredential?.readiness_level)} tone={eligibility?.eligible || issued ? 'safe' : 'target'} />
          <SparkTrustBadge label={currentCredential?.starknet_anchor_status === 'not_ready' ? 'Tersimpan aman' : currentCredential?.starknet_anchor_status ?? 'Belum ditautkan'} tone="local" />
        </div>
      </article>

      <article>
        <small>Bukti tersimpan</small>
        <strong>{shortHash(evidenceCode)}</strong>
        <p>{evidenceCount} bukti belajar tercatat.</p>
      </article>

      <article>
        <small>Kode Passport</small>
        <strong>{shortHash(currentCredential?.credential_hash)}</strong>
        <p>{currentCredential?.schema_version ?? 'Passport belum diterbitkan.'}</p>
      </article>
    </div>

    {#if activeLevel}
      <div class="passport-backend-proof-row" aria-label="Syarat Passport">
        <div class:done={activeLevel.proof_of_learning}><span>{activeLevel.proof_of_learning ? '✓' : '•'}</span> Belajar</div>
        <div class:done={activeLevel.proof_of_practice}><span>{activeLevel.proof_of_practice ? '✓' : '•'}</span> Praktik</div>
        <div class:done={activeLevel.proof_of_safety}><span>{activeLevel.proof_of_safety ? '✓' : '•'}</span> Keamanan</div>
        <div class:done={activeLevel.proof_of_readiness}><span>{activeLevel.proof_of_readiness ? '✓' : '•'}</span> Kesiapan</div>
      </div>

      {#if activeLevel.missing.length > 0}
        <div class="passport-backend-missing">
          <strong>Yang masih dibutuhkan:</strong>
          <ul>
            {#each activeLevel.missing as item}
              <li>{missingLabel(item)}</li>
            {/each}
          </ul>
        </div>
      {/if}
    {/if}

    <div class="passport-backend-events">
      <div class="passport-backend-events-head">
        <strong>Bukti belajar terbaru</strong>
        <small>{proofEvents.length} catatan terakhir</small>
      </div>

      {#if proofEvents.length === 0}
        <p class="passport-backend-empty">Belum ada bukti belajar. Selesaikan lesson, checkpoint, atau Lab untuk mulai mencatat bukti.</p>
      {:else}
        <div class="passport-backend-event-list">
          {#each proofEvents as event}
            <article>
              <span>{event.track ?? 'bukti'}</span>
              <div>
                <strong>{eventLabel(event.event_type)}</strong>
                <small>Kode catatan · {shortHash(event.event_hash)}</small>
              </div>
            </article>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</section>

<style>
  .passport-backend-panel {
    display: grid;
    gap: 18px;
    padding: 22px;
    border: 1px solid var(--spark-border);
    border-radius: 28px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(239, 246, 255, 0.72));
    box-shadow: var(--spark-shadow-soft);
  }

  .passport-backend-head,
  .passport-backend-actions,
  .passport-backend-grid,
  .passport-backend-proof-row,
  .passport-backend-events-head,
  .passport-backend-event-list article {
    display: flex;
    gap: 14px;
  }

  .passport-backend-head {
    align-items: start;
    justify-content: space-between;
  }

  .passport-backend-head h2 {
    margin: 4px 0 8px;
    font-size: clamp(22px, 3vw, 32px);
  }

  .passport-backend-head p,
  .passport-backend-grid p,
  .passport-backend-empty,
  .passport-backend-loading p {
    margin: 0;
    color: var(--spark-muted);
    line-height: 1.7;
  }

  .passport-backend-actions {
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .passport-backend-alert {
    padding: 12px 14px;
    border: 1px solid rgba(220, 38, 38, 0.2);
    border-radius: 18px;
    background: rgba(254, 242, 242, 0.88);
    color: #991b1b;
    font-weight: 760;
  }

  .passport-backend-loading {
    display: flex;
    gap: 14px;
    align-items: center;
    padding: 16px;
    border: 1px dashed var(--spark-border);
    border-radius: 20px;
  }

  .passport-backend-loading span {
    width: 16px;
    height: 16px;
    border: 2px solid var(--spark-border-strong);
    border-top-color: var(--spark-blue-strong);
    border-radius: 999px;
    animation: passport-backend-spin 0.8s linear infinite;
  }

  .passport-backend-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .passport-backend-grid article {
    display: grid;
    gap: 8px;
    padding: 16px;
    border: 1px solid var(--spark-border);
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.78);
  }

  .passport-backend-grid small,
  .passport-backend-events-head small {
    color: var(--spark-muted);
    font-size: 12px;
    font-weight: 760;
  }

  .passport-backend-grid strong {
    word-break: break-word;
  }

  .passport-backend-badges,
  .passport-backend-proof-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .passport-backend-proof-row div {
    flex: 1 1 150px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border: 1px solid var(--spark-border);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.68);
    color: var(--spark-muted);
    font-weight: 800;
  }

  .passport-backend-proof-row div.done {
    border-color: rgba(22, 163, 74, 0.22);
    background: rgba(240, 253, 244, 0.86);
    color: #166534;
  }

  .passport-backend-proof-row span {
    display: grid;
    width: 22px;
    height: 22px;
    place-items: center;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.08);
  }

  .passport-backend-missing {
    padding: 14px 16px;
    border-radius: 18px;
    background: rgba(255, 247, 237, 0.84);
    color: #9a3412;
  }

  .passport-backend-missing ul {
    margin: 8px 0 0;
    padding-left: 18px;
  }

  .passport-backend-events {
    display: grid;
    gap: 12px;
  }

  .passport-backend-events-head {
    align-items: center;
    justify-content: space-between;
  }

  .passport-backend-event-list {
    display: grid;
    gap: 10px;
  }

  .passport-backend-event-list article {
    align-items: center;
    padding: 12px;
    border: 1px solid var(--spark-border);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.7);
  }

  .passport-backend-event-list article > span {
    min-width: 54px;
    padding: 6px 8px;
    border-radius: 999px;
    background: rgba(37, 99, 235, 0.08);
    color: var(--spark-blue-strong);
    text-align: center;
    font-size: 12px;
    font-weight: 900;
  }

  .passport-backend-event-list strong,
  .passport-backend-event-list small {
    display: block;
  }

  .passport-backend-event-list small {
    margin-top: 3px;
    color: var(--spark-muted);
  }

  @keyframes passport-backend-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 860px) {
    .passport-backend-head {
      display: grid;
    }

    .passport-backend-actions {
      justify-content: stretch;
    }

    .passport-backend-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
