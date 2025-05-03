import { $CSSBaseRule } from "./$CSSBaseRule";
import type { $CSSKeyframeRule } from "./$CSSKeyframeRule";
import { $CSSStyleSheet } from "./$CSSStyleSheet";

export class $CSSKeyframesRule extends $CSSBaseRule {
    name: string = '';
    keyframes: $CSSKeyframeRule[] = []
    constructor(css: $CSSKeyframesRuleMap, name: string) {
        super(css)
        this.name = name;
        $CSSStyleSheet.construction(css, this);
    }

    get cssText(): string {
        return `@keyframes ${this.name} { ${ this.keyframes.map((keyframe) => keyframe.cssText).join(' ') } }`
    }
}