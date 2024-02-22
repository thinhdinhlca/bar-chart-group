window.function = function (data, width, height, barNames, thresholds) {
  // data
  data = data.value ?? "";
  width = width.value ?? "100vw";  // use viewport width units
  height = height.value ?? "500px"; // use pixel units
  barNames = barNames.value ?? ""; // bar names should be comma-separated
  thresholds = thresholds.value ? thresholds.value.split(',') : []; // thresholds should be comma-separated

  // convert barNames string to array
  let barNameArray = barNames.split(',');

  // convert data string to array and map to numbers
  let dataArray = data.split(',').map(Number);

  let ht = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Bar Chart with Chart.js</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@1.0.2"></script>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
      #myBarChart {
        background-color: white;
      }
    </style>
  </head>
  <body>
    <canvas id="myBarChart" style="width: ${width}; height: ${height};"></canvas>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        const ctx = document.getElementById('myBarChart').getContext('2d');
        const data = {
          labels: ${JSON.stringify(barNameArray)},
          datasets: [
            {
              label: "Sales Achievement Rate",
              data: ${JSON.stringify(dataArray)},
              backgroundColor: '#4622B0',
              borderColor: '#4622B0',
              borderWidth: 1,
              barThickness: 20
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
                callback: function(value) {
                  return '$' + value.toLocaleString(); // format ticks with dollar sign
                },
                color: '#000000'
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
            }
          },
          plugins: {
            annotation: {
              annotations: thresholds.map((threshold, index) => ({
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: Number(threshold),
                borderColor: 'red',
                borderWidth: 2,
                label: {
                  enabled: false
                }
              }))
            },
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (context.parsed.y !== null) {
                    label += ': $' + context.parsed.y.toLocaleString(); // format tooltip with dollar sign
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
