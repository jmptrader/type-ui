/// <reference path="./Container.ts" />

module ui {

  export class Application extends Container {

    constructor() {
      super(null);
      this.create();
    }

    protected createElement(): HTMLElement {
      return document.createElement('div');
    }

    protected get className(): string {
      return 'ui-app';
    }

    protected create() {

    }

  }

}
