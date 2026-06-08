<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { sparkWorkshops } from '$content/spark-content';
  import { gatewayState } from '$state/gateway-state.svelte';

  const totalCapacity = sparkWorkshops.reduce((total, workshop) => total + workshop.capacity, 0);
</script>

<section class="community-command-center community-command-compact" data-karyra-community-command="pass37c">
  <div class="community-command-copy">
    <span class="spark-eyebrow">Community</span>
    <h1>Belajar tidak berhenti di layar.</h1>
    <p>Workshop, cohort, fasilitator, dan diskusi lokal menjadi jembatan antara belajar mandiri dan pemahaman nyata.</p>

    <div class="community-command-actions">
      <SparkButton href="/community?tab=workshop#community-tabs" size="sm">Workshop</SparkButton>
      <SparkButton href="/community?tab=cohort#community-tabs" variant="secondary" size="sm">Cohort</SparkButton>
      <SparkButton href="/community?tab=diskusi#community-tabs" variant="ghost" size="sm">Diskusi</SparkButton>
    </div>
  </div>

  <aside class="community-command-panel" aria-label="Ringkasan Community">
    <div class="community-command-badges">
      <SparkTrustBadge label="Aktivasi lokal" tone="beta" />
      <SparkTrustBadge label="Mobile-first" tone="safe" />
    </div>

    <div class="community-summary-card">
      <span><SparkIcon name="users" size={20} /></span>
      <div>
        <strong>{gatewayState.registeredWorkshopIds.length} workshop tersimpan</strong>
        <p>Total kapasitas contoh: {totalCapacity} peserta.</p>
      </div>
    </div>

    <div class="community-mini-stats">
      <div>
        <strong>{sparkWorkshops.length}</strong>
        <span>Workshop</span>
      </div>
      <div>
        <strong>3</strong>
        <span>Cohort</span>
      </div>
      <div>
        <strong>Diskusi</strong>
        <span>Ruang tanya</span>
      </div>
    </div>
  </aside>
</section>

<style>
  .community-command-compact {
    min-height: auto !important;
    align-items: center !important;
    gap: clamp(12px, 2vw, 18px) !important;
    padding: clamp(18px, 3.5vw, 34px) !important;
    border-radius: 28px !important;
  }

  .community-command-copy {
    display: grid;
    align-content: center;
    gap: 10px;
    min-width: 0;
  }

  .community-command-copy h1 {
    max-width: 760px;
    margin: 0 !important;
    font-size: clamp(32px, 5vw, 58px) !important;
    line-height: 0.98 !important;
    letter-spacing: -0.06em !important;
  }

  .community-command-copy p {
    max-width: 58ch;
    margin: 0 !important;
    color: var(--spark-muted);
    font-size: 14px !important;
    line-height: 1.55 !important;
    font-weight: 430 !important;
  }

  .community-command-actions {
    margin-top: 4px !important;
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
  }

  .community-command-panel {
    display: grid;
    gap: 10px;
    min-width: 0;
  }

  .community-command-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .community-summary-card {
    display: grid !important;
    grid-template-columns: 40px minmax(0, 1fr) !important;
    align-items: center !important;
    gap: 10px !important;
    padding: 12px !important;
    border-radius: 18px !important;
  }

  .community-summary-card > span {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 14px;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.1);
  }

  .community-summary-card strong {
    display: block;
    color: var(--spark-navy);
    font-size: 14px;
    line-height: 1.16;
  }

  :global([data-theme='dark']) .community-summary-card strong { color: #fff; }

  .community-summary-card p {
    margin: 4px 0 0;
    color: var(--spark-muted);
    font-size: 12px;
    line-height: 1.35;
  }

  .community-mini-stats {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 8px !important;
  }

  .community-mini-stats div {
    min-width: 0;
    min-height: 54px !important;
    display: grid;
    align-content: center;
    padding: 9px !important;
    border-radius: 16px !important;
    border: 1px solid var(--spark-line);
    background: rgba(255,255,255,.45);
  }

  :global([data-theme='dark']) .community-mini-stats div { background: rgba(255,255,255,.045); }

  .community-mini-stats strong,
  .community-mini-stats span {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .community-mini-stats strong {
    color: var(--spark-navy);
    font-size: 16px !important;
    line-height: 1 !important;
    letter-spacing: -0.035em;
  }

  :global([data-theme='dark']) .community-mini-stats strong { color: #fff; }

  .community-mini-stats span {
    margin-top: 4px;
    color: var(--spark-muted);
    font-size: 10.5px !important;
    line-height: 1.1 !important;
    font-weight: 560;
  }

  @media (max-width: 760px) {
    .community-command-compact {
      padding: 14px !important;
      border-radius: 22px !important;
      gap: 12px !important;
    }

    .community-command-copy {
      gap: 8px;
    }

    .community-command-copy h1 {
      font-size: clamp(27px, 8.2vw, 34px) !important;
      line-height: 1.04 !important;
      letter-spacing: -0.045em !important;
    }

    .community-command-copy p {
      font-size: 12.75px !important;
      line-height: 1.45 !important;
    }

    .community-command-actions {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 7px !important;
      margin-top: 2px !important;
    }

    .community-command-actions :global(.spark-btn) {
      width: 100% !important;
      min-height: 36px !important;
      padding-inline: 8px !important;
      border-radius: 13px !important;
      font-size: 11.75px !important;
    }

    .community-command-panel {
      gap: 8px;
    }

    .community-command-badges {
      display: none;
    }

    .community-summary-card {
      padding: 10px !important;
      border-radius: 16px !important;
    }

    .community-summary-card p {
      font-size: 11.5px;
    }

    .community-mini-stats div {
      min-height: 48px !important;
      padding: 8px !important;
      border-radius: 14px !important;
    }
  }
</style>
