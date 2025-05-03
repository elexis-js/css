import { $CSSBaseRule } from "./$CSSBaseRule";
import type { $CSSProperty } from "./$CSSProperty";
import { $CSSStyleSheet } from "./$CSSStyleSheet";

export class $CSSKeyframeRule extends $CSSBaseRule {
    keyframeText: string = '';
    properties: $CSSProperty[] = [];
    
    constructor(css: $CSSKeyframesRuleMap, keyframeText: string) {
        super(css)
        this.keyframeText = keyframeText;
        $CSSStyleSheet.construction(css, this);
    }

    get cssText(): string {
        return `${this.keyframeText} { ${ this.properties.map((prop) => prop.cssText).join(' ') } ${ this.cssRules.map(rule => `${rule.cssText} `).join(' ') }}`
    }
}