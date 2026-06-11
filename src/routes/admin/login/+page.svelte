<script lang="ts">
  let { data, form } = $props();
</script>

<svelte:head>
  <title>Admin access - Karyra Spark</title>
</svelte:head>

<div class="admin-login">
  <section class="admin-login__card">
    <img src="/assets/brand/icon-only.svg" alt="" width="48" height="48" />
    <span class="admin-eyebrow">Private administration</span>
    <h1>Karyra Spark Admin</h1>
    <p>This area is separated from learner routes and requires a server-issued admin session.</p>

    {#if !data.adminConfigured}
      <div class="admin-login__notice" role="status">
        <strong>Admin access is disabled.</strong>
        <p>Configure the private admin environment values on the server. No public fallback is available.</p>
      </div>
    {:else}
      <form method="POST" class="admin-login__form">
        <label for="admin-password">Admin credential</label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autocomplete="current-password"
          minlength="12"
          required
        />
        {#if form?.message}<p class="admin-form-error" role="alert">{form.message}</p>{/if}
        <button type="submit">Enter admin dashboard</button>
      </form>
    {/if}

    <a class="admin-login__back" href="/">Return to public Spark</a>
  </section>
</div>
