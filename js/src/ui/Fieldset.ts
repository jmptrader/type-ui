/// <reference path="./Container.ts" />
/// <reference path="./Form.ts" />
/// <reference path="./FormGroup.ts" />

module ui {

  export class Fieldset extends Container {

    private _legend: HTMLLegendElement;
    private _legendText: Text;

    constructor(parent:Container, legend:string='') {
      super(parent);
      this._legend = this._createLegend(legend);
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('fieldset');
      return element;
    }

    protected get className() {
      return 'ui-fieldset';
    }

    protected _createLegend(legend:string) {
      var l = document.createElement('legend');
      this._legendText = document.createTextNode(legend);
      l.appendChild(this._legendText);
      this.element.appendChild(l);
      return l;
    }

    get legend():string {
      return this._legendText.nodeValue;
    }

    set legend(value:string) {
      this._legendText.nodeValue = value;
    }

    addGroup() {
      return new FormGroup(this);
    }

    group() {
      return this.addGroup();
    }

  }

}
