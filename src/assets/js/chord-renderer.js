/**
 * This micro library is a very minimal functionality to render guitar chord to SVG
 * Has no external dependencies
 * Inspired by https://github.com/justindarc/raphael.chord.js/
 */

(function () {
  /**
   * Small render helper to render SVG elements, inspired by createElement function in React
   * @param {String} tagName
   * @param {Object} attributes key-value object with attributes
   * @param {String | SVGElement} innerContent
   */
  function svgElt(tagName, attributes, innerContent) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    if (attributes) {
      for (const [k, v] of Object.entries(attributes)) {
        el.setAttribute(k, v);
      }
    }
    if (typeof innerContent === "string") {
      el.innerHTML = innerContent;
    }
    if (typeof innerContent === "object") {
      el.appendChild(innerContent);
    }
    return el;
  }

  /**
   * Renders a chord to SVG
   * @param {HTMLElement} container
   * @param {String} label
   * @param {String} notation A string in format "0-0-0-2-2-0". Six numbers indicating the fret values for the six strings in order from 1-6 or e-E. Open strings should be indicated by zero 0 and muted string should be not-a-number like X symbol.
   */
  function renderChord(container, label, notation) {
    const data = notation
      .split("-")
      .reverse()
      .map((x) => Number.parseInt(x))
      .map((x) => (Number.isNaN(x) ? -1 : x));

    const s2 = svgElt("svg", {
      width: 100,
      height: 100,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 100 100"
    });
    container.appendChild(s2);

    const signals = data.filter((x) => x > 0);
    const min = Math.min(...signals);
    const max = Math.max(...signals);
    const fret = max > 5 ? min : 0;
    const offset = fret > 0 ? fret - 1 : 0;

    for (i = 0; i < 6; i++) {
      // Muted strings.
      if (data[i] === -1) {
        s2.appendChild(
          svgElt("path", {
            fill: "#000",
            stroke: "#000",
            d:
              "M" +
              (16 + 10 * i) +
              " 7L" +
              (24 + 10 * i) +
              " 15M" +
              (16 + 10 * i) +
              " 15L" +
              (24 + 10 * i) +
              " 7"
          })
        );
      }

      // Open strings.
      else if (data[i] === 0) {
        s2.appendChild(
          svgElt("circle", {
            fill: "none",
            stroke: "#000",
            cx: 20 + 10 * i,
            cy: 11,
            r: 3.5
          })
        );
      }

      // All other strings.
      else {
        s2.appendChild(
          svgElt("circle", {
            fill: "#000",
            stroke: "#000",
            cx: 20 + 10 * i,
            cy: 15 + 10 * (data[i] - offset),
            r: 3.5
          })
        );
      }
    }

    if (fret > 0) {
      s2.appendChild(
        svgElt("text", { x: 74, y: 30, fill: "#000" }, svgElt("tspan", null, fret + "fr"))
      );
    } else {
      s2.appendChild(
        svgElt("path", {
          fill: "#000",
          stroke: "#000",
          d: "M20 18L70 18L70 20L20 20L20 18"
        })
      );
    }

    s2.appendChild(
      svgElt(
        "text",
        {
          x: 45,
          y: 88,
          "text-anchor": "middle",
          fill: "#000"
        },
        svgElt("tspan", null, label)
      )
    );

    for (var i = 0; i < 6; i++) {
      const position = 20 + 10 * i;
      s2.appendChild(
        svgElt("path", {
          fill: "#000",
          stroke: "#000",
          d: "M20 " + position + "L70 " + position
        })
      );
      s2.appendChild(
        svgElt("path", {
          fill: "#000",
          stroke: "#000",
          d: "M" + position + " 20L" + position + " 70"
        })
      );
    }
  }

  class ChordRenderer extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      this.wrapper = document.createElement("div");
      this.wrapper.setAttribute("class", "wrapper");
      shadow.appendChild(this.wrapper);

      const style = document.createElement("style");
      style.textContent = `
        :host {
          display: inline-block;
        }
    `;

      shadow.appendChild(style);
    }

    connectedCallback() {
      this.renderContent();
    }

    renderContent() {
      const chordNotation = this.getAttribute("data-chord");
      const [label, notation] = chordNotation.split(" ");
      renderChord(this.wrapper, label, notation);
    }
  }

  customElements.define("chord-renderer", ChordRenderer);
})();
