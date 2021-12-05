(function () {
  class SoundcloudRenderer extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      this.wrapper = document.createElement("div");
      this.wrapper.setAttribute("class", "wrapper");

      const style = document.createElement("style");
      style.textContent = `
        :host {
          display: block;
          margin-top: 16px;
          margin-bottom: 32px;
        }
    `;

      shadow.appendChild(style);
      shadow.appendChild(this.wrapper);
    }

    connectedCallback() {
      this.renderContent();
    }

    renderContent() {
      const soundCloudId = this.getAttribute("data-soundcloudid");
      const iframe = document.createElement("iframe");
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", "100px");
      iframe.setAttribute("src", `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundCloudId}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=false`);
      iframe.setAttribute("frameborder", 0);
      iframe.setAttribute("scrolling", 0);
      this.wrapper.append(iframe);
    }
  }

  customElements.define("soundcloud-renderer", SoundcloudRenderer);
})();
