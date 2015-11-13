/// <reference path="./List.ts" />

module ui {

  export class UnorderedList extends List {

    constructor(parent:Container) {
      super(parent);
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('ul');
      return element;
    }

    protected get className() {
      return 'ui-ul';
    }

  }

}
