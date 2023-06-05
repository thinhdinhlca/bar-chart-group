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
        width: ${width};
        height: ${height};
        margin: 0;
      }
      #myBarChart {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <canvas id="myBarChart"></canvas>
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
            },
            {
              type: 'line',
              label: 'Threshold: ${threshold}%',
              data: Array(${data.split(',').length}).fill(${threshold}),
              backgroundColor: '#8B0000',
              borderColor: '#8B0000',
              borderWidth: 4,
              fill: false,
              pointRadius: 0
            },
            {
              type: 'line',
              label: 'Threshold: ${threshold}%',
              data: Array(${data.split(',').length}).fill(${threshold}),
              pointRadius: 0,
              fill: false,
              borderWidth: 0
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
  let uri = `data:text/html;charset=utf-8,${enc}`
  return uri; 
}
