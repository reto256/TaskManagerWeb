import React, { useState, useEffect, useRef, useMemo } from 'react';
import Chart from 'react-apexcharts';
import "./App.css";

function App() {
    const [cpuData, setCpuData] = useState(null);
    const [series, setSeries] = useState([{ name: "CPU Usage", data: [] }]);
    const XAXIS_RANGE = 60000;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8080/cpus");
            const data = await response.json();
            setCpuData(data);

            const now = Date.now();
            const newPoint = { x: now, y: data.cpuPercentage };

            setSeries(prev => {
                const newData = [...prev[0].data, newPoint];
                const filtered = newData.filter(p => p.x >= now - XAXIS_RANGE);
                return [{ name: "CPU Usage", data: filtered }];
            });
        };

        fetchData();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);

    const options = useMemo(() => ({
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
            curve: 'straight'
        },
        fill: {
            type: 'solid',
            opacity: 0.3
        },
        title: {
            text: 'Real-Time CPU Usage',
            align: 'left'
        },
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime',
            range: XAXIS_RANGE
        },
        yaxis: {
            max: 100
        },
        legend: {
            show: false
        }
    }), []);

    return (
        <div>
            <h1>TaskManager on Web</h1>
            {cpuData ? (
                <>
                    <div style={{ marginTop: "40px" }}>
                        <Chart
                            options={options}
                            series={series}
                            type="line"
                            height={350}
                        />
                    </div>
                    <div>
                        <p className='cpu'>User : {cpuData.user}%</p>
                        <p className='cpu'>Sys : {cpuData.sys}%</p>
                        <p className='cpu'>Idle : {cpuData.idle}%</p>
                        <p className='cpu'>Irq : {cpuData.irq}%</p>
                    </div>
                    <div className="mem">
                        <p className='usemem'>Use memory : {cpuData.usemem}% ({cpuData.usememMB}MB)</p>
                        <p className='freemem'>Free memory : {cpuData.freememPercentage}% ({cpuData.freememMB}MB)</p>
                        <p className='totalmem'>Total Memory : {cpuData.totalmemMB}MB</p>
                    </div>
                </>
            ) : (
                <p className="main">Now Loading...</p>
            )}
        </div>
    );
}

export default App;