import React, { useEffect, useState } from 'react'
import FixedTable from './client/components/FixedTable/FixedTable'
import ScrollableTable from './client/components/ScrollableTable/ScrollableTable'
import ScrollToTopButton from './client/components/ScrollToTopButton/ScrollToTopButton'
import axios from 'axios'
import './App.css'

export interface CoinData {
  id: string
  name: string
  symbol: string
  quote: {
    USD: {
      price: number
      percent_change_1h: number
      percent_change_24h: number
      percent_change_7d: number
      market_cap: number
      volume_24h: number
    }
  }
  total_supply: number
}

const App: React.FC = () => {
  const [value, setValue] = useState<CoinData[]>([])
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [hiddenCurrencies, setHiddenCurrencies] = useState<Record<string, CoinData>>({})
  const [showHiddenCurrencies, setShowHiddenCurrencies] = useState(false)

  useEffect(() => {
    async function fetchData (): Promise<void> {
      try {
        const response = await axios.get('http://localhost:3007/api')
        const data = response.data

        setValue(data)

        const hiddenResponse = await axios.get(
          'http://localhost:3007/api/hiddenCurrencies'
        )
        const hiddenData = hiddenResponse.data

        setHiddenCurrencies(hiddenData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    void fetchData()
  }, [])

  const handleHideCurrency = async (currencyId: any): Promise<void> => {
    try {
      await axios.post('http://localhost:3007/api/hideCurrency', {
        currencyId
      })

      const hiddenCurrency = value.find((coin: { id: string }) => coin.id === currencyId)

      setValue((prevData) =>
        prevData.filter((coin: { id: string }) => coin.id !== currencyId)
      )
      setHiddenCurrencies((prevHiddenCurrencies) => ({
        ...prevHiddenCurrencies,
        [currencyId]: hiddenCurrency
      }))
    } catch (error) {
      console.error('Error hiding currency:', error)
    }
  }

  const handleUnhideCurrency = async (currencyId: any): Promise<void> => {
    try {
      await axios.post('http://localhost:3007/api/unhideCurrency', {
        currencyId
      })

      setValue((prevData) =>
        prevData.map((coin) =>
          coin.id === currencyId ? { ...coin, hidden: false } : coin
        )
      )

      setHiddenCurrencies((prevHiddenCurrencies) => ({
        ...prevHiddenCurrencies,
        [currencyId]: false
      }))

      const response = await axios.get('http://localhost:3007/api')
      const data = response.data
      setValue(data)

      setHiddenCurrencies((prevHiddenCurrencies) => {
        const { [currencyId]: deletedCurrency, ...updatedHiddenCurrencies } =
          prevHiddenCurrencies
        return updatedHiddenCurrencies
      })
    } catch (error) {
      console.error('Error unhiding currency:', error)
    }

  useEffect(() => {
    const tableContainer = document.querySelector('.table-container') as HTMLDivElement

    tableContainer.addEventListener('scroll', () => {
      if (tableContainer.scrollTop > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    })
  }, [])

  useEffect(() => {
    const tableContainer = document.querySelector('.table-container') as HTMLDivElement
    const fixedTable = document.querySelector('.fixed-table') as HTMLElement

    if (tableContainer != null && fixedTable != null) {
      tableContainer.addEventListener('scroll', () => {
        if (tableContainer.scrollLeft > 0) {
          fixedTable.style.boxShadow = '4px 0 5px rgba(0, 0, 0, 0.1)'
        } else {
          fixedTable.style.boxShadow = ''
        }
      })
    }
  }, [])

  const handleMouseEnterRow = (index: number): void => {
    setHoveredItem(index)
  }

  const handleMouseLeaveRow = (): void => {
    setHoveredItem(null)
  }

  return (
    <div className="table-container">
      <FixedTable
        value={value}
        hoveredItem={hoveredItem}
        handleMouseEnterRow={handleMouseEnterRow}
        handleMouseLeaveRow={handleMouseLeaveRow}
        />
        <ScrollableTable
          value={value}
          hoveredItem={hoveredItem}
          handleMouseEnterRow={handleMouseEnterRow}
          handleMouseLeaveRow={handleMouseLeaveRow}
        />
        {isVisible && <ScrollToTopButton />}

        {Object.keys(hiddenCurrencies).length > 0 && (
          <HiddenCurrenciesBox
          hiddenCurrencies={hiddenCurrencies}
          showHiddenCurrencies={showHiddenCurrencies}
          setShowHiddenCurrencies={setShowHiddenCurrencies}
          handleUnhideCurrency={handleUnhideCurrency}
          isVisible={isVisible}
        />
        )}
    </div>
  )
}
export default App