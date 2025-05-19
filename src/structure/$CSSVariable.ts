import { generateId } from "#lib/generateId";
import { $CSSStyleSheet } from "./$CSSStyleSheet";

export class $CSSVariable {
    name: string;
    value: string;
    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }

    static generateName(name: string): string {
        const id = `${name}_${generateId({case: 'lower'})}` as const;
        if ($CSSStyleSheet.variableIdSet.has(id)) return this.generateName(name);
        return id;
    }

    toString() { return `var(--${this.name})` }
}