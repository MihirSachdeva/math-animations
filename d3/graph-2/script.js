document.addEventListener("DOMContentLoaded", function() {
  // Select elements
  const graphContainer = d3.select("#graph");
  const slider = document.getElementById("slider");
  const slopeIndicator = d3.select("#slope-indicator");

  // Create SVG canvas dimensions
  const width = 600;
  const height = 300;

  // Create scales for x and y axes
  const xScale = d3.scaleLinear().domain([0, 360]).range([0, width]);
  const yScale = d3.scaleLinear().domain([-1.5, 1.5]).range([height, 0]);

  // Create the SVG canvas
  const svg = graphContainer
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  // Add x and y axes
  svg.append("g")
      .attr("transform", `translate(0, ${height / 2})`)
      .call(d3.axisBottom(xScale));
  svg.append("g")
      .attr("transform", `translate(${width / 2}, 0)`)
      .call(d3.axisLeft(yScale));

  // Define the sin(x) function
  const sineFunction = d3.line()
      .x(d => xScale(d))
      .y(d => yScale(Math.sin(d * (Math.PI / 180))));

  // Create the sine curve
  svg.append("path")
      .attr("d", sineFunction(d3.range(0, 360)))
      .attr("class", "sine-curve");

  // Update slope indicator on slider change
  slider.addEventListener("input", () => {
      const sliderValue = +slider.value;
      const slopeX = sliderValue * (Math.PI / 180);
      const slopeY = Math.sin(slopeX);

      slopeIndicator
          .style("left", xScale(sliderValue) + "px")
          .style("top", yScale(slopeY) + "px");

      svg.selectAll(".slope-line").remove();

      svg.append("line")
          .attr("class", "slope-line")
          .attr("x1", xScale(sliderValue))
          .attr("y1", yScale(0))
          .attr("x2", xScale(sliderValue))
          .attr("y2", yScale(slopeY))
          .style("stroke", "#ff8c66")
          .style("stroke-width", 2);
  });
});
