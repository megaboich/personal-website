import Metalsmith from "metalsmith";
import layouts from "@metalsmith/layouts";
import markdown from "@metalsmith/markdown";
import collections from "@metalsmith/collections";

import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { program } from "commander";
import browserSync from "browser-sync";

import { registerHelpers, registerPartials } from "./handlebars-helpers.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const cmdParams = program
  .option("-b, --build", "Build mode")
  .option("-w, --watch", "Watch mode")
  .option("-p, --port", "Port")
  .parse(process.argv)
  .opts();

const isBuild = !!cmdParams.build;
const isWatch = !!cmdParams.watch;
const port = cmdParams.port || 8089;
if (!isBuild && !isWatch) {
  console.error("No mode specified. Use -b or -w");
  process.exit(1);
}

console.log("Personal blog generator 3.0 ");
console.log("");
if (isBuild) {
  console.log("Build the static site");
} else {
  console.log("Listening on port: " + port);
}

const defMetadata = {
  readingTime: undefined,
  date: undefined,
  tags: undefined,
  title: undefined,
  description: "Oleksandr Boiko"
};

registerHelpers();
registerPartials(path.join(__dirname, "partials"));
//!!!

/** @type {browserSync.BrowserSyncInstance | undefined} */
let devServer = undefined;
let t1 = performance.now();

function msBuild () {
  return Metalsmith(__dirname)
    .clean(true)
    .watch(isWatch ? ["src"] : false)
    .source("src")
    .destination("build")
    .metadata({ ...defMetadata })
    .use(markdown())
    .use((files, metalsmith, done) => {
      for (const key of Object.keys(files)) {
        /**
         * Save the content immediately after markdown transformation was performed.
         * Useful when we want to operate with content of the article but before the layout was applied.
         */
        files[key].contents_first_pass = files[key].contents;
      }

      done();
    })
    .use(
      collections({
        posts: {
          pattern: "posts/**/*.html",
          reverse: true,
          sortBy: "date",
          /** @param {Metalsmith.File} file */
          filterBy (file) {
            return file.layout === "post.hbs";
          },
          limit: 100000,
          refer: true,
          metadata: {}
        },
        songs: {
          pattern: "songs/*.html",
          reverse: false,
          sortBy: "tags",
          /** @param {Metalsmith.File} file */
          filterBy (file) {
            return file.layout === "song.hbs";
          },
          limit: 100000,
          refer: true,
          metadata: {}
        }
      })
    )
    .use(layouts({}));
}

const ms = msBuild();

ms.build(err => {
  if (err) {
    throw err;
  }
  /* eslint-disable no-console */
  console.log(`Build success in ${((performance.now() - t1) / 1000).toFixed(1)}s`);

  if (isWatch && ms.watch()) {
    if (devServer) {
      t1 = performance.now();
      devServer.reload();
    } else {
      devServer = browserSync.create();
      devServer.init({
        host: "localhost",
        server: "./build",
        port,
        injectChanges: false,
        reloadThrottle: 0
      });
    }
  }
});
