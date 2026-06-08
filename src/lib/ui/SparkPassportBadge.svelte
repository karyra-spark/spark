<script lang="ts">
  import SparkIcon from './SparkIcon.svelte';

  type Props = {
    levelLabel?: string;
    statusLabel?: string;
    verificationLabel?: string;
    proofCode?: string;
    locked?: boolean;
  };

  let {
    levelLabel = 'Belum terbit',
    statusLabel = 'Draft',
    verificationLabel = 'Belajar mandiri',
    proofCode = 'SPK-PREVIEW',
    locked = false
  }: Props = $props();
</script>

<div class:locked class="passport-badge-art" aria-label={`Badge Passport Spark ${levelLabel}`}>
  <div class="badge-orbit outer"></div>
  <div class="badge-orbit inner"></div>
  <div class="badge-core">
    <span class="badge-icon"><SparkIcon name={locked ? 'lock' : 'passport'} size={32} /></span>
    <small>SPARK PASSPORT</small>
    <strong>{levelLabel}</strong>
    <em>{statusLabel}</em>
  </div>
  <div class="badge-footer">
    <span>{verificationLabel}</span>
    <code>{proofCode}</code>
  </div>
</div>

<style>
  .passport-badge-art {
    position: relative;
    min-height: 280px;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, .28);
    border-radius: 30px;
    color: #ffffff;
    background:
      radial-gradient(circle at 30% 18%, rgba(255, 255, 255, .26), transparent 28%),
      radial-gradient(circle at 76% 18%, rgba(255, 192, 120, .28), transparent 30%),
      linear-gradient(145deg, #0c1656, #1f75ff 52%, #ff8a2b);
    box-shadow: 0 20px 50px rgba(5, 9, 78, .16);
  }

  .passport-badge-art.locked {
    background:
      radial-gradient(circle at 32% 16%, rgba(255, 255, 255, .18), transparent 28%),
      linear-gradient(145deg, #38405f, #5e6689 55%, #7c8198);
  }

  .badge-orbit {
    position: absolute;
    border: 1px solid rgba(255, 255, 255, .42);
    border-radius: 999px;
    opacity: .72;
  }

  .badge-orbit.outer {
    width: 220px;
    height: 220px;
  }

  .badge-orbit.inner {
    width: 150px;
    height: 150px;
    border-style: dashed;
  }

  .badge-core {
    position: relative;
    z-index: 1;
    width: 132px;
    height: 132px;
    display: grid;
    place-items: center;
    align-content: center;
    gap: 4px;
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, .5);
    border-radius: 999px;
    text-align: center;
    background: rgba(255, 255, 255, .16);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 14px 32px rgba(0, 0, 0, .16);
    backdrop-filter: blur(10px);
  }

  .badge-icon {
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: rgba(255, 255, 255, .18);
  }

  .badge-core small,
  .badge-core em,
  .badge-footer span,
  .badge-footer code {
    color: rgba(255, 255, 255, .82);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .badge-core strong {
    font-size: 16px;
    letter-spacing: -.02em;
  }

  .badge-core em {
    font-style: normal;
  }

  .badge-footer {
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 14px;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
  }

  .badge-footer code {
    padding: 6px 8px;
    border-radius: 999px;
    background: rgba(0, 0, 0, .18);
    letter-spacing: .04em;
  }
</style>
