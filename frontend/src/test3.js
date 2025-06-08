const ApexChart = () => {
        const [state, setState] = React.useState({
          
            series: [{
              data: data.slice()
            }],
            options: {
              chart: {
                id: 'realtime',
                height: 350,
                type: 'line',
                animations: {
                  enabled: true,
                  easing: 'linear',
                  dynamicAnimation: {
                    speed: 1000
                  }
                },
                toolbar: {
                  show: false
                },
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              title: {
                text: 'Dynamic Updating Chart',
                align: 'left'
              },
              markers: {
                size: 0
              },
              xaxis: {
                type: 'datetime',
                range: XAXISRANGE,
              },
              yaxis: {
                max: 100
              },
              legend: {
                show: false
              },
            },
          
          
        });

        
          React.useEffect(() => {
          window.setInterval(() => {
            getNewSeries(lastDate, {
              min: 10,
              max: 90
            })
            
            ApexCharts.exec('realtime', 'updateSeries', [{
              data: data
            }])
          }, 1000)
        }, [])
        

        return (
          <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
              </div>
            <div id="html-dist"></div>
          </div>
        );
      }

      const domContainer = document.querySelector('#app');
      ReactDOM.render(<ApexChart />, domContainer);
    