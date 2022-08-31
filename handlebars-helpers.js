const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

module.exports = {
  registerPartials(partialsFolder) {
    fs.readdirSync(partialsFolder).forEach((file) => {
      const name = path.basename(file, ".hbs");
      const contents = fs.readFileSync(path.join(partialsFolder, file), "utf-8");
      Handlebars.registerPartial(name, contents);
    });
  },
  registerHelpers() {
    Handlebars.registerHelper("cut-excerpt", function (options) {
      const strContent = options.fn(this);
      const cutIndex = strContent.toLowerCase().indexOf("<!--cut-->");
      if (cutIndex > 0) {
        return strContent.substr(0, cutIndex);
      }
      return new Handlebars.SafeString(strContent);
    });

    Handlebars.registerHelper("remove-index-from-url", function (options) {
      const strContent = options.fn(this);
      return new Handlebars.SafeString(strContent.replace("index.html", ""));
    });

    Handlebars.registerHelper("fix-spaces-in-code-blocks", function (options) {
      const regEx = /<code>(.*?)<\/code>/ig;
      const strContent = options.fn(this);
      const replaced = strContent.replace(regEx, (insideText) => {
        return insideText.replace(/ /g, '\xa0').replace(/_/g, '\xa0');
      });
      return new Handlebars.SafeString(replaced);
    });

    Handlebars.registerHelper("format-date", function (options) {
      const sourceData = options.fn(this);
      if (!sourceData) {
        return "";
      }
      const parsedDate = new Date(options.fn(this));
      return parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    });

    // Nice helper for javascript evaluation in handlebars template
    // https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional/21915381#21915381
    Handlebars.registerHelper("jseval", function (expression) {
      var result;

      // you can change the context, or merge it with options.data, options.hash
      var context = this;

      // yup, i use 'with' here to expose the context's properties as block variables
      // you don't need to do {{jseval 'this.age + 2'}}
      // but you can also do {{jseval 'age + 2'}}
      // HOWEVER including an UNINITIALIZED var in a expression will return undefined as the result.
      // eslint-disable-next-line no-with
      with (context) {
        result = function () {
          try {
            return eval(expression);
          } catch (e) {
            console.warn(
              "•Expression: {{jseval '" + expression + "'}}\n•JS-Error: ",
              e,
              "\n•Context: ",
              context
            );
          }
        }.call(context); // to make eval's lexical this=context
      }
      return result;
    });

    // Nice helper for conditional rendering based on javascript evaluation in handlebars template
    // https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional/21915381#21915381
    Handlebars.registerHelper("jseval_if", function (expression, options) {
      return Handlebars.helpers["jseval"].apply(this, [expression, options])
        ? options.fn(this)
        : options.inverse(this);
    });
  }
};
