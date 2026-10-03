import markdownItAnchor from "markdown-it-anchor";

const alphaTabDist = "node_modules/@coderline/alphatab/dist";

/** Same heading ids as the previous Metalsmith (marked) build, so old anchors keep working. */
function slugify (/** @type {string} */ text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/<[!/a-z].*?>/gi, "")
    .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "")
    .replace(/\s/g, "-");
}

export default function (eleventyConfig) {
  eleventyConfig.amendLibrary("md", md => {
    md.set({ linkify: true }).use(markdownItAnchor, { slugify, tabIndex: false });
    md.linkify.set({ fuzzyLink: false });
  });

  // Content refers to layouts by name only, so the template engine can change without touching .md files
  for (const name of ["post", "posts", "song", "songs"]) {
    eleventyConfig.addLayoutAlias(name, `${name}.njk`);
  }

  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/songs/*.{gp3,gp4}");
  eleventyConfig.addPassthroughCopy("src/posts/**/*.{png,jpg,gif,js,css}");
  eleventyConfig.addPassthroughCopy({
    "node_modules/bulma/css/bulma.min.css": "assets/lib/bulma/bulma.min.css",
    [`${alphaTabDist}/alphaTab.mjs`]: "assets/lib/alphatab/alphaTab.mjs",
    [`${alphaTabDist}/alphaTab.core.mjs`]: "assets/lib/alphatab/alphaTab.core.mjs",
    [`${alphaTabDist}/alphaTab.worker.mjs`]: "assets/lib/alphatab/alphaTab.worker.mjs",
    [`${alphaTabDist}/alphaTab.worklet.mjs`]: "assets/lib/alphatab/alphaTab.worklet.mjs",
    [`${alphaTabDist}/font`]: "assets/lib/alphatab/font"
  });

  eleventyConfig.addGlobalData("description", "Oleksandr Boiko");
  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());
  // Keep Metalsmith-style URLs: songs/foo.md -> songs/foo.html, posts/x/index.md -> posts/x/index.html
  eleventyConfig.addGlobalData("permalink", () => (/** @type {any} */ data) => `${data.page.filePathStem}.html`);

  eleventyConfig.addCollection("posts", api =>
    api
      .getAll()
      .filter(item => item.data.collection === "posts")
      .sort((a, b) => b.date.getTime() - a.date.getTime())
  );
  eleventyConfig.addCollection("songs", api =>
    api
      .getAll()
      .filter(item => item.data.collection === "songs")
      .sort((a, b) => String(a.data.tags).localeCompare(String(b.data.tags)) || a.page.fileSlug.localeCompare(b.page.fileSlug))
  );

  eleventyConfig.addFilter("excerpt", (/** @type {string} */ content) => {
    const cutIndex = content.toLowerCase().indexOf("<!--cut-->");
    return cutIndex > 0 ? content.slice(0, cutIndex) : content;
  });

  // Song sheets use inline code for chord lines; keep their spacing (and "_" as spacer) intact.
  eleventyConfig.addFilter("fixSpacesInCodeBlocks", (/** @type {string} */ content) =>
    content.replace(/<code>(.*?)<\/code>/gi, code => code.replace(/[ _]/g, "\xa0"))
  );

  eleventyConfig.addFilter("formatDate", (/** @type {Date} */ date) =>
    date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
  );
}

export const config = {
  dir: {
    input: "src",
    output: "build"
  },
  templateFormats: ["md"],
  markdownTemplateEngine: false
};
