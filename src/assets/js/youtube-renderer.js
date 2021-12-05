(function () {
  class YoutubeRenderer extends HTMLElement {
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
        .wrapper iframe {
            margin-left: auto;
            margin-right: auto;
            display: block;
            max-width: 600px;
            width: 100%;
            height: 400px;
        }
    `;

      shadow.appendChild(style);
      shadow.appendChild(this.wrapper);
    }

    connectedCallback() {
      this.renderContent();
    }

    renderContent() {
      const youtubeId = this.getAttribute("data-youtubeid");
      const start = this.getAttribute("data-start");
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", `https://www.youtube.com/embed/${youtubeId}?start=${start}`);
      iframe.setAttribute("frameborder", 0);
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      );
      iframe.setAttribute("allowfullscreen", true);
      this.wrapper.append(iframe);
    }
  }

  customElements.define("youtube-renderer", YoutubeRenderer);
})();
