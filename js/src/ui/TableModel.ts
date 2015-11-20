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

  export enum TableOrder {
    DEFAULT,
    INVERSE,
  }

  export interface TableModeField<T> {
    name: string;
    sort(a:T, b:T): number;
    format(value:T): HTMLElement;
    header(): HTMLElement;
  }

  export class TableModel<T> {

    private _data: Array<T>;
    private _order: string;
    private _orderMode: TableOrder;
    private _cells: Array<Array<HTMLElement>>;
    private _tables: Array<Table<T>>;
    private _fields: Array<TableModeField<T>>;

    constructor(data:Array<any>) {
      this._data = data;
      this._order = null;
      this._orderMode = TableOrder.DEFAULT;
      this._cells = null;
      this._tables = [];
      this._fields = [];
    }

    get fields(): Array<TableModeField<T>> {
      return this._fields.slice(0);
    }

    set fields(value: Array<TableModeField<T>>) {
      this._fields = value;
      this._refresh();
    }

    get fieldsByName() {
      var fields = this.fields;
      var result: { [s:string] : TableModeField<T> } = {};
      fields.forEach( (f) => result[f.name] = f );
      return result;
    }

    sortBy(key:string, dir:TableOrder=TableOrder.DEFAULT) {
      let field = this.fields[key];
      if (!field) {
        return;
      }
      this._order = key;
      this._orderMode = dir;
      this._cells = null;
    }

    get data() {
      return this._data.slice(0);
    }

    set data(data:Array<any>) {
      this._data = data;
      this._refresh();
    }

    protected _refresh() {
      let fields = this.fields;
      if (this._order) {
        var fn = this.fieldsByName;
        var order = this._orderMode == TableOrder.DEFAULT ? 1 : -1;
        this._data.sort( (a, b) => fn[this._order].sort(a, b) * order );
      }
      this._cells = this._data.map( (row) => this._processData(fields, row) );
      this._tables.forEach((i) => i.refresh() );
    }

    protected _processData(fields: Array<TableModeField<T>>, row:T): Array<HTMLElement> {
      return fields.map((field) => field.format(row) );
    }

    get headers() {
      return this.fields.map( (f) => f.header() );
    }

    get cells() {
      if (!this._cells) {
        this._refresh();
      }
      return this._cells;
    }

    addTable(table: Table<T>) {
      this._tables.push(table);
    }

  }

}
