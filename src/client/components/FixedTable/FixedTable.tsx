import React, { useState } from 'react'
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
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  return (
    <table className="fixed-table">
      <FixedTableHead />
      <FixedTableBody
        value={value}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        hoveredItem={hoveredItem}
        handleMouseEnterRow={handleMouseEnterRow}
        handleMouseLeaveRow={handleMouseLeaveRow}
      />
    </table>
  )
}

export default FixedTable
