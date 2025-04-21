import{ $CSSBaseRule } from "./$CSSBaseRule";
import { $CSSStyleSheet } from "./$CSSStyleSheet";
const LETTER_STR = 'abcdefghijklmnopqrstuvwxyz';

export class $CSSStyleRule extends $CSSBaseRule {
    selectorText: string = '';
    
    constructor(css: $CSSOptionsType, options?: {parentRule?: $CSSBaseRule, selectorText?: string}) {
        super(css, options)
        this.selectorText = options?.selectorText ?? this.generateId();
    }

    get cssText(): string {
        return `${this.selectorText} { ${ this.properties.map((prop) => prop.cssText).join(' ') } ${ this.cssRules.map(rule => `${rule.cssText} `).join(' ') }}`
    }

    protected generateId(length = 5): string { 
        const id = Array.from({length}, (_, i) => { 
            const char = LETTER_STR + LETTER_STR.toUpperCase();
            const rand = Math.round(Math.random() * char.length); return char[rand] 
        }).join(''); 
        if ($CSSStyleSheet.cssRuleIdMap.has(id)) return this.generateId(length);
        $CSSStyleSheet.cssRuleIdMap.set(id, this); return `.${id}`;
    }
}