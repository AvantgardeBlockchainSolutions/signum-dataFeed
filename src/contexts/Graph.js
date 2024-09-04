import React, { useState, createContext, useEffect } from 'react'
import { decodingMiddleware, fetchNewReports } from '../utils/helpers'

export const GraphContext = createContext()

const Graph = ({ children }) => {
  const [allGraphData, setAllGraphData] = useState(null)
  const [decodedData, setDecodedData] = useState(null)

  useEffect(() => {
    const interval = window.setInterval(async () => {
      const newReports = await fetchNewReports()
      setAllGraphData(newReports)
    }, 5000)

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
