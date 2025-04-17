# @elexis.js/css
Style element without css file. Base on [ElexisJS](https://github.com/defaultkavy/elexis).

## Usage
```ts
// import in main entry file
import 'elexis';
import '@elexis.js/css';

// Modify element's background color
$(document.body).css({backgroundColor: $.color.gray[200]})
```

## Define Style with Variable
```ts
// Define css rule
const buttonStyle = $.css({
    backgroundColor: $.color.red[300],
    color: $.color.gray[700]
    "$&:hover": {
        backgroundColor: $.color.cyan[300],
    }
})

// Apply style to element
$('button').css(buttonStyle);
```

## Define CSS Rule
```ts
// Add CSS Rules with selector "span.hello"
$.CSS({
    "$span.hello": {
        fontSize: '1.2rem',
        color: $.color.red[500]
    }
})

// Apply class "hello"
$('span').class('hello');
```