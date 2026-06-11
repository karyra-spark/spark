<script lang="ts">
  import { page } from '$app/state';

  const navigation = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/learners', label: 'Learners' },
    { href: '/admin/lessons', label: 'Core lessons' },
    { href: '/admin/lab', label: 'Practice Lab' },
    { href: '/admin/passport', label: 'Passport' },
    { href: '/admin/proofs', label: 'Proof Ledger' },
    { href: '/admin/pilots', label: 'Community pilot' },
    { href: '/admin/starknet', label: 'Starknet / Hub' },
    { href: '/admin/content', label: 'Content & docs' },
    { href: '/admin/settings', label: 'Settings' }
  ] as const;

  function isActive(href: string) {
    return href === '/admin' ? page.url.pathname === href : page.url.pathname.startsWith(href);
  }
</script>

<aside class="admin-sidebar">
  <a class="admin-brand" href="/admin">
    <img src="/assets/brand/icon-only.svg" alt="" width="38" height="38" />
    <span><strong>Karyra Spark</strong><small>Private administration</small></span>
  </a>

  <nav aria-label="Admin navigation">
    {#each navigation as item}
      <a href={item.href} class:active={isActive(item.href)} aria-current={isActive(item.href) ? 'page' : undefined}>
        {item.label}
      </a>
    {/each}
  </nav>

  <div class="admin-sidebar__footer">
    <a href="/" target="_blank" rel="noreferrer">Open public Spark</a>
    <form method="POST" action="/admin/logout">
      <button type="submit">Sign out</button>
    </form>
  </div>
</aside>
