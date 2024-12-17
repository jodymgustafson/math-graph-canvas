import { IteratorRange, Point2D } from "../../src/iterators/graph-iterator";
import { ParametricIterator } from "../../src/iterators/parametric-iterator";

describe("When iterate parametric equation", () => {
    it("should get points", () => {
        const range: IteratorRange = {
            min: -3,
            max: 3,
            step: 1
        };
        const graph = new ParametricIterator(t => t, t => t, range);
        const points: Point2D[] = [];
        for (const p of graph) {
            points.push(p);
        }
        expect(points).toEqual([
            { x: -3, y: -3 },
            { x: -2, y: -2 },
            { x: -1, y: -1 },
            { x: 0, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
        ])
    });
});
