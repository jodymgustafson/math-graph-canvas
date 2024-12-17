import { GraphIterator, IteratorRange, Point2D } from "./graph-iterator";

export function* cartesianIterator(yOfX: (x: number) => number, range: IteratorRange): Iterator<Point2D> {
    for (let x = range.min; x <= range.max; x += range.step) {
        yield {
            x: x,
            y: yOfX(x)
        };
    }
}

/**
 * Iterator for cartesian graphs, y(x) = ...
 */
export class CartesianIterator extends GraphIterator {
    constructor(readonly yOfX: (x: number) => number, range: IteratorRange) {
        super(range);
    }

    getIterator(): Iterator<Point2D> {
        return cartesianIterator(this.yOfX, this.range);
    }
}
