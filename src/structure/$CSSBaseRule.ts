import { $CSSProperty } from "./$CSSProperty";
import { $CSSStyleSheet } from "./$CSSStyleSheet";
const LETTER_STR = 'abcdefghijklmnopqrstuvwxyz';

export abstract class $CSSBaseRule {
    properties: $CSSProperty[] = [];
    cssRules: $CSSBaseRule[] = [];
    parentRule: $CSSBaseRule | null;
    
    constructor(css: $CSSOptionsType, options?: {parentRule?: $CSSBaseRule}) {
        this.parentRule = options?.parentRule ?? null;
        $CSSStyleSheet.construction(css, this);
    }

    abstract get cssText(): string;

    protected static idSet = new Set<string>();
    protected static generateId(length = 5): string { 
        const id = Array.from({length}, (_, i) => { 
            const char = LETTER_STR + LETTER_STR.toUpperCase();
            const rand = Math.round(Math.random() * char.length); return char[rand] 
        }).join(''); 
        if (this.idSet.has(id)) return this.generateId(length);
        this.idSet.add(id); return `.${id}`;
    }
}