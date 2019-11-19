export default function setupToastMessage(hooks = self) {
  hooks.beforeEach(function() {
    this.rootEl = document.querySelector(this.owner.rootElement);
    this.modalDivEl = document.createElement('div');
    this.modalDivEl.id = 'nucleus-toast-messages-wormhole';

    this.rootEl.appendChild(this.modalDivEl);
  });

  hooks.afterEach(function() {
    this.rootEl.removeChild(this.modalDivEl);
  });
}
