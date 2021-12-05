const commander = require("commander");
const figlet = require("figlet");
const chalk = require("chalk");
const path = require("path");
const Metalsmith = require("metalsmith");
const markdown = require("metalsmith-markdown");
const layouts = require("metalsmith-layouts");
const collections = require("metalsmith-collections");
const serve = require("metalsmith-serve");
const watch = require("metalsmith-watch");
const handlebarsHelpers = require("./handlebars-helpers");

const cmdParams = commander
  .version("0.1.0")
  .option("-b, --build", "Build mode")
  .option("-p, --port", "Port")
  .parse(process.argv)
  .opts();

const isBuild = !!cmdParams.build;
const port = cmdParams.port || 8089;

console.log(chalk.black.bgGreen(" New blog generator 2.0 "));
console.log(figlet.textSync("Cool Blog"));
console.log("");
if (isBuild) {
  console.log("Build the static site");
} else {
  console.log("Listening on port: " + chalk.cyanBright(port));
}

const defMetadata = {
  readingTime: undefined,
  date: undefined,
  tags: undefined,
  title: undefined,
  description: "Oleksandr Boiko"
};

handlebarsHelpers.registerHelpers();
handlebarsHelpers.registerPartials(path.join(__dirname, "partials"));

const metal = Metalsmith(__dirname);
metal.metadata({ ...defMetadata });
metal.source("./src");
metal.destination("./build");
metal.clean(true);

metal.use(markdown());

metal.use((files, metalsmith, done) => {
  for(const key of Object.keys(files)){
    /**
     * Save the content immediately after markdown transformation was performed.
     * Useful when we want to operate with content of the article but before the layout was applied.
     */
    files[key].contents_first_pass = files[key].contents;
  }

  done();
});

metal.use(
  collections({
    posts: {
      pattern: "*.md",
      sortBy: "date",
      reverse: true
    },
    chords: {
      pattern: "*.md"
    }
  })
);

metal.use(layouts());

if (!isBuild) {
  metal.use(
    watch({
      paths: {
        "src/**/*": "**/*"
      }
    })
  );
  metal.use(
    serve({
      port,
      verbose: true
    })
  );
}

metal.build(function (err) {
  if (err) {
    throw err;
  }
});

console.log("..OK");