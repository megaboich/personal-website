import { ChordElement } from "./web-elements/chord.js";
import { MusicScoreElement } from "./web-elements/music-score.js";
import { AutoScrollerElement } from "./web-elements/auto-scroller.js";

customElements.define("awesome-chord", ChordElement);
customElements.define("awesome-music-score", MusicScoreElement);
customElements.define("awesome-auto-scroller", AutoScrollerElement);
