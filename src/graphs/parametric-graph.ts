import { GraphIterator, IteratorRange } from "../iterators/graph-iterator";
import { Graph, GraphSettings } from "./graph";
import { ParametricIterator } from "../iterators/parametric-iterator";

export type ParametricGraphFunction = (t: number) => number;

/**
 * Defines a parametric graph with separate functions for x and y coordinates.
 */
export class PolarGraph extends Graph {
    readonly graphType = "parametric";

    constructor(name: string,
        readonly xFn: ParametricGraphFunction,
        readonly yFn: ParametricGraphFunction,
        settings?: GraphSettings)
    {
        super(name, settings);
    }

    evaluate(t: number): [number, number] {
        return [this.xFn(t), this.yFn(t)];
    }

    getIterator(range: IteratorRange): GraphIterator {
        return new ParametricIterator(this.xFn, this.yFn, range);
    }
}