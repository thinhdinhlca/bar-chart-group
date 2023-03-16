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
  </head>
  <body>
    <canvas id="myRadarChart" width="${width}%" height="${height}px"></canvas>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        const ctx = document.getElementById('myRadarChart').getContext('2d');
        
        const data = {
          labels: [
            'Sprit & Higher Self',
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
              backgroundColor: 'rgba(0, 150, 136, 0.2)',
              borderColor: '#009688',
              borderWidth: 2
            },
            {
              label: 'Opportunity for Expansion',
              data: [50, 50, 50, 50, 50, 50, 50, 50],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
                color: 'white',
              },
              ticks: {
                color: 'white',
                backdropColor: 'transparent',
                min: 0,
                max: 50,
                stepSize: 50
              },
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'white',
              },
            },
            title: {
              display: true,
              text: 'The Ayo Index - Self Assessment',
              color: 'white',
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
