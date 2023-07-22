import React from 'react'

const ScrollableTableHead: React.FC = () => {
  const headers: string[] = ['Price', '1h %', '24h %', '7d %', 'Market Cap', 'Volume(24h)', 'Circulating Supply', 'Last 7 Days', '']

  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index} style={{ textAlign: 'right' }}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default ScrollableTableHead
