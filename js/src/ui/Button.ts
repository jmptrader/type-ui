/// <reference path="./Widget.ts" />

module ui {

  export class Button extends Widget {

    private _text: Text;
    private _icon: HTMLElement;

    constructor(parent:Container, text:string, iconName:string=null) {
      super(parent);
      this._icon = this.createIcon(iconName);
      this._text = this.createText(text);
    }

    protected get className() {
      return 'ui-button';
    }

    createElement() {
      var element = document.createElement('a');
      element.href = "#";
      element.addEventListener('click', this._onElementClick.bind(this));
      return element;
    }

    protected createText(value:string): Text {
      var text = document.createTextNode(value);
      this.element.appendChild(text);
      return text;
    }

    protected createIcon(iconName:string): HTMLElement {
      return null;
    }

    get text(): string {
      return this._text.nodeValue;
    }

    set text(value:string) {
      this._text.nodeValue = value;
    }

    protected _onElementClick(event: MouseEvent) {
      this.fire('click', event);
    }

  }

}
