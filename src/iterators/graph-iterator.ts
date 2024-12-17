export type Point2D = {
    x: number;
    y: number;
};

export type IteratorRange = {
    /** Start of range, inclusive */
    min: number;
    /** End of range, inclusive */
    max: number;
    /** Amount to increment each step */
    step: number;
};

/**
 * Base class for iterable iterators that produce points for a graph.
 */
export abstract class GraphIterator implements IterableIterator<Point2D> {
    protected it?: Iterator<Point2D>;

    protected abstract getIterator(): Iterator<Point2D>;

    constructor(readonly range: IteratorRange) {
    }

    [Symbol.iterator](): IterableIterator<Point2D> {
        return this;
    }

    /**
     * Implements next for Iterator
     * @returns The next point
     */
    next(): IteratorResult<Point2D> {
        if (!this.it) {
            this.it = this.getIterator();
        }
        return this.it.next();
    }

    reset(): void {
        this.it = this.getIterator();
    }

    /**
     * @returns All of the points in an array
     */
    points(): Point2D[] {
        return Array.from(this);
    }
}
