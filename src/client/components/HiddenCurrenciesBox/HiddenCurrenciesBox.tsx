import React from 'react'
import type { CoinData } from '../../../App'
import './HiddenCurrenciesBox.css'

interface HiddenCurrenciesBoxProps {
  hiddenCurrencies: Record<string, CoinData>
  showHiddenCurrencies: boolean
  setShowHiddenCurrencies: (index: boolean) => void
  handleUnhideCurrency: (index: string) => void
  isVisible: boolean
}

const HiddenCurrenciesBox: React.FC<HiddenCurrenciesBoxProps> = ({
  hiddenCurrencies,
  showHiddenCurrencies,
  setShowHiddenCurrencies,
  handleUnhideCurrency,
  isVisible
}) => {
  return (
    <div
          className={`hidden-currencies-box ${
            showHiddenCurrencies ? 'expanded' : ''
          }`} style={{ bottom: isVisible ? '70px' : '20px' }}
          onClick={() => { setShowHiddenCurrencies(!showHiddenCurrencies) }}
        >
          <span className="hidden-table-header">
            {Object.keys(hiddenCurrencies).length}
          </span>
          {showHiddenCurrencies && (
            <div className="hidden-currencies-table">
              <span className="hidden-table-header2">
                Hidden Currencies: {Object.keys(hiddenCurrencies).length}
              </span>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(hiddenCurrencies).map((currencyId, index) => {
                    const currencyData = hiddenCurrencies[currencyId]

                    return (
                      <tr key={currencyId}>
                        <td>{index + 1}</td>
                        <td>{currencyData.name}</td>
                        <td>{currencyData.symbol}</td>
                        <td>
                          <button
                          className='hideButton'
                            onClick={() => { handleUnhideCurrency(currencyId) }}
                          >
                            Unhide
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
  )
}

export default HiddenCurrenciesBox
