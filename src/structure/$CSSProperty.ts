import type { $CSSBaseRule } from "./$CSSBaseRule";

export class $CSSProperty {
    name: string;
    value: string;
    parentRule: $CSSBaseRule;
    constructor(key: string, value: string, parentRule: $CSSBaseRule) {
        this.name = key;
        this.value = value;
        this.parentRule = parentRule;
    }

    get cssPropertyName() {
        return this.name.replaceAll(/([A-Z])/g, (_, s1) => `-${s1}`).toLowerCase();
    }

    get cssText() {
        return `${this.cssPropertyName}: ${this.value};`
    }
}