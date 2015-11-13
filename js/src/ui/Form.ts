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
/// <reference path="./Label.ts" />
/// <reference path="./FormGroup.ts" />
/// <reference path="./Fieldset.ts" />

module ui {

  export class Form extends Container {

    public static Group = FormGroup;

    protected createElement(): HTMLElement {
      let form = document.createElement('form');
      form.addEventListener('submit', this._onFormSubmit.bind(this));
      return form;
    }

    get form() {
      return <HTMLFormElement>this.element;
    }

    protected get className() {
      return 'ui-form';
    }

    protected _onFormSubmit(event: Event) {
      this.fire('submit', event);
    }

    addGroup() {
      return new FormGroup(this);
    }

    group() {
      return this.addGroup();
    }

    addFieldset(legend:string='') {
      return new ui.Fieldset(this, legend);
    }

    fieldset(legend:string='') {
      return this.addFieldset(legend);
    }

  }


}
