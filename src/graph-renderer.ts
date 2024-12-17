import { CanvasContext2D } from "canvas-context-2d";
import { Graph } from "./graphs/graph";
import { GraphViewport } from "./graph-viewport";
import { IteratorRange, Point2D } from "./iterators/graph-iterator";

/**
 * Renders any number of graphs on a canvas
 */
export class GraphRenderer {
    /** Used to scale points to canvas coordinates */
    private scale: Point2D = { x: 0, y: 0 };
    /** The origin in canvas coordinates */
    private origin: Point2D = { x: 0, y: 0 };

    readonly context: CanvasContext2D;
    private _viewport: GraphViewport

    get viewport(): GraphViewport {
        return this._viewport;
    }

    set viewport(vp: GraphViewport) {
        this._viewport = vp;
        this.updateScale();
    }

    constructor(readonly canvas: HTMLCanvasElement, viewport: GraphViewport) {
        this.context = new CanvasContext2D(this.canvas);
        this._viewport = viewport;
        this.updateScale();
    }

    private updateScale() {
        this.scale = {
            x: this.canvas.width / (this._viewport.maxX - this._viewport.minX),
            y: this.canvas.height / (this._viewport.maxY - this._viewport.minY)
        };
        // console.log(this.scale);
        this.origin = {
            x: (this.canvas.width - this.scale.x * (this._viewport.maxX + this._viewport.minX)) / 2,
            y: (this.canvas.height + this.scale.y * (this._viewport.maxY + this._viewport.minY)) / 2
        };
        // console.log(this.origin);
    }

    /**
     * Converts point on the canvas to graph coordinates 
     */
    toGraphPoint(x: number, y: number): Point2D {
        return {
            x: (x - this.origin.x) / this.scale.x,
            y: (this.origin.y - y) / this.scale.y
        };
    }

    /** Draws a list of graphs */
    draw(graphs: Graph[]): void {
        // console.log("draw");
        this.context.save()
            .clear()
            .translate(this.origin.x, this.origin.y)
            .transform(1, 0, 0, -1, 0, 0);

        this.drawGrid()
            .drawGraphs(graphs);

        this.context.restore();
    }

    private drawGraphs(graphs: Graph[]): GraphRenderer {
        const range = this.getRange();
        const scaleX = this.scale.x;
        const scaleY = this.scale.y;

        for (const graph of graphs) {
            if (graph.settings.visible) {
                try {
                    this.context.strokeStyle(graph.settings.color).lineWidth(graph.settings.width);
                    const it = graph.getIterator(range);

                    const first = it.next().value;
                    this.context.beginPath().moveTo(first.x * scaleX, first.y * scaleY);
                    
                    for (const p of it) {
                        this.context.lineTo(p.x * scaleX, p.y * scaleY);
                    }
                    this.context.stroke().closePath();
                }
                catch (err) {
                    console.log(graph.toString(), err);
                }
            }
        }

        return this;
    }

    private drawGrid(): GraphRenderer {
        const vp = this._viewport;
        if (!(vp.showAxes || vp.showGrid)) {
            return this;
        }

        const { minX, minY, maxX, maxY } = vp;
        const scale = this.scale;
        const scaledMinX = scale.x * minX;
        const scaledMaxX = scale.x * maxX;
        const scaledMinY = scale.y * minY;
        const scaledMaxY = scale.y * maxY;

        if (vp.showGrid) {
            const { gridX, gridY } = vp;
            this.context.strokeStyle(vp.gridColor ?? "gray").lineWidth(vp.gridWidth ?? 1);
            for (let y = minY - minY % gridY; y < maxY; y += gridY) {
                const sy = scale.y * y;
                this.context.drawLine(scaledMinX, sy, scaledMaxX, sy);
            }

            for (let x = minX - minX % gridX; x < maxX; x += gridX) {
                const sx = scale.x * x;
                this.context.drawLine(sx, scaledMinY, sx, scaledMaxY);
            }
        }
        
        if (vp.showAxes) {
            this.context.strokeStyle(vp.axesColor ?? "black").lineWidth(vp.axesWidth ?? 1)
            .drawLine(scaledMinX, 0, scaledMaxX, 0)
            .drawLine(0, scaledMinY, 0, scaledMaxY);
        }

        return this;
    }

    protected getRange(): IteratorRange {
        const { minX, maxX} = this._viewport;
        return {
            min: minX,
            max: maxX,
            step: (maxX - minX) / this.canvas.width
        };
    }
}