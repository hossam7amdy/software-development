# Hyper Text Markup Language (HTML)

HTML is the standard markup language for creating Web pages.

## HTML5 Features

- New semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- New form input types (`date`, `time`, `email`, `url`, `search`, `tel`, `number`, `range`, `color`).
- New form attributes (`autocomplete`, `autofocus`, `form`, `formaction`, `formenctype`, `formmethod`, `formnovalidate`, `formtarget`, `height`, `list`, `min`, `max`, `multiple`, `pattern`, `placeholder`, `required`, `step`, `width`).
- New multimedia elements (`<audio>`, `<video>`, `<source>`, `<track>`, `<embed>`).
- New graphic elements (`<canvas>`, `<svg>`, `<math>`).
- New API's (`Geolocation`, `Drag and Drop`, `Web Storage`, `Web Workers`, `Server-Sent Events`, `Web Sockets`, `WebRTC`, `Web Audio`, `WebGL`, `IndexedDB`, `File API`, `History`, `Web Components`).

## Why semantic HTML is important?

- **Accessibility**: Screen readers and other assistive technologies rely on semantic HTML to properly interpret the content of a web page.
- **SEO**: Search engines use semantic HTML to understand the content of a web page and rank it accordingly.

## Common HTML Tags

### Structural Tags

- `<!DOCTYPE html>`: Document type declaration.
- `<html>`: Root element.
- `<head>`: Container for metadata.
- `<title>`: Title of the document.
- `<meta>`: Metadata.
- `<link>`: External resource link.
- `<style>`: Internal style sheet.
- `<script>`: JavaScript code.
- `<body>`: Container for content.
- `<header>`: Header section.
- `<nav>`: Navigation section.
- `<main>`: Main content section.
- `<section>`: Section of content.
- `<article>`: Independent content.
- `<aside>`: Sidebar content.
- `<footer>`: Footer section.

### Text Tags

- `<h1>` to `<h6>`: Headings.
- `<p>`: Paragraph.
- `<a>`: Anchor.
- `<strong>`: Strong importance.
- `<em>`: Emphasis.
- `<mark>`: Marked text.
- `<del>`: Deleted text.
- `<ins>`: Inserted text.
- `<sub>`: Subscript.
- `<sup>`: Superscript.
- `<q>`: Short quotation.
- `<blockquote>`: Block quotation.
- `<pre>`: Preformatted text.
- `<code>`: Code.
- `<abbr>`: Abbreviation.
- `<time>`: Date and time.
- `<address>`: Contact information.

### List Tags

- `<ul>`: Unordered list.
- `<ol>`: Ordered list.
- `<li>`: List item.
- `<dl>`: Description list.
- `<dt>`: Description term.
- `<dd>`: Description details.

### Table Tags

- `<table>`: Table.
- `<caption>`: Table caption.
- `<tr>`: Table row.
- `<th>`: Table header cell.
- `<td>`: Table data cell.
- `<thead>`: Table head.
- `<tbody>`: Table body.
- `<tfoot>`: Table foot.
- `<col>`: Table column.
- `<colgroup>`: Table column group.
- `<caption>`: Table caption.

### Form Tags

- `<form>`: Form.
- `<input>`: Input field.
- `<textarea>`: Text area.
- `<button>`: Button.
- `<select>`: Dropdown list.
- `<option>`: Dropdown option.
- `<label>`: Label.
- `<fieldset>`: Fieldset.
- `<legend>`: Legend.
- `<datalist>`: Dropdown list options.
- `<output>`: Output.

### Media Tags

- `<img>`: Image.
- `<audio>`: Audio.
- `<video>`: Video.
- `<source>`: Media source.
- `<track>`: Media track.
- `<map>`: Image map.
- `<area>`: Image map area.
- `<canvas>`: Canvas.
- `<svg>`: Scalable Vector Graphics.

### Embedded Tags

