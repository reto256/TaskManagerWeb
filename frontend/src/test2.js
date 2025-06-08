import { useState, useEffect } from 'react'

useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/cpus");
        const data = await response.json();
        setCpuData(data);

        setCpuHistory((prevHistory) => {
            const newHistory = [...prevHistory, { time: new Date().toLocaleTimeString(), usage: data.cpuPercentage }];
            console.log(newHistory)
            return newHistory.length > 67 ? newHistory.slice(1) : newHistory;
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);

}, []);

let options = {
    chart: { // チャートの設定
        height: 380,  //チャートの高さ指定
        type: 'line',  //  チャートの種類を指定
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: true  //ラベルを表示するかどうか
    },
    stroke: {
        curve: 'straight'  // ストロークを直線にするかなめらかにするか
    },
    series: [{
        name: "Usage",  //  チャートのシリーズ名
        data: [7470, 6990, 6165, 5557, 5219, 4945]  //  チャートの各数値
    }],
    title: {
        text: 'CpuUsage Realtime Chart',  //  チャートの名前
        align: 'left'  //  チャートの名前の位置
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    yaxis: {  //  Y軸の設定
        title: {
            text: 'Usage（%）'
        }
    },
    xaxis: {  //  X軸の設定
        categories: ['2020年', '2030年', '2040年', '2050年', '2060年', '2070年'],
    },
}

let chart = new ApexCharts(
    document.querySelector("#line-base"),  //  表示させたいdivのIDを挿入
    options
);

chart.render();