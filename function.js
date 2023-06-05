window.function = function (data, width, height, barNames, threshold) {
  // data
  data = data.value ?? "";
  width = width.value ?? 100;
  height = height.value ?? 500;
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
        width: ${width}%;
        height: ${height}px;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <canvas id="myBarChart" width="${width}%" height="${height}px"></canvas>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        const ctx = document.getElementById('myBarChart').getContext('2d');
        const textColor = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'white' : 'black';

        const data = {
          labels: ${JSON.stringify(barNameArray)},
          datasets: [
            {
              label: "Data",
              data: [${data}],
              backgroundColor: '#4622B0',
              borderColor: '#4622B0',
              borderWidth: 1,
              barThickness: 50
            },
            {
              type: 'line',
              label: 'Threshold',
              data: Array(${data.split(',').length}).fill(${threshold}),
              backgroundColor: '#8B0000',
              borderColor: '#8B0000',
              borderWidth: 4,
              fill: false,
              pointRadius: 0
            }
          ]
        };

        const options = {
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0)'
              },
              ticks: {
                color: textColor,
                backdropColor: 'transparent',
                min: 0
              },
            }
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: false
            },
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
`

  let enc = encodeURIComponent(ht);
  let uri = `data:text/html;charset=utf-8,${enc}`
  return uri; 
}
