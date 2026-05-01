# HĀ CAFE Prep — Deploy to Netlify

## What's in this folder

```
ha-cafe-deploy/
├── index.html              ← The app
├── netlify.toml            ← Netlify config
├── package.json            ← Node deps (@netlify/blobs)
├── manifest.json           ← PWA manifest (Add to Home Screen)
├── icon-192.png            ← App icon (small)
├── icon-512.png            ← App icon (large)
├── apple-touch-icon.png    ← iOS home screen icon
└── netlify/
    └── functions/
        └── store.js        ← Backend for shared data (uses Netlify Blobs)
```

## How to deploy — easiest way (Netlify Drop)

1. Go to https://app.netlify.com/drop
2. Sign in (or sign up — free)
3. Drag this entire `ha-cafe-deploy` folder onto the page
4. Wait ~30 seconds for build
5. You'll get a URL like `https://something-something-12345.netlify.app`
6. Send that URL to the team in Break Room — bookmark it, "Add to Home Screen"

That's it. The backend (Netlify Blobs) just works automatically.

## Custom domain (optional, later)

In Netlify dashboard → Domain settings → add a custom domain like `hacafe-prep.com` or use a free `.netlify.app` subdomain rename like `hacafe-prep.netlify.app`.

## How it works

- **Shared data** (prep plans, 86 list) → Netlify Function → Netlify Blobs (cloud database)
- **Personal data** (cook handle) → localStorage on each phone
- **Offline cache** → if a cook's phone loses signal mid-shift, the app reads from localStorage

## Add to Home Screen (looks like a real app)

**iPhone:** Open URL in Safari → tap Share → "Add to Home Screen"
**Android:** Open URL in Chrome → menu → "Install app" or "Add to Home Screen"

The HĀ CAFE logo appears as the app icon, opens fullscreen with no browser UI.

## Updating the app

Make changes to `index.html` (or rebuild from your local copy), then drag-and-drop the folder onto Netlify Drop again. It'll keep the same URL.

For real version control: connect your Netlify site to a GitHub repo and `git push` to deploy.

## Troubleshooting

**"Function not found" errors:** Make sure `netlify.toml` is in the root of the folder when you upload.

**Data not syncing between phones:** Check that the URL is exactly the same (https vs http, trailing slash). All cooks need the same URL.

**App looks different on a cook's old phone:** The CSS uses some modern features (backdrop-filter, dvh units). On phones from before ~2020 it'll still work but might look slightly less polished. Functionality is fine.

Mahalo nui — A'ohe hana nui ke alu 'ia 🌺
