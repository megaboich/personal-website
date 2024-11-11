import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

/**
 * @param {string} partialsFolder
 */
export function registerPartials (partialsFolder) {
  fs.readdirSync(partialsFolder).forEach(file => {
    const name = path.basename(file, ".hbs");
    const contents = fs.readFileSync(path.join(partialsFolder, file), "utf-8");
    Handlebars.registerPartial(name, contents);
  });
}

export function registerHelpers () {
  Handlebars.registerHelper(
    "cut-excerpt",
    /** @this {any} */
    function (options) {
      const strContent = options.fn(this);
      const cutIndex = strContent.toLowerCase().indexOf("<!--cut-->");
      if (cutIndex > 0) {
        return strContent.substr(0, cutIndex);
      }
      return new Handlebars.SafeString(strContent);
    }
  );

  Handlebars.registerHelper(
    "remove-index-from-url",
    /** @this {any} */
    function (options) {
      const strContent = options.fn(this);
      return new Handlebars.SafeString(strContent.replace("index.html", ""));
    }
  );

  Handlebars.registerHelper(
    "fix-spaces-in-code-blocks",
    /** @this {any} */
    function (options) {
      const regEx = /<code>(.*?)<\/code>/gi;
      /** @type {string} */
      const strContent = options.fn(this);
      const replaced = strContent.replace(regEx, insideText => {
        return insideText.replace(/ /g, "\xa0").replace(/_/g, "\xa0");
      });
      return new Handlebars.SafeString(replaced);
    }
  );

  Handlebars.registerHelper(
    "format-date",
    /** @this {any} */
    function (options) {
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
    }
  );

  // Nice helper for javascript evaluation in handlebars template
  // https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional/21915381#21915381
  Handlebars.registerHelper(
    "jseval",
    /** @this {any} */
    function (expression) {
      var result;

      // you can change the context, or merge it with options.data, options.hash
      var context = this;

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

      return result;
    }
  );

  // Nice helper for conditional rendering based on javascript evaluation in handlebars template
  // https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional/21915381#21915381
  Handlebars.registerHelper(
    "jseval_if",
    /** @this {any} */
    function (expression, options) {
      return Handlebars.helpers["jseval"].apply(this, [expression, options])
        ? options.fn(this)
        : options.inverse(this);
    }
  );
}
