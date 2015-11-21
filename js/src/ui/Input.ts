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

  export interface InputValidator {
    validate(value:string): boolean;
    error(value:string): string;
  }

  export class Input extends Widget {

    private _input: HTMLInputElement;
    private _iconName: string;
    private _icon: HTMLElement;
    private _validators: Array<InputValidator>;
    private _errors: Array<string>;
    public doValidation: boolean;

    constructor(parent:Container, name:string) {
      super(parent);
      this._icon  = this.createIcon();
      this._input = this.createInput();
      this._iconName = null;
      this._setupInputEvents();
      this.name = name;
      this.classList.add('ui-cell-sm-8');
      this._validators = [];
      this._errors = [];
      this.doValidation = true;
    }

    get icon() {
      return this._iconName;
    }

    set icon(value:string) {
      if (value !== null && value.length > 0) {
        this._iconName = value;
        this._icon.className = 'fa fa-fw fa-' + value;
      } else {
        this._iconName = null;
        this._icon.className = '';
      }
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('div');
      element.classList.add(`ui-input-${this.type}-wrapper`);
      return element;
    }

    protected createInput(): HTMLInputElement {
      var element = document.createElement('input');
      element.type = this.type;
      element.classList.add(`ui-input`);
      element.classList.add(`ui-input-${this.type}`);
      this.element.appendChild(element);
      return element;
    }

    protected createIcon() {
      var i = document.createElement('i');
      this.element.appendChild(i);
      return i;
    }

    protected _onChange(event:Event) {
      this.fire('change', event);
      if (!event.defaultPrevented && this.doValidation) {
        this.validate();
      }
    }

    get validators() {
      return this._validators;
    }

    validate() {
      this._errors = [];
      let result = this.checkValidators();
      this.setValidationClass(result);
      this.setValidationErrors(this._errors);
      return result;
    }

    protected checkValidators() {
      var result = true;
      for (let v of this.validators) {
        if (!v.validate(this.value)) {
          this._errors.push(v.error(this.value));
          result = false;
        }
      }
      return result;
    }

    protected setValidationClass(ok:boolean) {
      this.removeValidationClasses();
      if (ok) {
        this.element.classList.add('ok');
      } else {
        this.element.classList.add('error');
      }
    }

    protected removeValidationClasses() {
      this.element.classList.remove('error');
      this.element.classList.remove('ok');
    }

    protected setValidationErrors(errors:Array<string>) {

    }

    get input(): HTMLInputElement {
      return <HTMLInputElement>this._input;
    }

    get type(): string {
      return null;
    }

    protected get className() {
      return 'ui-input-wrapper';
    }

    get name() {
      return this.input.name;
    }

    set name(value: string) {
      this.input.name = value;
    }

    get value() {
      return this.input.value;
    }

    set value(value: string) {
      this.input.value = value;
    }

    get placeholder() {
      return this.input.placeholder;
    }

    set placeholder(value:string) {
      this.input.placeholder = value;
    }

    get disabled() {
      return this.input.disabled;
    }

    set disabled(value:boolean) {
      this.input.disabled = value;
    }

    get enabled() {
      return !this.disabled;
    }

    set enabled(value:boolean) {
      this.disabled = !value;
    }

    get pattern() {
      return this.input.pattern;
    }

    set pattern(value:string) {
      this.input.pattern = value;
    }

    protected _setupInputEvents() {
      this.input.addEventListener('change', this._onChange.bind(this));
    }

  }

}
