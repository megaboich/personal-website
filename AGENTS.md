# AGENTS.md

Personal website of Oleksandr Boiko, published at https://olekboiko.com. It's a static site built with Eleventy from Markdown content. It has a home page, projects, résumé, a technical blog and a song book with chords, tabs and playable sheet music.

## Before writing any content: learn the author's voice

The author wants all content to sound like him. **Before you write or edit any blog post, project entry, song note or page text, read all of the existing content first:**

- `src/index.md`, `src/projects/index.md`, `src/resume/index.md`
- `src/posts/index.md` and every `src/posts/*/index.md`
- `src/songs/index.md` and the prose parts of `src/songs/*.md`

Then match his vocabulary, tone and structure. The summary below is a reminder, not a replacement for reading:

- First person and friendly, a bit modest. Simple, plain sentences and short paragraphs. Not polished marketing copy.
- Recurring phrases: "First of all", "Ok,", "So,", "Then,", "Here is…", "Let's…", "After some struggling I was able to…", "This project turned out to be quite long lasting", "when a bright idea came into my mind", "fun project to get my hands on…", "nice / awesome / amazing library".
- Typical openings: "In this article I want to describe…", "This post is a very short instruction how to…", "Recently I had a lot of interest in… and decided to implement…".
- Typical closing: "In case you are interested, source code is available on [Github](…)". He writes "Github" in prose.
- Code is introduced with a short sentence ("Here is the function:") and followed by a short explanation.
- No em dashes, no bold calls to action, no emoji, no heavy formatting.
- Keep his English natural. Don't add mistakes on purpose, but don't over-polish his own wording when editing.

Facts:

