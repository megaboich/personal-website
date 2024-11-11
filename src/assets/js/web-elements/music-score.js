import * as alphaTab from "@coderline/alphatab";

/**
 * Web Component for rendering music score using AlphaTab library
 * AlphaTab library documentation: https://alphatab.net
 */
export class MusicScoreElement extends HTMLElement {
  constructor () {
    super();
  }

  connectedCallback () {
    this.renderContent();
  }

  renderContent () {
    this.wrapper = document.createElement("div");
    this.wrapper.setAttribute("class", "wrapper");

    const style = document.createElement("style");
    style.textContent = `
      .wrapper {
        display: block;
        margin-top: 16px;
        margin-left:-32px;
        margin-right:-32px;
      }

      .play-controls {
        position: sticky;
        top: 20px;
        z-index: 100;
        height: 0px;
      }

      .play-btn {
        margin-top: 36px;
      }
      .play-btn.is-pause .fa-pause {
        display:none;
      }
      .play-btn.is-play .fa-play {
        display:none;
      }

      .at-cursor-bar {
        background: rgba(255, 242, 0, 0.25);
      }

      .at-cursor-beat {
        background: rgba(64, 64, 255, 0.75);
        width: 3px;
      }
  `;

    this.appendChild(style);

    const playControls = document.createElement("div");
    playControls.className = "play-controls";

    const playBtn = document.createElement("button");
    playBtn.type = "button";
    playBtn.innerHTML = `
        <span class="icon is-small">
          <i class="fas fa-play"></i>
          <i class="fas fa-pause"></i>
        </span>`;
    playBtn.className = "play-btn is-pause button is-primary is-rounded";
    playControls.appendChild(playBtn);

    this.appendChild(playControls);

    this.appendChild(this.wrapper);

    const tabsUrl = this.getAttribute("data-src");

    const api = new alphaTab.AlphaTabApi(this.wrapper, {
      file: tabsUrl,
      player: {
        enablePlayer: true,
        soundFont: "/assets/soundfont/microsoft_gm.sf2"
      }
    });

    playBtn.addEventListener("click", () => {
      api.playPause();
    });

    api.playerStateChanged.on(args => {
      //0 - Paused, 1 - Playing
      const isPause = args.state === 0;
      playBtn.classList.toggle("is-pause", isPause);
      playBtn.classList.toggle("is-play", !isPause);
    });
  }
}