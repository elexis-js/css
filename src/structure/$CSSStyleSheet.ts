import { $CSSProperty } from "./$CSSProperty";
import type { $CSSBaseRule } from "./$CSSBaseRule";
import { $CSSStyleRule } from "./$CSSStyleRule";
import { $CSSMediaRule } from "./$CSSMediaRule";
import type { $Element } from "elexis/node/$Element";
import { $CSSKeyframesRule } from "./$CSSKeyframesRule";
import { $CSSKeyframeRule } from "./$CSSKeyframeRule";

export class $CSSStyleSheet {
    static styleSheet = new CSSStyleSheet();
    static rules = new Set<$CSSBaseRule>();
    static ruleIdMap = new Map<string, $CSSStyleRule>();
    static cssOptionTextRuleMap = new Map<string, $CSSStyleRule>();
    static keyframesIdMap = new Map<string, $CSSKeyframesRule>();
    static variableIdSet = new Set<string>();

    static insertRule(css: $CSSOptions | $CSSStyleRule, options?: {element?: $Element}) {
        const rule = $.call(() => {
            if (css instanceof $CSSStyleRule) return css
            else if (options?.element) {
                // use css record when assign css with element
                const cssOptionText = JSON.stringify(css);
                const cacheRule = this.cssOptionTextRuleMap.get(cssOptionText) ?? new $CSSStyleRule(css);
                this.cssOptionTextRuleMap.set(cssOptionText, cacheRule);
                return cacheRule;
            } else return new $CSSStyleRule(css);
        })
        this.insertRuleToStyleSheet(rule);
        if (options?.element) this.applyToElement(options.element, rule);
        return rule;
    }

    static insertCSS(css: $CSSRootOptions) {
        this.construction(css);
    }

    static construction(css: $CSSConstructType, parentRule?: $CSSBaseRule) {
        if (css instanceof $CSSStyleRule && parentRule) css = css.css;
        for (const [key, value] of Object.entries(css)) {
            const IS_SELECTOR = key.startsWith('&') || key.startsWith('$');
            const IS_MEDIA = key.startsWith('@media');
            const IS_KEYFRAMES = key.startsWith('@keyframes');
            if (IS_SELECTOR) {
                // selector
                const selectorText = key.startsWith('$') ? key.slice(1) : key;
                const rule = new $CSSStyleRule(value, { selectorText, parentRule: parentRule });
                if (parentRule) parentRule?.cssRules.push(rule);
                else this.insertRuleToStyleSheet(rule);
            } else if (IS_MEDIA) {
                // media
                const conditionText = key.replace('@media ', '');
                const rule = new $CSSMediaRule(value, { conditionText, parentRule: parentRule});
                if (parentRule) parentRule.cssRules.push(rule);
                else this.insertRuleToStyleSheet(rule);
            } else if (IS_KEYFRAMES) {
                // keyframes
                const name = key.replace('@keyframes ', '');
                const rule = new $CSSKeyframesRule(value, name);
                this.insertRuleToStyleSheet(rule);
            } else if (parentRule instanceof $CSSKeyframesRule) {
                const rule = new $CSSKeyframeRule(value, key);
                parentRule.keyframes.push(rule);
            } else {
                // property
                if (!parentRule) throw new Error('[$CSSStyleSheet.construction()]: css property must have parent rule')
                if ('properties' in parentRule && parentRule.properties instanceof Array) parentRule.properties.push(new $CSSProperty(key, value, parentRule));
            }
        }
    }

    static insertRuleToStyleSheet(rule: $CSSBaseRule) {
        if (this.rules.has(rule)) return;
        this.styleSheet.insertRule(rule.cssText);
        this.rules.add(rule);
    }

    private static applyToElement(element: $Element, rule: $CSSStyleRule) {
        const classname = rule.selectorText.replaceAll(/^\./g, '');
        element?.addStaticClass(classname);
    }

}
document.adoptedStyleSheets.push($CSSStyleSheet.styleSheet)