import { GraphIterator, IteratorRange, Point2D } from "./graph-iterator";

export function* polarIterator(rOfT: (t: number) => number, range: IteratorRange): Iterator<Point2D> {
    for (let t = range.min; t <= range.max; t += range.step) {
        const r = rOfT(t);
        yield {
            x: r * Math.sin(t),
            y: r * Math.cos(t)
        };
    }
}

/**
 * Iterator for polar equations, r(t) = ...
 */
 export class PolarIterator extends GraphIterator {
    constructor(readonly rOfT: (t: number) => number, range: IteratorRange) {
        super(range);
    }

    getIterator(): Iterator<Point2D> {
        return polarIterator(this.rOfT, this.range);
    }
}
