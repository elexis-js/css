import{ $CSSBaseRule } from "./$CSSBaseRule";

export class $CSSStyleRule extends $CSSBaseRule {
    selectorText: string = '';
    
    constructor(css: $CSSOptionsType, options?: {parentRule?: $CSSBaseRule, selectorText?: string}) {
        super(css, options)
        this.selectorText = options?.selectorText ?? $CSSStyleRule.generateId();
    }

    get cssText(): string {
        return `${this.selectorText} { ${ this.properties.map((prop) => prop.cssText).join(' ') } ${ this.cssRules.map(rule => `${rule.cssText} `).join(' ') }}`
    }
}