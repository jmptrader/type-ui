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

  export class Button extends Widget {

    private _text: Text;
    private _icon: HTMLElement;

    constructor(parent:Container, text:string, iconName:string=null) {
      super(parent);
      this._icon = this.createIcon(iconName);
      this._text = this.createText(text);
    }

    protected get className() {
      return 'ui-button';
    }

    createElement() {
      var element = document.createElement('button');
      element.addEventListener('click', this._onElementClick.bind(this));
      return element;
    }

    get button() {
      return <HTMLButtonElement>this.element;
    }

    protected createText(value:string): Text {
      var text = document.createTextNode(value);
      this.element.appendChild(text);
      return text;
    }

    protected createIcon(iconName:string): HTMLElement {
      return null;
    }

    get type(): string {
      return this.button.type;
    }

    set type(value:string) {
      this.button.type = value;
    }

    get text(): string {
      return this._text.nodeValue;
    }

    get disabled() {
      return (<HTMLButtonElement>this.element).disabled;
    }

    set disabled(value:boolean) {
      (<HTMLButtonElement>this.element).disabled = value;
    }

    get enabled() {
      return !this.disabled;
    }

    set enabled(value:boolean) {
      this.disabled = !value;
    }

    set text(value:string) {
      this._text.nodeValue = value;
    }

    protected _onElementClick(event: MouseEvent) {
      this.fire('click', event);
    }

  }

}
