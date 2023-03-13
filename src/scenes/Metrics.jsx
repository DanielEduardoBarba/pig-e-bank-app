import { useEffect } from "react";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import "./Metrics.css"
export default function Metrics(){

    useEffect(()=>{

        const sdk = new ChartsEmbedSDK({
          baseUrl: 'https://charts.mongodb.com/charts-daniel-barba-dnkzv',
        });
        
        // embed a chart
        const chart1 = sdk.createChart({
          chartId: '640d599e-554b-4d3e-8905-0508f96da2c8',
        });
        const chart2 = sdk.createChart({
          chartId: '640d6762-9d2d-48e0-8dd4-02e6c383cdd1',
        });

        chart1
          .render(document.getElementById('chart1'))
          .catch(() => window.alert('Chart failed to initialize'));
        chart2
          .render(document.getElementById('chart2'))
          .catch(() => window.alert('Chart failed to initialize'));
        
        // refresh the chart whenever #refreshButton is clicked
        // document
        //   .getElementById('refreshButton')
        //   .addEventListener('click', () => chart.refresh());
        
       // embed a dashboard
    //     const dashboard = sdk.createDashboard({
    //       dashboardId: '640d4850-0743-48af-8717-cef57dcf27c1',
    //     });
        
    //    // render the chart into a container
    //     dashboard
    //       .render(document.getElementById('dashboard'))
    //       .catch(() => window.alert('Dashboard failed to initialize'));
          
        },[])

    return(
        <>
        <div className="Metrics">
          
          <div style={{height:"500px", margin:"20px"}}id="chart1"/>
          <div style={{height:"400px",  margin:"20px"}}id="chart2"/>
        </div>
        {/* <button style={{height:"20px"}}id="refreshButton">Refresh</button> */}
        {/* <div style={{height:"200px"}} id="dashboard"/> */}
        </>
    )
}