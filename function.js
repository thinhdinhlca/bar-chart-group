window.function = function (data, width, height, barNames) {
  // data
  data = data.value ?? "";
  width = width.value ?? "100vw";  // use viewport width units
  height = height.value ?? "500px"; // use pixel units
  barNames = barNames.value ?? ""; // bar names should be comma-separated

  // convert barNames string to array
  let barNameArray = barNames.split(',');

  // parse data assuming it's an array of objects
  let parsedData = JSON.parse(data);

  // RGB colors provided
  const rgbColors = [
    'rgb(39, 170, 225)',
    'rgb(115, 166, 173)',
    'rgb(155, 151, 178)',
    'rgb(216, 167, 202)',
    'rgb(199, 184, 234)',
    'rgb(252, 170, 103)',
    'rgb(71, 51, 53)'
  ];

  let datasets = parsedData.map((item, index) => ({
    label: item.label,
    data: item.data,
    backgroundColor: rgbColors[index % rgbColors.length], // Use modulo for color cycling
    borderColor: rgbColors[index % rgbColors.length], // Use modulo for color cycling
    borderWidth: 1
  }));

  let chartHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Grouped Bar Chart with Chart.js</title>
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
            const chartData = {
              labels: ${JSON.stringify(barNameArray)},
              datasets: ${JSON.stringify(datasets)}
            };

            const options = {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              },
              plugins: {
                legend: {
                  display: true
                },
                tooltip: {
                  enabled: true
                }
              }
            };

            const myChart = new Chart(ctx, {
              type: 'bar',
              data: chartData,
              options: options
            });
          });
        </script>
      </body>
    </html>
  `;

  let encodedHtml = encodeURIComponent(chartHtml);
  let uri = `data:text/html;charset=utf-8,${encodedHtml}`;
  return uri;
};
