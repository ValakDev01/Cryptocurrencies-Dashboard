import React from 'react'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'

import ThreeDotsMenu from '../ThreeDotsMenu/ThreeDotsMenu'
import type { CoinData } from '../../../App'

interface ScrollableTableBodyProps {
  value: CoinData[]
  hoveredItem: number | null
  handleMouseEnterRow: (index: number) => void
  handleMouseLeaveRow: () => void
  handleHideCurrency: (index: string) => void
}

const ScrollableTableBody: React.FC<ScrollableTableBodyProps> = ({
  value,
  hoveredItem,
  handleMouseEnterRow,
  handleMouseLeaveRow,
  handleHideCurrency
}) => {
  const formatNumber = (value: number): string => {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const getPercentChangeColor = (value: number): string => {
    if (value <= 0) {
      return 'red'
    } else if (value > 0) {
      return '#16C784'
    }
    return ''
  }

  return (
    <tbody>
      {value?.map((item: CoinData, index: number) => {
        const chartUrl = `https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${item.id}.svg`
        const isHovered = index === hoveredItem

        const formattedPrice = formatNumber(item.quote.USD.price)
        const formattedPercentChange1h = Number(
          item.quote.USD.percent_change_1h.toFixed(2)
        )
        const formattedPercentChange24h = Number(
          item.quote.USD.percent_change_24h.toFixed(2)
        )
        const formattedPercentChange7d = Number(
          item.quote.USD.percent_change_7d.toFixed(2)
        )
        const formattedMarketCap = formatNumber(item.quote.USD.market_cap)
        const formattedVolume24h = formatNumber(item.quote.USD.volume_24h)
        const formattedTotalSupply = formatNumber(item.total_supply)

        const percentChangeColor1h = getPercentChangeColor(
          formattedPercentChange1h
        )
        const percentChangeColor24h = getPercentChangeColor(
          formattedPercentChange24h
        )
        const percentChangeColor7d = getPercentChangeColor(
          formattedPercentChange7d
        )

        return (
          <tr
            key={item.id}
            className={isHovered ? 'hovered-row' : ''}
            onMouseEnter={() => {
              handleMouseEnterRow(index)
            }}
            onMouseLeave={handleMouseLeaveRow}
          >
            <td style={{ textAlign: 'right' }}>{`$${formattedPrice}`}</td>
            <td style={{ color: percentChangeColor1h, textAlign: 'right' }}>
              {formattedPercentChange1h <= 0
                ? (
                <>
                  <GoTriangleDown />
                  {`${Math.abs(formattedPercentChange1h)}%`}
                </>
                  )
                : (
                <>
                  <GoTriangleUp />
                  {`${Math.abs(formattedPercentChange1h)}%`}
                </>
                  )}
            </td>
            <td style={{ color: percentChangeColor24h, textAlign: 'right' }}>
              {formattedPercentChange24h <= 0
                ? (
                <>
                  <GoTriangleDown />
                  {`${Math.abs(formattedPercentChange24h)}%`}
                </>
                  )
                : (
                <>
                  <GoTriangleUp />
                  {`${Math.abs(formattedPercentChange24h)}%`}
                </>
                  )}
            </td>
            <td style={{ color: percentChangeColor7d, textAlign: 'right' }}>
              {formattedPercentChange7d <= 0
                ? (
                <>
                  <GoTriangleDown />
                  {`${Math.abs(formattedPercentChange7d)}%`}
                </>
                  )
                : (
                <>
                  <GoTriangleUp />
                  {`${Math.abs(formattedPercentChange7d)}%`}
                </>
                  )}
            </td>
            <td style={{ textAlign: 'right' }}>{`$${formattedMarketCap}`}</td>
            <td style={{ textAlign: 'right' }}>{`$${formattedVolume24h}`}</td>
            <td style={{ textAlign: 'right' }}>{`${formattedTotalSupply}`}</td>
            <td style={{ textAlign: 'right' }}>
              <img
                src={chartUrl}
                alt=""
                style={{
                  filter:
                    formattedPercentChange7d <= 0
                      ? 'brightness(60%) saturate(150%) hue-rotate(300deg)'
                      : 'brightness(70%) saturate(150%) hue-rotate(70deg)'
                }}
              />
            </td>
            <td>
              <ThreeDotsMenu
                isHovered={isHovered}
                handleHideCurrency={handleHideCurrency}
                itemId={item.id}
              />
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}

export default ScrollableTableBody
