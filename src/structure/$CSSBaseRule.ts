import { $CSSProperty } from "./$CSSProperty";
import { $CSSStyleSheet } from "./$CSSStyleSheet";

export abstract class $CSSBaseRule {
    properties: $CSSProperty[] = [];
    cssRules: $CSSBaseRule[] = [];
    parentRule: $CSSBaseRule | null;
    id: string | null = null;
    
    constructor(css: $CSSOptionsType, options?: {parentRule?: $CSSBaseRule}) {
        this.parentRule = options?.parentRule ?? null;
        $CSSStyleSheet.construction(css, this);
    }

    abstract get cssText(): string;
}