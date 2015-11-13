/// <reference path="./Widget.ts" />
module ui {

  export class Input extends Widget {

    protected createElement(): HTMLElement {
      var element = document.createElement('input');
      element.type = this.type;
      return element;
    }

    get input(): HTMLInputElement {
      return <HTMLInputElement>this.element;
    }

    get type(): string {
      return null;
    }

    protected get className() {
      return 'ui-input';
    }

    get value() {
      return this.input.value;
    }

    set value(value: string) {
      this.input.value = value;
    }

  }

}
