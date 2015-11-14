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
module ui {

  class FormDummy extends Container {

    createElement() {
      return document.createElement('div');
    }

    get className() {
      return 'ui-cell-sm-4';
    }

  }

  class FormButtonGroup extends Container {

    createElement() {
      return document.createElement('div');
    }

    get className() {
      return 'ui-cell-sm-8';
    }

  }

  export class InputContainer extends Container {
    addLabel(forInput:string, text:string) {
      let label = new Label(this, forInput, text);
      return label;
    }

    label(forInput:string, text:string) {
      return this.addLabel(forInput, text);
    }

    addInput(name:string, type:string='text') {
      switch (type) {
        case 'date':   return new DateInput(this, name);
        case 'color':  return new ColorInput(this, name);
        case 'number': return new NumberInput(this, name);
        case 'text':   return new TextInput(this, name);
        default:       return new TextInput(this, name);
      }
    }

    input(name:string, type:string='text') {
      return this.addInput(name, type);
    }

    addPair(name:string, label:string, type:string='text') {
      this.addLabel(name, label);
      return this.addInput(name, type);
    }

    pair(name:string, label:string, type:string='text') {
      return this.addPair(name, label, type);
    }

    text(name:string, label:string) {
      return this.addPair(name, label, 'text');
    }

    number(name:string, label:string) {
      return this.addPair(name, label, 'number');
    }

    date(name:string, label:string) {
      return this.addPair(name, label, 'date');
    }

    color(name:string, label:string) {
      return this.addPair(name, label, 'color');
    }

    submit(submit:string,reset:string=null) {
      var d = new FormDummy(this);
      var g = new FormButtonGroup(this);
      var btn = new ui.Button(g, submit);
      btn.type = 'submit';
      if (reset !== null) {
        let rst = new ui.Button(g, reset);
        rst.type = 'reset';
      }
      return btn;
    }

  }
}
