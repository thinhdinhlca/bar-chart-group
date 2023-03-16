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
            'Inner & Outer Self',
            'Home & Family',
            'Community',
            'World',
            'Spirit & Higher Self',
            'Beliefs & Practices',
            'Nature & Environment',
            'Wealth Work & Study'
          ],
          datasets: [
            {
              label: 'My Data',
              data: [${data}],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2
            }
          ]
        };
        
        const options = {
          scales: {
            r: {
              beginAtZero: true
            }
          }
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
