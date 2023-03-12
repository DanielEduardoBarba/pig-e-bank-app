import { useEffect } from "react";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

export default function Metrics(){

    useEffect(()=>{

        const sdk = new ChartsEmbedSDK({
          baseUrl: 'https://charts.mongodb.com/charts-daniel-barba-dnkzv',
        });
        
        // embed a chart
        const chart = sdk.createChart({
          chartId: '640d599e-554b-4d3e-8905-0508f96da2c8',
        });
        
        // render the chart into a container
        chart
          .render(document.getElementById('chart'))
          .catch(() => window.alert('Chart failed to initialise'));
        
        // refresh the chart whenever #refreshButton is clicked
        document
          .getElementById('refreshButton')
          .addEventListener('click', () => chart.refresh());
        
       // embed a dashboard
    //     const dashboard = sdk.createDashboard({
    //       dashboardId: '640d4850-0743-48af-8717-cef57dcf27c1',
    //     });
        
    //    // render the chart into a container
    //     dashboard
    //       .render(document.getElementById('dashboard'))
    //       .catch(() => window.alert('Dashboard failed to initialise'));
          
        },[])

    return(
        <>
          <div style={{height:"500px"}}id="chart"/>
        <button style={{height:"20px"}}id="refreshButton">Refresh</button>
        {/* <div style={{height:"200px"}} id="dashboard"/> */}
        </>
    )
}