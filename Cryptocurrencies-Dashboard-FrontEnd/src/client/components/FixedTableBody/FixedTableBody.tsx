import React, { useState } from 'react'

import TableRow from '../TableRow/TableRow'
import type { CoinData } from '../../../App'

interface FixedTableBodyProps {
  value: CoinData[]
  hoveredItem: number | null
  handleMouseEnterRow: (index: number) => void
  handleMouseLeaveRow: () => void
}

const FixedTableBody: React.FC<FixedTableBodyProps> = ({
  value,
  hoveredItem,
  handleMouseEnterRow,
  handleMouseLeaveRow
}) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  return (
    <tbody>
      {value?.map((item: CoinData, index: number) => {
        const logoUrl = `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`
        const isHovered = index === hoveredItem
        const isSelectedStar = index === selectedItem

        return (
          <TableRow
            key={item.id}
            isHovered={isHovered}
            isSelectedStar={isSelectedStar}
            logoUrl={logoUrl}
            item={item}
            index={index}
            handleMouseEnterRow={handleMouseEnterRow}
            handleMouseLeaveRow={handleMouseLeaveRow}
            setSelectedItem={setSelectedItem}
          />
        )
      })}
    </tbody>
  )
}

export default FixedTableBody
