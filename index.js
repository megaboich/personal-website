const commander = require("commander");
const figlet = require("figlet");
const chalk = require("chalk");
const Metalsmith = require("metalsmith");
const markdown = require("metalsmith-markdown");
const layouts = require("metalsmith-layouts");
const permalinks = require("metalsmith-permalinks");

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
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(markdown())
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
