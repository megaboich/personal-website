import { ChordElement } from "./web-elements/chord.js";
import { MusicScoreElement } from "./web-elements/music-score.js";
import { LyricsElement } from "./web-elements/lyrics.js";

customElements.define("awesome-chord", ChordElement);
customElements.define("awesome-music-score", MusicScoreElement);
customElements.define("awesome-lyrics", LyricsElement);
