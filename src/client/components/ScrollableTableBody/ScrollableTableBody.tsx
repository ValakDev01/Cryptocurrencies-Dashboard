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
    const formatNumber = (value: number) => {
        return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const getPercentChangeColor = (value: number) => {
        if (value <= 0) {
            return "red";
        } else if (value > 0) {
            return "#16C784";
        }
        return "";
    };

    return (
        <div>ScrollableTableBody</div>
    )
}

export default ScrollableTableBody;