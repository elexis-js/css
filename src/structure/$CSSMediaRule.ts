import { $CSSBaseRule } from "./$CSSBaseRule";

export class $CSSMediaRule extends $CSSBaseRule {
    conditionText: string = '';
    
    constructor(css: $CSSMediaRuleMap<boolean>, options?: {parentRule?: $CSSBaseRule, conditionText?: string}) {
        super(css, options)
        this.conditionText = options?.conditionText ?? '';
    }

    get cssText(): string {
        return `@media ${this.conditionText} { ${ this.properties.map((prop) => prop.cssText) } ${ this.cssRules.map(rule => `${rule.cssText} `).join('') }}`
    }
}