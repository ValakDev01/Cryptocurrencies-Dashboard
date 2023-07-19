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
        <div
            className={`${isThreeDotsHovered && isHovered ? "threeDotsContainer threeDotsStyleOn" : "threeDotsContainer threeDotsStyleOff"} ${isHovered && !isThreeDotsHovered ? "threeDotsStyleBackground" : ""}`}
            onMouseEnter={handleMouseEnterThreeDots}
            onMouseLeave={() => {handleMouseLeaveThreeDots(); handleClickedThreeDotsOff();}}
            onClick={handleClickedThreeDotsOn}
        >
            <div className="threeDotsInnerContainer">
                <BsThreeDotsVertical className="threeDotsIcon" />
                {clickedThreeDots && isHovered && (
                    <div className="notificationStar2">
                        <div className="triangle2"></div>
                        <div className="content2"><span>Hide</span></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ThreeDotsMenu;