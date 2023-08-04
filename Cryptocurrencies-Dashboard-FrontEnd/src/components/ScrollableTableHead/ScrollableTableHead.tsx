import React from 'react'

interface ScrollableTableHeadProps {
  headers: string[]
}

const ScrollableTableHead: React.FC<ScrollableTableHeadProps> = ({
  headers
}) => {
  const fixedHeaders = headers.filter((header, index) => index >= 3)

  return (
    <thead>
      <tr>
        {
          fixedHeaders.map((header, index) => (
            <th key={index} style={{ textAlign: 'right' }}>
              {header}
            </th>
          ))
        }
      </tr>
    </thead>
  )
}

export default ScrollableTableHead
