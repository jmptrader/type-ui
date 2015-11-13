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

  export class Container extends Widget {

    private _children: Array<Widget>;

    constructor(parent:Container=null) {
      super(parent);
      this._children = [];
    }

    addChild(child:Widget) {
      if (!this.hasChild(child)) {
        this._children.push(child);
        this.appendElement(child.element);
      }
    }

    removeChild(child:Widget) {
      let index = this.indexOf(child);
      if (index !== -1) {
        this._children.splice(index, 1);
        this.removeElement(child.element);
      }
    }

    hasChild(child:Widget): boolean {
      return this.indexOf(child) !== -1;
    }

    addChildAt(child:Widget, index:number) {
      let i = Math.min(this.length, Math.max(0, index));
      this._children.splice(i, 0, child);
    }

    indexOf(child:Widget): number {
      return this._children.indexOf(child);
    }

    get children(): Array<Widget> {
      return this._children.slice(0);
    }

    get length(): number {
      return this.children.length;
    }

    protected appendElement(element: HTMLElement) {
      this.element.appendChild(element);
    }

    protected removeElement(element: HTMLElement) {
      this.element.removeChild(element);
    }

    protected addText(text:string) {
      this.element.appendChild(document.createTextNode(text));
    }

    addGrid() {
      return new ui.Grid(this);
    }

    grid() {
      return this.addGrid();
    }

  }

}
