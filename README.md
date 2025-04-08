# @elexis.js/style
Style element without css file. Base on [ElexisJS](https://github.com/defaultkavy/elexis).

## Usage
```ts
// import in main entry file
import 'elexis';
import '@elexis.js/css';

// Modify element's background color
$(document.body).css({bgColor: $.color.gray[200]})
```

## Define CSS Rules
```ts
// Add CSS Rules with class "hello"
$.css({
    selector: 'span.hello',
    fontSize: '1.2rem',
    color: $.color.red[500]
})

// Apply class "hello"
$('span').class('hello');
```