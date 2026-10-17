import { route as ziggyRoute } from "ziggy-js";
import { Ziggy } from "@/ziggy";

type RouteParams =
    | string
    | number
    | Record<string, string | number>
    | Array<string | number>;

export function route(name: string, params?: RouteParams, absolute?: boolean) {
    return ziggyRoute(name, params as any, absolute, Ziggy as any);
}
