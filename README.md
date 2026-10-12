# Bravo Games website

Static site, live at https://bravogames.web.app (Firebase Hosting, project `bravogames`).
A mirror is kept on GitHub Pages: https://papajohn3432-pixel.github.io/

## Update
1. Edit the page builder (`_build.py` / `content.py`, kept locally) and run `python _build.py`.
2. Deploy: `npx firebase-tools deploy --only hosting --project bravogames`
3. Push to GitHub: `git add -A && git commit -m "..." && git push`

`app-ads.txt` (AdMob) is served from the root of both addresses.
