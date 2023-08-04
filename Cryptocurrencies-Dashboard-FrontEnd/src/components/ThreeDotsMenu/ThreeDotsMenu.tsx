import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

import './ThreeDotsMenu.css'

interface ThreeDotsMenuProps {
  isHovered: boolean
  handleHideCurrency: (index: string) => void
  itemId: string
}

const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = ({
  isHovered,
  handleHideCurrency,
  itemId
}) => {
  const [isThreeDotsHovered, setIsThreeDotsHovered] = useState<boolean>(false)
  const [clickedThreeDots, setClickedThreeDots] = useState<boolean>(false)

  const handleMouseEnterThreeDots = (): void => {
    setIsThreeDotsHovered(true)
  }

  const handleMouseLeaveThreeDots = (): void => {
    setIsThreeDotsHovered(false)
  }

  const handleClickedThreeDotsOn = (): void => {
    setClickedThreeDots(true)
  }

  const handleClickedThreeDotsOff = (): void => {
    setClickedThreeDots(false)
  }

  return (
    <div
      className={`${
        isThreeDotsHovered && isHovered
          ? 'threeDotsContainer threeDotsStyleOn'
          : 'threeDotsContainer threeDotsStyleOff'
      } ${isHovered && !isThreeDotsHovered ? 'threeDotsStyleBackground' : ''}`}
      onMouseEnter={handleMouseEnterThreeDots}
      onMouseLeave={() => {
        handleMouseLeaveThreeDots()
        handleClickedThreeDotsOff()
      }}
      onClick={handleClickedThreeDotsOn}
    >
      <div className="threeDotsInnerContainer">
        <BsThreeDotsVertical className="threeDotsIcon" />
        {clickedThreeDots && isHovered && (
          <div className="notificationStar2">
            <div className="triangle2"></div>
            <div
              className="content2"
              onClick={() => {
                handleHideCurrency(itemId)
              }}
            >
              <span>Hide</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ThreeDotsMenu
