export class Hider {
  constructor() {
    this.tracked = [];
  }
  init() {
    this.tracked = [...document.querySelectorAll('[id^=td_threadtitle] [src$="tick.png"]')]
      .map(item => item.parentElement.parentElement.parentElement);
  }
  hide() {
    for (const item of this.tracked) {
      item.classList.add('cf_hide_answered_hidden');
    }
  }
  reveal() {
    for (const item of this.tracked) {
      item.classList.remove('cf_hide_answered_hidden');
    }
  }
}
