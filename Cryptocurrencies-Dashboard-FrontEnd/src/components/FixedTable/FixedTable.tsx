import React from 'react'

import FixedTableHead from '../FixedTableHead/FixedTableHead'
import FixedTableBody from '../FixedTableBody/FixedTableBody'
import type { CoinData } from '../Dashboard/Dashboard' 

import './FixedTable.css'

interface FixedTableProps {
  value: CoinData[]
  hoveredItem: number | null
  handleMouseEnterRow: (index: number) => void
  handleMouseLeaveRow: () => void
  headers: string[]
}

const FixedTable: React.FC<FixedTableProps> = ({
  value,
  hoveredItem,
  handleMouseEnterRow,
  handleMouseLeaveRow,
  headers
}) => {
  return (
    <table className="fixed-table">
      <FixedTableHead
        headers={headers}
      />
      <FixedTableBody
        value={value}
        hoveredItem={hoveredItem}
        handleMouseEnterRow={handleMouseEnterRow}
        handleMouseLeaveRow={handleMouseLeaveRow}
      />
    </table>
  )
}

export default FixedTable
