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

  export class Canvas extends Widget {

    get width() {
      return (<HTMLCanvasElement>this.element).width;
    }

    set width(value:number) {
      (<HTMLCanvasElement>this.element).width = value;
    }

    get height() {
      return (<HTMLCanvasElement>this.element).height;
    }

    set height(value:number) {
      (<HTMLCanvasElement>this.element).height = value;
    }

    resize(width:number, height:number) {
      this.width = width;
      this.height = height;
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('canvas');
      return element;
    }

    protected get className() {
      return 'ui-canvas';
    }

    getContext(type:string) {
      return (<HTMLCanvasElement>this.element).getContext(type);
    }

  }

}
