export abstract class $CSSBaseRule {
    cssRules: $CSSBaseRule[] = [];
    parentRule: $CSSBaseRule | null;
    id: string | null = null;
    css: $CSSConstructType;
    constructor(css: $CSSConstructType, options?: {parentRule?: $CSSBaseRule}) {
        this.css = css;
        this.parentRule = options?.parentRule ?? null;
    }

    abstract get cssText(): string;
}