import type { $Element } from "elexis";
import { propertyMap } from "./propertyMap";
import type { $StylePropertyParams } from "./$StylePropertyParams";
const stylesheet = new CSSStyleSheet();
stylesheet.insertRule('@layer media, base');
stylesheet.insertRule('@layer media {}');
stylesheet.insertRule('@layer base {}');
document.adoptedStyleSheets.push(stylesheet);

export class $Style {
    static elementMap = new Map<$Element<any>, {$ele: $Element, styleMap: Map<string, string>}>()
    static ruleSet = new Set<string>;
    static cssStyleSheet = stylesheet;
    static layer_base = this.cssStyleSheet.cssRules[0] as CSSLayerBlockRule;
    static layer_media = this.cssStyleSheet.cssRules[1] as CSSLayerBlockRule;

    static insertRule(params: Partial<$StyleParams>, $ele?: $Element<any>) {
        const analysis_data = this.getSelector(this.analysis(params));
        const addclass = analysis_data.filter(data => data.value !== '');
        const removeclass = analysis_data.filter(data => data.value === '');
        for (const data of addclass) {
            const rule = `${data.selector} { ${propertyMap[data.decodedKey as keyof typeof propertyMap]}: ${data.value} }`;
            if (data.atRules.length) {
                let txt = '_REPLACE_';
                for (const atRule of data.atRules) {
                    txt = txt.replace('_REPLACE_', `${atRule} { _REPLACE_ }`);
                }
                txt = txt.replace('_REPLACE_', rule);
                if (this.ruleSet.has(txt)) continue
                this.ruleSet.add(txt);
                this.cssStyleSheet.insertRule(txt, 0);
            } else { 
                if (this.ruleSet.has(rule)) continue;
                this.ruleSet.add(rule);
                this.layer_base.insertRule(rule, 0);
            }
        }
        if (!$ele) return;
        const elementStyleMap = this.elementMap.get($ele)?.styleMap ?? new Map()
        this.elementMap.set($ele, {$ele, styleMap: elementStyleMap})
        addclass.forEach(d => {
            const cached = elementStyleMap?.get(d.cachedname);
            $ele.removeStaticClass(cached);
            elementStyleMap?.set(d.cachedname, d.classname);
            $ele?.addStaticClass(d.classname);
        })
        removeclass.forEach(d => {
            $ele?.removeStaticClass(elementStyleMap?.get(d.cachedname));
        })
    }

