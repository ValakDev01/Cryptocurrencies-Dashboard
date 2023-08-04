import React from 'react'
import { IoMdArrowRoundUp } from 'react-icons/io'
import './ScrollToTopButton.css'

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = (): void => {
    const tableContainer = document.querySelector(
      '.table-container'
    ) as HTMLDivElement

    tableContainer.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="scroll-to-top-button" onClick={scrollToTop}>
      <IoMdArrowRoundUp />
    </div>
  )
}

export default ScrollToTopButton
