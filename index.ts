import "elexis";
import { $Element } from "elexis";
import { $Style, type $StyleParams } from "./lib/$Style";
import { colors } from "./lib/colors";

declare module "elexis" {
    export interface $Element {
        style(...params: (Partial<$StyleParams> | undefined)[]): this;
    }

    export namespace $ {
        export const color: typeof colors;
        export function style<T extends Partial<$StyleParams>>(params: T) : T
    }
}

Object.assign($, {
    color: colors,
    style(params: Partial<$StyleParams>) { return params }
})
Object.assign($Element.prototype, {
    style(...params: (Partial<$StyleParams> | undefined)[]) { return $.fluent(this, arguments, () => this, () => { params.forEach(param => !param ? this : $Style.insertRule(param, this as $Element)); return this }) }
})