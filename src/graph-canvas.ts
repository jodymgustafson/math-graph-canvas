import { GraphRenderer } from "./graph-renderer";
import { getDefaultViewport, GraphViewport } from "./graph-viewport";
import { Graph } from "./graphs/graph";

/**
 * Defines a graph-canvas custom element web component
 */
export class GraphCanvas extends HTMLElement {
    static observedAttributes = ["width", "height"];

    readonly canvas: HTMLCanvasElement;
    readonly graphs: Graph[] = [];
    protected renderer?: GraphRenderer;

    get viewport(): GraphViewport {
        return this.renderer!.viewport;
    }

    set viewport(vp: GraphViewport) {
        this.renderer = new GraphRenderer(this.canvas, vp);
    }

    /** A callback function to be called before drawing starts */
    beforeDraw?: () => void;

    /** A callback function to be called after drawing finishes */
    afterDraw?: () => void;

    constructor() {
        super();
        this.canvas = document.createElement('canvas');
        // Removes padding from bottom so canvas takes up entire area
        this.style.display = 'inline-flex';
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
            this.beforeDraw?.();
            this.renderer!.draw(this.graphs);
            this.afterDraw?.();
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
