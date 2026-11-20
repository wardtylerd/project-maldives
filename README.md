# Project Maldives

A phone app for the Nov 19 – Dec 26, 2026 cut: daily checklist, 30-second numbers, progress, and the Part H adjustment rules. Installs to the iPhone home screen and works offline.

## Edit the plan
Everything the app shows comes from **plan.md**. Edit it on github.com (pencil icon), commit, and the app picks it up the next time it opens with a connection. Keep the `##` headings and table header rows as they are. If an edit can't be read, the app keeps the last good plan and shows a yellow note saying what to fix.

## Where your log lives
On your phone only, in the installed app's storage (IndexedDB, with a second copy in localStorage). It is never uploaded.
- Use the home-screen icon, not a Safari tab. iOS keeps their storage separate.
- Deleting the home-screen icon deletes the log. Back up first.
- **Back up** (Progress tab) opens the share sheet. Choose Save to Files → iCloud Drive. The Sunday checklist reminds you.
- **Restore** merges a backup file into the phone. Days already on the phone are kept.

## Files
- `index.html` — layout and styles
- `app.js` — reads plan.md, builds each day's checklist, saves your log
- `rules.js` — progress math, the Part H rules, and pattern flags (plain arithmetic, no AI)
- `food.js` — Food tab: weekly menu, step-by-step meal prep (with every sauce recipe inline), recipe library, grocery list. Amounts are US kitchen units (oz, cups, tbsp, tsp), computed from the Ingredients, Sauce ingredients and Store units tables in plan.md
- `timer.js` — rope and heavy-bag interval timer (beeps, wake lock, auto check-off)
- `splash.jpg` — the opening screen
- `sw.js` — offline cache. Bump `VERSION` when any file other than plan.md changes.
