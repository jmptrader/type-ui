/// <reference path="./List.ts" />

module ui {

  export class OrderedList extends List {

    constructor(parent:Container) {
      super(parent);
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('ol');
      return element;
    }

    protected get className() {
      return 'ui-ol';
    }

  }

}
