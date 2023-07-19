import React, { useState } from "react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import './ThreeDotsMenu.css';

interface ThreeDotsMenuProps {
    isHovered: boolean;
}

const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = ({isHovered}) => {
    const [isThreeDotsHovered, setIsThreeDotsHovered] = useState<boolean>(false);
    const [clickedThreeDots, setClickedThreeDots] = useState<boolean>(false);

    const handleMouseEnterThreeDots = () => {
        setIsThreeDotsHovered(true);
    };

    const handleMouseLeaveThreeDots = () => {
        setIsThreeDotsHovered(false);
    };

    const handleClickedThreeDotsOn = () => {
        setClickedThreeDots(true);
    };

    const handleClickedThreeDotsOff = () => {
        setClickedThreeDots(false);
    };

    return (
        <div>ThreeDotsMenu</div>
    )
}

export default ThreeDotsMenu;