const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 50, left: 50 };
const graphWidth = width - margin.left - margin.right;
const graphHeight = height - margin.top - margin.bottom;

const svg = d3.select("#graph")
    .attr("width", width)
    .attr("height", height);

const graph = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3.scaleLinear()
    .domain([0, 360])
    .range([0, graphWidth]);

const yScale = d3.scaleLinear()
    .domain([-1.2, 1.2])
    .range([graphHeight, 0]);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

graph.append("g")
    .attr("transform", `translate(0,${graphHeight})`)
    .call(xAxis);

graph.append("g")
    .call(yAxis);

const sineLine = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(Math.sin(d.x * (Math.PI / 180))));

graph.append("path")
    .attr("class", "sine-line")
    .attr("d", sineLine([...Array(361).keys()].map(d => ({ x: d }))))
    .attr("fill", "none")
    .attr("stroke", "blue");

const point1 = graph.append("circle")
    .attr("class", "point")
    .attr("r", 5)
    .attr("fill", "red");

const point2 = graph.append("circle")
    .attr("class", "point")
    .attr("r", 5)
    .attr("fill", "green");

const secantLine = graph.append("line")
    .attr("class", "secant-line")
    .attr("stroke", "purple");

const point1Slider = d3.select("#point1");
const point2Slider = d3.select("#point2");

point1Slider.on("input", updateGraph);
point2Slider.on("input", updateGraph);

updateGraph();

function updateGraph() {
    const x1 = +point1Slider.property("value");
    const x2 = +point2Slider.property("value");

    point1.attr("cx", xScale(x1)).attr("cy", yScale(Math.sin(x1 * (Math.PI / 180))));
    point2.attr("cx", xScale(x2)).attr("cy", yScale(Math.sin(x2 * (Math.PI / 180))));

    secantLine
        .attr("x1", xScale(x1))
        .attr("y1", yScale(Math.sin(x1 * (Math.PI / 180))))
        .attr("x2", xScale(x2))
        .attr("y2", yScale(Math.sin(x2 * (Math.PI / 180))));
}