- `<iframe>`: Inline frame.
- `<embed>`: Embedded content.
- `<object>`: Object.
- `<param>`: Object parameter.
- `<applet>`: Java applet.
- `<base>`: Base URL.

### Meta Tags

- `<meta charset="UTF-8">`: Character encoding.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Viewport settings.
- `<meta name="description" content="...">`: Description.
- `<meta name="keywords" content="...">`: Keywords.
- `<meta name="author" content="...">`: Author.
- `<meta name="robots" content="index, follow">`: Search engine instructions.
- `<meta http-equiv="refresh" content="5; url=...">`: Refresh.

### Link Tags

- `<link rel="stylesheet" href="...">`: Stylesheet.
- `<link rel="icon" href="...">`: Favicon.
- `<link rel="canonical" href="...">`: Canonical URL.
- `<link rel="alternate" href="..." type="application/rss+xml">`: RSS feed.

### Script Tags

- `<script src="..."></script>`: External script.
- `<script>...</script>`: Internal script.

### Style Tags

- `<style>...</style>`: Internal style sheet.

### Deprecated Tags

- `<b>`: Bold text.
- `<i>`: Italic text.
- `<u>`: Underlined text.
- `<s>`: Strikethrough text.
- `<center>`: Centered text.
- `<font>`: Font settings.
- `<big>`: Bigger text.
- `<small>`: Smaller text.
- `<strike>`: Strikethrough text.
- `<tt>`: Teletype text.
- `<dir>`: Directory list.
- `<menu>`: Menu list.
- `<basefont>`: Base font settings.
- `<frameset>`: Frame set.
- `<frame>`: Frame.
- `<noframes>`: No frames content.
- `<applet>`: Java applet.
- `<isindex>`: Input prompt.
- `<marquee>`: Marquee text.

### Other Tags

- `<hr>`: Horizontal rule.
- `<br>`: Line break.
- `<wbr>`: Word break opportunity.
- `<bdo>`: Bi-directional override.
- `<ruby>`: Ruby annotation.
- `<rt>`: Ruby text.
- `<rp>`: Ruby parenthesis.
- `<bdi>`: Bi-directional isolation.
- `<details>`: Details.
- `<summary>`: Summary.
- `<dialog>`: Dialog.
- `<menuitem>`: Menu item.

## Common HTML Attributes

- `id`: Unique identifier.
- `class`: Class name.
- `style`: Inline style.
- `href`: Hyperlink reference.
- `src`: Source of an image.
- `alt`: Alternative text for an image.
- `width`: Width of an element.
- `height`: Height of an element.
- `colspan`: Number of columns a table cell should span.
- `rowspan`: Number of rows a table cell should span.
- `type`: Type of an input field.
- `value`: Value of an input field.
- `name`: Name of an input field.
- `placeholder`: Placeholder text for an input field.
- `checked`: Checked state of an input field.
- `selected`: Selected state of an option in a dropdown list.
- `disabled`: Disabled state of an input field.
- `readonly`: Read-only state of an input field.
- `required`: Required state of an input field.
- `min`: Minimum value of an input field.
- `max`: Maximum value of an input field.
- `step`: Step value of an input field.
- `for`: Specifies which form element a label is bound to.

## Common HTML Entities

- `&lt;`: Less than (<).
- `&gt;`: Greater than (>).
- `&amp;`: Ampersand (&).
- `&quot;`: Double quote (").
- `&apos;`: Apostrophe (').
- `&nbsp;`: Non-breaking space.

## Common HTML Events

- `onchange`: An element's value has been changed.
- `onclick`: The element is clicked.
- `onmouseover`: The mouse is moved over the element.
- `onmouseout`: The mouse is moved out of the element.
- `onkeydown`: A key is pressed down.
- `onkeyup`: A key is released.
- `onfocus`: The element gets focus.
- `onblur`: The element loses focus.
- `onsubmit`: The form is submitted.

## References

- [HTML MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML)
