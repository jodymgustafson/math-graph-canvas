import { GraphIterator, IteratorRange, Point2D } from "./graph-iterator";

export function* parametricIterator(xOfT: (t: number) => number, yOfT: (t: number) => number, range: IteratorRange): Iterator<Point2D> {
    for (let t = range.min; t <= range.max; t += range.step) {
        yield {
            x: xOfT(t),
            y: yOfT(t)
        };
    }
}

/**
 * Iterator for parametric equations, x(t) = .., y(t) = ...
 */
 export class ParametricIterator extends GraphIterator {
    constructor(readonly xOfT: (t: number) => number, readonly yOfT: (t: number) => number, range: IteratorRange) {
        super(range);
    }

    getIterator(): Iterator<Point2D> {
        return parametricIterator(this.xOfT, this.yOfT, this.range);
    }
}
