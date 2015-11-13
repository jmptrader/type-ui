/// <reference path="./Widget.ts" />

module ui {

  export class HorizontalRule extends Widget {

    protected createElement(): HTMLElement {
      var element = document.createElement('hr');
      return element;
    }

    protected get className() {
      return 'ui-hr';
    }

  }

}
