# Math Graph Canvas

A graphing library with support for cartesian, polar and parametric graphs.

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

## Expression Iterators

Iterators for generating 2D points for functional, polar or parametric expressions.

```typescript
const range: IteratorRange = {
    min: -3,
    max: 3,
    step: 1
};
const it = new FunctionalIterator(x => x, range);
for (const point of it) {
    console.log(point);
}
```
