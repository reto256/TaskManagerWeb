import { useState } from 'react'
import { useEffect } from 'react'
function App() {
  const [cpuData, setCpuData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/cpus");
        const data = await response.json();
        setCpuData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>CPU Usage</h1>
      {cpuData ? (
        <div>
          <p>User: {cpuData.user}</p>
          <p>Sys: {cpuData.sys}</p>
          <p>Idle: {cpuData.idle}</p>
          <p>IRQ: {cpuData.irq}</p>
          <p>Total Memory: {cpuData.totalmem}</p>
          <p>Free Memory: {cpuData.freemem}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;