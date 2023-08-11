const margin = { top: 20, right: 20, bottom: 50, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select("#graph-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3.scaleLinear()
    .domain([0, 360])
    .range([0, width]);

const yScale = d3.scaleLinear()
    .domain([-1.2, 1.2])
    .range([height, 0]);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(Math.sin(d.x * Math.PI / 180)));

svg.append("path")
    .datum(d3.range(0, 361, 1).map(x => ({ x })))
    .attr("class", "line")
    .attr("d", line);

const slopeLine = svg.append("line")
    .attr("class", "slope-line")
    .style("stroke", "gray")
    .style("stroke-width", 2)
    .style("opacity", 0);

const slider = d3.select("#slider");
slider.on("input", updateSlope);

function updateSlope() {
    const xValue = +slider.node().value;
    const slope = Math.cos(xValue * Math.PI / 180);

    slopeLine
        .attr("x1", xScale(xValue))
        .attr("y1", yScale(Math.sin(xValue * Math.PI / 180)))
        .attr("x2", xScale(xValue) + 50)
        .attr("y2", yScale(Math.sin(xValue * Math.PI / 180)) - 50 * slope)
        .style("opacity", 1);
}

updateSlope(); // Initial slope update

// Adding labels, descriptions, and instructions
d3.select("#instructions p").html("Use the slider to change the input value.");
