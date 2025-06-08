import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import "./App.css";

function App() {
  const [cpuData, setCpuData] = useState(null);
  const [data, setData] = useState([]);
  const chartId = "realtime";
  const XAXIS_RANGE = 60000;

  const lastDateRef = useRef(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/cpus");
        const json = await response.json();
        setCpuData(json);

        const now = Date.now();
        const newPoint = { x: now, y: json.cpuPercentage };
        setData(prev => {
          const updated = [...prev, newPoint].filter(p => p.x >= now - XAXIS_RANGE);
          return updated;
        });

        lastDateRef.current = now;
      } catch (err) {
        console.error("API fetch error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      ApexCharts.exec(chartId, "updateSeries", [{
        data: data
      }], true);
    }
  }, [data]);

  const options = {
    chart: {
      id: chartId,
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'straight' },
    fill: { type: 'solid', opacity: 0.1 },
    title: {
      text: 'Real-Time CPU Usage',
      align: 'left'
    },
    markers: { size: 0 },
    xaxis: {
      type: 'datetime',
      range: XAXIS_RANGE
    },
    yaxis: { max: 100 },
    legend: { show: false }
  };

  return (
    <div>
      <h1>TaskManager on Web</h1>
      <title></title>
      <div id="chart" className='cpuusagechart'>
        <ReactApexChart options={options} series={[{ name: 'CPU Usage', data }]} type="line" height={350} />
      </div>

      {cpuData ? (
        <>
          <div>
            <p className="cpu">User : {cpuData.user}%</p>
            <p className="cpu">Sys : {cpuData.sys}%</p>
            <p className="cpu">Idle : {cpuData.idle}%</p>
            <p className="cpu">Irq : {cpuData.irq}%</p>
          </div>
          <div>
            <p className="mem">Use memory : {cpuData.usemem}% ({cpuData.usememMB}MB)</p>
            <p className="mem">Free memory : {cpuData.freememPercentage}% ({cpuData.freememMB}MB)</p>
            <p className="mem">Total Memory : {cpuData.totalmemMB}MB</p>
          </div>
        </>
      ) : (
        <p className="main">Now Loading...</p>
      )}
    </div>
  );
}

export default App;