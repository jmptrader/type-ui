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
var ui;
(function (ui) {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    ;
    function randomId() {
        var id = (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        if (document.getElementById(id)) {
            return randomId();
        }
        return id;
    }
    ui.randomId = randomId;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var EventManager = (function () {
        function EventManager() {
            this._events = {};
        }
        EventManager.prototype.on = function (name, callback) {
            if (!this._events[name]) {
                this._events[name] = [];
            }
            this._events[name].push(callback);
        };
        EventManager.prototype.fire = function (name, event) {
            var events = this._events[name];
            if (events) {
                events.forEach(function (i) { return i(event); });
            }
        };
        EventManager.prototype.off = function (name, callback) {
            if (callback === void 0) { callback = null; }
            if (callback !== null && this._events[name]) {
                var i = this._events[name].indexOf(callback);
                while (i !== -1) {
                    this._events[name].splice(i, 1);
                    i = this._events[name].indexOf(callback);
                }
                return;
            }
            this._events[name] = [];
        };
        return EventManager;
    })();
    ui.EventManager = EventManager;
})(ui || (ui = {}));
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
/// <reference path="./EventManager.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var Widget = (function (_super) {
        __extends(Widget, _super);
        function Widget(parent) {
            if (parent === void 0) { parent = null; }
            _super.call(this);
            this._element = this.createElement();
            this._parent = parent;
            this.addElementParent();
            this.classList.add('ui');
            this.classList.add(this.className);
            this._setupCommonEvents();
        }
        Object.defineProperty(Widget.prototype, "id", {
            get: function () {
                return this.element.id;
            },
            set: function (value) {
                this.element.id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Widget.prototype.createElement = function () {
            return null;
        };
        Object.defineProperty(Widget.prototype, "className", {
            get: function () {
                return '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        Widget.prototype.addElementParent = function () {
            if (this._parent) {
                this._parent.addChild(this);
            }
            else {
                document.getElementById('app').appendChild(this.element);
            }
        };
        Widget.prototype.removeElementParent = function () {
            document.getElementById('app').removeChild(this.element);
        };
        Object.defineProperty(Widget.prototype, "classList", {
            get: function () {
                if (!this.element) {
                    return null;
                }
                return this.element.classList;
            },
            set: function (value) {
                if (!this.element) {
                    return;
                }
                this.element.classList = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "style", {
            get: function () {
                if (!this.element) {
                    return null;
                }
                return this.element.style;
            },
            set: function (value) {
                if (!this.element) {
                    return;
                }
                this.element.style = value;
            },
            enumerable: true,
            configurable: true
        });
        Widget.prototype._setupCommonEvents = function () {
            this.element.addEventListener('focus', this._onFocus.bind(this));
            this.element.addEventListener('blur', this._onBlur.bind(this));
            this.element.addEventListener('keydown', this._onKeydown.bind(this));
            this.element.addEventListener('keyup', this._onKeyup.bind(this));
            this.element.addEventListener('click', this._onClick.bind(this));
        };
        Widget.prototype._onFocus = function (event) {
            this.fire('focus', event);
        };
        Widget.prototype._onBlur = function (event) {
            this.fire('blur', event);
        };
        Widget.prototype._onKeydown = function (event) {
            this.fire('keydown', event);
        };
        Widget.prototype._onKeyup = function (event) {
            this.fire('keyup', event);
        };
        Widget.prototype._onClick = function (event) {
            this.fire('click', event);
        };
        Object.defineProperty(Widget.prototype, "tooltip", {
            get: function () {
                return this.element.getAttribute('data-tooltip');
            },
            set: function (value) {
                this.element.setAttribute('data-tooltip', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "tooltipPosition", {
            get: function () {
                if (this.classList.contains('ui-tooltip-top')) {
                    return 'top';
                }
                if (this.classList.contains('ui-tooltip-left')) {
                    return 'left';
                }
                if (this.classList.contains('ui-tooltip-right')) {
                    return 'right';
                }
                if (this.classList.contains('ui-tooltip-bottom')) {
                    return 'bottom';
                }
                return null;
            },
            set: function (pos) {
                if (['top', 'left', 'right', 'bottom'].indexOf(pos) !== -1) {
                    this.classList.remove('ui-tooltip-top');
                    this.classList.remove('ui-tooltip-left');
                    this.classList.remove('ui-tooltip-right');
                    this.classList.remove('ui-tooltip-bottom');
                    this.classList.add('ui-tooltip-' + pos);
                }
            },
            enumerable: true,
            configurable: true
        });
        return Widget;
    })(ui.EventManager);
    ui.Widget = Widget;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Input = (function (_super) {
        __extends(Input, _super);
        function Input(parent, name) {
            _super.call(this, parent);
            this._icon = this.createIcon();
            this._input = this.createInput();
            this._rightSpan = this.createRightSpan();
            this._rightText = this.createRightText();
            this._iconName = null;
            this._setupInputEvents();
            this.name = name;
            this.classList.add('ui-cell-sm-8');
            this._validators = [];
            this._errors = [];
            this.doValidation = true;
        }
        Object.defineProperty(Input.prototype, "icon", {
            get: function () {
                return this._iconName;
            },
            set: function (value) {
                if (value !== null && value.length > 0) {
                    this._iconName = value;
                    this._icon.className = 'fa fa-fw fa-' + value;
                }
                else {
                    this._iconName = null;
                    this._icon.className = '';
                }
            },
            enumerable: true,
            configurable: true
        });
        Input.prototype.createRightSpan = function () {
            var e = document.createElement('span');
            e.classList.add('right');
            this.element.appendChild(e);
            return e;
        };
        Input.prototype.createRightText = function () {
            var e = document.createTextNode('');
            this._rightSpan.appendChild(e);
            return e;
        };
        Input.prototype.createElement = function () {
            var element = document.createElement('div');
            element.classList.add("ui-input-" + this.type + "-wrapper");
            return element;
        };
        Input.prototype.createInput = function () {
            var element = document.createElement('input');
            element.type = this.type;
            element.classList.add("ui-input");
            element.classList.add("ui-input-" + this.type);
            this.element.appendChild(element);
            return element;
        };
        Input.prototype.createIcon = function () {
            var i = document.createElement('i');
            this.element.appendChild(i);
            return i;
        };
        Input.prototype._onChange = function (event) {
            this.fire('change', event);
            if (!event.defaultPrevented && this.doValidation) {
                this.validate();
            }
        };
        Object.defineProperty(Input.prototype, "validators", {
            get: function () {
                return this._validators;
            },
            enumerable: true,
            configurable: true
        });
        Input.prototype.validate = function () {
            this._errors = [];
            var result = this.checkValidators();
            this.setValidationClass(result);
            this.setValidationErrors(this._errors);
            return result;
        };
        Input.prototype.checkValidators = function () {
            var result = true;
            for (var _i = 0, _a = this.validators; _i < _a.length; _i++) {
                var v = _a[_i];
                if (!v.validate(this.value)) {
                    this._errors.push(v.error(this.value));
                    result = false;
                }
            }
            return result;
        };
        Input.prototype.setValidationClass = function (ok) {
            this.removeValidationClasses();
            if (ok) {
                this.element.classList.add('ok');
            }
            else {
                this.element.classList.add('error');
            }
        };
        Input.prototype.removeValidationClasses = function () {
            this.element.classList.remove('error');
            this.element.classList.remove('ok');
        };
        Input.prototype.setValidationErrors = function (errors) {
        };
        Object.defineProperty(Input.prototype, "input", {
            get: function () {
                return this._input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "type", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "rightText", {
            get: function () {
                return this._rightText.nodeValue;
            },
            set: function (value) {
                this._rightText.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "className", {
            get: function () {
                return 'ui-input-wrapper';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "name", {
            get: function () {
                return this.input.name;
            },
            set: function (value) {
                this.input.name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "value", {
            get: function () {
                return this.input.value;
            },
            set: function (value) {
                this.input.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "placeholder", {
            get: function () {
                return this.input.placeholder;
            },
            set: function (value) {
                this.input.placeholder = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "disabled", {
            get: function () {
                return this.input.disabled;
            },
            set: function (value) {
                this.input.disabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "enabled", {
            get: function () {
                return !this.disabled;
            },
            set: function (value) {
                this.disabled = !value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "pattern", {
            get: function () {
                return this.input.pattern;
            },
            set: function (value) {
                this.input.pattern = value;
            },
            enumerable: true,
            configurable: true
        });
        Input.prototype._setupInputEvents = function () {
            this.input.addEventListener('change', this._onChange.bind(this));
        };
        return Input;
    })(ui.Widget);
    ui.Input = Input;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var AceEditor = (function (_super) {
        __extends(AceEditor, _super);
        function AceEditor(parent, name, mode) {
            if (mode === void 0) { mode = 'ace/mode/javascript'; }
            _super.call(this, parent, name);
            this._editorDiv = this._createEditorDiv();
            this.parent.element.appendChild(this._editorDiv);
            this._editor = this._createEditor(this._editorDiv, this._editorDiv.id, mode);
            this.tabSize = 2;
            this.softTabs = true;
        }
        Object.defineProperty(AceEditor.prototype, "tabSize", {
            get: function () {
                return this._editor.session.getTabSize();
            },
            set: function (value) {
                this._editor.session.setTabSize(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditor.prototype, "softTabs", {
            get: function () {
                return this._editor.session.getUseSoftTabs();
            },
            set: function (value) {
                this._editor.session.setUseSoftTabs(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditor.prototype, "wordWrapping", {
            get: function () {
                return this._editor.session.getUseWrapMode();
            },
            set: function (value) {
                this._editor.session.setUseWrapMode(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditor.prototype, "highlightActiveLine", {
            get: function () {
                return this._editor.getHighlightActiveLine();
            },
            set: function (value) {
                this._editor.setHighlightActiveLine(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditor.prototype, "readOnly", {
            get: function () {
                return this._editor.getReadOnly();
            },
            set: function (value) {
                this._editor.setReadOnly(value);
            },
            enumerable: true,
            configurable: true
        });
        AceEditor.prototype.find = function (needle, options) {
            this._editor.find(needle, options);
        };
        AceEditor.prototype.findNext = function () {
            this._editor.findNext();
        };
        AceEditor.prototype.findPrevious = function () {
            this._editor.findPrevious();
        };
        AceEditor.prototype.replace = function (value) {
            this._editor.replace(value);
        };
        AceEditor.prototype.replaceAll = function (value) {
            this._editor.replaceAll(value);
        };
        AceEditor.prototype.addCommand = function (command) {
            this._editor.commands.addCommand(command);
        };
        AceEditor.prototype._createEditorDiv = function () {
            var div = document.createElement('div');
            div.id = ui.randomId();
            div.style.margin = div.style.top = div.style.bottom = div.style.left = div.style.right = '0';
            div.style.width = '100%';
            div.style.minHeight = '200px';
            div.style.height = '100%';
            return div;
        };
        AceEditor.prototype._createEditor = function (container, id, mode) {
            var editor = ace.edit(id);
            editor.on("change", this._onAceChange.bind(this));
            editor.setTheme(this.defaultTheme);
            editor.session.setMode(mode);
            editor.$blockScrolling = Infinity;
            editor.setOptions({
                enableBasicAutocompletion: true
            });
            editor.setAutoScrollEditorIntoView(true);
            editor.setOption("minLines", 10);
            return editor;
        };
        AceEditor.prototype._onAceChange = function (event) {
            this.fire('change', event);
            if (!event.defaultPrevented) {
                this.input.value = this.value;
            }
        };
        Object.defineProperty(AceEditor.prototype, "defaultTheme", {
            get: function () {
                return "ace/theme/chrome";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditor.prototype, "type", {
            get: function () {
                return 'hidden';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditor.prototype, "className", {
            get: function () {
                return 'ui-ace-editor';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditor.prototype, "mode", {
            get: function () {
                return this._editor.session.getMode();
            },
            set: function (value) {
                this._editor.session.setMode(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditor.prototype, "theme", {
            get: function () {
                return this._editor.getTheme();
            },
            set: function (value) {
                this._editor.setTheme(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditor.prototype, "value", {
            get: function () {
                return this._editor.getValue();
            },
            set: function (value) {
                this._editor.setValue(value);
                this.input.value = value;
            },
            enumerable: true,
            configurable: true
        });
        return AceEditor;
    })(ui.Input);
    ui.AceEditor = AceEditor;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Container = (function (_super) {
        __extends(Container, _super);
        function Container(parent) {
            if (parent === void 0) { parent = null; }
            _super.call(this, parent);
            this._children = [];
        }
        Container.prototype.addChild = function (child) {
            if (!this.hasChild(child)) {
                this._children.push(child);
                this.appendElement(child.element);
            }
        };
        Container.prototype.removeChild = function (child) {
            var index = this.indexOf(child);
            if (index !== -1) {
                this._children.splice(index, 1);
                this.removeElement(child.element);
            }
        };
        Container.prototype.hasChild = function (child) {
            return this.indexOf(child) !== -1;
        };
        Container.prototype.addChildAt = function (child, index) {
            var i = Math.min(this.length, Math.max(0, index));
            this._children.splice(i, 0, child);
        };
        Container.prototype.indexOf = function (child) {
            return this._children.indexOf(child);
        };
        Object.defineProperty(Container.prototype, "children", {
            get: function () {
                return this._children.slice(0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "length", {
            get: function () {
                return this.children.length;
            },
            enumerable: true,
            configurable: true
        });
        Container.prototype.appendElement = function (element) {
            this.element.appendChild(element);
        };
        Container.prototype.removeElement = function (element) {
            this.element.removeChild(element);
        };
        Container.prototype.addText = function (text) {
            this.element.appendChild(document.createTextNode(text));
        };
        Container.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        Object.defineProperty(Container.prototype, "className", {
            get: function () {
                return 'ui-container';
            },
            enumerable: true,
            configurable: true
        });
        Container.prototype.addGrid = function () {
            return new ui.Grid(this);
        };
        Container.prototype.grid = function () {
            return this.addGrid();
        };
        return Container;
    })(ui.Widget);
    ui.Container = Container;
})(ui || (ui = {}));
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
/// <reference path="./Container.ts" />
var ui;
(function (ui) {
    var Application = (function (_super) {
        __extends(Application, _super);
        function Application() {
            _super.call(this, null);
            this.create();
        }
        Application.prototype.createElement = function () {
            return document.createElement('div');
        };
        Object.defineProperty(Application.prototype, "className", {
            get: function () {
                return 'ui-app';
            },
            enumerable: true,
            configurable: true
        });
        Application.prototype.create = function () {
        };
        return Application;
    })(ui.Container);
    ui.Application = Application;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var BaseHeader = (function (_super) {
        __extends(BaseHeader, _super);
        function BaseHeader(parent, text) {
            if (text === void 0) { text = ''; }
            _super.call(this, parent);
            this.classList.add("ui-h" + this.size);
            this._text = this._createTextNode(text);
            this.element.appendChild(this._text);
        }
        BaseHeader.prototype.createElement = function () {
            var element = document.createElement("h" + this.size);
            return element;
        };
        Object.defineProperty(BaseHeader.prototype, "className", {
            get: function () {
                return 'ui-hx';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseHeader.prototype, "size", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        BaseHeader.prototype._createTextNode = function (text) {
            var textInput = document.createTextNode(text);
            return textInput;
        };
        Object.defineProperty(BaseHeader.prototype, "text", {
            get: function () {
                return this._text.nodeValue;
            },
            set: function (value) {
                this._text.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        return BaseHeader;
    })(ui.Widget);
    ui.BaseHeader = BaseHeader;
    var H1 = (function (_super) {
        __extends(H1, _super);
        function H1() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(H1.prototype, "size", {
            get: function () { return 1; },
            enumerable: true,
            configurable: true
        });
        return H1;
    })(BaseHeader);
    ui.H1 = H1;
    ;
    var H2 = (function (_super) {
        __extends(H2, _super);
        function H2() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(H2.prototype, "size", {
            get: function () { return 2; },
            enumerable: true,
            configurable: true
        });
        return H2;
    })(BaseHeader);
    ui.H2 = H2;
    ;
    var H3 = (function (_super) {
        __extends(H3, _super);
        function H3() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(H3.prototype, "size", {
            get: function () { return 3; },
            enumerable: true,
            configurable: true
        });
        return H3;
    })(BaseHeader);
    ui.H3 = H3;
    ;
    var H4 = (function (_super) {
        __extends(H4, _super);
        function H4() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(H4.prototype, "size", {
            get: function () { return 4; },
            enumerable: true,
            configurable: true
        });
        return H4;
    })(BaseHeader);
    ui.H4 = H4;
    ;
    var H5 = (function (_super) {
        __extends(H5, _super);
        function H5() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(H5.prototype, "size", {
            get: function () { return 5; },
            enumerable: true,
            configurable: true
        });
        return H5;
    })(BaseHeader);
    ui.H5 = H5;
    ;
    var H6 = (function (_super) {
        __extends(H6, _super);
        function H6() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(H6.prototype, "size", {
            get: function () { return 6; },
            enumerable: true,
            configurable: true
        });
        return H6;
    })(BaseHeader);
    ui.H6 = H6;
    ;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Blockquote = (function (_super) {
        __extends(Blockquote, _super);
        function Blockquote(parent, quote, footer) {
            if (quote === void 0) { quote = ''; }
            if (footer === void 0) { footer = ''; }
            _super.call(this, parent);
            this._paragraph = this._createParagraph();
            this._paragraphText = this._createParagraphText(this._paragraph, quote);
            this._footer = this._createFooter();
            this._footerText = this._createFooterText(this._footer, footer);
        }
        Blockquote.prototype.createElement = function () {
            var element = document.createElement('blockquote');
            return element;
        };
        Object.defineProperty(Blockquote.prototype, "className", {
            get: function () {
                return 'ui-blockquote';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Blockquote.prototype, "text", {
            get: function () {
                return this.quote;
            },
            set: function (value) {
                this.quote = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Blockquote.prototype, "quote", {
            get: function () {
                return this._paragraphText.nodeValue;
            },
            set: function (value) {
                this._paragraphText.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Blockquote.prototype, "footer", {
            get: function () {
                return this._footerText.nodeValue;
            },
            set: function (value) {
                this._footerText.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Blockquote.prototype._createParagraph = function () {
            var p = document.createElement('p');
            this.element.appendChild(p);
            return p;
        };
        Blockquote.prototype._createFooter = function () {
            var p = document.createElement('footer');
            this.element.appendChild(p);
            return p;
        };
        Blockquote.prototype._createParagraphText = function (p, text) {
            var t = document.createTextNode(text);
            p.appendChild(t);
            return t;
        };
        Blockquote.prototype._createFooterText = function (f, text) {
            var t = document.createTextNode(text);
            f.appendChild(t);
            return t;
        };
        return Blockquote;
    })(ui.Widget);
    ui.Blockquote = Blockquote;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(parent, text, iconName) {
            if (iconName === void 0) { iconName = null; }
            _super.call(this, parent);
            this._icon = this.createIcon(iconName);
            this.icon = iconName;
            this._text = this.createText(text);
        }
        Object.defineProperty(Button.prototype, "className", {
            get: function () {
                return 'ui-button';
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.createElement = function () {
            var element = document.createElement('button');
            element.addEventListener('click', this._onElementClick.bind(this));
            return element;
        };
        Object.defineProperty(Button.prototype, "button", {
            get: function () {
                return this.element;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.createText = function (value) {
            var text = document.createTextNode(value);
            this.element.appendChild(text);
            return text;
        };
        Button.prototype.createIcon = function (iconName) {
            var s = document.createElement('i');
            this.element.appendChild(s);
            return s;
        };
        Object.defineProperty(Button.prototype, "type", {
            get: function () {
                return this.button.type;
            },
            set: function (value) {
                this.button.type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "text", {
            get: function () {
                return this._text.nodeValue;
            },
            set: function (value) {
                this._text.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "disabled", {
            get: function () {
                return this.element.disabled;
            },
            set: function (value) {
                this.element.disabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "enabled", {
            get: function () {
                return !this.disabled;
            },
            set: function (value) {
                this.disabled = !value;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype._onElementClick = function (event) {
            this.fire('click', event);
        };
        Object.defineProperty(Button.prototype, "icon", {
            get: function () {
                return this._iconName;
            },
            set: function (value) {
                if (value) {
                    this._icon.className = 'fa fa-fw fa-' + value;
                }
                else {
                    this._icon.className = '';
                }
                this._iconName = value;
            },
            enumerable: true,
            configurable: true
        });
        return Button;
    })(ui.Widget);
    ui.Button = Button;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Canvas = (function (_super) {
        __extends(Canvas, _super);
        function Canvas() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(Canvas.prototype, "width", {
            get: function () {
                return this.element.width;
            },
            set: function (value) {
                this.element.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "height", {
            get: function () {
                return this.element.height;
            },
            set: function (value) {
                this.element.height = value;
            },
            enumerable: true,
            configurable: true
        });
        Canvas.prototype.resize = function (width, height) {
            this.width = width;
            this.height = height;
        };
        Canvas.prototype.createElement = function () {
            var element = document.createElement('canvas');
            return element;
        };
        Object.defineProperty(Canvas.prototype, "className", {
            get: function () {
                return 'ui-canvas';
            },
            enumerable: true,
            configurable: true
        });
        Canvas.prototype.getContext = function (type) {
            return this.element.getContext(type);
        };
        return Canvas;
    })(ui.Widget);
    ui.Canvas = Canvas;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Checkbox = (function (_super) {
        __extends(Checkbox, _super);
        function Checkbox(parent, name, text) {
            _super.call(this, parent);
            this._uniqId = ui.randomId();
            this._input = this._createInput(name);
            this._label = this._createLabel(name);
            this._text = this._createText(text);
            this.input.name = name;
        }
        Object.defineProperty(Checkbox.prototype, "name", {
            get: function () {
                return this.input.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Checkbox.prototype, "input", {
            get: function () {
                return this._input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Checkbox.prototype, "type", {
            get: function () {
                return 'checkbox';
            },
            enumerable: true,
            configurable: true
        });
        Checkbox.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        Checkbox.prototype._createLabel = function (name) {
            var l = document.createElement('label');
            l.htmlFor = this._uniqId;
            this.element.appendChild(l);
            return l;
        };
        Checkbox.prototype._createText = function (text) {
            var txt = document.createTextNode(text);
            this._label.appendChild(txt);
            return txt;
        };
        Checkbox.prototype._createInput = function (name) {
            var input = document.createElement('input');
            input.type = this.type;
            input.id = this._uniqId;
            input.name = name;
            this.element.appendChild(input);
            return input;
        };
        Object.defineProperty(Checkbox.prototype, "className", {
            get: function () {
                return 'ui-checkbox';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Checkbox.prototype, "text", {
            get: function () {
                return this._text.textContent;
            },
            set: function (value) {
                this._text.textContent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Checkbox.prototype, "label", {
            get: function () {
                return this.text;
            },
            set: function (value) {
                this.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Checkbox.prototype, "checked", {
            get: function () {
                return this.input.checked;
            },
            set: function (value) {
                this.input.checked = value;
            },
            enumerable: true,
            configurable: true
        });
        return Checkbox;
    })(ui.Widget);
    ui.Checkbox = Checkbox;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var ColorInput = (function (_super) {
        __extends(ColorInput, _super);
        function ColorInput(parent, name) {
            _super.call(this, parent, name);
            this._btn = this._createButton();
            jsColorPicker(this.input, {
                customBG: '#222',
                readOnly: true,
                // patch: false,
                init: function (elm, colors) {
                    elm.style.backgroundColor = elm.value;
                    elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
                }
            });
        }
        Object.defineProperty(ColorInput.prototype, "type", {
            get: function () {
                return 'color';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ColorInput.prototype, "value", {
            get: function () {
                return this.input.value;
            },
            set: function (value) {
                this.input.value = value;
                if (this.enabled) {
                    this.input.style.backgroundColor = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        ColorInput.prototype._createButton = function () {
            var btn = document.createElement('span');
            btn.classList.add('btn');
            btn.appendChild(document.createTextNode('<>'));
            this.element.appendChild(btn);
            return btn;
        };
        ColorInput.prototype.createInput = function () {
            var element = document.createElement('input');
            element.type = 'text';
            element.classList.add("ui-input");
            element.classList.add("ui-input-" + this.type);
            this.element.appendChild(element);
            return element;
        };
        return ColorInput;
    })(ui.Input);
    ui.ColorInput = ColorInput;
})(ui || (ui = {}));
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
/// <reference path="./Container.ts" />
var ui;
(function (ui) {
    var ListItem = (function (_super) {
        __extends(ListItem, _super);
        function ListItem() {
            _super.apply(this, arguments);
        }
        ListItem.prototype.createElement = function () {
            var element = document.createElement('li');
            return element;
        };
        Object.defineProperty(ListItem.prototype, "className", {
            get: function () {
                return 'ui-li';
            },
            enumerable: true,
            configurable: true
        });
        return ListItem;
    })(ui.Container);
    ui.ListItem = ListItem;
})(ui || (ui = {}));
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
/// <reference path="./ListItem.ts" />
/// <reference path="./Widget.ts" />
var ui;
(function (ui) {
    var List = (function (_super) {
        __extends(List, _super);
        function List(parent) {
            _super.call(this, parent);
        }
        List.prototype.addItem = function () {
            var li = new ui.ListItem(this);
            return li;
        };
        List.prototype.item = function () {
            return this.addItem();
        };
        List.prototype.removeItem = function (item) {
            this.removeChild(item);
        };
        Object.defineProperty(List.prototype, "items", {
            get: function () {
                return this.children;
            },
            enumerable: true,
            configurable: true
        });
        return List;
    })(ui.Container);
    ui.List = List;
})(ui || (ui = {}));
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
/// <reference path="./List.ts" />
var ui;
(function (ui) {
    var UnorderedList = (function (_super) {
        __extends(UnorderedList, _super);
        function UnorderedList(parent) {
            _super.call(this, parent);
        }
        UnorderedList.prototype.createElement = function () {
            var element = document.createElement('ul');
            return element;
        };
        Object.defineProperty(UnorderedList.prototype, "className", {
            get: function () {
                return 'ui-ul';
            },
            enumerable: true,
            configurable: true
        });
        return UnorderedList;
    })(ui.List);
    ui.UnorderedList = UnorderedList;
})(ui || (ui = {}));
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
/// <reference path="./UnorderedList.ts" />
var ui;
(function (ui) {
    var DataList = (function (_super) {
        __extends(DataList, _super);
        function DataList() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(DataList.prototype, "className", {
            get: function () {
                return 'ui-datalist';
            },
            enumerable: true,
            configurable: true
        });
        return DataList;
    })(ui.UnorderedList);
    ui.DataList = DataList;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var DateInput = (function (_super) {
        __extends(DateInput, _super);
        function DateInput() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(DateInput.prototype, "type", {
            get: function () {
                return 'date';
            },
            enumerable: true,
            configurable: true
        });
        return DateInput;
    })(ui.Input);
    ui.DateInput = DateInput;
})(ui || (ui = {}));
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
/// <reference path="./Form.ts" />
var ui;
(function (ui) {
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(parent, forInput, text) {
            _super.call(this, parent);
            this.text = text;
            this.htmlFor = forInput;
            this.classList.add('ui-cell-sm-4');
        }
        Object.defineProperty(Label.prototype, "label", {
            get: function () {
                return this.element;
            },
            enumerable: true,
            configurable: true
        });
        Label.prototype.createElement = function () {
            var label = document.createElement('label');
            return label;
        };
        Object.defineProperty(Label.prototype, "className", {
            get: function () {
                return 'ui-label';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "text", {
            get: function () {
                return this.label.textContent;
            },
            set: function (value) {
                this.label.textContent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "htmlFor", {
            get: function () {
                return this.label.htmlFor;
            },
            set: function (value) {
                this.label.htmlFor = value;
            },
            enumerable: true,
            configurable: true
        });
        return Label;
    })(ui.Widget);
    ui.Label = Label;
})(ui || (ui = {}));
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
/// <reference path="./Container.ts" />
var ui;
(function (ui) {
    var FormDummy = (function (_super) {
        __extends(FormDummy, _super);
        function FormDummy() {
            _super.apply(this, arguments);
        }
        FormDummy.prototype.createElement = function () {
            return document.createElement('div');
        };
        Object.defineProperty(FormDummy.prototype, "className", {
            get: function () {
                return 'ui-cell-sm-4';
            },
            enumerable: true,
            configurable: true
        });
        return FormDummy;
    })(ui.Container);
    var FormButtonGroup = (function (_super) {
        __extends(FormButtonGroup, _super);
        function FormButtonGroup() {
            _super.apply(this, arguments);
        }
        FormButtonGroup.prototype.createElement = function () {
            return document.createElement('div');
        };
        Object.defineProperty(FormButtonGroup.prototype, "className", {
            get: function () {
                return 'ui-cell-sm-8';
            },
            enumerable: true,
            configurable: true
        });
        return FormButtonGroup;
    })(ui.Container);
    var InputContainer = (function (_super) {
        __extends(InputContainer, _super);
        function InputContainer() {
            _super.apply(this, arguments);
        }
        InputContainer.prototype.addLabel = function (forInput, text) {
            var label = new ui.Label(this, forInput, text);
            return label;
        };
        InputContainer.prototype.label = function (forInput, text) {
            return this.addLabel(forInput, text);
        };
        InputContainer.prototype.addInput = function (name, type) {
            if (type === void 0) { type = 'text'; }
            switch (type) {
                case 'date': return new ui.DateInput(this, name);
                case 'color': return new ui.ColorInput(this, name);
                case 'number': return new ui.NumberInput(this, name);
                case 'text': return new ui.TextInput(this, name);
                case 'checkbox': return new ui.Checkbox(this, name, '');
                case 'radioGroup': return new ui.RadioGroup(this, name);
                case 'select': return new ui.SelectInput(this, name);
                case 'switch': return new ui.Switch(this, name);
                default: return new ui.TextInput(this, name);
            }
        };
        InputContainer.prototype.input = function (name, type) {
            if (type === void 0) { type = 'text'; }
            return this.addInput(name, type);
        };
        InputContainer.prototype.addPair = function (name, label, type) {
            if (type === void 0) { type = 'text'; }
            this.addLabel(name, label);
            return this.addInput(name, type);
        };
        InputContainer.prototype.pair = function (name, label, type) {
            if (type === void 0) { type = 'text'; }
            return this.addPair(name, label, type);
        };
        InputContainer.prototype.text = function (name, label) {
            return this.addPair(name, label, 'text');
        };
        InputContainer.prototype.number = function (name, label) {
            return this.addPair(name, label, 'number');
        };
        InputContainer.prototype.date = function (name, label) {
            return this.addPair(name, label, 'date');
        };
        InputContainer.prototype.color = function (name, label) {
            return this.addPair(name, label, 'color');
        };
        InputContainer.prototype.checkbox = function (name, label) {
            var check = this.addPair(name, '', 'checkbox');
            check.label = label;
            return check;
        };
        InputContainer.prototype.radioGroup = function (name, label) {
            return this.addPair(name, label, 'radioGroup');
        };
        InputContainer.prototype.select = function (name, label) {
            return this.addPair(name, label, 'select');
        };
        InputContainer.prototype.switch = function (name, label, onLabel, offLabel) {
            if (onLabel === void 0) { onLabel = ''; }
            if (offLabel === void 0) { offLabel = ''; }
            var s = this.addPair(name, label, 'switch');
            s.onText = onLabel;
            s.offText = offLabel;
            return s;
        };
        InputContainer.prototype.submit = function (submit, reset) {
            if (reset === void 0) { reset = null; }
            var d = new FormDummy(this);
            var g = new FormButtonGroup(this);
            var btn = new ui.Button(g, submit);
            btn.type = 'submit';
            if (reset !== null) {
                var rst = new ui.Button(g, reset);
                rst.type = 'reset';
            }
            return btn;
        };
        return InputContainer;
    })(ui.Container);
    ui.InputContainer = InputContainer;
})(ui || (ui = {}));
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
/// <reference path="./InputContainer.ts" />
var ui;
(function (ui) {
    var FormGroup = (function (_super) {
        __extends(FormGroup, _super);
        function FormGroup() {
            _super.apply(this, arguments);
        }
        FormGroup.prototype.createElement = function () {
            var group = document.createElement('div');
            group.classList.add('ui-row');
            return group;
        };
        Object.defineProperty(FormGroup.prototype, "className", {
            get: function () {
                return 'ui-form-group';
            },
            enumerable: true,
            configurable: true
        });
        return FormGroup;
    })(ui.InputContainer);
    ui.FormGroup = FormGroup;
})(ui || (ui = {}));
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
/// <reference path="./Container.ts" />
/// <reference path="./Label.ts" />
/// <reference path="./FormGroup.ts" />
/// <reference path="./Fieldset.ts" />
var ui;
(function (ui) {
    var Form = (function (_super) {
        __extends(Form, _super);
        function Form() {
            _super.apply(this, arguments);
        }
        Form.prototype.createElement = function () {
            var form = document.createElement('form');
            form.addEventListener('submit', this._onFormSubmit.bind(this));
            return form;
        };
        Object.defineProperty(Form.prototype, "form", {
            get: function () {
                return this.element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "className", {
            get: function () {
                return 'ui-form';
            },
            enumerable: true,
            configurable: true
        });
        Form.prototype._onFormSubmit = function (event) {
            this.fire('submit', event);
        };
        Form.prototype.addGroup = function () {
            return new ui.FormGroup(this);
        };
        Form.prototype.group = function () {
            return this.addGroup();
        };
        Form.prototype.addFieldset = function (legend) {
            if (legend === void 0) { legend = ''; }
            return new ui.Fieldset(this, legend);
        };
        Form.prototype.fieldset = function (legend) {
            if (legend === void 0) { legend = ''; }
            return this.addFieldset(legend);
        };
        Form.Group = ui.FormGroup;
        return Form;
    })(ui.Container);
    ui.Form = Form;
})(ui || (ui = {}));
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
/// <reference path="./Container.ts" />
/// <reference path="./Form.ts" />
/// <reference path="./FormGroup.ts" />
var ui;
(function (ui) {
    var Fieldset = (function (_super) {
        __extends(Fieldset, _super);
        function Fieldset(parent, legend) {
            if (legend === void 0) { legend = ''; }
            _super.call(this, parent);
            this._legend = this._createLegend(legend);
        }
        Fieldset.prototype.createElement = function () {
            var element = document.createElement('fieldset');
            return element;
        };
        Object.defineProperty(Fieldset.prototype, "className", {
            get: function () {
                return 'ui-fieldset';
            },
            enumerable: true,
            configurable: true
        });
        Fieldset.prototype._createLegend = function (legend) {
            var l = document.createElement('legend');
            this._legendText = document.createTextNode(legend);
            l.appendChild(this._legendText);
            this.element.appendChild(l);
            return l;
        };
        Object.defineProperty(Fieldset.prototype, "legend", {
            get: function () {
                return this._legendText.nodeValue;
            },
            set: function (value) {
                this._legendText.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Fieldset.prototype.addGroup = function () {
            return new ui.FormGroup(this);
        };
        Fieldset.prototype.group = function () {
            return this.addGroup();
        };
        return Fieldset;
    })(ui.Container);
    ui.Fieldset = Fieldset;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    (function (FontAwesomeTransform) {
        FontAwesomeTransform[FontAwesomeTransform["NONE"] = 0] = "NONE";
        FontAwesomeTransform[FontAwesomeTransform["ROTATE90"] = 1] = "ROTATE90";
        FontAwesomeTransform[FontAwesomeTransform["ROTATE180"] = 2] = "ROTATE180";
        FontAwesomeTransform[FontAwesomeTransform["ROTATE270"] = 3] = "ROTATE270";
        FontAwesomeTransform[FontAwesomeTransform["FLIP_HORIZONTAL"] = 4] = "FLIP_HORIZONTAL";
        FontAwesomeTransform[FontAwesomeTransform["FLIP_VERTICAL"] = 5] = "FLIP_VERTICAL";
    })(ui.FontAwesomeTransform || (ui.FontAwesomeTransform = {}));
    var FontAwesomeTransform = ui.FontAwesomeTransform;
    ;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    (function (FontAwesomeSize) {
        FontAwesomeSize[FontAwesomeSize["NORMAL"] = 0] = "NORMAL";
        FontAwesomeSize[FontAwesomeSize["LARGE"] = 1] = "LARGE";
        FontAwesomeSize[FontAwesomeSize["X2"] = 2] = "X2";
        FontAwesomeSize[FontAwesomeSize["X3"] = 3] = "X3";
        FontAwesomeSize[FontAwesomeSize["X4"] = 4] = "X4";
        FontAwesomeSize[FontAwesomeSize["X5"] = 5] = "X5";
    })(ui.FontAwesomeSize || (ui.FontAwesomeSize = {}));
    var FontAwesomeSize = ui.FontAwesomeSize;
    ;
})(ui || (ui = {}));
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
/// <reference path="./Container.ts" />
/// <reference path="./FontAwesomeTransform.ts" />
/// <reference path="./FontAwesomeSize.ts" />
var ui;
(function (ui) {
    var FontAwesomeWidget = (function (_super) {
        __extends(FontAwesomeWidget, _super);
        function FontAwesomeWidget() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(FontAwesomeWidget.prototype, "fixedWidth", {
            get: function () {
                return this.classList.contains('fa-fw');
            },
            set: function (value) {
                if (value !== this.spin) {
                    if (value) {
                        this.classList.add('fa-fw');
                    }
                    else {
                        this.classList.remove('fa-fw');
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontAwesomeWidget.prototype, "border", {
            get: function () {
                return this.classList.contains('fa-border');
            },
            set: function (value) {
                if (value !== this.spin) {
                    if (value) {
                        this.classList.add('fa-border');
                    }
                    else {
                        this.classList.remove('fa-border');
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontAwesomeWidget.prototype, "inverse", {
            get: function () {
                return this.classList.contains('fa-inverse');
            },
            set: function (value) {
                if (value !== this.spin) {
                    if (value) {
                        this.classList.add('fa-inverse');
                    }
                    else {
                        this.classList.remove('fa-inverse');
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontAwesomeWidget.prototype, "spin", {
            get: function () {
                return this.classList.contains('fa-spin');
            },
            set: function (value) {
                if (value !== this.spin) {
                    if (value) {
                        this.classList.remove('fa-pulse');
                        this.classList.add('fa-spin');
                    }
                    else {
                        this.classList.remove('fa-spin');
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontAwesomeWidget.prototype, "pulse", {
            get: function () {
                return this.classList.contains('fa-pulse');
            },
            set: function (value) {
                if (value !== this.pulse) {
                    if (value) {
                        this.classList.remove('fa-spin');
                        this.classList.add('fa-pulse');
                    }
                    else {
                        this.classList.remove('fa-pulse');
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontAwesomeWidget.prototype, "transform", {
            get: function () {
                if (this.classList.contains('fa-rotate-90')) {
                    return ui.FontAwesomeTransform.ROTATE90;
                }
                if (this.classList.contains('fa-rotate-180')) {
                    return ui.FontAwesomeTransform.ROTATE180;
                }
                if (this.classList.contains('fa-rotate-270')) {
                    return ui.FontAwesomeTransform.ROTATE270;
                }
                if (this.classList.contains('fa-flip-horizontal')) {
                    return ui.FontAwesomeTransform.FLIP_HORIZONTAL;
                }
                if (this.classList.contains('fa-flip-vertical')) {
                    return ui.FontAwesomeTransform.FLIP_VERTICAL;
                }
                return ui.FontAwesomeTransform.NONE;
            },
            set: function (type) {
                this._removeTransform();
                switch (type) {
                    case ui.FontAwesomeTransform.ROTATE90:
                        this.classList.add('fa-rotate-90');
                        break;
                    case ui.FontAwesomeTransform.ROTATE180:
                        this.classList.add('fa-rotate-180');
                        break;
                    case ui.FontAwesomeTransform.ROTATE270:
                        this.classList.add('fa-rotate-270');
                        break;
                    case ui.FontAwesomeTransform.FLIP_HORIZONTAL:
                        this.classList.add('fa-flip-horizontal');
                        break;
                    case ui.FontAwesomeTransform.FLIP_VERTICAL:
                        this.classList.add('fa-flip-vertical');
                        break;
                    default:
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontAwesomeWidget.prototype, "size", {
            get: function () {
                if (this.classList.contains('fa-lg')) {
                    return ui.FontAwesomeSize.LARGE;
                }
                if (this.classList.contains('fa-2x')) {
                    return ui.FontAwesomeSize.X2;
                }
                if (this.classList.contains('fa-3x')) {
                    return ui.FontAwesomeSize.X3;
                }
                if (this.classList.contains('fa-4x')) {
                    return ui.FontAwesomeSize.X4;
                }
                if (this.classList.contains('fa-5x')) {
                    return ui.FontAwesomeSize.X5;
                }
                return ui.FontAwesomeSize.NORMAL;
            },
            set: function (value) {
                this._removeSize();
                switch (value) {
                    case ui.FontAwesomeSize.LARGE:
                        this.classList.add('fa-lg');
                        break;
                    case ui.FontAwesomeSize.X2:
                        this.classList.add('fa-2x');
                        break;
                    case ui.FontAwesomeSize.X3:
                        this.classList.add('fa-3x');
                        break;
                    case ui.FontAwesomeSize.X4:
                        this.classList.add('fa-4x');
                        break;
                    case ui.FontAwesomeSize.X5:
                        this.classList.add('fa-5x');
                        break;
                    default:
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        FontAwesomeWidget.prototype._removeTransform = function () {
            this.classList.remove('fa-rotate-90');
            this.classList.remove('fa-rotate-180');
            this.classList.remove('fa-rotate-270');
            this.classList.remove('fa-rotate-180');
            this.classList.remove('fa-flip-horizontal');
            this.classList.remove('fa-flip-vertical');
        };
        FontAwesomeWidget.prototype._removeSize = function () {
            this.classList.remove('fa-lg');
            this.classList.remove('fa-2x');
            this.classList.remove('fa-3x');
            this.classList.remove('fa-4x');
            this.classList.remove('fa-5x');
        };
        return FontAwesomeWidget;
    })(ui.Container);
    ui.FontAwesomeWidget = FontAwesomeWidget;
})(ui || (ui = {}));
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
/// <reference path="./FontAwesomeWidget.ts" />
var ui;
(function (ui) {
    var FontAwesomeIcon = (function (_super) {
        __extends(FontAwesomeIcon, _super);
        function FontAwesomeIcon(parent, icon) {
            _super.call(this, parent);
            this.classList.add('fa-' + icon);
            this._icon = icon;
        }
        FontAwesomeIcon.prototype.createElement = function () {
            var element = document.createElement('i');
            return element;
        };
        Object.defineProperty(FontAwesomeIcon.prototype, "className", {
            get: function () {
                return 'fa';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontAwesomeIcon.prototype, "icon", {
            get: function () {
                return this._icon;
            },
            set: function (value) {
                if (value && value !== this.icon) {
                    this.classList.remove('fa-' + this.icon);
                    this.classList.add('fa-' + value);
                    this._icon = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        return FontAwesomeIcon;
    })(ui.FontAwesomeWidget);
    ui.FontAwesomeIcon = FontAwesomeIcon;
})(ui || (ui = {}));
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
/// <reference path="./FontAwesomeWidget.ts" />
var ui;
(function (ui) {
    (function (FontAwesomeStackOrder) {
        FontAwesomeStackOrder[FontAwesomeStackOrder["NORMAL"] = 0] = "NORMAL";
        FontAwesomeStackOrder[FontAwesomeStackOrder["INVERSE"] = 1] = "INVERSE";
    })(ui.FontAwesomeStackOrder || (ui.FontAwesomeStackOrder = {}));
    var FontAwesomeStackOrder = ui.FontAwesomeStackOrder;
    var FontAwesomeStack = (function (_super) {
        __extends(FontAwesomeStack, _super);
        function FontAwesomeStack(parent, lower, upper, order) {
            if (order === void 0) { order = FontAwesomeStackOrder.NORMAL; }
            _super.call(this, parent);
            var _a = order == FontAwesomeStackOrder.NORMAL ? ['1x', '2x'] : ['2x', '1x'], o1 = _a[0], o2 = _a[1];
            this._lower = new ui.FontAwesomeIcon(this, lower);
            this._lower.classList.add("fa-stack-" + o1);
            this._upper = new ui.FontAwesomeIcon(this, upper);
            this._upper.classList.add("fa-stack-" + o2);
        }
        FontAwesomeStack.prototype.createElement = function () {
            var element = document.createElement('span');
            return element;
        };
        Object.defineProperty(FontAwesomeStack.prototype, "className", {
            get: function () {
                return 'fa-stack';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontAwesomeStack.prototype, "lower", {
            get: function () {
                return this._lower;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontAwesomeStack.prototype, "upper", {
            get: function () {
                return this._upper;
            },
            enumerable: true,
            configurable: true
        });
        return FontAwesomeStack;
    })(ui.FontAwesomeWidget);
    ui.FontAwesomeStack = FontAwesomeStack;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Row = (function (_super) {
        __extends(Row, _super);
        function Row() {
            _super.apply(this, arguments);
        }
        Row.prototype.addCell = function (sizes) {
            if (sizes === void 0) { sizes = { md: 6 }; }
            var cell = new Cell(this, sizes);
            return cell;
        };
        Row.prototype.cell = function (sizes) {
            if (sizes === void 0) { sizes = { md: 6 }; }
            return this.addCell(sizes);
        };
        Object.defineProperty(Row.prototype, "className", {
            get: function () {
                return 'ui-row';
            },
            enumerable: true,
            configurable: true
        });
        Row.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        return Row;
    })(ui.Container);
    var Cell = (function (_super) {
        __extends(Cell, _super);
        function Cell(parent, sizes) {
            _super.call(this, parent);
            this._sizes = sizes;
            this._setupSizes();
        }
        Cell.prototype._setupSizes = function () {
            for (var s in this._sizes) {
                var v = this._sizes[s];
                if (v) {
                    this.classList.add("ui-cell-" + s + "-" + v);
                }
            }
        };
        Cell.prototype.addRow = function () {
            var grid = new Grid(this);
            return new Row(grid);
        };
        Cell.prototype.row = function () {
            return this.addRow();
        };
        Object.defineProperty(Cell.prototype, "className", {
            get: function () {
                return 'ui-cell';
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        return Cell;
    })(ui.Container);
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(parent) {
            _super.call(this, parent);
        }
        Grid.prototype.addRow = function () {
            return new Row(this);
        };
        Grid.prototype.row = function () {
            return this.addRow();
        };
        Object.defineProperty(Grid.prototype, "className", {
            get: function () {
                return 'ui-grid';
            },
            enumerable: true,
            configurable: true
        });
        Grid.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        Grid.Row = Row;
        Grid.Cell = Cell;
        return Grid;
    })(ui.Container);
    ui.Grid = Grid;
})(ui || (ui = {}));
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
/// <reference path="./EventManager.ts"/>
/// <reference path="./HandleSubMenu.ts"/>
var ui;
(function (ui) {
    var MenuItem = (function (_super) {
        __extends(MenuItem, _super);
        function MenuItem(menu, text) {
            if (text === void 0) { text = ''; }
            _super.call(this);
            this._menu = menu;
            this._element = this._createListItem();
            this._link = this._createLink(text);
            menu.addElement(this);
            this._setupCommonEvents();
        }
        Object.defineProperty(MenuItem.prototype, "menu", {
            get: function () {
                return this._menu;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "link", {
            get: function () {
                return this._link;
            },
            enumerable: true,
            configurable: true
        });
        MenuItem.prototype._createListItem = function () {
            var li = document.createElement('li');
            return li;
        };
        MenuItem.prototype._createLink = function (text) {
            var a = document.createElement('a');
            var txt = document.createTextNode(text);
            a.appendChild(txt);
            a.href = '#';
            this._text = txt;
            this.element.appendChild(a);
            return a;
        };
        Object.defineProperty(MenuItem.prototype, "text", {
            get: function () {
                return this._text.nodeValue;
            },
            set: function (value) {
                this._text.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        MenuItem.prototype._setupCommonEvents = function () {
            this._setupElementEvents();
            this._setupLinkEvents();
        };
        MenuItem.prototype._setupElementEvents = function () {
            this.element.addEventListener('focus', this._onFocus.bind(this));
            this.element.addEventListener('blur', this._onBlur.bind(this));
            this.element.addEventListener('keydown', this._onKeydown.bind(this));
            this.element.addEventListener('keyup', this._onKeyup.bind(this));
        };
        MenuItem.prototype._setupLinkEvents = function () {
            this.link.addEventListener('click', this._onClick.bind(this));
        };
        MenuItem.prototype._onFocus = function (event) {
            this.fire('focus', event);
        };
        MenuItem.prototype._onBlur = function (event) {
            this.fire('blur', event);
        };
        MenuItem.prototype._onKeydown = function (event) {
            this.fire('keydown', event);
        };
        MenuItem.prototype._onKeyup = function (event) {
            this.fire('keyup', event);
        };
        MenuItem.prototype._onClick = function (event) {
            this.fire('click', event);
        };
        return MenuItem;
    })(ui.EventManager);
    ui.MenuItem = MenuItem;
})(ui || (ui = {}));
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
/// <reference path="./MenuItem.ts"/>
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
var ui;
(function (ui) {
    var HorizontalRule = (function (_super) {
        __extends(HorizontalRule, _super);
        function HorizontalRule() {
            _super.apply(this, arguments);
        }
        HorizontalRule.prototype.createElement = function () {
            var element = document.createElement('hr');
            return element;
        };
        Object.defineProperty(HorizontalRule.prototype, "className", {
            get: function () {
                return 'ui-hr';
            },
            enumerable: true,
            configurable: true
        });
        return HorizontalRule;
    })(ui.Widget);
    ui.HorizontalRule = HorizontalRule;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var SubMenu = (function (_super) {
        __extends(SubMenu, _super);
        function SubMenu(menu, text) {
            if (text === void 0) { text = ''; }
            _super.call(this, menu, text);
            this._items = [];
            this._list = this._createList();
            this._addCaret();
        }
        SubMenu.prototype._createList = function () {
            var ul = document.createElement('ul');
            this.element.appendChild(ul);
            return ul;
        };
        SubMenu.prototype.addElement = function (item) {
            if (!this.contains(item)) {
                this.list.appendChild(item.element);
                this._items.push(item);
            }
        };
        SubMenu.prototype.contains = function (item) {
            return this.indexOf(item) !== -1;
        };
        SubMenu.prototype.indexOf = function (item) {
            return this.items.indexOf(item);
        };
        SubMenu.prototype.remove = function (item) {
            var index = this.indexOf(item);
            if (index >= 0) {
                this.removeAt(index);
            }
        };
        SubMenu.prototype.removeAt = function (index) {
            if (index >= 0 && index <= this.length) {
                var item = this.items[index];
                this.element.removeChild(item.element);
                this._items.splice(index, 1);
            }
        };
        SubMenu.prototype.addItem = function (text) {
            var item = new ui.MenuItem(this, text);
            return item;
        };
        SubMenu.prototype.item = function (text) {
            return this.addItem(text);
        };
        SubMenu.prototype.addSubMenu = function (text) {
            var item = new ui.SubMenu(this, text);
            return item;
        };
        SubMenu.prototype.subMenu = function (text) {
            return this.addSubMenu(text);
        };
        Object.defineProperty(SubMenu.prototype, "list", {
            get: function () {
                return this._list;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubMenu.prototype, "items", {
            get: function () {
                return this._items.slice(0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubMenu.prototype, "length", {
            get: function () {
                return this.items.length;
            },
            enumerable: true,
            configurable: true
        });
        SubMenu.prototype.addSeparator = function () {
            var item = new ui.MenuSeparator(this);
            return item;
        };
        SubMenu.prototype.separator = function () {
            return this.addSeparator();
        };
        SubMenu.prototype._addCaret = function () {
            var caret = document.createElement('span');
            var c = this.menu instanceof SubMenu ? 'ui-arrow-right' : 'ui-arrow-down';
            caret.style.marginLeft = '10px';
            caret.classList.add(c);
            this.link.appendChild(caret);
        };
        return SubMenu;
    })(ui.MenuItem);
    ui.SubMenu = SubMenu;
})(ui || (ui = {}));
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
/// <reference path="./EventManager.ts"/>
/// <reference path="./HandleSubMenu.ts"/>
/// <reference path="./MenuItem.ts"/>
/// <reference path="./SubMenu.ts"/>
var ui;
(function (ui) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu(parent) {
            _super.call(this, parent);
            this._wrapper = this._createWrapper();
            this._list = this._createList();
            this._toggle = this._createToggle();
            this._items = [];
        }
        Menu.prototype.createElement = function () {
            var element = document.createElement('nav');
            return element;
        };
        Object.defineProperty(Menu.prototype, "className", {
            get: function () {
                return 'ui-menu';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Menu.prototype, "wrapper", {
            get: function () {
                return this._wrapper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Menu.prototype, "list", {
            get: function () {
                return this._list;
            },
            enumerable: true,
            configurable: true
        });
        Menu.prototype._createWrapper = function () {
            var div = document.createElement('div');
            this.element.appendChild(div);
            div.classList.add('wrapper');
            return div;
        };
        Menu.prototype._createList = function () {
            var ul = document.createElement('ul');
            this.wrapper.appendChild(ul);
            return ul;
        };
        Menu.prototype._createToggle = function () {
            var a = document.createElement('a');
            a.href = '#';
            this.parent.element.appendChild(a);
            a.classList.add('ui-menu-toggle');
            a.addEventListener('click', this.toggle.bind(this));
            return a;
        };
        Object.defineProperty(Menu.prototype, "open", {
            get: function () {
                return this.classList.contains('ui-menu-show');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Menu.prototype, "closed", {
            get: function () {
                return !this.open;
            },
            enumerable: true,
            configurable: true
        });
        Menu.prototype.show = function () {
            if (this.closed) {
                var event = new Event('show');
                this.fire('show', event);
                if (!event.defaultPrevented) {
                    this.classList.add('ui-menu-show');
                }
            }
        };
        Menu.prototype.hide = function () {
            if (this.open) {
                var event = new Event('hide');
                this.fire('hide', event);
                if (!event.defaultPrevented) {
                    this.classList.remove('ui-menu-show');
                }
            }
        };
        Menu.prototype.toggle = function () {
            var event = new Event('toggle');
            this.fire('toggle', event);
            if (!event.defaultPrevented) {
                if (this.open) {
                    this.hide();
                    return;
                }
                this.show();
            }
        };
        Object.defineProperty(Menu.prototype, "items", {
            get: function () {
                return this._items.slice(0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Menu.prototype, "length", {
            get: function () {
                return this.items.length;
            },
            enumerable: true,
            configurable: true
        });
        Menu.prototype.addElement = function (item) {
            if (!this.contains(item)) {
                this.list.appendChild(item.element);
                this._items.push(item);
            }
        };
        Menu.prototype.contains = function (item) {
            return this.indexOf(item) !== -1;
        };
        Menu.prototype.indexOf = function (item) {
            return this.items.indexOf(item);
        };
        Menu.prototype.remove = function (item) {
            var index = this.indexOf(item);
            if (index >= 0) {
                this.removeAt(index);
            }
        };
        Menu.prototype.removeAt = function (index) {
            if (index >= 0 && index <= this.length) {
                var item = this.items[index];
                this.element.removeChild(item.element);
                this._items.splice(index, 1);
            }
        };
        Menu.prototype.addItem = function (text) {
            var item = new ui.MenuItem(this, text);
            return item;
        };
        Menu.prototype.item = function (text) {
            return this.addItem(text);
        };
        Menu.prototype.addSubMenu = function (text) {
            var item = new ui.SubMenu(this, text);
            return item;
        };
        Menu.prototype.subMenu = function (text) {
            return this.addSubMenu(text);
        };
        Menu.prototype.addSeparator = function () {
            var item = new ui.MenuSeparator(this);
            return item;
        };
        Menu.prototype.separator = function () {
            return this.addSeparator();
        };
        return Menu;
    })(ui.Widget);
    ui.Menu = Menu;
})(ui || (ui = {}));
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
/// <reference path="./MenuItem.ts"/>
var ui;
(function (ui) {
    var MenuSeparator = (function (_super) {
        __extends(MenuSeparator, _super);
        function MenuSeparator(menu) {
            _super.call(this, menu, '');
            this.element.classList.add('separator');
        }
        return MenuSeparator;
    })(ui.MenuItem);
    ui.MenuSeparator = MenuSeparator;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var NumberInput = (function (_super) {
        __extends(NumberInput, _super);
        function NumberInput() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(NumberInput.prototype, "type", {
            get: function () {
                return 'number';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NumberInput.prototype, "max", {
            get: function () {
                return this.input.max;
            },
            set: function (value) {
                this.input.max = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NumberInput.prototype, "min", {
            get: function () {
                return this.input.min;
            },
            set: function (value) {
                this.input.min = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NumberInput.prototype, "step", {
            get: function () {
                return this.input.step;
            },
            set: function (value) {
                this.input.step = value;
            },
            enumerable: true,
            configurable: true
        });
        return NumberInput;
    })(ui.Input);
    ui.NumberInput = NumberInput;
})(ui || (ui = {}));
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
/// <reference path="./HandleOptions.ts"/>
var ui;
(function (ui) {
    var Option = (function () {
        function Option(parent, value, text) {
            this._element = this._createElement(value, text);
            parent.addOption(this);
            this._parent = parent;
        }
        Object.defineProperty(Option.prototype, "value", {
            get: function () {
                return this.element.value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Option.prototype, "text", {
            get: function () {
                return this.element.text;
            },
            set: function (value) {
                this.element.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Option.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Option.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Option.prototype._createElement = function (value, text) {
            var e = document.createElement('option');
            e.value = value;
            e.text = text;
            return e;
        };
        Option.prototype.select = function () {
            this.parent.value = this.value;
        };
        return Option;
    })();
    ui.Option = Option;
})(ui || (ui = {}));
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
/// <reference path="./HandleOptions.ts"/>
var ui;
(function (ui) {
    var OptionGroup = (function () {
        function OptionGroup(parent, text) {
            this._options = [];
            this._element = this.createElement(text);
            parent.addOption(this);
            this._parent = parent;
        }
        Object.defineProperty(OptionGroup.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        OptionGroup.prototype.createElement = function (text) {
            var element = document.createElement('optgroup');
            element.label = text;
            return element;
        };
        Object.defineProperty(OptionGroup.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OptionGroup.prototype, "type", {
            get: function () {
                return 'select';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OptionGroup.prototype, "className", {
            get: function () {
                return 'ui-select';
            },
            enumerable: true,
            configurable: true
        });
        OptionGroup.prototype.add = function (value, name) {
            var opt = new ui.Option(this, value, name);
            return opt;
        };
        OptionGroup.prototype.addOption = function (opt) {
            this._options.push(opt);
            this.element.appendChild(opt.element);
        };
        OptionGroup.prototype.remove = function (opt) {
            this.removeAt(this.indexOf(opt));
        };
        OptionGroup.prototype.option = function (value) {
            var options = this.options;
            var length = options.length;
            for (var i = 0; i < length; ++i) {
                if (options[i].value === value) {
                    return options[i];
                }
            }
            return null;
        };
        OptionGroup.prototype.removeValue = function (value) {
            this.remove(this.option(value));
        };
        OptionGroup.prototype.removeAt = function (index) {
            if (index >= 0 && index <= -1) {
                var opt = this._options[index];
                this._options.splice(index, 1);
                this.element.removeChild(opt.element);
            }
        };
        OptionGroup.prototype.indexOf = function (opt) {
            return this.options.indexOf(opt);
        };
        OptionGroup.prototype.contains = function (opt) {
            return this.indexOf(opt) !== -1;
        };
        Object.defineProperty(OptionGroup.prototype, "options", {
            get: function () {
                return this._options.slice(0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OptionGroup.prototype, "text", {
            get: function () {
                return this.element.label;
            },
            set: function (value) {
                this.element.label = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OptionGroup.prototype, "label", {
            get: function () {
                return this.text;
            },
            set: function (value) {
                this.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OptionGroup.prototype, "value", {
            get: function () {
                return this.parent.value;
            },
            set: function (value) {
                this.parent.value = value;
            },
            enumerable: true,
            configurable: true
        });
        return OptionGroup;
    })();
    ui.OptionGroup = OptionGroup;
})(ui || (ui = {}));
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
/// <reference path="./List.ts" />
var ui;
(function (ui) {
    var OrderedList = (function (_super) {
        __extends(OrderedList, _super);
        function OrderedList(parent) {
            _super.call(this, parent);
        }
        OrderedList.prototype.createElement = function () {
            var element = document.createElement('ol');
            return element;
        };
        Object.defineProperty(OrderedList.prototype, "className", {
            get: function () {
                return 'ui-ol';
            },
            enumerable: true,
            configurable: true
        });
        return OrderedList;
    })(ui.List);
    ui.OrderedList = OrderedList;
})(ui || (ui = {}));
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
/// <reference path="./Container.ts" />
var ui;
(function (ui) {
    var Panel = (function (_super) {
        __extends(Panel, _super);
        function Panel(parent) {
            _super.call(this, parent);
        }
        Object.defineProperty(Panel.prototype, "className", {
            get: function () {
                return 'ui-panel';
            },
            enumerable: true,
            configurable: true
        });
        Panel.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        return Panel;
    })(ui.Container);
    ui.Panel = Panel;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Paragraph = (function (_super) {
        __extends(Paragraph, _super);
        function Paragraph(parent, text) {
            if (text === void 0) { text = ''; }
            _super.call(this, parent);
            this._text = this._createTextNode(text);
            this.element.appendChild(this._text);
        }
        Paragraph.prototype.createElement = function () {
            var element = document.createElement('span');
            return element;
        };
        Object.defineProperty(Paragraph.prototype, "className", {
            get: function () {
                return 'ui-paragraph';
            },
            enumerable: true,
            configurable: true
        });
        Paragraph.prototype._createTextNode = function (text) {
            var textInput = document.createTextNode(text);
            return textInput;
        };
        Object.defineProperty(Paragraph.prototype, "text", {
            get: function () {
                return this._text.nodeValue;
            },
            set: function (value) {
                this._text.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        return Paragraph;
    })(ui.Widget);
    ui.Paragraph = Paragraph;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Table = (function (_super) {
        __extends(Table, _super);
        function Table(parent, model) {
            _super.call(this, parent);
            this._sortButtons = [];
            this._model = model;
            model.addTable(this);
            this._head = this._createHead();
            this._body = this._createBody();
            this.refresh();
            this._lastSortIndex = null;
            this._lastSortMode = null;
        }
        Object.defineProperty(Table.prototype, "model", {
            get: function () {
                return this.model;
            },
            enumerable: true,
            configurable: true
        });
        Table.prototype.createElement = function () {
            var element = document.createElement('table');
            return element;
        };
        Object.defineProperty(Table.prototype, "className", {
            get: function () {
                return 'ui-table';
            },
            enumerable: true,
            configurable: true
        });
        Table.prototype._createHead = function () {
            var e = document.createElement('thead');
            this.element.appendChild(e);
            return e;
        };
        Table.prototype._createBody = function () {
            var e = document.createElement('tbody');
            this.element.appendChild(e);
            return e;
        };
        Table.prototype.refresh = function () {
            var head = this._model.headers;
            var cells = this._model.cells;
            this._refreshHead(head);
            this._refreshBody(cells);
        };
        Table.prototype._refreshHead = function (head) {
            this._clearElement(this._head);
            this._sortButtons = [];
            var row = this._generateRow(head, 'th');
            this._head.appendChild(row);
        };
        Table.prototype._refreshBody = function (cells) {
            var _this = this;
            this._clearElement(this._body);
            cells.forEach(function (i) { return _this._body.appendChild(_this._generateRow(i)); });
        };
        Table.prototype._clearElement = function (e) {
            while (e.firstChild) {
                e.removeChild(e.firstChild);
            }
        };
        Table.prototype._generateRow = function (row, type) {
            var _this = this;
            if (type === void 0) { type = 'td'; }
            var tr = document.createElement('tr');
            row.forEach(function (i, index) {
                var td = document.createElement(type);
                td.appendChild(i);
                if (type == 'th') {
                    if (_this._model.canSort(index)) {
                        var sort = document.createElement('div');
                        sort.classList.add('sort-btn');
                        td.appendChild(sort);
                        sort.addEventListener('click', function () { return _this._sortColumn(index); });
                        _this._sortButtons.push(sort);
                    }
                    else {
                        _this._sortButtons.push(null);
                    }
                }
                tr.appendChild(td);
            });
            return tr;
        };
        Table.prototype.sortBy = function (field, order) {
            if (order === void 0) { order = ui.TableOrder.DEFAULT; }
            this._model.sortBy(field, order);
            this.refresh();
        };
        Table.prototype.sortByIndex = function (index, order) {
            if (order === void 0) { order = ui.TableOrder.DEFAULT; }
            this._model.sortByIndex(index, order);
            this.refresh();
        };
        Table.prototype._sortColumn = function (index) {
            var evt = new Event('sort');
            var dir = this._inverseDirection();
            evt.direction = dir;
            evt.index = index;
            this.fire('sort', evt);
            if (evt.defaultPrevented) {
                return;
            }
            this._lastSortIndex = dir;
            this.sortByIndex(index, dir);
            this._refreshSortButtons(index, dir);
        };
        Table.prototype._inverseDirection = function () {
            return this._lastSortIndex === ui.TableOrder.INVERSE ? ui.TableOrder.DEFAULT : ui.TableOrder.INVERSE;
        };
        Table.prototype._refreshSortButtons = function (index, order) {
            this._sortButtons.forEach(function (i) {
                if (i) {
                    i.classList.remove('asc');
                    i.classList.remove('desc');
                }
            });
            var btn = this._sortButtons[index];
            if (!btn) {
                return;
            }
            btn.classList.add(order === ui.TableOrder.DEFAULT ? 'desc' : 'asc');
        };
        return Table;
    })(ui.Widget);
    ui.Table = Table;
})(ui || (ui = {}));
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
/// <reference path="./Table.ts" />
var ui;
(function (ui) {
    var PropertyTable = (function (_super) {
        __extends(PropertyTable, _super);
        function PropertyTable() {
            _super.apply(this, arguments);
        }
        return PropertyTable;
    })(ui.Table);
    ui.PropertyTable = PropertyTable;
})(ui || (ui = {}));
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
/// <reference path="./Container.ts" />
var ui;
(function (ui) {
    var RadioGroup = (function (_super) {
        __extends(RadioGroup, _super);
        function RadioGroup(parent, name) {
            _super.call(this, parent);
            this.name = name;
        }
        Object.defineProperty(RadioGroup.prototype, "radios", {
            get: function () {
                return this.children;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioGroup.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
                this.radios.forEach(function (i) { return i.input.name = value; });
            },
            enumerable: true,
            configurable: true
        });
        RadioGroup.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        Object.defineProperty(RadioGroup.prototype, "className", {
            get: function () {
                return 'ui-radio-group';
            },
            enumerable: true,
            configurable: true
        });
        RadioGroup.prototype.addRadio = function (text) {
            return new ui.RadioInput(this, text);
        };
        RadioGroup.prototype.radio = function (text) {
            return this.addRadio(text);
        };
        RadioGroup.prototype.addCheckbox = function (name, label) {
            return new ui.Checkbox(this, name, label);
        };
        RadioGroup.prototype.checkbox = function (name, label) {
            return this.addCheckbox(name, label);
        };
        return RadioGroup;
    })(ui.Container);
    ui.RadioGroup = RadioGroup;
})(ui || (ui = {}));
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
/// <reference path="./Checkbox.ts" />
var ui;
(function (ui) {
    var RadioInput = (function (_super) {
        __extends(RadioInput, _super);
        function RadioInput(parent, text) {
            _super.call(this, parent, parent.name, text);
        }
        Object.defineProperty(RadioInput.prototype, "type", {
            get: function () {
                return 'radio';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioInput.prototype, "className", {
            get: function () {
                return 'ui-radio-button';
            },
            enumerable: true,
            configurable: true
        });
        return RadioInput;
    })(ui.Checkbox);
    ui.RadioInput = RadioInput;
})(ui || (ui = {}));
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
/// <reference path="./HandleOptions.ts"/>
var ui;
(function (ui) {
    var SelectInput = (function (_super) {
        __extends(SelectInput, _super);
        function SelectInput(parent, name) {
            _super.call(this, parent, name);
            this._select = this._createSelect();
            this._options = [];
            this._setupSelectEvents();
        }
        SelectInput.prototype.createElement = function () {
            var element = document.createElement('label');
            element.classList.add(this.className);
            return element;
        };
        SelectInput.prototype.createInput = function () {
            var s = document.createElement('select');
            this.element.appendChild(s);
            return s;
        };
        SelectInput.prototype._createSelect = function () {
            return this.input;
        };
        Object.defineProperty(SelectInput.prototype, "type", {
            get: function () {
                return 'select';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectInput.prototype, "className", {
            get: function () {
                return 'ui-select';
            },
            enumerable: true,
            configurable: true
        });
        SelectInput.prototype.add = function (value, name) {
            var opt = new ui.Option(this, value, name);
            return opt;
        };
        SelectInput.prototype.addOption = function (opt) {
            this._options.push(opt);
            this._select.appendChild(opt.element);
        };
        SelectInput.prototype.addGroup = function (text) {
            var g = new ui.OptionGroup(this, text);
            return g;
        };
        SelectInput.prototype.group = function (text) {
            return this.addGroup(text);
        };
        SelectInput.prototype.remove = function (opt) {
            this.removeAt(this.indexOf(opt));
        };
        SelectInput.prototype.option = function (value) {
            var options = this.options;
            var length = options.length;
            for (var i = 0; i < length; ++i) {
                if (!(options[i] instanceof ui.Option)) {
                    continue;
                }
                var option = options[i];
                if (option.value === value) {
                    return option;
                }
            }
            return null;
        };
        SelectInput.prototype.removeValue = function (value) {
            this.remove(this.option(value));
        };
        SelectInput.prototype.removeAt = function (index) {
            if (index >= 0 && index <= -1) {
                var opt = this._options[index];
                this._options.splice(index, 1);
                this._select.removeChild(opt.element);
            }
        };
        SelectInput.prototype.indexOf = function (opt) {
            return this.options.indexOf(opt);
        };
        SelectInput.prototype.contains = function (opt) {
            return this.indexOf(opt) !== -1;
        };
        Object.defineProperty(SelectInput.prototype, "options", {
            get: function () {
                return this._options.slice(0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectInput.prototype, "selectableOptions", {
            get: function () {
                return this.options.filter(function (i) { return i instanceof ui.Option; });
            },
            enumerable: true,
            configurable: true
        });
        SelectInput.prototype._setupInputEvents = function () {
        };
        SelectInput.prototype._setupSelectEvents = function () {
            this._select.addEventListener('change', this._onChange.bind(this));
        };
        return SelectInput;
    })(ui.Input);
    ui.SelectInput = SelectInput;
})(ui || (ui = {}));
/// <reference path="./Container.ts" />
var ui;
(function (ui) {
    var HResizePanel = (function (_super) {
        __extends(HResizePanel, _super);
        function HResizePanel(parent) {
            _super.call(this, parent);
        }
        HResizePanel.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        Object.defineProperty(HResizePanel.prototype, "className", {
            get: function () {
                return 'ui-h-resize-panel';
            },
            enumerable: true,
            configurable: true
        });
        return HResizePanel;
    })(ui.Container);
    var VResizePanel = (function (_super) {
        __extends(VResizePanel, _super);
        function VResizePanel(parent) {
            _super.call(this, parent);
        }
        VResizePanel.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        Object.defineProperty(VResizePanel.prototype, "className", {
            get: function () {
                return 'ui-v-resize-panel';
            },
            enumerable: true,
            configurable: true
        });
        return VResizePanel;
    })(ui.Container);
    var SplitPane = (function (_super) {
        __extends(SplitPane, _super);
        function SplitPane(parent, direction) {
            if (direction === void 0) { direction = 'h'; }
            _super.call(this, parent);
            this._leftPanel = this._createLeftPanel(direction);
            this._rightPanel = this._createRightPanel(direction);
        }
        SplitPane.prototype._createLeftPanel = function (d) {
            var panel = d === SplitPane.HORIZONTAL ?
                new HResizePanel(this) :
                new VResizePanel(this);
            return panel;
        };
        SplitPane.prototype._createRightPanel = function (d) {
            var panel = d === SplitPane.HORIZONTAL ?
                new HResizePanel(this) :
                new VResizePanel(this);
            return panel;
        };
        SplitPane.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        Object.defineProperty(SplitPane.prototype, "className", {
            get: function () {
                return 'ui-split-pane';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitPane.prototype, "panel1", {
            get: function () {
                return this._leftPanel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitPane.prototype, "panel2", {
            get: function () {
                return this._rightPanel;
            },
            enumerable: true,
            configurable: true
        });
        SplitPane.HORIZONTAL = 'h';
        SplitPane.VERTICAL = 'v';
        return SplitPane;
    })(ui.Container);
    ui.SplitPane = SplitPane;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var StatModel = (function () {
        function StatModel() {
            this._min = 0;
            this._max = 100;
            this._displays = [];
        }
        Object.defineProperty(StatModel.prototype, "min", {
            get: function () {
                return this._min;
            },
            set: function (value) {
                this._min = value;
                if (value > this.max) {
                    this.max = value;
                }
                this._refresh();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatModel.prototype, "max", {
            get: function () {
                return this._max;
            },
            set: function (value) {
                this._max = value;
                if (value < this.min) {
                    this.min = value;
                }
                this._refresh();
            },
            enumerable: true,
            configurable: true
        });
        StatModel.prototype.addDisplay = function (display) {
            this._displays.push(display);
        };
        StatModel.prototype._refresh = function () {
            this._displays.forEach(function (d) { return d.refresh(); });
        };
        return StatModel;
    })();
    ui.StatModel = StatModel;
    var StatWrapper = (function (_super) {
        __extends(StatWrapper, _super);
        function StatWrapper(stat) {
            _super.call(this);
            this._stat = stat;
        }
        Object.defineProperty(StatWrapper.prototype, "min", {
            get: function () {
                return this._stat.min;
            },
            set: function (value) {
                this._stat.min = value;
                if (value > this.max) {
                    this.max = value;
                }
                this._refresh();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatWrapper.prototype, "max", {
            get: function () {
                return this._stat.max;
            },
            set: function (value) {
                this._stat.max = value;
                if (value < this.min) {
                    this.min = value;
                }
                this._refresh();
            },
            enumerable: true,
            configurable: true
        });
        return StatWrapper;
    })(StatModel);
    ui.StatWrapper = StatWrapper;
    var StatDisplay = (function (_super) {
        __extends(StatDisplay, _super);
        function StatDisplay(parent, model) {
            _super.call(this, parent);
            this._model = model;
            this._data = [];
            this._color = '#FF0000';
            this.backgroundColor = '#FFF';
            this.rulerColor = '#000';
            this._from = 1;
            this._to = 99;
            this._canvas = this.createCanvas();
            this.refresh();
            this.createHorizontalRule();
            window.addEventListener('resize', this._onWindowResize.bind(this));
        }
        StatDisplay.prototype.createHorizontalRule = function () {
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
        };
        Object.defineProperty(StatDisplay.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (value) {
                this._color = value;
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatDisplay.prototype, "from", {
            get: function () {
                return this._from;
            },
            set: function (value) {
                this._from = value;
                if (value > this._to) {
                    this._to = value;
                }
                this._midTxt.nodeValue = this.mid.toString();
                this._fromTxt.nodeValue = value.toString();
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatDisplay.prototype, "to", {
            get: function () {
                return this._to;
            },
            set: function (value) {
                this._to = value;
                if (value < this._from) {
                    this._from = value;
                }
                this._midTxt.nodeValue = this.mid.toString();
                this._toTxt.nodeValue = value.toString();
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatDisplay.prototype, "mid", {
            get: function () {
                return (this.to - this.from) / 2 + this.from;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatDisplay.prototype, "data", {
            get: function () {
                return this._data.slice(0);
            },
            set: function (value) {
                this._data = value;
                this._adjustValues();
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        StatDisplay.prototype.setData = function (i, value, refresh) {
            if (refresh === void 0) { refresh = true; }
            if (i >= this.from && i <= this.to) {
                var min = this.model.min;
                var max = this.model.max;
                this._data[i - this.from] = Math.max(min, Math.min(value, max));
            }
            if (refresh) {
                this.refresh();
            }
        };
        StatDisplay.prototype.dataAt = function (i) {
            if (i >= this.from && i <= this.to) {
                return this._data[i - this.from];
            }
            return null;
        };
        StatDisplay.prototype._adjustValues = function () {
            this._data = this._data || [];
            var min = this.model.min;
            var max = this.model.max;
            for (var i = this.from; i <= this.to; ++i) {
                this.setData(i, this._data[i - this._from] || 0, false);
            }
        };
        StatDisplay.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        StatDisplay.prototype.createCanvas = function () {
            var element = document.createElement('canvas');
            this._context = element.getContext('2d');
            this.element.appendChild(element);
            element.addEventListener('click', this._onCanvasClick.bind(this));
            return element;
        };
        Object.defineProperty(StatDisplay.prototype, "context", {
            get: function () {
                return this._context;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatDisplay.prototype, "className", {
            get: function () {
                return 'ui-stat-display';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatDisplay.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatDisplay.prototype, "model", {
            get: function () {
                return this._model;
            },
            enumerable: true,
            configurable: true
        });
        StatDisplay.prototype.refresh = function () {
            var _a = this.canvasSize, w = _a[0], h = _a[1];
            this.resizeCanvas(w, h);
            this.drawBackground(w, h);
            this.drawCurve(w, h);
            this.drawRuler(w, h);
        };
        Object.defineProperty(StatDisplay.prototype, "canvasSize", {
            get: function () {
                return [this.canvasWidth, this.canvasHeight];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatDisplay.prototype, "canvasWidth", {
            get: function () {
                return (this.to - this.from + 1) * 5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatDisplay.prototype, "canvasHeight", {
            get: function () {
                return this.model.max - this.model.min + 11;
            },
            enumerable: true,
            configurable: true
        });
        StatDisplay.prototype.drawBackground = function (w, h) {
            this.context.fillStyle = this.backgroundColor;
            this.context.fillRect(0, 0, w, h);
            this.context.fillStyle = this.color;
        };
        StatDisplay.prototype.drawCurve = function (w, h) {
            for (var i = this.from; i <= this.to; ++i) {
                var size = this.dataAt(i);
                var x = (i - this.from) * 5;
                var y = h - size - 10;
                this.context.fillRect(x + 1, y, 3, size);
            }
        };
        StatDisplay.prototype.drawRuler = function (w, h) {
            this.context.fillStyle = this.rulerColor;
            this.context.fillRect(1, h - 10, w - 2, 5);
            this.context.fillRect(1, h - 10, 3, 10);
            this.context.fillRect(w - 4, h - 10, 3, 10);
            this.context.fillRect(Math.floor(w / 2) - 1, h - 10, 3, 10);
        };
        StatDisplay.prototype.resizeCanvas = function (w, h) {
            this.canvas.width = w;
            this.canvas.height = h;
            var ratio = this.canvas.offsetWidth * this.ratio;
            this.canvas.style.maxHeight = ratio + "px";
            this.canvas.style.height = ratio + "px";
        };
        StatDisplay.prototype._onWindowResize = function () {
            this.refresh();
        };
        Object.defineProperty(StatDisplay.prototype, "ratio", {
            get: function () {
                return 3 / 4;
            },
            enumerable: true,
            configurable: true
        });
        StatDisplay.prototype.valuesByCoord = function (x, y) {
            var index = this.indexByCoord(x);
            var value = this.valueByCoord(y);
            return [index, value];
        };
        StatDisplay.prototype.indexByCoord = function (x) {
            return Math.floor(x * this.canvas.width / (this.canvas.offsetWidth * 5)) + this.from;
        };
        StatDisplay.prototype.valueByCoord = function (y) {
            return Math.floor(this.model.min + this.model.max - y * this.canvas.height / this.canvas.offsetHeight);
        };
        StatDisplay.prototype._onCanvasClick = function (event) {
            var _a = this.valuesByCoord(event.offsetX, event.offsetY), index = _a[0], value = _a[1];
            var evt = new Event('stat-click');
            evt.index = index;
            evt.value = value;
            this.fire('stat-click', evt);
        };
        return StatDisplay;
    })(ui.Widget);
    ui.StatDisplay = StatDisplay;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Switch = (function (_super) {
        __extends(Switch, _super);
        function Switch(parent, name, onTxt, offTxt) {
            if (onTxt === void 0) { onTxt = ''; }
            if (offTxt === void 0) { offTxt = ''; }
            _super.call(this, parent);
            this._uniqId = ui.randomId();
            this._input = this._createInput(name);
            this._label = this._createLabel(name);
            this._inner = this._createInner();
            this._switch = this._createSwitch();
            this._before = this._createBefore();
            this._after = this._createAfter();
            this._generateText(onTxt, offTxt);
            this.input.name = name;
        }
        Object.defineProperty(Switch.prototype, "name", {
            get: function () {
                return this.input.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Switch.prototype, "input", {
            get: function () {
                return this._input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Switch.prototype, "onText", {
            get: function () {
                return this._beforeTxt.nodeValue;
            },
            set: function (value) {
                this._beforeTxt.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Switch.prototype, "offText", {
            get: function () {
                return this._afterTxt.nodeValue;
            },
            set: function (value) {
                this._afterTxt.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Switch.prototype._generateText = function (onTxt, offTxt) {
            this._beforeTxt = document.createTextNode(onTxt);
            this._afterTxt = document.createTextNode(offTxt);
            this._before.appendChild(this._beforeTxt);
            this._after.appendChild(this._afterTxt);
        };
        Switch.prototype._createInner = function () {
            var e = document.createElement('span');
            e.classList.add('ui-switch-inner');
            this._label.appendChild(e);
            return e;
        };
        Switch.prototype._createBefore = function () {
            var before = document.createElement('span');
            before.classList.add('before');
            this._inner.appendChild(before);
            return before;
        };
        Switch.prototype._createAfter = function () {
            var after = document.createElement('span');
            after.classList.add('after');
            this._inner.appendChild(after);
            return after;
        };
        Switch.prototype._createSwitch = function () {
            var e = document.createElement('span');
            e.classList.add('ui-switch-switch');
            this._label.appendChild(e);
            return e;
        };
        Object.defineProperty(Switch.prototype, "type", {
            get: function () {
                return 'checkbox';
            },
            enumerable: true,
            configurable: true
        });
        Switch.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        Switch.prototype._createLabel = function (name) {
            var l = document.createElement('label');
            l.htmlFor = this._uniqId;
            this.element.appendChild(l);
            return l;
        };
        Switch.prototype._createInput = function (name) {
            var input = document.createElement('input');
            input.type = this.type;
            input.id = this._uniqId;
            input.name = name;
            this.element.appendChild(input);
            return input;
        };
        Object.defineProperty(Switch.prototype, "className", {
            get: function () {
                return 'ui-switch';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Switch.prototype, "checked", {
            get: function () {
                return this.input.checked;
            },
            set: function (value) {
                this.input.checked = value;
            },
            enumerable: true,
            configurable: true
        });
        return Switch;
    })(ui.Widget);
    ui.Switch = Switch;
})(ui || (ui = {}));
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
/// <reference path="./Container.ts" />
var ui;
(function (ui) {
    var TabHeader = (function (_super) {
        __extends(TabHeader, _super);
        function TabHeader(parent) {
            _super.call(this, parent);
        }
        Object.defineProperty(TabHeader.prototype, "tab", {
            get: function () {
                return this.parent;
            },
            enumerable: true,
            configurable: true
        });
        TabHeader.prototype.createElement = function () {
            return document.createElement('ul');
        };
        Object.defineProperty(TabHeader.prototype, "className", {
            get: function () {
                return 'ui-tab-header';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabHeader.prototype, "pages", {
            get: function () {
                return this.children;
            },
            enumerable: true,
            configurable: true
        });
        TabHeader.prototype.addPage = function (name, closeButton) {
            if (closeButton === void 0) { closeButton = false; }
            var tab = this.parent;
            var head = this._createHead(name, closeButton);
            var page = this._createPage(head);
            return page;
        };
        TabHeader.prototype._createHead = function (name, closeButton) {
            var head = new Tab.Head(this, name, closeButton);
            this.addChild(head);
            return head;
        };
        TabHeader.prototype._createPage = function (head) {
            var page = new Tab.Page(this.tab.body, head);
            return page;
        };
        TabHeader.prototype.removePage = function (page) {
            this.removeChild(page.head);
            this.tab.body.removeChild(page);
        };
        TabHeader.prototype.select = function (page) {
            this.tab.selectPage(page);
        };
        return TabHeader;
    })(ui.Container);
    var TabHead = (function (_super) {
        __extends(TabHead, _super);
        function TabHead(parent, text, closeButton) {
            _super.call(this, parent);
            this._text = this.createText(text);
            this._anchor = this.createAnchor();
            this._closeButton = null;
            this._page = null;
            this.element.appendChild(this._anchor);
            this._anchor.appendChild(this._text);
            if (closeButton) {
                this._closeButton = this.createCloseButton();
            }
        }
        Object.defineProperty(TabHead.prototype, "header", {
            get: function () {
                return this.parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabHead.prototype, "tab", {
            get: function () {
                return this.header.tab;
            },
            enumerable: true,
            configurable: true
        });
        TabHead.prototype.createText = function (text) {
            var txt = document.createTextNode(text);
            return txt;
        };
        TabHead.prototype.createAnchor = function () {
            var a = document.createElement('a');
            a.href = "#";
            a.addEventListener('click', this._onAnchorClick.bind(this));
            return a;
        };
        TabHead.prototype.createCloseButton = function () {
            var btn = document.createElement('button');
            btn.classList.add('ui-close');
            btn.addEventListener('click', this._onCloseButton.bind(this));
            btn.appendChild(document.createTextNode('X'));
            this.element.appendChild(btn);
            return btn;
        };
        Object.defineProperty(TabHead.prototype, "page", {
            get: function () {
                return this._page;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabHead.prototype, "text", {
            get: function () {
                return this._text.nodeValue;
            },
            set: function (value) {
                this._text.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabHead.prototype, "active", {
            get: function () {
                return this.classList.contains('active');
            },
            set: function (value) {
                if (value) {
                    this.deselect();
                }
                else {
                    this.select();
                }
            },
            enumerable: true,
            configurable: true
        });
        TabHead.prototype.createElement = function () {
            return document.createElement('li');
        };
        Object.defineProperty(TabHead.prototype, "className", {
            get: function () {
                return 'ui-tab-head';
            },
            enumerable: true,
            configurable: true
        });
        TabHead.prototype._onAnchorClick = function (event) {
            this.fire('click', event);
            if (!event.defaultPrevented) {
                this.select();
            }
            event.preventDefault();
        };
        TabHead.prototype._onCloseButton = function (event) {
            this.fire('close', event);
            if (!event.defaultPrevented) {
                this.close();
            }
            event.preventDefault();
        };
        TabHead.prototype.close = function () {
            this.deselect();
            this.tab.removePage(this.page);
        };
        TabHead.prototype.select = function () {
            if (this.index !== this.tab.index && this.enabled) {
                this.tab.selectPage(this.page);
            }
        };
        TabHead.prototype.deselect = function () {
            if (this.index === this.tab.index) {
                this.tab.index = -1;
            }
        };
        TabHead.prototype.setPage = function (page) {
            this._page = page;
        };
        Object.defineProperty(TabHead.prototype, "index", {
            get: function () {
                return this.header.indexOf(this);
            },
            enumerable: true,
            configurable: true
        });
        TabHead.prototype.setIndex = function (value) {
            var index = Math.min(Math.max(value, 0), this.header.length);
            this.header.removeChild(this);
            this.header.addChildAt(this, index);
        };
        TabHead.prototype.enable = function () {
            if (this.disabled) {
                this.classList.remove('disabled');
            }
            if (this.page.disabled) {
                this.page.enable();
            }
        };
        TabHead.prototype.disable = function () {
            if (this.enabled) {
                this.classList.add('disabled');
            }
            if (this.page.enabled) {
                this.page.disable();
            }
            this.deselect();
        };
        Object.defineProperty(TabHead.prototype, "disabled", {
            get: function () {
                return this.classList.contains('disabled');
            },
            set: function (value) {
                if (value) {
                    this.disable();
                }
                else {
                    this.enable();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabHead.prototype, "enabled", {
            get: function () {
                return !this.disabled;
            },
            set: function (value) {
                this.disabled = !value;
            },
            enumerable: true,
            configurable: true
        });
        return TabHead;
    })(ui.Widget);
    var TabBody = (function (_super) {
        __extends(TabBody, _super);
        function TabBody(parent) {
            _super.call(this, parent);
        }
        TabBody.prototype.createElement = function () {
            return document.createElement('ul');
        };
        Object.defineProperty(TabBody.prototype, "className", {
            get: function () {
                return 'ui-tab-body';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabBody.prototype, "tab", {
            get: function () {
                return this.parent;
            },
            enumerable: true,
            configurable: true
        });
        return TabBody;
    })(ui.Container);
    var TabPage = (function (_super) {
        __extends(TabPage, _super);
        function TabPage(parent, head) {
            _super.call(this, parent);
            this._head = head;
            head.setPage(this);
        }
        TabPage.prototype.createElement = function () {
            return document.createElement('li');
        };
        Object.defineProperty(TabPage.prototype, "className", {
            get: function () {
                return 'ui-tab-page';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPage.prototype, "head", {
            get: function () {
                return this._head;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPage.prototype, "body", {
            get: function () {
                return this.parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPage.prototype, "tab", {
            get: function () {
                return this.body.tab;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPage.prototype, "index", {
            get: function () {
                return this.body.indexOf(this);
            },
            enumerable: true,
            configurable: true
        });
        TabPage.prototype.select = function () {
            if (this.index !== this.tab.index && this.enabled) {
                this.tab.selectPage(this);
            }
        };
        TabPage.prototype.deselect = function () {
            if (this.active) {
                this.tab.index = -1;
            }
        };
        Object.defineProperty(TabPage.prototype, "active", {
            get: function () {
                return this.classList.contains('active');
            },
            set: function (value) {
                if (value) {
                    this.deselect();
                }
                else {
                    this.select();
                }
            },
            enumerable: true,
            configurable: true
        });
        TabPage.prototype.enable = function () {
            if (this.disabled) {
                this.classList.remove('disabled');
            }
            if (this.head.disabled) {
                this.head.enable();
            }
        };
        TabPage.prototype.disable = function () {
            if (this.enabled) {
                this.classList.add('disabled');
            }
            if (this.head.enabled) {
                this.head.disable();
            }
            this.deselect();
        };
        Object.defineProperty(TabPage.prototype, "disabled", {
            get: function () {
                return this.classList.contains('disabled');
            },
            set: function (value) {
                if (value) {
                    this.disable();
                }
                else {
                    this.enable();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPage.prototype, "enabled", {
            get: function () {
                return !this.disabled;
            },
            set: function (value) {
                this.disabled = !value;
            },
            enumerable: true,
            configurable: true
        });
        TabPage.prototype.close = function () {
            this.deselect();
            this.tab.removePage(this);
        };
        return TabPage;
    })(ui.Container);
    var Tab = (function (_super) {
        __extends(Tab, _super);
        function Tab(parent) {
            _super.call(this, parent);
            var element = this.element;
            this._header = new TabHeader(this);
            this._body = new TabBody(this);
            this._disabled = [];
            this._index = -1;
        }
        Object.defineProperty(Tab.prototype, "header", {
            get: function () {
                return this._header;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "body", {
            get: function () {
                return this._body;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "pages", {
            get: function () {
                return this._header.pages;
            },
            enumerable: true,
            configurable: true
        });
        Tab.prototype.createElement = function () {
            return document.createElement('div');
        };
        Object.defineProperty(Tab.prototype, "className", {
            get: function () {
                return 'ui-tab';
            },
            enumerable: true,
            configurable: true
        });
        Tab.prototype.addPage = function (text, closeButton) {
            if (closeButton === void 0) { closeButton = false; }
            var page = this.header.addPage(text, closeButton);
            return page;
        };
        Tab.prototype.removePage = function (page) {
            return this.header.removePage(page);
        };
        Tab.prototype.selectPage = function (page) {
            var index = this.body.indexOf(page);
            this.index = index;
        };
        Object.defineProperty(Tab.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (index) {
                if (this.index >= 0) {
                    if (this.body.children[this.index]) {
                        this.body.children[this.index].classList.remove('active');
                        this.header.children[this.index].classList.remove('active');
                    }
                }
                if (index >= 0 && index < this.body.length && this.isEnabled(index)) {
                    this._index = index;
                    this.body.children[this.index].classList.add('active');
                    this.header.children[this.index].classList.add('active');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "currentTabHeader", {
            get: function () {
                var index = this.index;
                return index < 0 ? null : this.header[index];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "currentPage", {
            get: function () {
                var index = this.index;
                return index < 0 ? null : this.pages[index];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "firstTabHeader", {
            get: function () {
                return this.header.length <= 0 ? null : this.header[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "firstPage", {
            get: function () {
                return this.pages.length <= 0 ? null : this.pages[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "lastTabHeader", {
            get: function () {
                var length = this.header.length;
                return length <= 0 ? null : this.header[length];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "lastPage", {
            get: function () {
                var length = this.pages.length;
                return length <= 0 ? null : this.pages[length];
            },
            enumerable: true,
            configurable: true
        });
        Tab.prototype.enable = function (index) {
            if (index >= 0 && index < this.pages.length) {
                this._disabled[index] = false;
                this.pages[index].disable();
            }
        };
        Tab.prototype.disable = function (index) {
            this._disabled[index] = true;
            this.pages[index].enable();
        };
        Tab.prototype.isEnabled = function (index) {
            return !this.isDisabled(index);
        };
        Tab.prototype.isDisabled = function (index) {
            return !!this._disabled[index];
        };
        Object.defineProperty(Tab.prototype, "vertical", {
            get: function () {
                return this.classList.contains('vertical');
            },
            set: function (value) {
                if (value) {
                    this.classList.add('vertical');
                }
                else {
                    this.classList.remove('vertical');
                }
            },
            enumerable: true,
            configurable: true
        });
        Tab.Header = TabHeader;
        Tab.Body = TabBody;
        Tab.Head = TabHead;
        Tab.Page = TabPage;
        return Tab;
    })(ui.Container);
    ui.Tab = Tab;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    (function (TableOrder) {
        TableOrder[TableOrder["DEFAULT"] = 0] = "DEFAULT";
        TableOrder[TableOrder["INVERSE"] = 1] = "INVERSE";
    })(ui.TableOrder || (ui.TableOrder = {}));
    var TableOrder = ui.TableOrder;
    var TableModel = (function () {
        function TableModel(data) {
            this._data = data;
            this._order = null;
            this._orderMode = TableOrder.DEFAULT;
            this._cells = null;
            this._tables = [];
            this._fields = [];
        }
        Object.defineProperty(TableModel.prototype, "fields", {
            get: function () {
                return this._fields.slice(0);
            },
            set: function (value) {
                this._fields = value;
                this._refresh();
            },
            enumerable: true,
            configurable: true
        });
        TableModel.prototype.canSort = function (index) {
            return this.fields[index].sortable;
        };
        Object.defineProperty(TableModel.prototype, "fieldsByName", {
            get: function () {
                var fields = this.fields;
                var result = {};
                fields.forEach(function (f) { return result[f.name] = f; });
                return result;
            },
            enumerable: true,
            configurable: true
        });
        TableModel.prototype.sortBy = function (key, dir) {
            if (dir === void 0) { dir = TableOrder.DEFAULT; }
            var field = this.fieldsByName[key];
            if (!field) {
                return;
            }
            this._order = key;
            this._orderMode = dir;
            this._cells = null;
        };
        TableModel.prototype.sortByIndex = function (index, dir) {
            if (dir === void 0) { dir = TableOrder.DEFAULT; }
            var field = this.fields[index];
            if (!field) {
                return;
            }
            this._order = field.name;
            this._orderMode = dir;
            this._cells = null;
        };
        Object.defineProperty(TableModel.prototype, "data", {
            get: function () {
                return this._data.slice(0);
            },
            set: function (data) {
                this._data = data;
                this._refresh();
            },
            enumerable: true,
            configurable: true
        });
        TableModel.prototype._refresh = function () {
            var _this = this;
            var fields = this.fields;
            if (this._order) {
                var fn = this.fieldsByName;
                var order = this._orderMode == TableOrder.DEFAULT ? 1 : -1;
                this._data.sort(function (a, b) { return fn[_this._order].sort(a, b) * order; });
            }
            this._cells = this._data.map(function (row) { return _this._processData(fields, row); });
            this._tables.forEach(function (i) { return i.refresh(); });
        };
        TableModel.prototype._processData = function (fields, row) {
            return fields.map(function (field) { return field.format(row); });
        };
        Object.defineProperty(TableModel.prototype, "headers", {
            get: function () {
                return this.fields.map(function (f) { return f.header(); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableModel.prototype, "cells", {
            get: function () {
                if (!this._cells) {
                    this._refresh();
                }
                return this._cells;
            },
            enumerable: true,
            configurable: true
        });
        TableModel.prototype.addTable = function (table) {
            this._tables.push(table);
        };
        return TableModel;
    })();
    ui.TableModel = TableModel;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        function TextInput() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(TextInput.prototype, "type", {
            get: function () {
                return 'text';
            },
            enumerable: true,
            configurable: true
        });
        return TextInput;
    })(ui.Input);
    ui.TextInput = TextInput;
})(ui || (ui = {}));
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
/// <reference path="./Container.ts" />
var ui;
(function (ui) {
    var Toolbar = (function (_super) {
        __extends(Toolbar, _super);
        function Toolbar() {
            _super.apply(this, arguments);
        }
        Toolbar.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        Object.defineProperty(Toolbar.prototype, "className", {
            get: function () {
                return 'ui-toolbar';
            },
            enumerable: true,
            configurable: true
        });
        Toolbar.prototype.icon = function (name) {
            var btn = new ui.ToolbarIcon(this);
            var icon = new ui.FontAwesomeIcon(btn, name);
            return btn;
        };
        Toolbar.prototype.separator = function () {
            var sep = new ui.ToolbarSeparator(this);
            return sep;
        };
        return Toolbar;
    })(ui.Container);
    ui.Toolbar = Toolbar;
})(ui || (ui = {}));
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
/// <reference path="./Container.ts" />
var ui;
(function (ui) {
    var ToolbarIcon = (function (_super) {
        __extends(ToolbarIcon, _super);
        function ToolbarIcon() {
            _super.apply(this, arguments);
        }
        ToolbarIcon.prototype.createElement = function () {
            var element = document.createElement('button');
            return element;
        };
        Object.defineProperty(ToolbarIcon.prototype, "className", {
            get: function () {
                return 'ui-toolbar-icon';
            },
            enumerable: true,
            configurable: true
        });
        return ToolbarIcon;
    })(ui.Container);
    ui.ToolbarIcon = ToolbarIcon;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var ToolbarSeparator = (function (_super) {
        __extends(ToolbarSeparator, _super);
        function ToolbarSeparator() {
            _super.apply(this, arguments);
        }
        ToolbarSeparator.prototype.createElement = function () {
            var element = document.createElement('span');
            return element;
        };
        Object.defineProperty(ToolbarSeparator.prototype, "className", {
            get: function () {
                return 'separator';
            },
            enumerable: true,
            configurable: true
        });
        return ToolbarSeparator;
    })(ui.Widget);
    ui.ToolbarSeparator = ToolbarSeparator;
})(ui || (ui = {}));
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
/// <reference path="./Container.ts" />
var ui;
(function (ui) {
    var Window = (function (_super) {
        __extends(Window, _super);
        function Window(title, closeButton) {
            if (title === void 0) { title = ''; }
            if (closeButton === void 0) { closeButton = true; }
            _super.call(this, null);
            this._body = this.createBody();
            this.id = ui.randomId();
            this._title = this.createTitle(title);
            this._closeBtn = closeButton ? this.createCloseButton() : null;
            var cf = document.createElement('div');
            cf.classList.add('clear');
            this.body.appendChild(cf);
        }
        Object.defineProperty(Window.prototype, "body", {
            get: function () {
                return this._body;
            },
            enumerable: true,
            configurable: true
        });
        Window.prototype.createBody = function () {
            var element = document.createElement('div');
            element.classList.add('body');
            this.element.appendChild(element);
            element.addEventListener('click', this._onBodyClick.bind(this));
            return element;
        };
        Object.defineProperty(Window.prototype, "className", {
            get: function () {
                return 'ui-window';
            },
            enumerable: true,
            configurable: true
        });
        Window.prototype.appendElement = function (element) {
            this.body.appendChild(element);
        };
        Window.prototype.removeElement = function (element) {
            this.body.removeChild(element);
        };
        Window.prototype.addText = function (text) {
            this.body.appendChild(document.createTextNode(text));
        };
        Object.defineProperty(Window.prototype, "visible", {
            get: function () {
                return this.style.visibility == "visible";
            },
            set: function (value) {
                this.style.visibility = value ? "visible" : "hidden";
                if (this.visible) {
                    this.classList.add('visible');
                }
                else {
                    this.classList.remove('visible');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Window.prototype, "hidden", {
            get: function () {
                return !this.visible;
            },
            set: function (value) {
                this.visible = !value;
            },
            enumerable: true,
            configurable: true
        });
        Window.prototype.show = function () {
            this.visible = true;
        };
        Window.prototype.hide = function () {
            this.visible = false;
        };
        Window.prototype.toggle = function () {
            if (this.visible) {
                this.hide();
            }
            else {
                this.show();
            }
        };
        Window.prototype.close = function () {
            this.hide();
        };
        Window.prototype.createCloseButton = function () {
            var btn = document.createElement('button');
            btn.classList.add('ui-close');
            btn.addEventListener('click', this._onClick.bind(this));
            btn.appendChild(document.createTextNode('X'));
            this.body.appendChild(btn);
            return btn;
        };
        Window.prototype.createTitle = function (title) {
            var e = document.createElement('h3');
            this._titleText = document.createTextNode(title);
            e.appendChild(this._titleText);
            this.body.appendChild(e);
            return e;
        };
        Window.prototype._onClick = function (event) {
            _super.prototype._onClick.call(this, event);
            if (!event.defaultPrevented) {
                this.close();
            }
        };
        Window.prototype._onBodyClick = function (event) {
            if (event.stopPropagation) {
                event.stopPropagation(); // W3C model
            }
            else {
                event.cancelBubble = true; // IE model
            }
        };
        Object.defineProperty(Window.prototype, "title", {
            get: function () {
                return this._titleText.nodeValue;
            },
            set: function (value) {
                this._titleText.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        return Window;
    })(ui.Container);
    ui.Window = Window;
})(ui || (ui = {}));
//# sourceMappingURL=ui.js.map