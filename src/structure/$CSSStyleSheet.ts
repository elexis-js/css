import type { $Element } from "elexis";
import { $CSSProperty } from "./$CSSProperty";
import type { $CSSBaseRule } from "./$CSSBaseRule";
import { $CSSStyleRule } from "./$CSSStyleRule";
import { $CSSMediaRule } from "./$CSSMediaRule";

export class $CSSStyleSheet {
    static styleSheet = new CSSStyleSheet();
    static cssRules = new Set<$CSSBaseRule>();
    static cssRuleIdMap = new Map<string, $CSSStyleRule>();
    static cssTextRuleMap = new Map<string, $CSSStyleRule>();

    static insertRule(css: $CSSOptions | $CSSStyleRule, options?: {element?: $Element}) {
        const rule = $.call(() => {
            if (css instanceof $CSSStyleRule) return css
            else if (options?.element) {
                // use css record when assign css with element
                const cssOptionText = JSON.stringify(css);
                const cacheRule = this.cssTextRuleMap.get(cssOptionText) ?? new $CSSStyleRule(css);
                this.cssTextRuleMap.set(cssOptionText, cacheRule);
                return cacheRule;
            } else return new $CSSStyleRule(css);   
        })
        if (!this.cssRules.has(rule)) this.insertRuleToStyleSheet(rule);
        if (options?.element) this.addClassToElement(options.element, rule);
        return rule;
    }

    static insertCSS(css: $CSSRootOptions) {
        this.construction(css);
    }

    static construction(css: $CSSOptionsType, parentRule?: $CSSBaseRule) {
        for (const [key, value] of Object.entries(css)) {
            const IS_SELECTOR = key.startsWith('&') || key.startsWith('$');
            const IS_MEDIA = key.startsWith('@media');
            if (IS_SELECTOR) {
                // selector
                const selectorText = key.startsWith('$') ? key.slice(1) : key;
                const rule = new $CSSStyleRule(value, { selectorText, parentRule: parentRule });
                if (parentRule) parentRule.cssRules.push(rule);
                else this.insertRuleToStyleSheet(rule)
            } else if (IS_MEDIA) {
                // media
                const conditionText = key.replace('@media ', '');
                const rule = new $CSSMediaRule(value, { conditionText, parentRule: parentRule});
                if (parentRule) parentRule.cssRules.push(rule);
                else this.insertRuleToStyleSheet(rule)
            } else {
                // property
                if (!parentRule) throw new Error('[$CSSStyleSheet.construction()]: css property must have parent rule')
                parentRule?.properties.push(new $CSSProperty(key, value, parentRule));
            }
        }
    }

    private static insertRuleToStyleSheet(rule: $CSSBaseRule) {
        this.styleSheet.insertRule(rule.cssText);
        this.cssRules.add(rule);
    }

    private static addClassToElement(element: $Element, rule: $CSSStyleRule) {
        const classname = rule.selectorText.replaceAll(/^\./g, '');
        element?.addClass(classname);
    }

}
document.adoptedStyleSheets.push($CSSStyleSheet.styleSheet)