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

  export interface Stat {
    min: number;
    max: number;
  }

  export class StatModel implements Stat {
    private _min: number;
    private _max: number;
    private _displays: Array<StatDisplay>;

    constructor() {
      this._min = 0;
      this._max = 100;
      this._displays = [];
    }

    get min() {
      return this._min;
    }

    set min(value) {
      this._min = value;
      if (value > this.max) {
        this.max = value;
      }
      this._refresh();
    }

    get max() {
      return this._max;
    }

    set max(value) {
      this._max = value;
      if (value < this.min) {
        this.min = value;
      }
      this._refresh();
    }

    addDisplay(display:StatDisplay) {
      this._displays.push(display);
    }

    protected _refresh() {
      this._displays.forEach((d) => d.refresh() );
    }

  }

  export class StatWrapper extends StatModel implements Stat {
    private _stat: Stat;

    constructor(stat:Stat) {
      super();
      this._stat = stat;
    }

    get min() {
      return this._stat.min;
    }

    set min(value) {
      this._stat.min = value;
      if (value > this.max) {
        this.max = value;
      }
      this._refresh();
    }

    get max() {
      return this._stat.max;
    }

    set max(value) {
      this._stat.max = value;
      if (value < this.min) {
        this.min = value;
      }
      this._refresh();
    }
  }

  export class StatDisplay extends Widget {

    private _data:  Array<number>;
    private _model: StatModel;
    private _color: string;
    private _from: number;
    private _to: number;
    private _context;
    public backgroundColor: string;
    public rulerColor: string;
    private _canvas: HTMLCanvasElement;

    private _fromTxt: Text;
    private _toTxt: Text;
    private _midTxt: Text;

    constructor(parent:Container, model:StatModel) {
      super(parent);
      this._model  = model;
      this._data   = [];
      this._color  =  '#FF0000';
      this.backgroundColor = '#FFF';
      this.rulerColor = '#000';
      this._from   =  1;
      this._to     =   99;
      this._canvas = this.createCanvas();
      this.refresh();
      this.createHorizontalRule();
      window.addEventListener('resize', this._onWindowResize.bind(this));
    }

    createHorizontalRule() {
      this._fromTxt = document.createTextNode(this.from.toString());
      this._toTxt = document.createTextNode(this.to.toString());
      this._midTxt = document.createTextNode(this.mid.toString());
      var xr = document.createElement('div');
      xr.classList.add('x-rule');
      this.element.appendChild(xr);
      var ft = document.createElement('span');
      var tt = document.createElement('span');
      var mt = document.createElement('span');
      ft.classList.add('min');
      mt.classList.add('avg');
      tt.classList.add('max');
      xr.appendChild(ft);
      xr.appendChild(tt);
      xr.appendChild(mt);
      ft.appendChild(this._fromTxt);
      mt.appendChild(this._midTxt);
      tt.appendChild(this._toTxt);
    }

    get color() {
      return this._color;
    }

    set color(value) {
      this._color = value;
      this.refresh();
    }

    get from() {
      return this._from;
    }

    set from(value) {
      this._from = value;
      if (value > this._to) {
        this._to = value;
      }
      this._midTxt.nodeValue = this.mid.toString();
      this._fromTxt.nodeValue = value.toString();
      this.refresh();
    }

    get to() {
      return this._to;
    }

    set to(value) {
      this._to = value;
      if (value < this._from) {
        this._from = value;
      }
      this._midTxt.nodeValue = this.mid.toString();
      this._toTxt.nodeValue = value.toString();
      this.refresh();
    }

    protected get mid(): number {
      return (this.to - this.from) / 2 + this.from;
    }

    get data() {
      return this._data.slice(0);
    }

    set data(value) {
      this._data = value;
      this._adjustValues();
      this.refresh();
    }

    setData(i:number, value:number, refresh:boolean=true) {
      if (i >= this.from && i <= this.to) {
        var min = this.model.min;
        var max = this.model.max;
        this._data[i - this.from] = Math.max(min, Math.min(value, max));
      }
      if (refresh) {
        this.refresh();
      }
    }

    dataAt(i:number) {
      if (i >= this.from && i <= this.to) {
        return this._data[i - this.from];
      }
      return null;
    }

    private _adjustValues() {
      this._data = this._data || [];
      var min = this.model.min;
      var max = this.model.max;
      for (var i = this.from; i <= this.to; ++i) {
        this.setData(i, this._data[i - this._from] || 0, false);
      }
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('div');
      return element;
    }

    protected createCanvas() {
      var element = document.createElement('canvas');
      this._context = element.getContext('2d');
      this.element.appendChild(element);
      element.addEventListener('click', this._onCanvasClick.bind(this))
      return element;
    }

    protected get context() {
      return this._context;
    }

    protected get className() {
      return 'ui-stat-display';
    }

    protected get canvas() {
      return this._canvas;
    }

    get model() {
      return this._model;
    }

    refresh() {
      var [w, h] = this.canvasSize;
      this.resizeCanvas(w, h);
      this.drawBackground(w, h);
      this.drawCurve(w, h);
      this.drawRuler(w, h);
    }

    get canvasSize() {
      return [this.canvasWidth, this.canvasHeight];
    }

    get canvasWidth() {
      return (this.to - this.from + 1) * 5;
    }

    get canvasHeight() {
      return this.model.max - this.model.min + 11;
    }

    drawBackground(w:number, h:number) {
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, w, h);
      this.context.fillStyle = this.color;
    }

    drawCurve(w:number, h:number) {
      for (var i = this.from; i <= this.to; ++i) {
        let size = this.dataAt(i);
        let x = (i - this.from) * 5;
        let y = h - size - 10;
        this.context.fillRect(x + 1, y, 3, size);
      }
    }

    drawRuler(w:number, h:number) {
      this.context.fillStyle = this.rulerColor;
      this.context.fillRect(1, h - 10, w - 2, 5);
      this.context.fillRect(1, h -10, 3, 10);
      this.context.fillRect(w - 4, h -10, 3, 10);
      this.context.fillRect(Math.floor(w / 2) - 1, h -10, 3, 10);
    }

    resizeCanvas(w:number, h:number) {
      this.canvas.width = w;
      this.canvas.height = h;
      var ratio = this.canvas.offsetWidth * this.ratio;
      this.canvas.style.maxHeight = `${ratio}px`;
      this.canvas.style.height = `${ratio}px`;
    }

    protected _onWindowResize() {
      this.refresh();
    }


    get ratio() {
      return 3 / 4;
    }

    protected valuesByCoord(x:number, y:number) {
      var index = this.indexByCoord(x);
      var value = this.valueByCoord(y);
      return [index, value];
    }

    protected indexByCoord(x:number) {
      return Math.floor(x * this.canvas.width / (this.canvas.offsetWidth * 5)) + this.from;
    }

    protected valueByCoord(y:number) {
      return Math.floor(this.model.min + this.model.max - y * this.canvas.height / this.canvas.offsetHeight)
    }

    protected _onCanvasClick(event:MouseEvent) {
      var [index, value] = this.valuesByCoord(event.offsetX, event.offsetY);
      var evt: any = new Event('stat-click');
      evt.index = index;
      evt.value = value;
      this.fire('stat-click', evt);
    }

  }

}
