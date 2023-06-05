window.function = function (data, width, height, barNames, threshold) {
  // data
  data = data.value ?? "";
  width = width.value ?? "100vw";  // use viewport width units
  height = height.value ?? "500px"; // use pixel units
  barNames = barNames.value ?? ""; // bar names should be comma-separated
  threshold = threshold.value ?? "100";

  // convert barNames string to array
  let barNameArray = barNames.split(',');

  let ht = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Bar Chart with Chart.js</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <canvas id="myBarChart" style="width: ${width}; height: ${height};"></canvas>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        const ctx = document.getElementById('myBarChart').getContext('2d');
        const textColor = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'white' : 'black';
        const data = {
          labels: ${JSON.stringify(barNameArray)},
          datasets: [
            {
              label: "Sales Achievement Rate",
              data: [${data}],
              backgroundColor: '#4622B0',
              borderColor: '#4622B0',
              borderWidth: 1,
              barThickness: 50
            }
          ]
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                display: true,
                color: textColor
              },
              grid: {
                color: 'rgba(255, 255, 255, 0)'
              },
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (context.parsed.y !== null) {
                    label += ': ' + context.parsed.y + '%';
                  }
                  return label;
                }
              }
            }
          }
        };

        var horizontalLinePlugin = {
          afterDraw: function(chartInstance) {
            var yScale = chartInstance.scales["y"];
            var canvas = chartInstance.chart;
            var ctx = canvas.ctx;
            var yValue;
            var style = "#8B0000";
            var line = { y: ${threshold} };

            if (line.y) {
              yValue = yScale.getPixelForValue(line.y);
            } else {
              yValue = 0;
            }

            if (yValue) {
              ctx.lineWidth = 4;
              ctx.beginPath();
              ctx.moveTo(0, yValue);
              ctx.lineTo(canvas.width, yValue);
              ctx.strokeStyle = style;
              ctx.stroke();
            }
          }
        };
        Chart.register(horizontalLinePlugin);

        const myBarChart = new Chart(ctx, {
          type: 'bar',
          data: data,
          options: options
        });
      });
    </script>
  </body>
</html>
`;

  let enc = encodeURIComponent(ht);
  let uri = `data:text/html;charset=utf-8,${enc}`;
  return uri; 
}
