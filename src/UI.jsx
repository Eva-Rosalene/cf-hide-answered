import { createElement } from "./factory";

export class UI {
  constructor() {
    this.state = false;
  }

  handleUpdate() {
    this.onUpdate && this.onUpdate(this.state);
  }

  registerLink = (element) => {
    this.link = element;
  }

  handleClick = evt => {
    evt.preventDefault();
    this.state = !this.state;
    this.handleUpdate();
    this.link.innerHTML = this.text();
  }

  text() {
    return this.state
      ? `[Показать темы с лучшими ответами (${this.count})]`
      : `[Скрыть темы с лучшими ответами (${this.count})]`;
  }

  createDOMNode() {
    return (
      <td class="vbmenu_control">
        <a ref={this.registerLink} onclick={this.handleClick} href="#">{this.text()}</a>
      </td>
    );
  }

  init(initial, count) {
    this.state = initial;
    this.count = count;
    this.handleUpdate();

    const root = document.querySelector('.vbmenu_control [href$="usercp.php"]')
      .parentElement
      .parentElement;
    const before = root.lastElementChild;

    const ui = this.createDOMNode();
    root.insertBefore(ui, before);
  }
}
