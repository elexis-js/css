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

## Define Style in JS
```ts
// Define css rule
const buttonStyle = $.css({
    backgroundColor: $.color.red[300],
    color: $.color.gray[700]
    "&:hover": {
        backgroundColor: $.color.cyan[300],
    }
})

// Apply style to element
$('button').css(buttonStyle);
```

## Define CSS Rule in JS
```ts
// Add CSS Rules with selector "span.hello"
$.CSS({
    "span.hello": {
        fontSize: '1.2rem',
        color: $.color.red[500]
    }
})

// Apply class "hello"
$('span').class('hello');
```

## Define CSS Variables in JS
```ts
const color_var = $.css.variable({
    foreground_color: $.color.black,
    background_color: $.color.white
}, {
    '@media (prefers-color-scheme: dark)': {
        foreground_color: $.color.white,
        background_color: $.color.black
    }
})

$.CSS({
    'html': {
        color: color_var.foreground_color
        backgroundColor: color_var.background_color
    }
})
```

## Define Keyframes in JS
```ts
const keyframes = $.css.keyframes({
    zoom: {
        from: { transfrom: 'scale(0.9)' },
        to: { transfrom: 'scale(1)' }
    }
})

$.css({
    animation: `0.3s ease ${keyframes.zoom}`
})
```