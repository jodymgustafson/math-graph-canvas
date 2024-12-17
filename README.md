# Math Graph Canvas

A graphing library with support for cartesian, polar and parametric graphs.

## Install

    npm i https://github.com/jodymgustafson/math-graph-canvas/releases/download/v1.0.0/math-graph-canvas-1.0.0.tgz

## Quick Start

```javascript
  const gc = document.createElement("graph-canvas");
  gc.setAttribute("width", "200");
  gc.setAttribute("height", "200");
  document.append(gc);

  const graph1 = new CartesianGraph("y=x+1", x => x + 1);
  gc.addGraph(graph1);
```

## Graphs
You can draw cartesian, polar, parametric and data point graphs.

### Cartesian
Use the CartesianGraph class to create a cartesian graph.
It requires a function that takes a single number as input and returns a number.

    new CartesianGraph("y=x+1", x => x + 1);

### Polar
Use the PolarGraph class to create a polar graph.
It requires a function that takes a single number as input and returns a number.

    new PolarGraph("r=cos(t)", t => Math.cos(t));

### Parametric
Use the ParametricGraph class to create a parametric graph.
It requires two functions that takes a single number as input and returns a number.

    new ParametricGraph("t+1,t^2", t => t + 1, t => Math.pow(t, 2));

### Data
Use the DataGraph class to create a graph of a set of points.
It requires an array of Point2D objects.

    new DataGraph("myData", [{x:1,y:1}, {x:2,y:4}, {x:3,y:9}]);


## GraphCanvas Web Component
The GraphCanvas web component allows you to use a custom element in your HTML for drawing graphs.
The element has width and height attributes.

```html
<graph-canvas width="600" height="600"></graph-canvas>
```

To add a graph:

    gc.addGraph(new CartesianGraph("y=x+1", x => x + 1));

To remove a graph

    gc.removeGraph("y=x+1");

Adding or removing a graph will cause the element to redraw.

## GraphRenderer
If you want to use your own canvas element you can use the GraphRenderer class to draw graphs on the canvas.

    const gr = new GraphRenderer(myCanvas, getDefaultViewport());
    const graphs = [new CartesianGraph("y=x+1", x => x + 1)];
    gr.draw(graphs);

## Expression Iterators

There are Iterators for generating 2D points for functions.

```typescript
const range: IteratorRange = {
    min: -3,
    max: 3,
    step: 1
};
const it = new CartesianIterator(x => x + 1, range);
for (const point of it) {
    console.log(point);
}
```
