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
module ui {

  export class FormGroup extends Container {

    protected createElement(): HTMLElement {
      let group = document.createElement('div');
      return group;
    }

    protected get className() {
      return 'ui-form-group';
    }

    addLabel(forInput:string, text:string) {
      let label = new Label(this, forInput, text);
      return label;
    }

    label(forInput:string, text:string) {
      return this.addLabel(forInput, text);
    }

  }

}
