import { GraphRenderer } from "./graph-renderer";
import { getDefaultViewport, GraphViewport } from "./graph-viewport";
import { Graph } from "./graphs/graph";

/**
 * Defines a graph-canvas custom element web component
 */
export class GraphCanvas extends HTMLElement {
    static observedAttributes = ["width", "height"];

    readonly graphs: Graph[] = [];
    protected renderer?: GraphRenderer;
    protected readonly canvas: HTMLCanvasElement;

    get viewport(): GraphViewport {
        return this.renderer!.viewport;
    }

    set viewport(vp: GraphViewport) {
        this.renderer = new GraphRenderer(this.canvas, vp);
    }

    constructor() {
        super();
        this.canvas = document.createElement('canvas');
    }

    addGraph(g: Graph): GraphCanvas {
        this.graphs.push(g);
        this.draw();
        return this;
    }

    removeGraph(name: string): Graph {
        const idx = this.graphs.findIndex(g => g.name === name);
        return this.graphs.splice(idx)[0];
    }

    draw(): void {
        requestAnimationFrame(() => {
            this.renderer!.draw(this.graphs);
        });
    }

    protected connectedCallback(): void {
        const width = this.getAttribute('width');
        const height = this.getAttribute('height');
        this.canvas.width = width ? parseInt(width) : 100;
        this.canvas.height = height ? parseInt(height) : 100;

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.canvas);

        this.viewport = getDefaultViewport();
        this.draw();
    }

    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === "width") {
            this.canvas.width = parseInt(newValue);
        }
        else if (name === "height") {
            this.canvas.height = parseInt(newValue);
        }
    }
}

customElements.define("graph-canvas", GraphCanvas);
