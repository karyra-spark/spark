<script lang="ts">
  type Props = {
    value: number;
    label?: string;
    copy?: string;
    size?: 'normal' | 'large';
  };

  let { value, label = 'Passport', copy = 'Readiness Score', size = 'normal' }: Props = $props();

  const normalized = $derived(Math.max(0, Math.min(100, Math.round(value))));
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = $derived(circumference - (normalized / 100) * circumference);
</script>

<div class={`spark-passport-gauge ${size}`} style={`--score: ${normalized}`}>
  <svg viewBox="0 0 140 140" role="img" aria-label={`${label} ${normalized}%`}>
    <defs>
      <linearGradient id="sparkGaugeGradient" x1="24" y1="18" x2="120" y2="118">
        <stop offset="0%" stop-color="var(--spark-blue)" />
        <stop offset="56%" stop-color="var(--spark-orange)" />
        <stop offset="100%" stop-color="var(--spark-pink)" />
      </linearGradient>
    </defs>
    <circle class="gauge-track" cx="70" cy="70" r={radius}></circle>
    <circle
      class="gauge-fill"
      cx="70"
      cy="70"
      r={radius}
      stroke-dasharray={circumference}
      stroke-dashoffset={dashOffset}
    ></circle>
    <circle class="gauge-core" cx="70" cy="70" r="34"></circle>
  </svg>

  <div>
    <strong>{normalized}%</strong>
    <span>{label}</span>
    <small>{copy}</small>
  </div>
</div>
