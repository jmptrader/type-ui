/// <reference path="./Form.ts" />

module ui {

  export class Label extends Widget {

    constructor(parent:Container, forInput:string, text:string) {
      super(parent);
      this.text = text;
      this.htmlFor = forInput;
    }

    get label() {
      return <HTMLLabelElement>this.element;
    }

    protected createElement(): HTMLElement {
      let label = document.createElement('label');
      return label;
    }

    protected get className() {
      return 'ui-label';
    }

    get text() {
      return this.label.textContent;
    }

    set text(value: string) {
      this.label.textContent  = value;
    }

    get htmlFor() {
      return this.label.htmlFor;
    }

    set htmlFor(value: string) {
      this.label.htmlFor = value;
    }

  }

}
