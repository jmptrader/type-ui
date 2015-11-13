/// <reference path="./Widget.ts" />

module ui {

  export class Blockquote extends Widget {

    private _paragraph:HTMLParagraphElement;
    private _footer:HTMLElement;
    private _paragraphText:Text;
    private _footerText:Text;

    constructor(parent:Container, quote:string='',footer:string='') {
      super(parent);
      this._paragraph     = this._createParagraph();
      this._paragraphText = this._createParagraphText(this._paragraph, quote);
      this._footer        = this._createFooter();
      this._footerText    = this._createFooterText(this._footer, footer);
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('blockquote');
      return element;
    }

    protected get className() {
      return 'ui-blockquote';
    }

    get text():string {
      return this.quote;
    }

    set text(value:string) {
      this.quote = value;
    }

    get quote():string {
      return this._paragraphText.nodeValue;
    }

    set quote(value:string) {
      this._paragraphText.nodeValue = value;
    }

    get footer():string {
      return this._footerText.nodeValue;
    }

    set footer(value:string) {
      this._footerText.nodeValue = value;
    }

    protected _createParagraph() {
      var p = document.createElement('p');
      this.element.appendChild(p);
      return p;
    }

    protected _createFooter() {
      var p = document.createElement('footer');
      this.element.appendChild(p);
      return p;
    }

    protected _createParagraphText(p:HTMLParagraphElement, text:string) {
      var t = document.createTextNode(text);
      p.appendChild(t);
      return t;
    }

    protected _createFooterText(f:HTMLElement, text:string) {
      var t = document.createTextNode(text);
      f.appendChild(t);
      return t;
    }

  }

}
