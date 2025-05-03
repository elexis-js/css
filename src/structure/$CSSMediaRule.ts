import { $CSSBaseRule } from "./$CSSBaseRule";
import type { $CSSProperty } from "./$CSSProperty";
import { $CSSStyleSheet } from "./$CSSStyleSheet";

export class $CSSMediaRule extends $CSSBaseRule {
    conditionText: string = '';
    properties: $CSSProperty[] = [];
    
    constructor(css: $CSSMediaRuleMap<boolean>, options?: {parentRule?: $CSSBaseRule, conditionText?: string}) {
        super(css, options)
        this.conditionText = options?.conditionText ?? '';
        $CSSStyleSheet.construction(css, this);
    }

    get cssText(): string {
        return `@media ${this.conditionText} { ${ this.properties.map((prop) => prop.cssText).join(' ') } ${ this.cssRules.map(rule => `${rule.cssText} `).join(' ') }}`
    }
}