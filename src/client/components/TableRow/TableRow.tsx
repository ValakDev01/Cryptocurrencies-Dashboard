import React from 'react'
import { FaRegStar } from 'react-icons/fa'
import type { CoinData } from '../../../App'
import './TableRow.css'

interface TableRowProps {
  isHovered: boolean
  isSelectedStar: boolean
  logoUrl: string
  item: CoinData
  index: number
  handleMouseEnterRow: (index: number) => void
  handleMouseLeaveRow: () => void
  setSelectedItem: React.Dispatch<React.SetStateAction<number | null>>
}

const TableRow: React.FC<TableRowProps> = ({
  isHovered,
  isSelectedStar,
  logoUrl,
  item,
  index,
  handleMouseEnterRow,
  handleMouseLeaveRow,
  setSelectedItem
}) => {
  return (
    <tr
      className={isHovered ? 'hovered-row' : ''}
      onMouseEnter={() => { handleMouseEnterRow(index) }}
      onMouseLeave={handleMouseLeaveRow}
    >
      <td className="firstTd">
        <FaRegStar
          style={{ color: isSelectedStar ? 'gold' : 'gray', cursor: 'pointer' }}
          onMouseEnter={() => { setSelectedItem(index) }}
          onMouseLeave={() => { setSelectedItem(null) }}
        />

        {isSelectedStar && (
          <div className="notificationStar">
            <div className="triangle"></div>
            <div className="content">Add to Main Watchlist and follow coin</div>
          </div>
        )}
      </td>
      <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>
        {index + 1}
      </td>
      <td style={{ textAlign: 'left' }}>
        <div className="divData">
          <img src={logoUrl} alt='' className="imgStyle" />
            <span className="firstSpan">
              {item.name}
            </span>
            <span className="secondSpan">
              {item.symbol}
            </span>
        </div>
      </td>
    </tr>
  )
}

export default TableRow
