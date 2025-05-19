import 'elexis/core';
import { colors } from "#lib/colors";
import { $CSSStyleSheet } from "#structure/$CSSStyleSheet";
import { $CSSStyleRule } from "#structure/$CSSStyleRule";
import type { $CSSBaseRule } from "#structure/$CSSBaseRule";
import { $Element } from 'elexis/node/$Element';
import { $CSSKeyframesRule } from '#structure/$CSSKeyframesRule';
import { $CSSVariable } from '#structure/$CSSVariable';

Object.assign($, {
    color: colors,
    css(...options: $CSSOptions[]) {
        if (arguments.length === 1) return $CSSStyleSheet.insertRule(options[0]!);
        return options.map(css => {
            return $CSSStyleSheet.insertRule(css);
        })
    },
    CSS(...options: $CSSRootOptions[]) {
        return options.map(css => {
            return $CSSStyleSheet.insertCSS(css);
        })
    }
})

Object.assign($Element.prototype, {
    css(this: $Element, ...css: ($CSSOptions | undefined)[]) { 
        css.forEach(css => {
            css ? $CSSStyleSheet.insertRule(css, {element: this}) : null
        })
        return this;
    }
})

Object.assign($.css, {
    keyframes(options: {[key: string]: $CSSKeyframesPropertyMap}) {
        return Object.fromEntries(Object.entries(options).map(([key, keyframes]) => {
            const rule = new $CSSKeyframesRule(keyframes, key, true)
            $CSSStyleSheet.insertRuleToStyleSheet(rule)
            return [key, rule]
        }));
    },
    variable<K extends string>(options: {[key in K]: string}, variants?: {[key: `@media ${string}`]: {[key in K]?: string}}) {
        // css options
        const css = {}
        const variableMap: {[key: string]: $CSSVariable} = {}
        Object.entries(options).map(([name, value]) => {
            const variable = new $CSSVariable($CSSVariable.generateName(name), value as string)
            Object.assign(css, {[`--${variable.name}`]: value});
            Object.assign(variableMap, {[name]: variable});
        })
        variants && Object.entries(variants).map(([variant, variables]) => {
            const variantCSS: $CSSVariableMap = {};
            Object.entries(variables).map(([name, value]) => {
                const variable = variableMap[name] as $CSSVariable;
                Object.assign(variantCSS, {[`--${variable.name}`]: value});
            })
            Object.assign(css, {[variant]: variantCSS});
        })
        $.CSS({'$:root': css});
        return variableMap;
    }
})

export * from "#structure/$CSSStyleSheet";
export * from "#structure/$CSSStyleRule";
export * from "#structure/$CSSProperty";

declare module "elexis/core" {
    export namespace $ {
        export const color: typeof colors;
        export function css(options: $CSSOptions) : $CSSStyleRule;
        export function css(...options: $CSSOptions[]) : $CSSStyleRule[];

        export function CSS(...options: $CSSRootOptions[]): $CSSBaseRule[];

        export namespace css {
            export function keyframes<K extends string>(options: {[key in K]: $CSSKeyframesPropertyMap}): { [key in K]: $CSSKeyframesRule };
            export function variable<K extends string>(options: {[key in K]: string}, variants?: {[key: `@media ${string}`]: {[key in K]?: string}}): {[key in K]: string}
        }
    }
}

declare module "elexis/node/$Element" {
    export interface $Element {
        css(...params: ($CSSOptions | undefined)[]): this;
    }
}

