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

  export class EventManager {

    private _events: { [s: string]: Array<(Event) =>  any> };

    constructor() {
      this._events = {};
    }

    on(name: string, callback: (Event) => any ) {
      if (!this._events[name]) {
        this._events[name] = [];
      }
      this._events[name].push(callback);
    }

    fire(name: string, event: Event) {
      let events = this._events[name];
      if (events) {
        events.forEach( (i) => i(event) );
      }
    }

    off(name: string, callback: (Event) => any = null) {
      if (callback !== null && this._events[name]) {
        let i = this._events[name].indexOf(callback);
        while ( i !== -1) {
          this._events[name].splice(i, 1);
          i = this._events[name].indexOf(callback);
        }
        return;
      }
      this._events[name] = [];
    }

  }

}
