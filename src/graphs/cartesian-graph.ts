import { GraphIterator, IteratorRange } from "../iterators/graph-iterator";
import { CartesianIterator } from "../iterators/cartesian-iterator";
import { Graph, GraphSettings } from "./graph";

export type CartesianGraphFunction = (x: number) => number;

/**
 * Defines a graph using cartesian coordinates
 */
export class CartesianGraph extends Graph {
    readonly graphType = "cartesian";

    constructor(name: string, readonly fn: CartesianGraphFunction, settings?: GraphSettings) {
        super(name, settings);
    }

    evaluate(x: number): number {
        return this.fn(x);
    }

    getIterator(range: IteratorRange): GraphIterator {
        return new CartesianIterator(this.fn, range);
    }
}