import React, { useState, createContext, useEffect } from 'react'
import { decodingMiddleware, fetchNewReports } from '../utils/helpers'

export const GraphContext = createContext()

const Graph = ({ children }) => {
  const [allGraphData, setAllGraphData] = useState(null)
  const [decodedData, setDecodedData] = useState(null)
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;
    if (!isPaused) {
      interval = window.setInterval(async () => {
        const newReports = await fetchNewReports()
        setAllGraphData(newReports)
      }, 5000)
    }

    return () => {
      setAllGraphData(null)
      if (interval) window.clearInterval(interval)
    }
  }, [isPaused])

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
    pauseInterval: () => setIsPaused(true)
  }

  return (
    <GraphContext.Provider value={GraphContextObj}>
      {children}
    </GraphContext.Provider>
  )
}

export default Graph