declare global {
    type $CSSOptions = $CSSStyleRule | ($CSSSelectorMap & $CSSMediaRuleMap<true> & $CSSPropertyMap & $CSSVariableMap);
    type $CSSRootOptions = $CSSSelectorMap & $CSSMediaRuleMap<false> & $CSSKeyframesRuleMap;
    type $CSSOptionsType = $CSSOptions | $CSSRootOptions | $CSSMediaRuleMap<boolean>
    type $CSSConstructType = $CSSOptions | $CSSRootOptions | $CSSMediaRuleMap<boolean> | $CSSKeyframesPropertyMap;
    
    type $CSSPropertyMap = {
        [key in keyof CSSStyleDeclaration]?: $CSSPropertyValueMap[key] | '' | 'unset' | 'initial' | 'inherit' | string & {} | number;
    } | { [key: string]: any };

    interface $CSSSelectorMap {
        [key: `$${string}` | `&${string}`]: $CSSOptions;
    }
    interface $CSSVariableMap {
        [key: `--${string}`]: string | number
    }
    interface $CSSMediaRuleMap<Nested extends boolean> {
        [key: `@media ${string}`]: Nested extends true ? $CSSOptions : $CSSSelectorMap
    }
    interface $CSSKeyframesRuleMap {
        [key: `@keyframes ${string}`]: $CSSKeyframesPropertyMap;
    }
    interface $CSSKeyframesPropertyMap {
        from?: $CSSOptions,
        to?: $CSSOptions,
        [key: `${number | string}%`]: $CSSOptions
    }
    type $CSSPropertyValueMap = {
        [key in keyof CSSStyleDeclaration]: '' | 'unset' | 'initial' | 'inherit' | string & {} | number;
    } & {
        alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'normal';
        alignItems?: 'normal' | 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
        alignSelf?: 'auto' | 'normal' | 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
        all?: 'initial' | 'inherit' | 'unset';
        animation?: string;
        animationDelay?: string;
        animationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
        animationDuration?: string;
        animationFillMode?: 'none' | 'forwards' | 'backwards' | 'both';
        animationIterationCount?: 'infinite' | number;
        animationName?: string;
        animationPlayState?: 'running' | 'paused';
        animationTimingFunction?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end';
        animationComposition?: 'replace' | 'add' | 'accumulate';
        backdropFilter?: string;
        backfaceVisibility?: 'visible' | 'hidden';
        background?: string;
        backgroundAttachment?: 'scroll' | 'fixed' | 'local';
        backgroundBlendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
        backgroundClip?: 'border-box' | 'padding-box' | 'content-box' | 'text';
        backgroundColor?: string;
        backgroundImage?: string;
        backgroundOrigin?: 'border-box' | 'padding-box' | 'content-box';
        backgroundPosition?: string;
        backgroundRepeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | 'space' | 'round';
        backgroundSize?: 'auto' | 'cover' | 'contain';
        border?: string;
        borderBottom?: string;
        borderBottomColor?: string;
        borderBottomLeftRadius?: string;
        borderBottomRightRadius?: string;
        borderBottomStyle?: 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
        borderBottomWidth?: string;
        borderCollapse?: 'collapse' | 'separate';
        borderColor?: string;
        borderImage?: string;
        borderImageOutset?: string;
        borderImageRepeat?: 'stretch' | 'repeat' | 'round' | 'space';
        borderImageSlice?: string;
        borderImageSource?: string;
        borderImageWidth?: string;
        borderLeft?: string;
        borderLeftColor?: string;
        borderLeftStyle?: 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
        borderLeftWidth?: string;
        borderRadius?: string;
        borderRight?: string;
        borderRightColor?: string;
        borderRightStyle?: 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
        borderRightWidth?: string;
        borderSpacing?: string;
        borderStyle?: 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
        borderTop?: string;
        borderTopColor?: string;
        borderTopLeftRadius?: string;
        borderTopRightRadius?: string;
        borderTopStyle?: 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
        borderTopWidth?: string;
        borderWidth?: string;
        bottom?: string;
        boxShadow?: string;
        boxSizing?: 'content-box' | 'border-box';
        breakAfter?: 'auto' | 'avoid' | 'always' | 'all' | 'avoid-page' | 'page' | 'left' | 'right' | 'recto' | 'verso' | 'column' | 'avoid-column';
        breakBefore?: 'auto' | 'avoid' | 'always' | 'all' | 'avoid-page' | 'page' | 'left' | 'right' | 'recto' | 'verso' | 'column' | 'avoid-column';
        breakInside?: 'auto' | 'avoid' | 'avoid-page' | 'avoid-column';
        captionSide?: 'top' | 'bottom';
        caretColor?: string;
        clear?: 'none' | 'left' | 'right' | 'both';
        clip?: string;
        clipPath?: string;
        color?: string;
        columnCount?: 'auto' | number;
        columnFill?: 'balance' | 'auto';
        columnGap?: string;
        columnRule?: string;
        columnRuleColor?: string;
        columnRuleStyle?: 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
        columnRuleWidth?: string;
        columnSpan?: 'none' | 'all';
        columnWidth?: string;
        columns?: string;
        content?: string;
        counterIncrement?: string;
        counterReset?: string;
        cursor?: 'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' | 'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'e-resize' | 'n-resize' | 'ne-resize' | 'nw-resize' | 's-resize' | 'se-resize' | 'sw-resize' | 'w-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' | 'col-resize' | 'row-resize' | 'all-scroll' | 'zoom-in' | 'zoom-out' | 'grab' | 'grabbing';
        direction?: 'ltr' | 'rtl';
        display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'flow-root' | 'none' | 'contents' | 'table' | 'table-row' | 'table-cell' | 'table-column' | 'table-column-group' | 'table-header-group' | 'table-footer-group' | 'table-row-group' | 'list-item';
        emptyCells?: 'show' | 'hide';
        filter?: string;
        flex?: string;
        flexBasis?: string;
        flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
        flexFlow?: string;
        flexGrow?: number;
        flexShrink?: number;
        flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
        float?: 'left' | 'right' | 'none';
        font?: string;
        fontFamily?: string;
        fontFeatureSettings?: string;
        fontKerning?: 'auto' | 'normal' | 'none';
        fontLanguageOverride?: string;
        fontOpticalSizing?: 'auto' | 'none';
        fontSize?: string;
        fontSizeAdjust?: string;
        fontStretch?: 'normal' | 'ultra-condensed' | 'extra-condensed' | 'condensed' | 'semi-condensed' | 'semi-expanded' | 'expanded' | 'extra-expanded' | 'ultra-expanded';
        fontStyle?: 'normal' | 'italic' | 'oblique';
        fontSynthesis?: string;
        fontVariant?: 'normal' | 'small-caps';
        fontVariantCaps?: 'normal' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' | 'titling-caps';
        fontVariantEastAsian?: string;
        fontVariantLigatures?: string;
        fontVariantNumeric?: string;
        fontVariantPosition?: 'normal' | 'sub' | 'super';
        fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
        gap?: string;
        grid?: string;
        gridArea?: string;
        gridAutoColumns?: string;
        gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
        gridAutoRows?: string;
        gridColumn?: string;
        gridColumnEnd?: string;
        gridColumnGap?: string;
        gridColumnStart?: string;
        gridGap?: string;
        gridRow?: string;
        gridRowEnd?: string;
        gridRowGap?: string;
        gridRowStart?: string;
        gridTemplate?: string;
        gridTemplateAreas?: string;
        gridTemplateColumns?: string;
        gridTemplateRows?: string;
        height?: string;
        hyphens?: 'none' | 'manual' | 'auto';
        imageRendering?: 'auto' | 'crisp-edges' | 'pixelated';
        isolation?: 'auto' | 'isolate';
        justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
        justifyItems?: 'normal' | 'stretch' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'self-start' | 'self-end' | 'left' | 'right';
        justifySelf?: 'auto' | 'normal' | 'stretch' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'self-start' | 'self-end' | 'left' | 'right';
        left?: string;
        letterSpacing?: 'normal';
        lineHeight?: 'normal' | number;
        listStyle?: string;
        listStyleImage?: string;
        listStylePosition?: 'inside' | 'outside';
        listStyleType?: 'disc' | 'circle' | 'square' | 'decimal' | 'georgian' | 'trad-chinese-informal' | 'none';
        margin?: string;
        marginBottom?: string;
        marginLeft?: string;
        marginRight?: string;
        marginTop?: string;
        mask?: string;
        maskClip?: string;
        maskComposite?: string;
        maskImage?: string;
        maskMode?: string;
        maskOrigin?: string;
        maskPosition?: string;
        maskRepeat?: string;
        maskSize?: string;
        maskType?: string;
        maxHeight?: string;
        maxWidth?: string;
        minHeight?: string;
        minWidth?: string;
        mixBlendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
        objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
        objectPosition?: string;
        opacity?: number;
        order?: number;
        outline?: string;
        outlineColor?: string;
        outlineOffset?: string;
        outlineStyle?: 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
        outlineWidth?: string;
        overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
        overflowWrap?: 'normal' | 'break-word' | 'anywhere';
        overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto';
        overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto';
        overscrollBehavior?: 'auto' | 'contain' | 'none';
        overscrollBehaviorX?: 'auto' | 'contain' | 'none';
        overscrollBehaviorY?: 'auto' | 'contain' | 'none';
        padding?: string;
        paddingBottom?: string;
        paddingLeft?: string;
        paddingRight?: string;
        paddingTop?: string;
        pageBreakAfter?: 'auto' | 'always' | 'avoid' | 'left' | 'right';
        pageBreakBefore?: 'auto' | 'always' | 'avoid' | 'left' | 'right';
        pageBreakInside?: 'auto' | 'avoid';
        paintOrder?: string;
        perspective?: string;
        perspectiveOrigin?: string;
        placeContent?: string;
        placeItems?: string;
        placeSelf?: string;
        pointerEvents?: 'auto' | 'none';
        position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
        quotes?: string;
        resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
        right?: string;
        rotate?: string;
        rowGap?: string;
        scale?: string;
        scrollBehavior?: 'auto' | 'smooth';
        shapeRendering?: 'auto' | 'optimizeSpeed' | 'crispEdges' | 'geometricPrecision';
        stopColor?: string;
        stopOpacity?: string;
        stroke?: string;
        strokeDasharray?: string;
        strokeDashoffset?: string;
        strokeLinecap?: 'butt' | 'round' | 'square';
        strokeLinejoin?: 'miter' | 'round' | 'bevel';
        strokeMiterlimit?: string;
        strokeOpacity?: string;
        strokeWidth?: string;
        tabSize?: string;
        tableLayout?: 'auto' | 'fixed';
        textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
        textAlignLast?: 'auto' | 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
        textAnchor?: 'start' | 'middle' | 'end';
        textCombineUpright?: 'none' | 'all';
        textDecoration?: string;
        textDecorationColor?: string;
        textDecorationLine?: 'none' | 'underline' | 'overline' | 'line-through' | 'grammar-error' | 'spelling-error';
        textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
        textDecorationThickness?: string;
        textDecorationSkipInk?: 'auto' | 'none';
        textEmphasis?: string;
        textIndent?: string;
        textJustify?: 'auto' | 'inter-word' | 'inter-character' | 'none';
        textOrientation?: 'mixed' | 'upright' | 'sideways';
        textOverflow?: 'clip' | 'ellipsis';
        textRendering?: 'auto' | 'optimizeSpeed' | 'optimizeLegibility' | 'geometricPrecision';
        textShadow?: string;
        textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
        textUnderlineOffset?: string;
        textUnderlinePosition?: 'auto' | 'under' | 'left' | 'right';
        top?: string;
        touchAction?: 'auto' | 'none' | 'pan-x' | 'pan-y' | 'manipulation';
        transform?: string;
        transformBox?: 'border-box' | 'fill-box' | 'view-box';
        transformOrigin?: string;
        transformStyle?: 'flat' | 'preserve-3d';
        transition?: string;
        transitionDelay?: string;
        transitionDuration?: string;
        transitionProperty?: string;
        transitionTimingFunction?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end';
        translate?: string;
        unicodeBidi?: 'normal' | 'embed' | 'isolate' | 'bidi-override' | 'isolate-override' | 'plaintext';
        userSelect?: 'auto' | 'none' | 'text' | 'contain' | 'all';
        verticalAlign?: 'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom';
        visibility?: 'visible' | 'hidden' | 'collapse';
        whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces';
        width?: string;
        willChange?: string;
        wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
        wordSpacing?: string;
        wordWrap?: 'normal' | 'break-word';
        writingMode?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';
        zIndex?: 'auto' | number;
    };
}