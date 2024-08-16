import React, { useState, createContext, useEffect } from 'react'
import { decodingMiddleware, sortDataByProperty } from '../utils/helpers'

export const GraphContext = createContext()

const Graph = ({ children }) => {
  const [allGraphData, setAllGraphData] = useState(null)
  const [decodedData, setDecodedData] = useState(null)

  useEffect(() => {
    const fetchNewReports = async () => {
      try {
        const res = await fetch(`http://localhost:3001/new-report`)
        const data = await res.json()

        const sorted = sortDataByProperty(
          '_time',
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

  //Graph Querying every 5 seconds

  useEffect(() => {
    if (!allGraphData) return
    setDecodedData(decodingMiddleware(allGraphData))

    return () => {
      setDecodedData(null)
    }
  }, [allGraphData])

  const GraphContextObj = {
    decodedData: decodedData,
  }

  return (
    <GraphContext.Provider value={GraphContextObj}>
      {children}
    </GraphContext.Provider>
  )
}

export default Graph
