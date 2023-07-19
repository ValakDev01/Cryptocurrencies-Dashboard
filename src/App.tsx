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

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
