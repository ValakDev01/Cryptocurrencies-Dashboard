import React from "react";
import TableRow from "../TableRow/TableRow";
import { CoinData } from "../../../App";

interface FixedTableBodyProps {
    value: CoinData[];
    selectedItem: number | null;
    setSelectedItem: React.Dispatch<React.SetStateAction<number | null>>;
    hoveredItem: number | null;
    handleMouseEnterRow: (index: number) => void;
    handleMouseLeaveRow: () => void;
}

const FixedTableBody: React.FC<FixedTableBodyProps> = ({
    value,
    selectedItem,
    setSelectedItem,
    hoveredItem,
    handleMouseEnterRow,
    handleMouseLeaveRow
}) => {
    return (
        <div>FixedTableBody</div>
    )
}

export default FixedTableBody;