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

const cmdParams = commander
  .version("0.1.0")
  .option("-b, --build", "Build mode")
  .parse(process.argv);

const isBuild = !!cmdParams.build;

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

const metal = Metalsmith(__dirname);
metal.metadata({ ...defMetadata });
metal.source("./src");
metal.destination("./build");
metal.clean(true);
metal.use((files, metalsmith, done) => {
  setImmediate(done);
  metalsmith.metadata({ ...defMetadata });
});
metal.use(markdown());
metal.use(
  collections({
    posts: {
      pattern: "*.md",
      sortBy: "date",
      reverse: true
    }
  })
);
metal.use(layouts());
if (!isBuild) {
  metal.use(
    watch({
      paths: {
        "layouts/**/*": "**/*",
        "${source}/**/*": "**/*"
      },
      livereload: false
    })
  );
  metal.use(
    serve({
      port: 8099,
      verbose: true
    })
  );
}
metal.build(function (err, files) {
  if (err) {
    throw err;
  }
});
