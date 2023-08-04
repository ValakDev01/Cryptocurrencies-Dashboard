import React from 'react'

interface FixedTableHeadProps {
  headers: string[]
}

const FixedTableHead: React.FC<FixedTableHeadProps> = ({
  headers
}) => {
  const filteredHeaders = headers.filter((header, index) => index < 3)

  return (
    <thead>
      <tr>
        {
          filteredHeaders.map((header, index) => (
            <th key={index} style={{ textAlign: index > 0 ? 'left' : 'center' }}>
              {header}
            </th>
          ))
        }
      </tr>
    </thead>
  )
}

export default FixedTableHead
