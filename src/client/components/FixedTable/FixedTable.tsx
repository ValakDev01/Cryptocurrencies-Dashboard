import React from "react";
import { useState } from 'react';
import FixedTableHead from "../FixedTableHead/FixedTableHead";
import FixedTableBody from "../FixedTableBody/FixedTableBody";
import { CoinData } from "../../../App";
import './FixedTable.css';

interface FixedTableProps {
    value: CoinData[];
    hoveredItem: number | null;
    handleMouseEnterRow: (index: number) => void;
    handleMouseLeaveRow: () => void;
}

const FixedTable: React.FC<FixedTableProps> = ({
    value,
    hoveredItem,
    handleMouseEnterRow,
    handleMouseLeaveRow
}) => {
    return (
        <div>FixedTable</div>
    )
}

export default FixedTable;