<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { completeLab, learningState } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  type Choice = 'seed' | 'connect' | 'signature' | '';

  let choice = $state<Choice>('');
  let checked = $state<string[]>([]);

  const safetyItems = [
    { id: 'url', label: 'Periksa alamat website' },
    { id: 'seed', label: 'Jangan pernah mengetik seed phrase' },
    { id: 'request', label: 'Baca permintaan signature' },
    { id: 'testnet', label: 'Gunakan testnet untuk latihan' }
  ];

  const score = $derived(checked.length * 25);
  const choiceSafe = $derived(choice === 'connect' || choice === 'signature');
  const labDone = $derived(learningState.completedLabIds.includes('safe-wallet-check'));

  function toggle(id: string) {
    checked = checked.includes(id) ? checked.filter((item) => item !== id) : [...checked, id];
  }

  function finishSimulation() {
    completeLab('safe-wallet-check');
    pushToast({ title: 'Simulasi selesai', copy: 'Wallet safety checklist masuk sebagai sinyal Praktik di Lab.', tone: 'success' });
  }
</script>

<section class="lab-simulator">
  <div class="sim-left">
    <span class="spark-eyebrow">Interactive Lab</span>
    <h1>Jangan cuma baca. Coba ambil keputusan aman.</h1>
    <p>Simulasi kecil ini membuat Lab terasa seperti ruang praktik. Pemula belajar mengenali tindakan aman sebelum masuk testnet atau wallet sungguhan.</p>

    <div class="sim-choice-grid">
      <button type="button" class:active={choice === 'seed'} onclick={() => (choice = 'seed')}><SparkIcon name="lock" size={18} /><strong>Masukkan seed phrase</strong><small>Website meminta kata rahasia wallet.</small></button>
      <button type="button" class:active={choice === 'connect'} onclick={() => (choice = 'connect')}><SparkIcon name="wallet" size={18} /><strong>Connect wallet</strong><small>Aplikasi hanya meminta alamat wallet.</small></button>
      <button type="button" class:active={choice === 'signature'} onclick={() => (choice = 'signature')}><SparkIcon name="shield" size={18} /><strong>Baca signature</strong><small>Pengguna memeriksa detail sebelum menyetujui.</small></button>
    </div>
  </div>

  <aside class="sim-result-panel">
    <div class="sim-result-head">
      <SparkTrustBadge label={choice ? (choiceSafe ? 'Aman dipelajari' : 'Berbahaya') : 'Pilih aksi'} tone={choice ? (choiceSafe ? 'safe' : 'target') : 'beta'} />
      <span>{score}% checklist</span>
    </div>

    <div class="sim-verdict">
      <span><SparkIcon name={choiceSafe ? 'check' : choice ? 'shield' : 'help'} size={24} /></span>
      <div>
        <strong>{choice === '' ? 'Pilih salah satu situasi.' : choiceSafe ? 'Keputusan ini bisa dipelajari dengan guardrail.' : 'Ini tindakan berisiko tinggi.'}</strong>
        <p>
          {choice === ''
            ? 'Spark akan memberi feedback sederhana agar pengguna tidak panik saat melihat permintaan wallet.'
            : choice === 'seed'
              ? 'Seed phrase/private key tidak boleh dimasukkan ke website apa pun. Ini harus dianggap red flag.'
              : choice === 'connect'
                ? 'Connect wallet belum otomatis mengirim aset, tetapi pengguna tetap harus memeriksa website dan izin.'
                : 'Membaca signature membantu pengguna memahami aksi sebelum menyetujui permintaan.'}
        </p>
      </div>
    </div>

    <div class="sim-checklist">
      {#each safetyItems as item}
        <button type="button" class:checked={checked.includes(item.id)} onclick={() => toggle(item.id)}>
          <SparkIcon name={checked.includes(item.id) ? 'check' : 'target'} size={15} />
          <span>{item.label}</span>
        </button>
      {/each}
    </div>

    <SparkButton onclick={finishSimulation} disabled={!choice || checked.length < 3 || labDone}>
      {labDone ? 'Simulasi Tercatat' : checked.length < 3 ? 'Lengkapi Checklist' : 'Selesaikan Simulasi'}
    </SparkButton>
  </aside>
</section>
