import React from 'react'

import ScrollableTableHead from '../ScrollableTableHead/ScrollableTableHead'
import ScrollableTableBody from '../ScrollableTableBody/ScrollableTableBody'
import type { CoinData } from '../Dashboard/Dashboard' 

import './ScrollableTable.css'

interface ScrollableTableProps {
  value: CoinData[]
  hoveredItem: number | null
  handleMouseEnterRow: (index: number) => void
  handleMouseLeaveRow: () => void
  handleHideCurrency: (index: string) => void
  headers: string[]
}

const ScrollableTable: React.FC<ScrollableTableProps> = ({
  value,
  hoveredItem,
  handleMouseEnterRow,
  handleMouseLeaveRow,
  handleHideCurrency,
  headers
}) => {
  return (
    <div className="scrollable-table">
      <table className="fontWeight">
        <ScrollableTableHead
          headers={headers}
        />
        <ScrollableTableBody
          value={value}
          hoveredItem={hoveredItem}
          handleMouseEnterRow={handleMouseEnterRow}
          handleMouseLeaveRow={handleMouseLeaveRow}
          handleHideCurrency={handleHideCurrency}
        />
      </table>
    </div>
  )
}

export default ScrollableTable
