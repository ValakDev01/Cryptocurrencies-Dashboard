import React from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import ThreeDotsMenu from "../ThreeDotsMenu/ThreeDotsMenu";
import { CoinData } from "../../../App";

interface ScrollableTableBodyProps {
    value: CoinData[];
    hoveredItem: number | null;
    handleMouseEnterRow: (index: number) => void;
    handleMouseLeaveRow: () => void;
}

const ScrollableTableBody: React.FC<ScrollableTableBodyProps> = ({
    value,
    hoveredItem,
    handleMouseEnterRow,
    handleMouseLeaveRow
}) => {
    return (
        <div>ScrollableTableBody</div>
    )
}

export default ScrollableTableBody;