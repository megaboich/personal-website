/**
 * Attributes:
 * duration - time in minutes of the song, default is 3
 * fps - framerate of scrolling per second, default is 0.05
 *
 * The distance of scrolling determined by calculating the distance between
 * start of this element and end-marker <awesome-auto-scroller-end></awesome-auto-scroller-end> or end of document
 */
export class AutoScrollerElement extends HTMLElement {
  constructor () {
    super();
  }

  connectedCallback () {
    this.renderContent();
  }

  renderContent () {
    /** @type {any} */
    let currentTimerId = -1;

    const parent = this.parentElement;
    if (!parent) {
      return;
    }

    parent.style.display = "block";
    parent.style.position = "sticky";
    parent.style.top = "30px";
    parent.style.height = "1px";
    parent.style.zIndex = "100";

    const style = document.createElement("style");
    style.textContent = `
                .autoscroller-controls {
                    position: absolute;
                    right: 12px;
                }
            `;

    this.appendChild(style);

    const playControls = document.createElement("div");
    playControls.className = "autoscroller-controls";

    const playBtn = document.createElement("button");
    playBtn.type = "button";
    playBtn.innerHTML = `
                <span class="icon is-small">
                    <i class="fas fa-scroll"></i>
                </span>
            `;
    playBtn.title = "Auto scroll";
    playBtn.className = "autoscroller-btn button is-primary is-rounded";
    function toggleScrollBtn () {
      playBtn.classList.toggle("is-primary");
      playBtn.classList.toggle("is-warning");
    }
    playBtn.addEventListener("click", () => {
      toggleScrollBtn();

      if (currentTimerId > 0) {
        clearInterval(currentTimerId);
        currentTimerId = -1;
      } else {
        const fps = parseFloat(this.getAttribute("fps") || "0.1");
        const startMarker = parent.nextElementSibling;
        if (!startMarker) {
          return;
        }
        startMarker.scrollIntoView({ behavior: "smooth" });
        const startPosition = startMarker.getBoundingClientRect().top + window.scrollY;
        const endMarker = document.getElementsByTagName("awesome-auto-scroller-end").item(0);
        const endPosition = endMarker
          ? endMarker.getBoundingClientRect().top +
            window.scrollY +
            /* some extra white space after end marker */ 100
          : document.body.scrollHeight;
        const scrollDistance = endPosition - startPosition - window.innerHeight;
        if (scrollDistance < 0) {
          // We dont need to scroll anything
          toggleScrollBtn();
          return;
        }
        // Duration should be specified in minutes
        const durationInS = parseFloat(this.getAttribute("duration") || "3") * 60;
        const durationInMs = durationInS * 1000;
        const increment = scrollDistance / (durationInS * fps);
        const startTime = new Date().getTime();
        currentTimerId = setInterval(() => {
          window.scrollBy({ top: increment, behavior: "smooth" });
          if (startTime + durationInMs < new Date().getTime()) {
            clearInterval(currentTimerId);
            currentTimerId = -1;
            toggleScrollBtn();
          }
        }, 1000 / fps);
      }
    });

    playControls.appendChild(playBtn);

    this.appendChild(playControls);

    // Hide auto-scrolling button when the song lyrics are out of view
    document.addEventListener("scroll", () => {
      const startPosition = playBtn.getBoundingClientRect().top + window.scrollY + 100;

      const endMarker = document.getElementsByTagName("awesome-auto-scroller-end").item(0);
      const endPosition = endMarker
        ? endMarker.getBoundingClientRect().top +
          window.scrollY +
          /* some extra white space after end marker */ 100
        : document.body.scrollHeight;

      if (startPosition >= endPosition) {
        playBtn.style.display = "none";
      } else {
        playBtn.style.display = "block";
      }
    });
  }
}
