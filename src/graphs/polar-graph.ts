import { GraphIterator, IteratorRange } from "../iterators/graph-iterator";
import { Graph, GraphSettings } from "./graph";
import { PolarIterator } from "../iterators/polar-iterator";

export type PolarGraphFunction = (t: number) => number;

/**
 * Defines a graph using polar coordinates
 */
export class PolarGraph extends Graph {
    readonly graphType = "polar";

    constructor(name: string, readonly fn: PolarGraphFunction, settings?: GraphSettings) {
        super(name, settings);
    }

    evaluate(t: number): number {
        return this.fn(t);
    }

    getIterator(range: IteratorRange): GraphIterator {
        return new PolarIterator(this.fn, range);
    }
}