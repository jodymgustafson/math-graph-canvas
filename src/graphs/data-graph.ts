import { GraphIterator, IteratorRange, Point2D } from "../iterators/graph-iterator";
import { Graph, GraphSettings } from "./graph";
import { DataIterator } from "../iterators/data-iterator";

/**
 * Defines a graph of data points
 */
export class DataGraph extends Graph {
    readonly graphType = "data";

    constructor(name: string, readonly data: Point2D[], settings?: GraphSettings) {
        super(name, settings);
    }

    evaluate(i: number): [number, number] {
        return [this.data[i].x, this.data[i].y];
    }

    getIterator(range: IteratorRange): GraphIterator {
        return new DataIterator(this.data, range);
    }
}