    private static getSelector(data_list: $StyleParamData[], prefix: string = '', postfix: string = '', atRules: string[] = []) {
        const selector_list: OrMatrix<$StyleParamAnalysisData> = [];
        for (const data of data_list) {
            if (data.type === 'AT_RULE') {
                selector_list.push( this.getSelector(data.value, `${prefix}${data.key}-${data.data.query.replaceAll(' ', '')}:`, `${postfix}`, [...atRules, `${atRuleMap[data.decodedKey as keyof typeof atRuleMap]} ${data.data.query}`]))
            } else if (data.type === 'PSEUDO_CLASS') {
                selector_list.push( this.getSelector(data.value, `${prefix}${data.key}:`, `${postfix}${pseudoClassMap[data.decodedKey as keyof typeof pseudoClassMap]}`, atRules) )
            } else if (data.type === 'PSEUDO_ELEMENT') {
                selector_list.push( this.getSelector(data.value, `${prefix}${data.key}:`, `${postfix}${pseudoElementMap[data.decodedKey as keyof typeof pseudoElementMap]}`, atRules) )
            } else if (data.type === 'PROPERTY') {
                const property = `${prefix}${data.key}`.replaceAll(' ', '_');
                const value = `${data.value}`.replaceAll(' ', '_')
                selector_list.push( {
                    ...data, atRules, 
                    classname: `${property}:${value}`, 
                    selector: `.` + `${property}:${value}`.replaceAll(/[$.:%()#]/g, ($0, $1) => `\\${$0}`) + `${postfix}`,
                    cachedname: property
                } )
            }
        }
        return selector_list.flat() as $StyleParamAnalysisData[];
    }

    static analysis(params: Partial<$StyleParams>) {
        const result: $StyleParamData[] = [];
        for (const [k, v] of Object.entries(params)) {
            const decodedKey = k.replaceAll(/\$/g, '')
            if (decodedKey in atRuleMap) {
                const {query, ...value} = v as any;
                result.push( { type: 'AT_RULE', value: this.analysis(value as $StyleParams), key: k, decodedKey, data: {query}} ) 
            } else if (decodedKey in pseudoClassMap) { 
                result.push( { type: 'PSEUDO_CLASS', value: this.analysis(v as $StyleParams), key: k, decodedKey } )
            } else if (decodedKey in pseudoElementMap) { 
                result.push( { type: 'PSEUDO_ELEMENT', value: this.analysis(v as $StyleParams), key: k, decodedKey } ) 
            } else { 
                result.push({type: 'PROPERTY', value: v.toString(), key: k, decodedKey: decodedKey})
            }
        }
        return result;
    }

    static propertyToClass(key: string, value: any) { return `${key.replaceAll('_', '-')}-${value}`}
    static getClasses(style: Partial<$StyleParams>, prefix = ''): string[] { return Object.entries(style).map(([k, v]) => v instanceof Object ? this.getClasses(v as $StyleParams, `${prefix}${k}:`) : this.propertyToClass(`${prefix.length ? `${prefix}` : ''}${k}`, v)).flat() }
}

export type $PropertyMap = typeof propertyMap;
export type $PseudoClassMap = typeof pseudoClassMap;
export type $PseudoElementMap = typeof pseudoElementMap;

type $StyleParamData = $StyleParamAtRuleData | $StyleParamPseudoData | $StyleParamPropertyData;

type $StyleParamAnalysisData = $StyleParamData & {selector: string, classname: string, cachedname: string, atRules: string[]};

interface $StyleParamBaseData {
    type: 'AT_RULE' | 'PSEUDO_CLASS' | 'PSEUDO_ELEMENT' | 'PROPERTY',
    value: $StyleParamData[] | string | number,
    key: string,
    decodedKey: string,
}

interface $StyleParamAtRuleData extends $StyleParamBaseData {
    type: 'AT_RULE',
    value: $StyleParamData[],
    data: {query: string};
}

interface $StyleParamPseudoData extends $StyleParamBaseData {
    type: 'PSEUDO_CLASS' | 'PSEUDO_ELEMENT',
    value: $StyleParamData[],
}

interface $StyleParamPropertyData extends $StyleParamBaseData {
    type: 'PROPERTY',
    value: string | number
}


export interface $StyleParams extends $StylePropertyParams, $StylePseudoParams, $StyleAtRuleParams {}

export interface $StyleAtRuleParams {
    media: $StyleMediaAtRuleParams,
    layer: $StyleLayerAtRuleParams
}
export interface $StyleMediaAtRuleParams extends Partial<$StyleParams> { query: string }
export interface $StyleLayerAtRuleParams extends Partial<$StyleParams> { name: string }
export interface $StylePseudoParams extends Record<`$${keyof $PseudoClassMap}`, Partial<$StyleParams>>, Record<`$$${keyof $PseudoElementMap}`, Partial<$StyleParams>> {}
export type $StyleInlineBlockParam<T extends string> = $StyleNumbericParam<`${T}${'x'|'y'|'xs'|'xe'|'ys'|'ye'|'t'|'b'|'l'|'r'}`>
export type $StyleNumbericParam<T extends string> = Record<T, $StyleNumberic>;
export type $StyleUnit = 'px' | 'em' | 'rem' | 'w' | 'h' | 'dvw' | 'dvh' | '%';
export type $StyleNumberic = number | string | ''; //| `${number}${$StyleUnit}`

const pseudoClassMap = {
    active: ':active',
    anyLink: ':any-link',
    autoFill: ':auto-fill',
    checked: ':checked',
    default: ':default',
    defined: ':defined',
    // dir
    disabled: ':disabled',
    empty: ':empty',
    first: ':first',
    firstChild: ':first-child',
    firstOfType: 'first-of-type',
    focus: ':focus',
    focusVisible: ':focus-visible',
    focusWithin: ':focus-within',
    // has
    hover: ':hover',
    inRange: ':in-range',
    indeterminate: ':indeterminate',
    invalid: ':invalid',
    // is
    // lang
    lastChild: ':last-child',
    lastOfType: ':last-of-type',
    left: ':left',
    link: ':link',
    modal: ':modal',
    // not
    // nth-child
    // nth-last-child
    // nth-last-of-type
    // nth-of-type
    onlyChild: ':only-child',
    onlyOfType: ':only-of-type',
    optional: ':optional',
    outOfRange: ':out-of-range',
    placeholderShown: ':placeholder-shown',
    popoverOpen: ':popover-open',
    readOnly: ':read-only',
    readWrite: ':read-write',
    required: ':required',
    right: ':right',
    root: ':root',
    scope: ':scope',
    // state
    target: ':target',
    userInvalid: ':user-invalid',
    userValid: ':user-valid',
    valid: ':valid',
    visited: ':visited',
    // where
}

const pseudoElementMap = {
    after: '::after',
    backdrop: '::backdrop',
    before: '::before',
    fileSelectorButton: '::fileSelectorButton',
    fileLetter: '::file-letter',
    firstLine: '::file-line',
    grammarError: '::grammarError',
    // highlight
    marker: '::marker',
    placeholder: '::placeholder',
    selection: '::selection',
    spellingError: '::spelling-error',
    viewTransition: '::view-transition',
    viewTransitionGroup: '::view-transition-group',
    viewTransitionImagePair: '::view-transition-image-pair',
    viewTransitionNew: '::view-transition-new',
    viewTransitionOld: '::view-transition-old'
}

const atRuleMap = {
    charset: "@charset",
    container: "@container",
    counterStyle: "@counter-style",
    fontFace: "@font-face",
    fontPaletterValues: "@font-paletter-values",
    import: "@import",
    keyframes: "@keyframes",
    layer: "@layer",
    media: "@media",
    namespace: "@namespace",
    page: "@page",
    property: "@property",
    scope: "@scope",
    startingStyle: "@starting-style",
    supports: "@supports"
}