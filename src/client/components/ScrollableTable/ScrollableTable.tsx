import React from 'react';
import ScrollableTableHead from "../ScrollableTableHead/ScrollableTableHead";
import ScrollableTableBody from "../ScrollableTableBody/ScrollableTableBody";
import { CoinData } from "../../../App";
import './ScrollableTable.css';

interface ScrollableTableProps {
    value: CoinData[];
    hoveredItem: number | null;
    handleMouseEnterRow: (index: number) => void;
    handleMouseLeaveRow: () => void;
}

const ScrollableTable: React.FC<ScrollableTableProps> = ({
    value,
    hoveredItem,
    handleMouseEnterRow,
    handleMouseLeaveRow
}) => {
    return (
        <div>ScrollableTable</div>
    )
}

export default ScrollableTable;