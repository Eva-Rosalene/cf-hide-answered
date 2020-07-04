import { Hider } from "./Hider";
import { UI } from "./UI";
import { createElement } from "./factory";
import styleSheet from "./style.css";

const hider = new Hider();
hider.init();

const ui = new UI();
ui.onUpdate = state => {
  if (state) {
    hider.hide();
  } else {
    hider.reveal();
  }
};
ui.init();

document.head.appendChild(<style>{styleSheet}</style>);
