import React, { useState, createContext, useEffect } from 'react'
//The Graph
import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client'
//Utils
import {
  autopayQuery,
  divaPayQuery,
  divaPayAdaptorQuery,
} from '../utils/queries'
import { decodingAutopayMiddleware, sortDataByProperty } from '../utils/helpers'
//Sort

export const GraphAutopayContext = createContext()

//ApolloClients

const clientPulsechain = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/33329/tellor-autopay-amoy-graph/version/latest',
  cache: new InMemoryCache(),
})

const clientAmoy = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/33329/tellor-autopay-amoy-graph/version/latest',
  cache: new InMemoryCache(),
})

const clientMainnet = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/33329/tellor-autopay-ethereum-graph/version/latest',
  cache: new InMemoryCache(),
})

const clientSepolia = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/33329/tellor-autopay-sepolia/v0.0.5',
  cache: new InMemoryCache(),
})

const GraphAutopay = ({ children }) => {
  //Component State
  const [decodedData, setDecodedData] = useState([])
  const [allGraphData, setAllGraphData] = useState(null)

  useEffect(() => {
    const fetchNewReports = async () => {
      try {
        const res = await fetch(`http://localhost:3001/tip-added`)
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
