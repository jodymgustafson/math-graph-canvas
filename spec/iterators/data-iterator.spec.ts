import { DataIterator } from "../../src/iterators/data-iterator";
import { IteratorRange, Point2D } from "../../src/iterators/graph-iterator";

const data: Point2D[] = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
    { x: 5, y: 5 },
    { x: 6, y: 6 },
];

describe("When iterate data", () => {
    it("should get points", () => {
        const graph = new DataIterator(data);
        const points: Point2D[] = [];
        for (const p of graph) {
            points.push(p);
        }
        expect(points).toEqual(data);
    });
});

describe("When iterate data with range", () => {
    it("should get points", () => {
        const range: IteratorRange = {
            min: 2,
            max: 5,
            step: 1
        };
        const graph = new DataIterator(data, range);
        const points: Point2D[] = [];
        for (const p of graph) {
            points.push(p);
        }
        expect(points).toEqual([
            { x: 2, y: 2 },
            { x: 3, y: 3 },
            { x: 4, y: 4 },
            { x: 5, y: 5 },
        ]);
    });
});

describe("When iterate data with step", () => {
    it("should get points", () => {
        const range: IteratorRange = {
            min: 0,
            max: 7,
            step: 2
        };
        const graph = new DataIterator(data, range);
        const points: Point2D[] = [];
        for (const p of graph) {
            points.push(p);
        }
        expect(points).toEqual([
            { x: 0, y: 0 },
            { x: 2, y: 2 },
            { x: 4, y: 4 },
            { x: 6, y: 6 },
        ]);
    });
});