- Never invent personal stories, opinions or dates. Get facts from the user or from sources (for example the project's git history). Clearly point out anything you inferred so he can check it.
- Anything that goes out of date quickly (AI models, tool versions, "latest") must say when it was true, e.g. "in August 2026", "released in July 2026".

## Commands

```sh
nvm use            # Node 24, from .nvmrc
pnpm i             # pnpm 12 (packageManager in package.json)
pnpm start         # dev server with live reload at http://localhost:8089
pnpm build         # rm -rf build && eleventy, output goes to ./build
pnpm typecheck     # tsc over src/ (src/posts/ is excluded)
pnpm deploy        # manual deploy from your machine via gh-pages (normally CI does it)
```

Don't run `pnpm build` while `pnpm start` is running. Both write to `build/`, and the dev server rebuilds on file changes, so the two can collide and fail randomly. Check with `pnpm build` and `pnpm typecheck` before saying a change is done.

## Tech stack

- **Eleventy 3** (`eleventy.config.js`): input is `src/`, output is `build/`.
  - `templateFormats: ["md"]`: only Markdown files become pages. Layouts are Nunjucks (`.njk`) in `src/_includes/`.
  - `markdownTemplateEngine: false`: Markdown files are **not** run through Nunjucks, so `{{ }}` and `{% %}` in `.md` files appear literally.
  - **Layout aliases:** content uses `layout: post | posts | song | songs`, without the extension. The mapping to `.njk` files is in `eleventy.config.js` (`addLayoutAlias`). Never write `.njk` in Markdown front matter. To add a layout, add its name to that list.
  - **Permalinks:** global data sets `permalink` to `${page.filePathStem}.html`, which keeps the old Metalsmith URLs. `songs/foo.md` → `/songs/foo.html`, and `posts/<folder>/index.md` → `/posts/<folder>/index.html` (also reachable as `/posts/<folder>/`).
  - **Collections:**
    - `posts`: pages with `collection: posts`, sorted by `date`, newest first.
    - `songs`: pages with `collection: songs`, sorted by the `tags` value (the artist), then by file name.
  - **Filters:**
    - `excerpt`: cuts content at `<!--cut-->` for the blog list.
    - `fixSpacesInCodeBlocks`: song pages only. Turns spaces and `_` inside inline code into non-breaking spaces, so chord lines keep their alignment.
    - `formatDate`: e.g. "August 15, 2026", in UTC.
  - **Global data:** `description`, `year`.
- **Markdown:** markdown-it with `linkify` (no fuzzy links) and `markdown-it-anchor`. The anchor ids use a custom `slugify` that matches the old `marked` ids, so old `#anchor` links keep working. Quirks:
  - A line with only spaces counts as blank.
  - `---` right after a line of text turns that text into a heading. Put a blank line before `---` when you want a divider.
  - A raw HTML block ends at the first blank line. Don't put blank lines inside multi-line HTML.
  - Bare URLs with trailing punctuation may need `<https://…>`.
- **Layouts** (`src/_includes/`):
  - `base.njk`: the page shell. Navbar, footer, Bulma, `icons.css`, `styles.css`, the alphaTab import map, `main.js`.
  - `post.njk`: adds highlight.js 11.12 from the CDN.
  - `posts.njk`: the blog list with excerpts.
  - `song.njk`: loads `song.css`, `song-main.js` and the background decorations.
  - `songs.njk`: the song list.
  - `macros.njk`: `tagsCombined`, the date, reading-time and tags badges.
- **CSS:**
  - **Bulma 1.0.4** (from pnpm, copied to `/assets/lib/bulma/`), pinned to the light theme with `data-theme="light"`. Bulma 1 removes all styling from a plain `<button>`, so always use Bulma classes (`button`, `input`, `label`, `box`, …) in raw HTML.
  - `src/assets/css/styles.css`: site styles, including `.project-card-img`.
  - `song.css`: song page styles.
  - `icons.css`: CSS-mask icons that follow the text color: `<i class="ico ico-play"></i>`, plus `ico-pause` and `ico-scroll`. To add an icon, add a `.ico-name` rule with an SVG data-URI in `--ico`. Don't bring back Font Awesome.
- **JavaScript:** plain ES modules in `src/assets/js/` with no bundler.
  - `main.js` (every page): Bulma navbar burger, `<awesome-youtube>`, `<awesome-soundcloud>`.
  - `song-main.js` (song pages): `<awesome-chord>`, `<awesome-music-score>`, `<awesome-auto-scroller>`.
  - **alphaTab 1.8.4** comes from pnpm and is copied to `/assets/lib/alphatab/`. It's imported as `@coderline/alphatab` through the import map in `base.njk`, and uses the soundfont `/assets/soundfont/microsoft_gm.sf2`.
  - Type-checked with JSDoc and `tsc` (`checkJs`, strict).
- **Files copied as-is into the build:** `src/CNAME`, `src/favicon.svg`, `src/assets/**`, `src/songs/*.{gp3,gp4}`, `src/posts/**/*.{png,jpg,gif,js,css}`. **Other file types in post folders (`.jpeg`, `.svg`, `.webp`, `.mp3`, …) are not copied.** Add the extension in `eleventy.config.js`, or convert the file.
- **Formatting:** `.prettierrc`: 2 spaces, double quotes, semicolons, no trailing commas, print width 100.
- `data_unsorted/` is committed but not part of the site. Leave it alone.

## Adding a blog post

1. Read all existing content first (see the voice section above).
2. Create `src/posts/YYYY-MM-DD-Title-With-Dashes/index.md`. The folder date must equal the `date` in front matter, because the folder name becomes the URL. The date is when the post is presented as published. The author may want it backdated (e.g. a week after the project's last commit), so ask if unsure. If you change the date of a published post, rename the folder and update every link to it (`grep` for the old folder name).
3. Front matter:

   ```yaml
   ---
   layout: post
   title: Short descriptive title in sentence case
   date: 2026-08-15
   readingTime: 7
   collection: posts
   tags:
     - JavaScript
   ---
   ```

   `readingTime` is in minutes: the word count divided by about 200, rounded up, plus a little extra for lots of code or screenshots (existing posts range from about 70 to 210 words per minute). Tags are short and Title Case, reusing existing ones where they fit (JavaScript, Git, Tools, Powershell, …).
4. Write an intro of one to three paragraphs, then put `<!--cut-->` on its own line or at the end of the last intro paragraph. Everything before it is the excerpt on `/posts/`.
5. Put images in the post folder or in an `images/` subfolder, and reference them with relative paths (`![](images/foo.png)`). Only `png`, `jpg`, `gif` (and `js`/`css` for demos) are copied.
6. Code goes in fenced blocks with a language (```` ```js ````, ```` ```bash ````, ```` ```text ````), which highlight.js picks up. Use `##` for sections.
7. Check every external link (for example `curl -sL -o /dev/null -w "%{http_code}"`). Use the correct default branch for GitHub links (e.g. `main` vs `master`).
8. Run `pnpm build`, open http://localhost:8089/posts/, and check both the excerpt card and the full post.

## Adding a project

Projects live in `src/projects/index.md`. Each one is a section, and the sections are separated by `---`. **The newest project goes at the top**, right after the intro paragraph. Follow the existing entries:

```markdown
---

### Project name

<img class="project-card-img" src="/posts/2026-08-15-Some-Post/images/screenshot.png">
</img>

[Project name](https://github.com/megaboich/repo) is a … which … (one or two sentences on what it is).

Why it was built (personal motivation, in the author's voice).

Key technologies and anything interesting about how it's built, linking libraries ("nice [Library](url)").

Features:

- Short feature.
- Short feature.

Demo is deployed here: [https://olekboiko.com/repo/](https://olekboiko.com/repo/).
```

- The image floats right with a 400px max width, so wide screenshots or GIFs work best. Use an image already on the site, or a raw GitHub URL from the project repo, like the older entries.
- If there's a blog post about the project, link to it ("More details … are in the [blog post](/posts/<folder>/)").
- Mention AI involvement honestly and with a date if it applies (e.g. "completed by AI (GPT-5.6 Sol in OpenCode) under my guidance in August 2026").

## Adding a song

1. Create `src/songs/<song-title>-<artist>.md` in lowercase kebab-case, e.g. `fields-of-gold-sting.md`. The page will be `/songs/<name>.html`, and it appears in the `/songs/` list automatically, sorted by artist.
2. Front matter (songs have no date):

   ```yaml
   ---
   layout: song
   title: Fields of Gold by Sting
   collection: songs
   tags:
     - Sting
   ---
   ```

   `title` is "<Song> by <Artist>". `tags` holds exactly one entry, the artist, which is used for sorting. Quote the title if it contains a colon.
3. Body building blocks, usually in this order:
   - `<awesome-youtube data-youtubeid="VIDEO_ID"></awesome-youtube>`, optionally with `data-start="150"` (seconds). There's also `<awesome-soundcloud data-soundcloudid="ID"></awesome-soundcloud>`.
   - A short personal note, in the author's voice, if he provided one.
   - Chord diagrams: `<awesome-chord data-chord="Asus2 0-0-2-2-0-0"></awesome-chord>`. The name is followed by six fret numbers from the high e string (1st) to the low E string (6th), so `G6 0-0-0-0-2-3` is 3-2-0-0-0-0 from low to high. `0` means open and `x` means muted.
   - `<awesome-auto-scroller duration="3"></awesome-auto-scroller>` before the lyrics. `duration` is in minutes (default 3), and the optional `fps` defaults to `0.1`. It scrolls down to `<awesome-auto-scroller-end></awesome-auto-scroller-end>` (or the end of the page), which goes after the lyrics.
   - Lyrics under `## Lyrics` (or `###`/`#####` section headings like `##### Verse 1`). Separate lines with blank lines, and verses with `---` (with a blank line before it).
   - Chord lines go above the lyric line as inline code, using `_` (or spaces) to line chords up with the words: `` `Asus2______________G6` ``. The `fixSpacesInCodeBlocks` filter keeps the spacing.
   - Tabs go in a plain fenced code block (`e|---…`).
   - Playable sheet music: put the Guitar Pro file next to the Markdown (`src/songs/<name>.gp3` or `.gp4`) and add `<awesome-music-score data-src="./<name>.gp3"></awesome-music-score>`.
4. Run `pnpm build` and open the page. Check that the chord diagrams render, that auto-scroll starts and stops, and that the score shows a play button and plays.

## Git, CI and deployment

- **Commit identity:** only the personal account, `Oleksandr Boiko <mega.boich@gmail.com>`, set in this repo's git config. Never commit with a work identity.
- Don't stage, commit or push unless the user asks. He often stages things himself, so check `git status` before committing.
- **CI** (`.github/workflows/main.yml`), on push and pull requests to `master`: `pnpm install --frozen-lockfile`, then `pnpm run typecheck`, then `pnpm run build`.
- **Deploy:** only on push to `master`. CI runs `deploy:ga`, which uses `gh-pages` to push `build/` to `megaboich/megaboich.github.io` (branch `master`) over SSH. The SSH key is a deploy key on that repo, and its private half is the `DEPLOY_KEY` secret here. The custom domain `olekboiko.com` comes from `src/CNAME`.
- After pushing, check with `gh run watch <id>` that the Deploy step passed, wait for the GitHub Pages build, then `curl` the live URL.
- Other apps are served from the same domain from their own repos (e.g. https://olekboiko.com/yet-another-tuner/). Don't create pages in this repo that clash with those paths.
