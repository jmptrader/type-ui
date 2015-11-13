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
/// <reference path="./Widget.ts" />
module ui {

  export class BaseHeader extends Widget {

    private _text: Text;

    constructor(parent:Container,text:string='') {
      super(parent);
      this.classList.add(`ui-h${this.size}`);
      this._text = this._createTextNode(text);
      this.element.appendChild(this._text);
    }

    createElement() {
      var element = document.createElement(`h${this.size}`);
      return element;
    }

    get className() {
      return 'ui-hx';
    }

    get size() {
      return 0;
    }

    protected _createTextNode(text:string): Text {
      var textInput = document.createTextNode(text);
      return textInput;
    }

    get text(): string {
      return this._text.nodeValue;
    }

    set text(value:string) {
      this._text.nodeValue = value;
    }

  }

  export class H1 extends BaseHeader { get size() { return 1; } };
  export class H2 extends BaseHeader { get size() { return 2; } };
  export class H3 extends BaseHeader { get size() { return 3; } };
  export class H4 extends BaseHeader { get size() { return 4; } };
  export class H5 extends BaseHeader { get size() { return 5; } };
  export class H6 extends BaseHeader { get size() { return 6; } };

}
