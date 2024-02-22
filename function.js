window.function = function (data, width, height, barNames, thresholds) {
  // data
  data = data.value ?? "";
  width = width.value ?? "100vw";  // use viewport width units
  height = height.value ?? "500px"; // use pixel units
  barNames = barNames.value ?? ""; // bar names should be comma-separated
  thresholds = thresholds.value ? thresholds.value.split(',').map(Number) : []; // thresholds should be comma-separated and converted to numbers

  // convert barNames string to array
  let barNameArray = barNames.split(',');

  // convert data string to array and map to numbers
  let dataArray = data.split(',').map(Number);

  let ht = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Bar and Line Chart with Chart.js</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
      #myChart {
        background-color: white;
      }
    </style>
  </head>
  <body>
    <canvas id="myChart" style="width: ${width}; height: ${height};"></canvas>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        const ctx = document.getElementById('myChart').getContext('2d');
        const data = {
          labels: ${JSON.stringify(barNameArray)},
          datasets: [
            {
              type: 'bar',
              label: "Enrolled Debt",
              data: ${JSON.stringify(dataArray)},
              backgroundColor: '#27AAE1',
              borderColor: '#27AAE1',
              borderRadius: 10,
              borderWidth: 1,
              barThickness: 20
            },
            {
              type: 'line',
              label: 'Goal',
              data: ${JSON.stringify(thresholds)},
              borderColor: 'red',
              borderWidth: 2,
              fill: false,
              pointRadius: 0,
              spanGaps: true
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
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label === 'Goal') {
                    return label + ': $' + context.parsed.y.toLocaleString(); // format tooltip for the goal line
                  }
                  if (context.parsed.y !== null) {
                    label += ': $' + context.parsed.y.toLocaleString(); // format tooltip with dollar sign for the bars
                  }
                  return label;
                }
              }
            }
          }
        };

        const myChart = new Chart(ctx, {
          type: 'bar', // this is still a bar chart, but it can contain line datasets
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
