import { $State, type $Element, type $StateArgument } from "elexis";
import { propertyMap } from "./propertyMap";
import type { $CSSPropertyParams as $CSSPropertyParams } from "./$CSSPropertyParams";
const stylesheet = new CSSStyleSheet();
stylesheet.insertRule('@layer media {}');
stylesheet.insertRule('@layer base {}');
stylesheet.insertRule('@layer selector {}');
document.adoptedStyleSheets.push(stylesheet);

export class $CSS {
    static elementMap = new Map<$Element<any>, {$ele: $Element, styleMap: Map<string, string>}>()
    static ruleSet = new Set<string>;
    static cssStyleSheet = stylesheet;
    static layer_selector = this.cssStyleSheet.cssRules[0] as CSSLayerBlockRule;
    static layer_base = this.cssStyleSheet.cssRules[1] as CSSLayerBlockRule;
    static layer_media = this.cssStyleSheet.cssRules[2] as CSSLayerBlockRule;
    static paramSet = new Set<string>;

    static insertRule(params: Partial<$CSSParams>, $ele?: $Element<any>) {
        const analysis_data = this.getSelector(this.analysis(params, $ele));
        const selectors = analysis_data.filter(data => data.type === 'SELECTOR');
        const children = analysis_data.filter(data => data.type === 'CHILDREN');
        const addclass = analysis_data.filter(data => data.value !== '' && data.type === 'PROPERTY');
        const removeclass = analysis_data.filter(data => data.value === '');
        const childrenClassnameList = children.map(data => this.childrenRuleHandler(data));
        for (const data of selectors) this.selectorRuleHandler(data);
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
                const n = this.layer_base.insertRule(rule, 0);
            }
        }
        if (!$ele) return;
        const elementStyleMap = this.elementMap.get($ele)?.styleMap ?? new Map()
        this.elementMap.set($ele, {$ele, styleMap: elementStyleMap})
        childrenClassnameList.forEach(n => {
            $ele.addStaticClass(...n);
        })
        const VALID_SELECTOR = params.selector && params.selector.startsWith('.') && !params.selector.includes(' ');
        if (VALID_SELECTOR) $ele.addStaticClass(`${params.selector!.replace('.', '')}`);
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

    private static selectorRuleHandler(data: $StyleParamAnalysisData<$StyleParamData>, selector = '') {
        const RP = '_REPLACE_'
        switch (data.type) {
            case 'SELECTOR': {
                selector = selector + data.selector;
                let rule = `${selector} { ${RP} }`;
                for (const property of data.value) {
                    if (property.type !== 'PROPERTY') { this.selectorRuleHandler(property as $StyleParamAnalysisData<$StyleParamData>, selector); continue; }
                    rule = rule.replace(RP, `${propertyMap[property.decodedKey as keyof typeof propertyMap] ?? property.decodedKey}: ${property.value}; ${RP}`)
                }
                rule = rule.replace(RP, '');
                if (this.paramSet.has(rule)) return;
                this.layer_selector.insertRule(rule, 0);
                this.paramSet.add(rule);
                break;
            }
            case 'PSEUDO_CLASS':
            case 'PSEUDO_ELEMENT': {
                selector = `${selector}${data.key.replaceAll('$', ':')}`
                let rule = `${selector} { _REPLACE_ }`
                for (const property of data.value) {
                    if (property.type !== 'PROPERTY') { this.selectorRuleHandler(property as $StyleParamAnalysisData<$StyleParamData>, selector); continue; }
                    rule = rule.replace(RP, `${propertyMap[property.decodedKey as keyof typeof propertyMap]}: ${property.value}; ${RP}`)
                }
                rule = rule.replace(RP, '')
                if (this.paramSet.has(rule)) return;
                this.layer_selector.insertRule(rule, 0);
                this.paramSet.add(rule);
                break;
            }
            case 'AT_RULE': {
                let rule = `@${data.decodedKey} ${data.data.query} { ${selector} { _REPLACE_ } }`
                for (const property of data.value) {
                    if (property.type !== 'PROPERTY') { this.selectorRuleHandler(property as $StyleParamAnalysisData<$StyleParamData>, selector); continue; }
                    rule = rule.replace(RP, `${propertyMap[property.decodedKey as keyof typeof propertyMap]}: ${property.value}; ${RP}`)
                }
                rule = rule.replace(RP, '')
                if (this.paramSet.has(rule)) return;
                this.layer_media.insertRule(rule, 0);
                this.paramSet.add(rule);
                break;
            }
            case 'CHILDREN': {
                this.childrenRuleHandler(data, selector)
                break;
            }
        }
    }

    private static childrenRuleHandler(child_data: $StyleParamAnalysisData<$StyleParamChildrenData>, selector = '') {
        const classname_list: string[] = [];
        for (const data of child_data.value) {
            classname_list.push(`{${selector}${data.selector}}`)
            this.selectorRuleHandler(data as $StyleParamAnalysisData<$StyleParamData>, `.` + `\\{${selector}${data.selector}\\}${child_data.selector} `.replaceAll('.', '\\.'))
        }
        return classname_list
    }

    private static getSelector(data_list: $StyleParamData[], prefix: string = '', postfix: string = '', atRules: string[] = []) {
        const selector_list: OrMatrix<$StyleParamAnalysisData<$StyleParamData>> = [];
        for (const data of data_list) {
            // skip selector
            if (data.type === 'SELECTOR') {
                selector_list.push({...data, atRules,
                    classname: `${prefix}{${data.selector}}`,
                    selector: `${prefix}${data.selector}${postfix}`,
                    cachedname: ''
                });
                continue;
            }
            if (data.type === 'CHILDREN') {
                selector_list.push({...data, atRules,
                    classname: `${postfix}`,
                    selector: `${postfix}`,
                    cachedname: ``
                })
                continue;
            }
            if (data.type === 'AT_RULE') {
                selector_list.push( this.getSelector(data.value, `${prefix}${data.key}-${data.data.query.replaceAll(' ', '')}:`, `${postfix}`, [...atRules, `${atRuleMap[data.decodedKey as keyof typeof atRuleMap]} ${data.data.query}`]))
            } else if (data.type === 'PSEUDO_CLASS') {
                selector_list.push( this.getSelector(data.value, `${prefix}${data.key}:`, `${postfix}${pseudoClassMap[data.decodedKey as keyof typeof pseudoClassMap]}`, atRules) )
            } else if (data.type === 'PSEUDO_ELEMENT') {
                selector_list.push( this.getSelector(data.value, `${prefix}${data.key}:`, `${postfix}${pseudoElementMap[data.decodedKey as keyof typeof pseudoElementMap]}`, atRules) )
            } else if (data.type === 'PROPERTY') {
                const property = `${prefix}${data.key}`.replaceAll(' ', '_');
                const value = `${data.value}`.replaceAll(' ', '_');
                selector_list.push( {
                    ...data, atRules, 
                    classname: `${property}:${value}`, 
                    selector: `.` + `${property}:${value}`.replaceAll(/[!"#$%&'()*+,-./:;<=>?@\[\\\]^`{|}~\t\n\v\f\r]/g, ($0, $1) => `\\${$0}`) + `${postfix}`,
                    cachedname: property
                } )
            }
        }
        return selector_list.flat() as $StyleParamAnalysisData<$StyleParamData>[];
    }

    static analysis(params: Partial<$CSSParams>, $ele?: $Element<any>) {
        const result: $StyleParamData[] = [];
        if (params['selector']) {
            const {selector, ...v} = params;
            result.push( { type: 'SELECTOR', value: this.analysis(v as $CSSParams), key: 'selector', decodedKey: 'selector', selector: selector!})
            return result;
        }
        for (const [k, v] of Object.entries(params)) {
            if (v === undefined) continue; // skip undefined selector
            const decodedKey = k.replaceAll(/\$/g, '')
            if (decodedKey === 'children') {
                const array = v as $CSSParams[];
                result.push( {type: 'CHILDREN', value: array.map(child_params => this.analysis(child_params).at(0) as $StyleParamSelectorData), decodedKey, key:k })
            } else if (decodedKey in atRuleMap) {
                const {query, ...value} = v as any;
                result.push( { type: 'AT_RULE', value: this.analysis(value as $CSSParams), key: k, decodedKey, data: {query}} ) 
            } else if (k.match(/^\$[^$]/) && decodedKey in pseudoClassMap) { 
                result.push( { type: 'PSEUDO_CLASS', value: this.analysis(v as $CSSParams), key: k, decodedKey } )
            } else if (k.match(/^\$\$[^$]/) && decodedKey in pseudoElementMap) { 
                result.push( { type: 'PSEUDO_ELEMENT', value: this.analysis(v as $CSSParams), key: k, decodedKey } ) 
            } else {
                if (v instanceof $State && $ele) v.on('update', () => $ele.css({[k]: v.value?.toString()}));
                result.push({type: 'PROPERTY', value: v instanceof $State ? v.value!.toString() : v.toString(), key: k, decodedKey: decodedKey});
            }
        }
        return result;
    }

    static propertyToClass(key: string, value: any) { return `${key.replaceAll('_', '-')}-${value}`}
    static getClasses(style: Partial<$CSSParams>, prefix = ''): string[] { return Object.entries(style).map(([k, v]) => v instanceof Object ? this.getClasses(v as $CSSParams, `${prefix}${k}:`) : this.propertyToClass(`${prefix.length ? `${prefix}` : ''}${k}`, v)).flat() }
}

export type $PropertyMap = typeof propertyMap;
export type $PseudoClassMap = typeof pseudoClassMap;
export type $PseudoElementMap = typeof pseudoElementMap;

type $StyleParamData = $StyleParamAtRuleData | $StyleParamPseudoData | $StyleParamPropertyData | $StyleParamSelectorData | $StyleParamChildrenData;

type $StyleParamAnalysisData<T> = T & {selector: string, classname: string, cachedname: string, atRules: string[]};

interface $StyleParamBaseData {
    type: 'AT_RULE' | 'PSEUDO_CLASS' | 'PSEUDO_ELEMENT' | 'PROPERTY' | 'SELECTOR' | 'CHILDREN',
    value: $StyleParamData[] | $StyleParamSelectorData[] | string | number | $State<string | number>,
    key: string,
    decodedKey: string,
}

interface $StyleParamSelectorData extends $StyleParamBaseData {
    type: 'SELECTOR',
    selector: string;
    value: $StyleParamData[]
}

interface $StyleParamChildrenData extends $StyleParamBaseData {
    type: 'CHILDREN',
    value: $StyleParamSelectorData[]
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
    value: string | number | $State<string | number>
}


export interface $CSSParams extends $CSSPropertyParams, $CSSPseudoParams, $CSSAtRuleParams {
    selector: string;
    children: (Partial<$CSSParams> & {selector: string})[];
}

export interface $CSSAtRuleParams {
    media: $CSSMediaAtRuleParams,
    layer: $CSSLayerAtRuleParams
}
export interface $CSSMediaAtRuleParams extends Partial<$CSSParams> { query: string }
export interface $CSSLayerAtRuleParams extends Partial<$CSSParams> { name: string }
export interface $CSSPseudoParams extends Record<`$${keyof $PseudoClassMap}`, Partial<$CSSParams>>, Record<`$$${keyof $PseudoElementMap}`, Partial<$CSSParams>> {}
// export type $CSSInlineBlockParam<T extends string> = $CSSNumbericParam<`${T}${'x'|'y'|'xs'|'xe'|'ys'|'ye'|'t'|'b'|'l'|'r'}`>
// export type $CSSNumbericParam<T extends string> = Record<T, $StyleNumberic>;
// export type $StyleUnit = 'px' | 'em' | 'rem' | 'w' | 'h' | 'dvw' | 'dvh' | '%';
// export type $StyleNumberic = number | string | ''; //| `${number}${$StyleUnit}`

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