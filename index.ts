import { $Element } from "elexis";
import { $CSS, type $CSSParams } from "./lib/$CSS";
import { colors } from "./lib/colors";

declare module "elexis" {
    export interface $Element {
        css(...params: (Partial<$CSSParams> | undefined)[]): this;
    }

    export namespace $ {
        export const color: typeof colors;
        export function css<T extends Partial<$CSSParams>>(params: T) : T
        export function css(...params: Partial<$CSSParams>[]) : Partial<$CSSParams>[]
    }
}

Object.assign($, {
    color: colors,
    css(...params: Partial<$CSSParams>[]) {
        if (params.length === 1) {
            const data = params.at(0);
            if (data && data.selector) $CSS.insertRule(data);
            return data;
        } else {
            return params.map(data => {
                if (data && data.selector) return $CSS.insertRule(data);
                else return data;
            })
        }
    }
        
})
Object.assign($Element.prototype, {
    css(...params: (Partial<$CSSParams> | undefined)[]) { return $.fluent(this, arguments, () => this, () => { params.forEach(param => !param ? this : $CSS.insertRule(param, this as $Element)); return this }) }
})

export * from "./lib/$CSS";
export * from "./lib/$CSSPropertyParams";