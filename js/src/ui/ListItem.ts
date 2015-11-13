/// <reference path="./Container.ts" />

module ui {

  export class ListItem extends Container {

    protected createElement(): HTMLElement {
      var element = document.createElement('li');
      return element;
    }

    protected get className() {
      return 'ui-li';
    }

  }

}
