import React, { useEffect, useState } from "react";
import FixedTable from "./client/components/FixedTable/FixedTable";
import ScrollableTable from "./client/components/ScrollableTable/ScrollableTable";
import ScrollToTopButton from "./client/components/ScrollToTopButton/ScrollToTopButton";
import './App.css';

export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      market_cap: number;
      volume_24h: number;
    };
  };
  total_supply: number;
}

const App: React.FC = () => {
  const [value, setValue] = useState<CoinData[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=9b08de90-b259-4fac-9f94-66b420c41538')
      .then(res => res.json())
      .then(data => setValue(data.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const tableContainer = document.querySelector(".table-container") as HTMLDivElement;

    tableContainer.addEventListener('scroll', () => {
      if (tableContainer.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  useEffect(() => {
    const tableContainer = document.querySelector(".table-container") as HTMLDivElement;
    const fixedTable = document.querySelector(".fixed-table") as HTMLElement;

    if (tableContainer && fixedTable) {
      tableContainer.addEventListener('scroll', () => {
        if (tableContainer.scrollLeft > 0) {
          fixedTable.style.boxShadow = '4px 0 5px rgba(0, 0, 0, 0.1)';
        } else {
          fixedTable.style.boxShadow = '';
        }
      });
    }
  }, []);

  const handleMouseEnterRow = (index: number) => {
    setHoveredItem(index);
  };

  const handleMouseLeaveRow = () => {
    setHoveredItem(null);
  };

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
    </div>
  );
}

export default App;
