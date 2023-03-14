import { useEffect } from "react";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import "./Metrics.css"

export default function Metrics() {

  useEffect(() => {

    const sdk = new ChartsEmbedSDK({
      baseUrl: 'https://charts.mongodb.com/charts-daniel-barba-dnkzv',
    })

    // embed a chart
    const chart1 = sdk.createChart({
      chartId: '640d599e-554b-4d3e-8905-0508f96da2c8',
    })

    const chart2 = sdk.createChart({
      chartId: '640d6762-9d2d-48e0-8dd4-02e6c383cdd1',
    })

    chart1
      .render(document.getElementById('chart1'))
      .catch(() => window.alert('Chart failed to initialize'))

    chart2
      .render(document.getElementById('chart2'))
      .catch(() => window.alert('Chart failed to initialize'))


  }, [])

  return (
    <>
      <div className="Metrics">

        <div style={{ height: "500px", margin: "20px" }} id="chart1" />
        <div style={{ height: "400px", margin: "20px" }} id="chart2" />
      </div>

    </>
  )
}