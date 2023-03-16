window.function = function (data, width, height) {

  // data
  data = data.value ?? "";
  width = width.value ?? 100;
  height = height.value ?? 500;
 
  let ht = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Radar Chart with Chart.js</title>
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
    <canvas id="myRadarChart" width="${width}%" height="${height}px"></canvas>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        const ctx = document.getElementById('myRadarChart').getContext('2d');
        const textColor = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'white' : 'black';
        const pointLabelFontSize = window.innerWidth <= 768 ? 12 : 13;
        
        // Custom plugin for compass background
        const compassBackgroundPlugin = {
          id: 'compassBackground',
          beforeDraw: (chart, args, options) => {
            const ctx = chart.ctx;
            const chartArea = chart.chartArea;

            // Load the compass image
            const compassImage = new Image();
            compassImage.src = 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/aENRxeswEVB4n6nwflYA/pub/oLJoyuL8qQZ67B4y2AjO.png'; // Set the image source URL

            // Draw the compass image on the canvas
            compassImage.onload = () => {
              const imageWidth = chartArea.right - chartArea.left;
              const imageHeight = chartArea.bottom - chartArea.top;
              const imageX = chartArea.left;
              const imageY = chartArea.top;

              ctx.drawImage(compassImage, imageX, imageY, imageWidth, imageHeight);
            };
          },
        };

        // Register the custom plugin with Chart.js
        Chart.register(compassBackgroundPlugin);

        const data = {
          labels: [
            'Spirit & Higher Self',
            'Home & Family',
            'Inner & Outer Self',
            'Wealth, Work & Study',
            'Nature & Environment',
            'Community',
            'World',
            'Beliefs & Practices'
          ],
          datasets: [
            {
              label: "Today's Touchpoint",
              data: [${data}],
              backgroundColor: 'rgba(255, 215, 0, 0)',
              borderColor: '#FFD700',
              borderWidth: 2
            },
            {
              label: 'Opportunity for Expansion',
              data: [50, 50, 50, 50, 50, 50, 50, 50],
              backgroundColor: 'rgba(75, 192, 192, 0)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2
            }
          ]
        };

        const options = {
          scales: {
            r: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0)',
                circular: true
              },
              pointLabels: {
                color: textColor,
                font: {
                  size: pointLabelFontSize
                },
              padding: 15
              },
              ticks: {
                color: textColor,
                backdropColor: 'transparent',
                min: 0,
                max: 50,
                display: false
              },
            }
          },
          plugins: {
            compassBackground: true,
            legend: {
              labels: {
                color: textColor,
              },
            },
            title: {
              display: true,
              text: 'The Ayo Index - Self Assessment',
              color: textColor,
              font: {
                size: 24,
              },
            },
          },
          backgroundColor: 'white'
        };

        const myRadarChart = new Chart(ctx, {
          type: 'radar',
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
