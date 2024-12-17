import { GraphIterator, IteratorRange } from "../iterators/graph-iterator";

export type GraphSettings = {
    color: string;
    width: number;
    visible: boolean;
    min?: number;
    max?: number;
};

function getDefaultSettings(): GraphSettings {
    return {
        color: "red",
        width: 2,
        visible: true
    };
}

export type GraphType = "cartesian" | "polar" | "parametric" | "data";

/**
 * Base class for all graphs
 */
export abstract class Graph {
    constructor(readonly name: string, readonly settings: GraphSettings = getDefaultSettings()) {
    }

    abstract readonly graphType: GraphType;

    /**
     * Gets an iterator for generating the points of the graph.
     * @param range Range of the iterator
     */
    abstract getIterator(range: IteratorRange): GraphIterator;

    toString(): string {
        return this.name;
    }

    toJSON(): any {
        return {
            type: this.graphType,
            expr: this.name,
            settings: this.settings
        };
    }
}
