import { GraphIterator, IteratorRange, Point2D } from "./graph-iterator";

export function* dataIterator(data: Point2D[], range?: IteratorRange): Iterator<Point2D> {
    const max = range ? (range.max + 1) : data.length;
    const step = range?.step ?? 1;
    for (let i = range?.min ?? 0; i < max; i += step) {
        yield data[i];
    }
}

/**
 * Iterator for an array of points
 */
export class DataIterator extends GraphIterator {
    constructor(readonly data: Point2D[], range?: IteratorRange) {
        super(range ?? {
            min: data[0].x,
            max: data[data.length - 1].x,
            step: 1
        });
    }

    getIterator(): Iterator<Point2D> {
        return dataIterator(this.data, this.range);
    }
}
