export abstract class $CSSBaseRule {
    cssRules: $CSSBaseRule[] = [];
    parentRule: $CSSBaseRule | null;
    id: string | null = null;
    
    constructor(css: $CSSRuleType, options?: {parentRule?: $CSSBaseRule}) {
        this.parentRule = options?.parentRule ?? null;
    }

    abstract get cssText(): string;
}