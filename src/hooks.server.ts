import type { Handle } from '@sveltejs/kit';

const STATIC_ASSET_PATTERN = /\.(?:js|css|svg|png|jpg|jpeg|webp|ico|woff2?)$/i;

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  const pathname = event.url.pathname;

  if (STATIC_ASSET_PATTERN.test(pathname) || pathname.startsWith('/assets/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return response;
  }

  if (response.headers.get('content-type')?.includes('text/html')) {
    response.headers.set('Cache-Control', 'private, max-age=0, must-revalidate');
  }

  return response;
};
