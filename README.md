# Developer website — for app-ads.txt / AdMob verification

This is a one-page site whose real job is to host **`app-ads.txt`** at a
domain root so AdMob can verify Blockosaurus, Bubble Shooter: Rainbow Pop and
Pakistanopoly (all three use AdMob publisher `pub-6576640594299038`, so one
line covers all of them).

## Deploy free with GitHub Pages (~10 minutes)

1. Create a GitHub account if you don't have one.
2. Create a **new public repository** named exactly:
   `<your-github-username>.github.io`
   (e.g. `babarimran.github.io`)
3. Upload every file in this folder to that repo:
   `index.html`, `app-ads.txt`, `.nojekyll`, `README.md`
   (GitHub → repo → "Add file" → "Upload files" → drag them in → Commit)
4. Repo → **Settings → Pages** → Source: **Deploy from a branch**,
   Branch: **main** / **/(root)** → Save.
5. Wait ~1–2 minutes, then open:
   `https://<your-username>.github.io/`  — the site
   `https://<your-username>.github.io/app-ads.txt`  — must show the one line
6. In **Google Play Console** → each app → **Store presence → Store settings**
   (or Main store listing) → **Website** field → enter
   `https://<your-username>.github.io`
   exactly (https, no trailing slash, no `/app-ads.txt`). Save. It goes
   through a short listing review.
7. Once the website shows on the live Play listing, go to **AdMob → the app →
   App settings → App verification → Verify app → Check for updates**.
   AdMob crawls `https://<your-username>.github.io/app-ads.txt` and flips the
   app to **Verified** (can take a few hours, sometimes up to a day).

Repeat step 6 for Bubble Shooter and Pakistanopoly if you want them verified
too — same website URL, same app-ads.txt.

## Notes

- `.nojekyll` is included so GitHub Pages serves `app-ads.txt` untouched.
- Edit the `YOUR_DEVELOPER_ID` placeholder in `index.html` (the "All apps on
  Google Play" link) — get it from your Play Console developer page URL, or
  just delete that link.
- The contact email and privacy-policy link match the published privacy
  policy. Change them in `index.html` if needed.
- A `username.github.io` address works for app-ads.txt because it's a
  registrable domain on the Public Suffix List. If AdMob still won't verify
  after 24–48h, the bulletproof fix is a ~$10/yr custom domain pointed at the
  same GitHub Pages site (repo → Settings → Pages → Custom domain).
