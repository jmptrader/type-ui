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
/// <reference path="./HandleSubMenu.ts"/>
/// <reference path="./MenuItem.ts"/>

module ui {

  export class Table<T> extends Widget {

    private _model: TableModel<T>;
    private _head: HTMLTableSectionElement;
    private _body: HTMLTableSectionElement;
    private _lastSortIndex: number;
    private _lastSortMode: TableOrder;
    private _sortButtons: Array<HTMLElement>;

    constructor(parent:Container, model:TableModel<T>) {
      super(parent);
      this._sortButtons = [];
      this._model = model;
      model.addTable(this);
      this._head = this._createHead();
      this._body = this._createBody();
      this.refresh();
      this._lastSortIndex = null;
      this._lastSortMode = null;
    }

    get model() {
      return this._model;
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('table');
      return element;
    }

    protected get className() {
      return 'ui-table';
    }

    protected _createHead() {
      var e = document.createElement('thead');
      this.element.appendChild(e);
      return e;
    }

    protected _createBody() {
      var e = document.createElement('tbody');
      this.element.appendChild(e);
      return e;
    }

    refresh() {
      var head = this._model.headers;
      var cells = this._model.cells;
      this._refreshHead(head);
      this._refreshBody(cells);
    }

    protected _refreshHead(head:Array<HTMLElement>) {
      this._clearElement(this._head);
      this._sortButtons = [];
      var row = this._generateRow(head, -1, 'th');
      this._head.appendChild(row);
    }

    protected _refreshBody(cells:Array<Array<HTMLElement>>) {
      this._clearElement(this._body);
      cells.forEach( (i, index) => {
        let row = this._generateRow(i, index);
        row.onclick = this._onRowClickGenerator(row, index);
        this._body.appendChild(row);
      } );
    }

    protected _onRowClickGenerator(row:HTMLTableRowElement, index:number) {
      return (event:any) => {
        let e:any = new Event('row-click');
        e.rowElement = row;
        e.index = index;
        e.data = this.model.data[index];
        e.original = event;
        this.fire('row-click', e);
      }
    }

    protected _onCellClickGenerator(rowIndex:number, index:number, td:HTMLElement) {
      return (event:Event) => {
        let e:any = new Event('cell-click');
        e.rowIndex = rowIndex;
        e.index = index;
        e.data = this.model.data[rowIndex];
        e.field = this.model.fields[index];
        this.fire('cell-click', e);
      }
    }

    protected _clearElement(e:HTMLTableSectionElement) {
      while (e.firstChild) {
        e.removeChild(e.firstChild);
      }
    }

    protected _generateRow(row:Array<HTMLElement>, rowIndex:number, type:string='td') {
      var tr = document.createElement('tr');
      row.forEach( (i, index) => {
        var td = document.createElement(type);
        td.appendChild(i);
        if (type == 'th') {
          if (this._model.canSort(index)) {
            let sort = document.createElement('div');
            sort.classList.add('fa');
            sort.classList.add('fa-sort');
            td.appendChild(sort);
            sort.addEventListener('click', () => this._sortColumn(index) )
            this._sortButtons.push(sort);
          } else {
            this._sortButtons.push(null);
          }

        } else {
          td.addEventListener('click', this._onCellClickGenerator(rowIndex, index, td))
        }
        tr.appendChild(td);
      });
      return tr;
    }

    sortBy(field:string, order:TableOrder=TableOrder.DEFAULT) {
      this._model.sortBy(field, order);
      this.refresh();
    }

    sortByIndex(index:number, order:TableOrder=TableOrder.DEFAULT) {
      this._model.sortByIndex(index, order);
      this.refresh();
    }

    protected _sortColumn(index:number) {
      var evt:any = new Event('sort');
      let  dir = this._inverseDirection();
      evt.direction = dir;
      evt.index = index;
      this.fire('sort', evt);
      if (evt.defaultPrevented) {
        return;
      }
      this._lastSortIndex = dir;
      this.sortByIndex(index, dir);
      this._refreshSortButtons(index, dir);
    }

    protected _inverseDirection() {
      return this._lastSortIndex === TableOrder.INVERSE ? TableOrder.DEFAULT : TableOrder.INVERSE;
    }

    protected _refreshSortButtons(index:number, order:TableOrder) {
      this._sortButtons.forEach( (i) => {
        if (i) {
          i.classList.remove('fa-sort-asc');
          i.classList.remove('fa-sort-desc');
          i.classList.add('fa-sort');
        }
      });
      var btn = this._sortButtons[index];
      if (!btn) {
        return;
      }
      btn.classList.remove('fa-sort');
      btn.classList.add(order === TableOrder.DEFAULT ? 'fa-sort-desc': 'fa-sort-asc');
    }

  }

}
