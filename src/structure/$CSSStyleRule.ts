import { generateId } from "#lib/generateId";
import{ $CSSBaseRule } from "./$CSSBaseRule";
import type { $CSSProperty } from "./$CSSProperty";
import { $CSSStyleSheet } from "./$CSSStyleSheet";

export class $CSSStyleRule extends $CSSBaseRule {
    properties: $CSSProperty[] = [];
    selectorText: string = '';
    declare css: $CSSOptionsType;
    
    constructor(css: $CSSOptionsType, options?: {parentRule?: $CSSBaseRule, selectorText?: string}) {
        super(css, options)
        this.selectorText = options?.selectorText ?? this.generateClassName();
        $CSSStyleSheet.construction(css, this);
    }

    get cssText(): string {
        return `${this.selectorText} { ${ this.properties.map((prop) => prop.cssText).join(' ') } ${ this.cssRules.map(rule => `${rule.cssText} `).join(' ') }}`
    }

    protected generateClassName(): string { 
        const id = generateId();
        if ($CSSStyleSheet.ruleIdMap.has(id)) return this.generateClassName();
        $CSSStyleSheet.ruleIdMap.set(id, this); return `.${id}`;
    }

    toJSON() { return this.css }
}