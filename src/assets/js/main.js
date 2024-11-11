import "./bulma-scripts.js";
import { YoutubeElement } from "./web-elements/youtube.js";
import { SoundcloudElement } from "./web-elements/soundcloud.js";

customElements.define("awesome-youtube", YoutubeElement);
customElements.define("awesome-soundcloud", SoundcloudElement);
