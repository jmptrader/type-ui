/*
 * Copyright 2015 Ramiro Rojo
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
