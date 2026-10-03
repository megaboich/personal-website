/**
 * Wrapper for song lyrics and chord lines.
 *
 * Attributes:
 * duration - time in minutes of the song. When set, an auto-scroll button is shown
 * fps - framerate of scrolling per second, default is 0.1
 *
 * Auto-scrolling goes from the top to the bottom of this element.
 */
export class LyricsElement extends HTMLElement {
  constructor () {
    super();
  }

  connectedCallback () {
    if (this.hasAttribute("duration") && !this.querySelector(".lyrics-autoscroller")) {
      this.renderAutoScroller();
    }
  }

  renderAutoScroller () {
    /** @type {any} */
    let scrollTimerId = -1;
    /** @type {any} */
    let countdownTimerId = -1;

    const controls = document.createElement("div");
    controls.className = "lyrics-autoscroller";

    const playBtn = document.createElement("button");
    playBtn.type = "button";
    playBtn.innerHTML = `
                <span class="icon is-small">
                    <i class="ico ico-scroll"></i>
                </span>
                <span class="lyrics-autoscroller-countdown"></span>
            `;
    playBtn.title = "Auto scroll";
    playBtn.className = "button is-primary is-rounded";
    const countdown = /** @type {HTMLElement} */ (
      playBtn.querySelector(".lyrics-autoscroller-countdown")
    );

    const stop = () => {
      clearInterval(scrollTimerId);
      clearInterval(countdownTimerId);
      scrollTimerId = -1;
      countdownTimerId = -1;
      playBtn.classList.add("is-primary");
      playBtn.classList.remove("is-warning", "is-running");
    };

    playBtn.addEventListener("click", () => {
      if (scrollTimerId > 0) {
        stop();
        return;
      }

      const fps = parseFloat(this.getAttribute("fps") || "0.1");
      this.scrollIntoView({ behavior: "smooth" });
      const rect = this.getBoundingClientRect();
      const startPosition = rect.top + window.scrollY;
      const endPosition = rect.bottom + window.scrollY + /* some extra white space */ 100;
      const scrollDistance = endPosition - startPosition - window.innerHeight;
      if (scrollDistance < 0) {
        // We dont need to scroll anything
        return;
      }
      // Duration should be specified in minutes
      const durationInS = parseFloat(this.getAttribute("duration") || "3") * 60;
      const durationInMs = durationInS * 1000;
      const increment = scrollDistance / (durationInS * fps);
      const startTime = new Date().getTime();

      const updateCountdown = () => {
        const remainingS = Math.max(
          0,
          Math.ceil((startTime + durationInMs - new Date().getTime()) / 1000)
        );
        const seconds = String(remainingS % 60).padStart(2, "0");
        countdown.textContent = `-${Math.floor(remainingS / 60)}:${seconds}`;
      };

      playBtn.classList.remove("is-primary");
      playBtn.classList.add("is-warning", "is-running");
      updateCountdown();
      countdownTimerId = setInterval(updateCountdown, 1000);

      scrollTimerId = setInterval(() => {
        window.scrollBy({ top: increment, behavior: "smooth" });
        if (startTime + durationInMs < new Date().getTime()) {
          stop();
        }
      }, 1000 / fps);
    });

    controls.appendChild(playBtn);
    this.prepend(controls);
  }
}
