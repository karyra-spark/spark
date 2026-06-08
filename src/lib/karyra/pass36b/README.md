# Runtime note — Pass 36B

Pass 36B is intentionally more forceful than Pass 36A because the first CSS selector did not reach the actual Home Flow card DOM.

If the UI still does not change after this pass:

1. Run `grep -R "Satu perjalanan dari pemahaman" -n src`.
2. Send the matching component file.
3. Send a screenshot after hard refresh.

Likely cause at that point: the rendered page is using a different deployed branch/build, or the card markup is deeply nested in a component whose direct children need a component-level rewrite.
