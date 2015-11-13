/// <reference path="./Widget.ts" />

module ui {

  export class Paragraph extends Widget {

    private _text: Text;

    constructor(parent:Container, text:string='') {
      super(parent);
      this._text = this._createTextNode(text);
      this.element.appendChild(this._text);
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('span');
      return element;
    }

    protected get className() {
      return 'ui-paragraph';
    }

    protected _createTextNode(text:string): Text {
      var textInput = document.createTextNode(text);
      return textInput;
    }

    get text(): string {
      return this._text.nodeValue;
    }

    set text(value:string) {
      this._text.nodeValue = value;
    }

  }

}
