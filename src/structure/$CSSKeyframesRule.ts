import { generateId } from "#lib/generateId";
import { $CSSBaseRule } from "./$CSSBaseRule";
import type { $CSSKeyframeRule } from "./$CSSKeyframeRule";
import { $CSSStyleSheet } from "./$CSSStyleSheet";

export class $CSSKeyframesRule extends $CSSBaseRule {
    name: string = '';
    keyframes: $CSSKeyframeRule[] = []
    constructor(css: $CSSKeyframesPropertyMap, name: string, id = false) {
        super(css)
        this.name = id ? this.generateName(name) : name;
        $CSSStyleSheet.construction(css, this);
    }

    get cssText(): string {
        return `@keyframes ${this.name} { ${ this.keyframes.map((keyframe) => keyframe.cssText).join(' ') } }`
    }

    protected generateName(name: string): string {
        const id = `${name}_${generateId()}`;
        if ($CSSStyleSheet.keyframesIdMap.has(id)) return this.generateName(name);
        $CSSStyleSheet.keyframesIdMap.set(id, this); return id;
    }

    toString() { return this.name }
}