/// <reference path="./Container.ts" />

module ui {

  export class Panel extends Container {

    constructor(parent: Container) {
      super(parent);
    }

    protected get className() {
      return 'ui-panel';
    }

    createElement() {
      var element = document.createElement('div');
      return element;
    }

  }

}
