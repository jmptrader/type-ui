var app = new ui.Application();

var menu = new ui.Menu(app);
  var i1 = menu.item('Item 1');
  var i2 = menu.subMenu('Menu 1');
    i2.item('Sub Item 1');
  var i3 = menu.item('Item 2');
  menu.separator();
  var i4 = menu.subMenu('Menu 2');
    i4.item('Sub Item 1');
    i4.separator();
    i4.item('Sub Item 2');
    var sm1 = i4.subMenu('Sub Menu');
      sm1.item('Sub Item 1');
      sm1.item('Sub Item 2');

var r1  = app.grid().row();
var cx1 = r1.cell({md: 3});
var cx2 = r1.cell({md: 6});
var cx3 = r1.cell({md: 3});

new ui.H1(cx1, 'Header 1');
new ui.H2(cx1, 'Header 2');
new ui.H3(cx1, 'Header 3');
new ui.H4(cx1, 'Header 4');
new ui.H5(cx1, 'Header 5');
new ui.H6(cx1, 'Header 6');

var tab = new ui.Tab(cx2);

var page1 = tab.addPage("First Tab");
var page2 = tab.addPage("Second Tab");
var page3 = tab.addPage("Disabled Tab");

page1.element.appendChild(document.createTextNode('Hello world'));
page3.disable();

tab.addPage("Closeable tab", true);

tab.index = 0;

var sp1 = new ui.SplitPane(app, ui.SplitPane.HORIZONTAL);
var sp2 = new ui.SplitPane(app, ui.SplitPane.VERTICAL);

sp1.panel1.addText("Split 1-A");
sp1.panel2.addText("Split 1-B");

sp2.panel1.addText("Split 2-A");
sp2.panel2.addText("Split 2-B");

new ui.HorizontalRule(app);

var formGrid = new ui.Grid(app);

var formRow = formGrid.row();
  formRow.cell({md: 3});
  var formCell = formRow.cell({md: 6});

var formPanel = new ui.Panel(formCell);

var form = new ui.Form(formPanel);

var fieldset = form.fieldset('Inputs');

var group = fieldset.group();
  group.text('text', 'Text Input');
group = fieldset.group();
  group.number('number', 'Number Input');
group = fieldset.group();
  group.color('color', 'Color Input');
  group = fieldset.group();
    group.color('color', 'Color Input 2');  
group = fieldset.group();
  group.date('date', 'Date Input');
group = fieldset.group();
  group.checkbox('check', 'Do something cool');
group = fieldset.group('radio');
  var rg = group.radioGroup('radio', 'Do something cool');
    var r1 = rg.radio('Yes'); r1.checked = true;
    var r2 = rg.radio('No');
group = fieldset.group();
  rg = group.radioGroup('opts', 'Options');
  var ch1 = rg.checkbox('o1', 'An option'); ch1.checked = true;
  rg.checkbox('o2', 'Another option');
  group = fieldset.group();
    var sel = group.select('select', 'A selection');
      sel.add('s1', 'This <Is a selection>');
      sel.add('s2', 'Selection 2');
      var sg1 = sel.group('Grouping 1');
        sg1.add('s3', 'Selection Group 1');
        sg1.add('s4', 'Selection Group 2');

group = fieldset.group();
    group.submit('Submit');

new ui.HorizontalRule(app);

var grid = new ui.Grid(app);
var row = grid.row();
  var cell1 = row.cell({xs: 12, sm: 6, md: 4, lg: 3});
    cell1.addText('cell-1');
  var cell2 = row.cell({xs: 12, sm: 6, md: 4, lg: 3});
    cell2.addText('cell-2');
  var cell3 = row.cell({xs: 12, sm: 6, md: 4, lg: 3});
    cell3.addText('cell-3');
  var cell4 = row.cell({xs: 12, sm: 6, md: 4, lg: 3});
    cell4.addText('cell-4');

new ui.HorizontalRule(app);

var p = new ui.Paragraph(app, "This is a paragraph.");

new ui.HorizontalRule(app);

var quote = new ui.Blockquote(app);
quote.quote = 'This is a blockquote';
quote.footer = 'It was made by me';

var quote2 = new ui.Blockquote(app);
quote2.quote = 'This is another blockquote, but it doesn\'t have a footer';

new ui.HorizontalRule(app);

var ol = new ui.OrderedList(app);
  ol.item().addText("Item 1");
  ol.item().addText("Item 2");
  ol.item().addText("Item 3");

var ul = new ui.UnorderedList(app);
  ul.item().addText("Item 1");
  ul.item().addText("Item 2");
  ul.item().addText("Item 3");

var editor = new ui.AceEditor(app, 'editor');
editor.value = 'function test() {}';

var icon1 = new ui.FontAwesomeIcon(app, 'spinner');
  icon1.spin = true;
  icon1.size = ui.FontAwesomeSize.X5;
var icon2 = new ui.FontAwesomeIcon(app, 'spinner');
  icon2.pulse = true;
  icon2.size  = ui.FontAwesomeSize.LARGE;
var icon3 = new ui.FontAwesomeStack(app, 'circle', 'flag', ui.FontAwesomeStackOrder.INVERSE);
icon3.upper.inverse = true;
var icon4 = new ui.FontAwesomeStack(app, 'twitter', 'square-o');
  icon4.size = ui.FontAwesomeSize.LARGE;
