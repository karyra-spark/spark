<script lang="ts">
  import SparkIcon from './SparkIcon.svelte';
  import { landingFlowSteps } from '$lib/landing/landing-model';

  const flowToneLabel = (id: string) => (id === 'passport' ? 'safe' : id === 'hub' ? 'target' : 'beta');
</script>

<section class="landing-flow-v26 landing-flow-pass36c" id="alur" data-karyra-home-flow="pass36c">
  <div class="landing-section-intro split">
    <div>
      <span class="spark-eyebrow">Alur Spark</span>
      <h2>Satu perjalanan dari pemahaman ke readiness.</h2>
    </div>
    <p>Home hanya memperkenalkan jalur. Progress personal tetap berada di Dashboard dan Profile.</p>
  </div>

  <div class="landing-flow-track landing-flow-track-pass36c">
    {#each landingFlowSteps as step, index}
      <a class="landing-flow-link-pass36c" href={step.href} aria-label={`Buka ${step.title}`}>
        <article class={`landing-flow-card-pass36c ${step.tone}`}>
          <div class="landing-flow-card-head-pass36c">
            <span class={`flow-number ${step.tone}`}>{index + 1}</span>
            <span class="landing-flow-icon-pass36c" aria-hidden="true">
              <SparkIcon name={step.icon} size={22} />
            </span>
            <div class="landing-flow-title-pass36c">
              <span class={`landing-flow-label-pass36c ${flowToneLabel(step.id)}`}>{step.label}</span>
              <h3>{step.title}</h3>
            </div>
          </div>
          <p>{step.copy}</p>
        </article>
      </a>
    {/each}
  </div>
</section>

<style>
  .landing-flow-pass36c {
    min-width: 0;
  }

  .landing-flow-track-pass36c {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
  }

  .landing-flow-link-pass36c {
    display: block;
    min-width: 0;
    height: 100%;
  }

  .landing-flow-card-pass36c {
    min-width: 0;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 14px;
    border: 1px solid var(--spark-line);
    border-radius: 18px;
    background: var(--spark-card);
    box-shadow: 0 10px 28px rgba(5, 9, 78, 0.07);
    overflow: hidden;
  }

  .landing-flow-card-head-pass36c {
    min-width: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 44px 34px minmax(0, 1fr);
    align-items: center;
    gap: 10px;
  }

  .landing-flow-card-pass36c .flow-number {
    width: 44px;
    height: 44px;
    flex: 0 0 auto;
  }

  .landing-flow-icon-pass36c {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    color: var(--spark-blue-strong);
    line-height: 0;
  }

  .landing-flow-title-pass36c {
    min-width: 0;
    display: grid;
    gap: 4px;
    align-content: center;
  }

  .landing-flow-label-pass36c {
    width: max-content;
    max-width: 100%;
    display: inline-flex;
    align-items: center;
    min-height: 22px;
    padding: 4px 7px;
    border-radius: 999px;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.1);
    font-size: 10.5px;
    line-height: 1;
    font-weight: 680;
    white-space: nowrap;
  }

  .landing-flow-label-pass36c.safe {
    color: var(--spark-green);
    background: rgba(34, 183, 122, 0.11);
  }

  .landing-flow-label-pass36c.target {
    color: var(--spark-orange);
    background: rgba(255, 128, 0, 0.11);
  }

  .landing-flow-card-pass36c h3 {
    min-width: 0;
    margin: 0;
    color: var(--spark-navy);
    font-size: 20px;
    line-height: 1.05;
    letter-spacing: -0.045em;
    font-weight: 680;
    word-break: normal;
    overflow-wrap: break-word;
    hyphens: none;
  }

  :global([data-theme='dark']) .landing-flow-card-pass36c h3 {
    color: #fff;
  }

  .landing-flow-card-pass36c p {
    width: 100%;
    max-width: 100%;
    margin: 0;
    color: var(--spark-muted);
    font-size: 13px;
    line-height: 1.5;
    font-weight: 430;
    white-space: normal;
    word-break: normal !important;
    overflow-wrap: break-word !important;
    hyphens: none !important;
    text-wrap: pretty;
  }

  @media (max-width: 1180px) {
    .landing-flow-track-pass36c {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 760px) {
    .landing-flow-pass36c {
      padding-inline: 16px;
    }

    .landing-flow-track-pass36c {
      grid-template-columns: 1fr !important;
      gap: 10px;
    }

    .landing-flow-card-pass36c {
      min-height: auto;
      gap: 10px;
      padding: 13px;
      border-radius: 18px;
    }

    .landing-flow-card-head-pass36c {
      grid-template-columns: 40px 30px minmax(0, 1fr);
      gap: 9px;
    }

    .landing-flow-card-pass36c .flow-number {
      width: 40px;
      height: 40px;
      border-radius: 15px;
    }

    .landing-flow-icon-pass36c {
      width: 30px;
      height: 30px;
    }

    .landing-flow-label-pass36c {
      min-height: 20px;
      padding: 3px 7px;
      font-size: 10px;
    }

    .landing-flow-card-pass36c h3 {
      font-size: 15.5px !important;
      line-height: 1.15 !important;
      letter-spacing: -0.02em;
    }

    .landing-flow-card-pass36c p {
      font-size: 13px !important;
      line-height: 1.5 !important;
    }
  }

  @media (max-width: 420px) {
    .landing-flow-pass36c {
      padding-inline: 12px;
    }
  }
</style>
