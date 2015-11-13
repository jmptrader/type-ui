var app = new ui.Application();

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

var panel = new ui.Panel(app);

var btn1 = new ui.Button(panel, "Click me!");
btn1.on('click', function () { alert('How you date to click me!'); });

new ui.HorizontalRule(app);

var formGrid = new ui.Grid(app);

var formRow = formGrid.row();
  formRow.cell({md: 3});
  var formCell = formRow.cell({md: 6});

var formPanel = new ui.Panel(formCell);

var form = new ui.Form(formPanel);

var fieldset = form.fieldset('Inputs');

var group = fieldset.group();
group.label('', 'Label');

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

var ol = new ui.OrderedList();
  ol.item().addText("Item 1");
  ol.item().addText("Item 2");
  ol.item().addText("Item 3");

var ul = new ui.UnorderedList();
  ul.item().addText("Item 1");
  ul.item().addText("Item 2");
  ul.item().addText("Item 3");
