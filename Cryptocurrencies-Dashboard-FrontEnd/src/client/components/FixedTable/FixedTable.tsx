import React from 'react'

import FixedTableHead from '../FixedTableHead/FixedTableHead'
import FixedTableBody from '../FixedTableBody/FixedTableBody'
import type { CoinData } from '../../../App'

import './FixedTable.css'

interface FixedTableProps {
  value: CoinData[]
  hoveredItem: number | null
  handleMouseEnterRow: (index: number) => void
  handleMouseLeaveRow: () => void
}

const FixedTable: React.FC<FixedTableProps> = ({
  value,
  hoveredItem,
  handleMouseEnterRow,
  handleMouseLeaveRow
}) => {
  return (
    <table className="fixed-table">
      <FixedTableHead />
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
