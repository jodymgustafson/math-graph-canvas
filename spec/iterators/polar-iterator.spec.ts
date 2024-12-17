import { IteratorRange, Point2D } from "../../src/iterators/graph-iterator";
import { PolarIterator } from "../../src/iterators/polar-iterator";

describe("When iterate polar equation", () => {
    it("should get points", () => {
        const range: IteratorRange = {
            min: -Math.PI,
            max: Math.PI,
            step: Math.PI / 2
        };
        const graph = new PolarIterator(t => t, range);
        const points: Point2D[] = [];
        for (const p of graph) {
            points.push(p);
        }
        expect(points[0].x).toBeCloseTo(0);
        expect(points[0].y).toBeCloseTo(Math.PI);
        expect(points[1].x).toBeCloseTo(Math.PI / 2);
        expect(points[1].y).toBeCloseTo(0);
        expect(points[2].x).toBeCloseTo(0);
        expect(points[2].y).toBeCloseTo(0);
        expect(points[3].x).toBeCloseTo(Math.PI / 2);
        expect(points[3].y).toBeCloseTo(0);
        expect(points[4].x).toBeCloseTo(0);
        expect(points[4].y).toBeCloseTo(-Math.PI);
    });
});
