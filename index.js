const commander = require("commander");
const figlet = require("figlet");
const chalk = require("chalk");
const Metalsmith = require("metalsmith");
const markdown = require("metalsmith-markdown");
const layouts = require("metalsmith-layouts");
const permalinks = require("metalsmith-permalinks");
const serve = require("metalsmith-serve");
const watch = require("metalsmith-watch");

console.log("");
console.log(chalk.black.bgGreen(" New blog generator 2.0 "));
console.log(figlet.textSync("Cool Blog"));
console.log("");

Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source("./src")
  .destination("./build")
  .clean(false)
  .use(markdown())
  .use(permalinks())
  .use(
    layouts({
      engine: "handlebars"
    })
  )
  .use(
    watch({
      paths: {
        "${source}/**/*": true,
        "layouts/**/*": true
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
