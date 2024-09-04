import React, { useContext, useEffect, useState } from 'react'
import '../styles/AllFeeds.css'
import Table from './Table'
//Context
import { GraphContext } from '../contexts/Graph'
import { ModeContext } from '../contexts/Mode'
//Components
import LinearIndeterminate from './LinearIndeterminate'

function AllFeeds() {
  //Component State
  const [clippedData, setClippedData] = useState([])
  const [loadMoreClicks, setLoadMoreClicks] = useState(1)
  const [viewing, setViewing] = useState(null)
  const [loadMoreButton, setLoadMoreButton] = useState(true)
  const [filtering, setFiltering] = useState(false)

  //Context State
  const graphData = useContext(GraphContext)
  const mode = useContext(ModeContext)
  
  useEffect(() => {
    if (!graphData.decodedData) return
    const newData = graphData.decodedData.slice(0, 50)
    setClippedData((prevData) => {
      if (JSON.stringify(newData) !== JSON.stringify(prevData)) {
        return [...prevData, ...newData]
      }
      return prevData
    })
  }, [graphData.decodedData])

  useEffect(() => {
    if (!clippedData) return
    setViewing(clippedData.slice(0, Math.min(6 * loadMoreClicks, clippedData.length) ))

    return () => {
      setViewing(null)
    }
  }, [clippedData, loadMoreClicks]) //eslint-disable-line

  const handleLoadMore = () => {
    if (!loadMoreButton) return // If the button is disabled, do nothing

    const newLoadMoreClicks = loadMoreClicks + 1
    setLoadMoreClicks(newLoadMoreClicks) // Increment the number of times the button has been clicked

    const totalItems = clippedData.length // Total items available
    const newLoadAmount = 6 * newLoadMoreClicks // Calculate new amount of items to display

    if (newLoadAmount >= totalItems) {
      setLoadMoreButton(false) // Disable the "load more" button as all items are now displayed
    }
  }

  //console.log({ loadMoreButton, filtering, clippedDataLength: clippedData.length, viewingLength: viewing?.length });

  return (
    <>
      {graphData && graphData.decodedData ? (
        <div className="AllFeedsView">
          <Table
            data={viewing}
            allData={graphData}
            setFiltering={setFiltering}
          />
          <button
            className={
              mode.mode === 'dark' ? 'AllFeeds__Button' : 'AllFeeds__ButtonDark'
            }
            onClick={handleLoadMore}
            style={{
              cursor: loadMoreButton ? 'pointer' : 'not-allowed',
              display: 'flex', // Temporarily ignore the filtering condition
            }}
          >
            load more
          </button>
        </div>
      ) : (
        <div className="Loading">
          <LinearIndeterminate />
        </div>
      )}
    </>
  )
}

export default AllFeeds
