const commander = require("commander");
const figlet = require("figlet");
const chalk = require("chalk");
const Metalsmith = require("metalsmith");
const markdown = require("metalsmith-markdown");
const layouts = require("metalsmith-layouts");
const collections = require("metalsmith-collections");
const serve = require("metalsmith-serve");
const watch = require("metalsmith-watch");
const tools = require("./tools.js");

console.log("");
console.log(chalk.black.bgGreen(" New blog generator 2.0 "));
console.log(figlet.textSync("Cool Blog"));
console.log("");

const defMetadata = {
  readingTime: undefined,
  date: undefined,
  tags: undefined,
  title: "My Static Site & Blog",
  description: "It's about saying »Hello« to the World.",
  generator: "Metalsmith",
  url: "http://www.metalsmith.io/",
  tools: tools
};

Metalsmith(__dirname)
  .metadata({ ...defMetadata })
  .source("./src")
  .destination("./build")
  .clean(true)
  .use((files, metalsmith, done) => {
    setImmediate(done);
    metalsmith.metadata({ ...defMetadata });
  })
  .use(markdown())
  .use(
    collections({
      posts: {
        pattern: "*.md",
        sortBy: "date",
        reverse: true
      }
    })
  )
  .use(layouts())
  .use(
    watch({
      paths: {
        "layouts/**/*": "**/*",
        "${source}/**/*": "**/*"
      },
      livereload: false
    })
  )
  .use(
    serve({
      port: 8099,
      verbose: true
    })
  )
  .build(function(err, files) {
    if (err) {
      throw err;
    }
  });
