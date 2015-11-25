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
/// <reference path="./FontAwesomeWidget.ts" />

module ui {

  export enum FontAwesomeStackOrder {
    NORMAL,
    INVERSE
  }

  export class FontAwesomeStack extends FontAwesomeWidget {

    private _lower: FontAwesomeIcon;
    private _upper: FontAwesomeIcon;

    constructor(parent:Container,lower:string,upper:string,order:FontAwesomeStackOrder=FontAwesomeStackOrder.NORMAL) {
      super(parent);
      var [o1, o2] = order == FontAwesomeStackOrder.NORMAL ? ['1x', '2x'] : ['2x', '1x'];
      this._lower = new FontAwesomeIcon(this, lower);
      this._lower.classList.add(`fa-stack-${o1}`);
      this._upper = new FontAwesomeIcon(this, upper);
      this._upper.classList.add(`fa-stack-${o2}`);
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('span');
      return element;
    }

    protected get className() {
      return 'fa-stack';
    }

    get lower() {
      return this._lower;
    }

    get upper() {
      return this._upper;
    }

  }

}
