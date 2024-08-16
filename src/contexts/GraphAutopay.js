import React, { useState, createContext, useEffect } from 'react'
import { decodingAutopayMiddleware, sortDataByProperty } from '../utils/helpers'
//Sort

export const GraphAutopayContext = createContext()

const GraphAutopay = ({ children }) => {
  //Component State
  const [decodedData, setDecodedData] = useState([])
  const [allGraphData, setAllGraphData] = useState(null)

  useEffect(() => {
    const fetchNewReports = async () => {
      try {
        const res = await fetch(`https://pug-proud-allegedly.ngrok-free.app/tip-added`,{
          headers: new Headers({"ngrok-skip-browser-warning": "69420",
          }),})
        const data = await res.json()

        const sorted = sortDataByProperty(
          '_startTime',
          data.map((event) => {
            const updatedEvent = Object.assign({}, event, {
              chain: 'Pulsechain',
            })
            updatedEvent.txnLink = `https://scan.9mm.pro/tx/${event.txnHash}`
            return updatedEvent
          })
        )

        setAllGraphData(sorted)
      } catch (e) {
        console.log(e)
      }
    }
    const interval = window.setInterval(fetchNewReports, 5000)

    return () => {
      setAllGraphData(null)
      window.clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (!allGraphData) return
    setDecodedData(decodingAutopayMiddleware(allGraphData))
    return () => {
      setDecodedData(null)
    }
  }, [allGraphData])

  const GraphContextObj = {
    decodedData: decodedData,
  }

  return (
    <GraphAutopayContext.Provider value={GraphContextObj}>
      {children}
    </GraphAutopayContext.Provider>
  )
}

export default GraphAutopay
