import React from 'react'

const FixedTableHead: React.FC = () => {
    const headers: string[] = ['', '#', 'Name'];

    return (
        <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index} style={{ textAlign: index > 0 ? 'left' : 'center' }}>
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default FixedTableHead;