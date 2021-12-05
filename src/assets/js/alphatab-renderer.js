(function () {
  class AlphatabRenderer extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.renderContent();
    }

    renderContent() {
      this.wrapper = document.createElement("div");
      this.wrapper.setAttribute("class", "wrapper");
      
      const style = document.createElement("style");
      style.textContent = `
            .wrapper {
              display: block;
              margin-left:-32px;
              margin-right:-32px;
            }
        `;

      this.appendChild(style);
      this.appendChild(this.wrapper);

      const tabsUrl = this.getAttribute("data-src");
      const api = new alphaTab.AlphaTabApi(this.wrapper, {
        file: tabsUrl
      });
    }
  }

  customElements.define("alphatab-renderer", AlphatabRenderer);
})();
