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
/// <reference path="./SizeSet.ts" />
module ui {

  class Row extends Container {

    addCell(sizes: SizeSet={md: 6}): Cell {
      var cell = new Cell(this, sizes);
      return cell;
    }

    cell(sizes: SizeSet={md: 6}): Cell {
      return this.addCell(sizes);
    }

    protected get className() {
      return 'ui-row';
    }

    createElement() {
      var element = document.createElement('div');
      return element;
    }

  }

  class Cell extends Container {

    private _sizes: SizeSet;

    constructor(parent:Container, sizes: SizeSet) {
      super(parent);
      this._sizes = sizes;
      this._setupSizes();
    }

    private _setupSizes() {
      for (var s in this._sizes) {
        let v = this._sizes[s];
        if (v) {
          this.classList.add(`ui-cell-${s}-${v}`);
        }
      }
    }

    addRow(): Row {
      var grid = new Grid(this);
      return new Row(grid);
    }

    row(): Row {
      return this.addRow();
    }

    protected get className() {
      return 'ui-cell';
    }

    createElement() {
      var element = document.createElement('div');
      return element;
    }

  }

  export class Grid extends Container {

    public static Row = Row;
    public static Cell = Cell;

    constructor(parent:Container) {
      super(parent);
    }

    addRow(): Row {
      return new Row(this);
    }

    row(): Row {
      return this.addRow();
    }

    protected get className() {
      return 'ui-grid';
    }

    createElement() {
      var element = document.createElement('div');
      return element;
    }

  }

}
