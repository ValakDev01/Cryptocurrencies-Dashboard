import React from 'react'
import { FaRegStar } from 'react-icons/fa';
import { CoinData } from "../../../App";
import './TableRow.css';

interface TableRowProps {
    isHovered: boolean;
    isSelectedStar: boolean;
    logoUrl: string;
    item: CoinData;
    index: number;
    handleMouseEnterRow: (index: number) => void;
    handleMouseLeaveRow: () => void;
    setSelectedItem: React.Dispatch<React.SetStateAction<number | null>>;
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
        <div>TableRow</div>
    )
}

export default TableRow;