import { Hider } from "./Hider";
import { UI } from "./UI";
import { createElement } from "./factory";
import styleSheet from "./style.css";

function getInitialState() {
  const savedState = localStorage.getItem('cf_hide_answered');
  if (!savedState) {
    return false;
  }
  try {
    return !!JSON.parse(savedState);
  } catch (error) {
    return false;
  }
}

const hider = new Hider();
hider.init();

const ui = new UI();
ui.onUpdate = state => {
  localStorage.setItem('cf_hide_answered', JSON.stringify(state));
  if (state) {
    hider.hide();
  } else {
    hider.reveal();
  }
};

ui.init(getInitialState());
document.head.appendChild(<style>{styleSheet}</style>);
