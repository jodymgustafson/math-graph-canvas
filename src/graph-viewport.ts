export type GraphViewport = {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    gridX: number;
    gridY: number;
    axesWidth?: number;
    axesColor?: string;
    gridWidth?: number;
    gridColor?: string;
    showGrid: boolean;
    showAxes: boolean;
};

export function getDefaultViewport(): GraphViewport {
    return {
        minX: -5, maxX: 5, minY: -5, maxY: 5, gridX: 1, gridY: 1, showGrid: true, showAxes: true
    };
}

export function getTrigViewport(): GraphViewport {
    return {
        minX: -Math.PI, maxX: Math.PI, minY: -2, maxY: 2, gridX: Math.PI / 4, gridY: .5, showGrid: true, showAxes: true
    };
}
