import { useMemo } from 'react'

const XAXIS_RANGE = 60000;
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