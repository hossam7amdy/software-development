# Cascade Style Sheets (CSS)

CSS is a style sheet language used for describing the presentation of a document written in a markup language like HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.

## Syntax

```css
selector {
  property: value;
}
```

## Selectors

- `*`: Selects all elements
- `element`: Selects all elements with the specified element name
- `.class`: Selects all elements with the specified class name
- `#id`: Selects an element with the specified id
- `element, element`: Selects all elements with the specified element name
- `element element`: Selects all elements inside the specified element
- `element > element`: Selects all elements that are a direct child of the specified element
- `element + element`: Selects all elements that are placed immediately after the specified element
- `element ~ element`: Selects all elements that are siblings of the specified element

## Pseudo-Elements

- `::after`: Insert something after the content of each selected element
- `::before`: Insert something before the content of each selected element
- `::first-letter`: Selects the first letter of each selected element
- `::first-line`: Selects the first line of each selected element
- `::selection`: Selects the portion of an element that is selected by a user

## Pseudo-Classes

- `:active`: Selects the active link
- `:checked`: Selects every checked input element
- `:disabled`: Selects every disabled input element
- `:empty`: Selects every element that has no children
- `:enabled`: Selects every enabled input element
- `:first-child`: Selects the first child of each selected element
- `:first-of-type`: Selects the first element of each selected element type
- `:focus`: Selects the input element that has focus
- `:hover`: Selects links on mouse over
- `:in-range`: Selects input elements with a value within a specified range
- `:invalid`: Selects all input elements with an invalid value
- `:lang(language)`: Selects every element in the document that is in the specified language
- `:last-child`: Selects the last child of each selected element
- `:last-of-type`: Selects the last element of each selected element type
- `:link`: Selects all unvisited links
- `:not(selector)`: Selects every element that is not the specified element
- `:nth-child(n)`: Selects every element that is the nth child, regardless of type, of its parent
- `:nth-last-child(n)`: Selects every element that is the nth child, regardless of type, of its parent, counting from the last child
- `:nth-last-of-type(n)`: Selects every element that is the nth child, regardless of type, of its parent, counting from the last child
- `:nth-of-type(n)`: Selects every element that is the nth child, regardless of type, of its parent
- `:only-of-type`: Selects every element that is the only child, of its type, of its parent
- `:only-child`: Selects every element that is the only child of its parent
- `:optional`: Selects input elements with no "required" attribute
- `:out-of-range`: Selects input elements with a value outside a specified range
- `:read-only`: Selects input elements with the "readonly" attribute specified
- `:read-write`: Selects input elements with the "readonly" attribute NOT specified
- `:required`: Selects input elements with the "required" attribute specified
- `:root`: Selects the document's root element
- `:target`: Selects the current active #target element
- `:valid`: Selects all input elements with a valid value
- `:visited`: Selects all visited links

## Properties

- `color`: Sets the color of the text
- `font-size`: Sets the size of the font
- `font-family`: Sets the font family
- `background-color`: Sets the background color
- `text-align`: Sets the horizontal alignment of the text
- `border`: Sets all the border properties in one declaration
- `margin`: Sets all the margin properties in one declaration
- `padding`: Sets all the padding properties in one declaration
- `width`: Sets the width of an element
- `height`: Sets the height of an element
- `display`: Specifies the display behavior of an element
- `position`: Specifies the type of positioning method used for an element
- `z-index`: Sets the stack order of a positioned element
- `float`: Specifies whether or not a box should float
- `clear`: Specifies what elements can float beside the cleared element and on which side
- `overflow`: Specifies what happens if content overflows an element's box
- `list-style`: Sets all the properties for a list in one declaration
- `animation`: A shorthand property for all the animation properties
- `transition`: A shorthand property for all the transition properties
- `transform`: Applies a 2D or 3D transformation to an element
- `box-shadow`: Attaches one or more shadows to an element
- `text-shadow`: Adds shadow to text
- `filter`: Applies visual effects to an element
- `background-image`: Sets the background image for an element
- `background-size`: Sets the size of the background image
- `background-repeat`: Sets how the background image will be repeated
- `background-position`: Sets the starting position of a background image
- `background-attachment`: Sets whether a background image is fixed or scrolls with the rest of the page
- `background-clip`: Specifies the painting area of the background
- `background-origin`: Specifies where the background image is positioned
- `background-blend-mode`: Specifies the blending mode of each background layer
- `border-radius`: A shorthand property for setting all the four border-\*-radius properties
- `border-image`: A shorthand property for setting all the border-image-\* properties
- `border-collapse`: Sets the table layout algorithm
- `border-spacing`: Sets the distance between the borders of adjacent cells
- `border-radius`: A shorthand property for setting all the four border-\*-radius properties
- `border-image`: A shorthand property for setting all the border-image-\* properties
- `border-collapse`: Sets the table layout algorithm
- `border-spacing`: Sets the distance between the borders of adjacent cells

## Units

- `px`: Pixels
- `em`: Relative to the font-size of the element
- `rem`: Relative to the font-size of the root element
- `vw`: Relative to 1% of the width of the viewport
- `vh`: Relative to 1% of the height of the viewport
- `vmin`: Relative to 1% of viewport's smaller dimension
- `vmax`: Relative to 1% of viewport's larger dimension
- `%`: Percentage
- `mm`: Millimeters

## Functions

- `rgb()`: Defines a color using the RGB color model
- `rgba()`: Defines a color using the RGBA color model
- `hsl()`: Defines a color using the HSL color model
- `hsla()`: Defines a color using the HSLA color model
- `url()`: Defines a link to a resource
- `calc()`: Performs a calculation to be used as property value
- `var()`: Inserts the value of a custom property
- `linear-gradient()`: Creates a linear gradient
- `radial-gradient()`: Creates a radial gradient
- `repeating-linear-gradient()`: Creates a repeating linear gradient
- `repeating-radial-gradient()`: Creates a repeating radial gradient
- `cubic-bezier()`: Defines a cubic-bezier curve
- `steps()`: Defines intervals in an animation

## Media Queries

```css
@media screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
```

## Comments

```css
/* This is a single-line comment */
```

## Resources

- [CSS MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)
