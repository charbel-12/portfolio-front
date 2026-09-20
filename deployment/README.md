# Production settings

The Next.js app exports static files. Host redirects must run at the CDN or origin; a Next.js redirect cannot enforce the hostname in this export.

`cloudflare-redirect.json` is a single rule definition for the existing zone's `http_request_dynamic_redirect` ruleset. Add it to the existing ruleset without replacing other rules. In the Cloudflare dashboard, use the same hostname match, dynamic target, 301 status, and preserve-query setting. Ensure the www DNS record is proxied. No Cloudflare account settings have been changed by this repository update.

After applying it, verify both `http://www.charbelmdawar.com/work/callx?ref=test` and the HTTPS equivalent redirect to `https://charbelmdawar.com/work/callx?ref=test`. Verify the apex does not redirect back.

Reference: [Cloudflare Single Redirect settings](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/). Cloudflare Pages `_redirects` does not support domain-level redirects.

For Cloudflare Pages, the exported `_headers` file caches content-hashed Next assets for one year. Leave HTML on the hosting provider's revalidation policy; verify its response headers after deployment. If the origin is elsewhere, apply the equivalent asset policy there. Enable HTTPS enforcement and supported compression/protocol settings in the zone. Avoid a blanket Cache Everything rule for HTML.

Performance validation still requires a browser/Lighthouse run or field data; no Core Web Vitals score is inferred from asset sizes. Check mobile LCP, INP, and CLS after deploying the final build.
