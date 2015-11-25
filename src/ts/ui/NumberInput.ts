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
module ui {

  export class NumberInput extends Input {
    get type(): string|string {
      return 'number';
    }

    get max() {
      return Number(this.input.max|| 0);
    }

    set max(value:number|string) {
      this.input.max = value.toString();
    }

    get min() {
      return Number(this.input.min|| 0);
    }

    set min(value:number|string) {
      this.input.min = value.toString();
    }

    get step():number|string {
      return Number(this.input.step || 0);
    }

    set step(value:number|string) {
      this.input.step = value.toString();
    }

  }

}
