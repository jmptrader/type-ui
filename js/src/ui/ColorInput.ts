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
/// <reference path="./Input.ts" />

declare function jsColorPicker(item:any, opts:any): any;

module ui {

  export class ColorInput extends Input {

    private _btn: HTMLElement;

    constructor(parent:Container, name:string) {
      super(parent, name);
      this._btn = this._createButton();
      jsColorPicker(this.input, {
              customBG: '#222',
              readOnly: true,
              // patch: false,
              init: function(elm, colors) { // colors is a different instance (not connected to colorPicker)
                elm.style.backgroundColor = elm.value;
                elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
              }
      })
    }

    get type(): string {
      return 'color';
    }

    protected _createButton() {
      var btn = document.createElement('span');
      btn.classList.add('btn');
      btn.appendChild(document.createTextNode('<>'));
      this.element.appendChild(btn);
      return btn;
    }

    protected createInput(): HTMLInputElement {
      var element = document.createElement('input');
      element.type = 'text';
      element.classList.add(`ui-input`);
      element.classList.add(`ui-input-${this.type}`);
      this.element.appendChild(element);
      return element;
    }

  }

}
