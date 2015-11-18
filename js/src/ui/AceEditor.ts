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

declare var ace : any;

module ui {

  export class AceEditor extends Input {

    private _editor: any;
    private _editorDiv: HTMLDivElement;

    constructor(parent:Container, name:string, mode:string='ace/mode/javascript') {
      super(parent, name);
      this._editorDiv = this._createEditorDiv();
      this.parent.element.appendChild(this._editorDiv);
      this._editor = this._createEditor(this._editorDiv, this._editorDiv.id, mode);
    }

    protected _createEditorDiv(): HTMLDivElement {
      var div = document.createElement('div');
      div.id = ui.randomId();
      div.style.margin = div.style.top = div.style.bottom = div.style.left = div.style.right = '0';
      div.style.width = '100%';
      div.style.minHeight = '200px';
      div.style.height = '100%';
      return div;
    }

    protected _createEditor(container:HTMLElement, id:string, mode:string) {
      var editor = ace.edit(id);
      editor.on("change", this._onAceChange.bind(this) );
      editor.setTheme(this.defaultTheme);
      editor.session.setMode(mode);
      editor.$blockScrolling = Infinity;
      editor.setOptions({
        enableBasicAutocompletion: true
      });
      editor.setAutoScrollEditorIntoView(true);
      editor.setOption("minLines", 10);
      return editor;
    }

    protected _onAceChange(event:Event) {
      this.fire('change', event)
      if (!event.defaultPrevented) {
        this.input.value = this.value;
      }
    }

    protected get defaultTheme() {
      return "ace/theme/monokai";
    }

    get type(): string {
      return 'hidden';
    }

    protected get className() {
      return 'ui-ace-editor';
    }

    get mode():string {
      return this._editor.session.getMode();
    }

    set mode(value:string) {
      this._editor.session.setMode(value);
    }

    set theme(value:string) {
      this._editor.setTheme(value);
    }

    get theme():string {
      return this._editor.getTheme();
    }

    get value(): string {
      return this._editor.getValue();
    }

    set value(value:string) {
      this._editor.setValue(value);
      this.input.value = value;
    }

  }

}
