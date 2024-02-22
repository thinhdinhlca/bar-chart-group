window.function = function (data, width, height, barNames, threshold) {
  // data
  data = data.value ?? "";
  width = width.value ?? "100vw";  // use viewport width units
  height = height.value ?? "500px"; // use pixel units
  barNames = barNames.value ?? ""; // bar names should be comma-separated
  threshold = threshold.value ?? ""; // Updated to accept comma-separated values

  // convert barNames string to array
  let barNameArray = barNames.split(',');

  // Convert threshold string to array of numbers
  let thresholdArray = threshold.split(',').map(val => parseFloat(val));

  let ht = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bar Chart with Chart.js</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation"></script>
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
              label: "Total Payout",
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
                color: textColor // Adjusted for theme
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)' // Slight adjustment for visibility
              },
            }
          },
          plugins: {
            annotation: {
              annotations: ${thresholdArray.map((threshold, index) => `{
                type: 'line',
                yMin: ${threshold},
                yMax: ${threshold},
                borderColor: 'rgba(139, 0, 0, ${(index + 1) / thresholdArray.length})', // Gradual color change
                borderWidth: 2,
                label: {
                  enabled: true,
                  content: 'Threshold ${index + 1}: ${threshold}',
                  position: 'start',
                  yAdjust: -15,
                  backgroundColor: 'rgba(255, 0, 0, 0.3)'
                }
              }`).join(',')}
            },
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (context.parsed.y !== null) {
                    label += ': $' + context.parsed.y;
                  }
                  return label;
                }
              }
            }
          }
        };

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
