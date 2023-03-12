import { useEffect } from "react";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

export default function Metrics(){

    useEffect(()=>{

        const sdk = new ChartsEmbedSDK({
          baseUrl: 'https://charts.mongodb.com/charts-charts-fixture-tenant-zdvkh',
        });
        
        // embed a chart
        const chart = sdk.createChart({
          chartId: '48043c78-f1d9-42ab-a2e1-f2d3c088f864',
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
        // const dashboard = sdk.createDashboard({
        //   dashboardId: '61d02578-6148-4c87-9cad-1fbaef50a0d3',
        // });
        
        // render the chart into a container
        // dashboard
        //   .render(document.getElementById('dashboard'))
        //   .catch(() => window.alert('Dashboard failed to initialise'));
          
        },[])

    return(
        <>
          <div style={{height:"200px"}}id="chart"/>
        <div style={{height:"200px"}} id="dashboard"/>
        <div style={{height:"200px"}}id="refreshButton"/>
        </>
    )
}