import React, { useState } from "react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import './ThreeDotsMenu.css';

interface ThreeDotsMenuProps {
    isHovered: boolean;
}

const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = ({isHovered}) => {
    return (
        <div>ThreeDotsMenu</div>
    )
}

export default ThreeDotsMenu;