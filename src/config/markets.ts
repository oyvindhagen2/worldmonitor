import type { Sector, Commodity, MarketSymbol } from '@/types';

export const SECTORS: Sector[] = [
  { symbol: 'XLK', name: 'Tech' },
  { symbol: 'XLF', name: 'Finance' },
  { symbol: 'XLE', name: 'Energy' },
  { symbol: 'XLV', name: 'Health' },
  { symbol: 'XLY', name: 'Consumer' },
  { symbol: 'XLI', name: 'Industrial' },
  { symbol: 'XLP', name: 'Staples' },
  { symbol: 'XLU', name: 'Utilities' },
  { symbol: 'XLB', name: 'Materials' },
  { symbol: 'XLRE', name: 'Real Est' },
  { symbol: 'XLC', name: 'Comms' },
  { symbol: 'SMH', name: 'Semis' },
];

export const COMMODITIES: Commodity[] = [
  { symbol: '^VIX', name: 'VIX', display: 'VIX' },
  { symbol: 'GC=F', name: 'Gold', display: 'GOLD' },
  { symbol: 'CL=F', name: 'Crude Oil', display: 'OIL' },
  { symbol: 'NG=F', name: 'Natural Gas', display: 'NATGAS' },
  { symbol: 'SI=F', name: 'Silver', display: 'SILVER' },
  { symbol: 'HG=F', name: 'Copper', display: 'COPPER' },
];

export const MARKET_SYMBOLS: MarketSymbol[] = [
  // Americas indices
  { symbol: '^GSPC', name: 'S&P 500', display: 'SPX' },
  { symbol: '^DJI', name: 'Dow Jones', display: 'DOW' },
  { symbol: '^IXIC', name: 'NASDAQ', display: 'NDX' },

  // Americas stocks
  { symbol: 'AAPL', name: 'Apple', display: 'AAPL' },
  { symbol: 'MSFT', name: 'Microsoft', display: 'MSFT' },
  { symbol: 'NVDA', name: 'NVIDIA', display: 'NVDA' },
  { symbol: 'GOOGL', name: 'Alphabet', display: 'GOOGL' },
  { symbol: 'AMZN', name: 'Amazon', display: 'AMZN' },
  { symbol: 'META', name: 'Meta', display: 'META' },
  { symbol: 'BRK-B', name: 'Berkshire', display: 'BRK.B' },
  { symbol: 'TSM', name: 'TSMC', display: 'TSM' },
  { symbol: 'LLY', name: 'Eli Lilly', display: 'LLY' },
  { symbol: 'TSLA', name: 'Tesla', display: 'TSLA' },
  { symbol: 'AVGO', name: 'Broadcom', display: 'AVGO' },
  { symbol: 'WMT', name: 'Walmart', display: 'WMT' },
  { symbol: 'JPM', name: 'JPMorgan', display: 'JPM' },
  { symbol: 'V', name: 'Visa', display: 'V' },
  { symbol: 'UNH', name: 'UnitedHealth', display: 'UNH' },
  { symbol: 'NVO', name: 'Novo Nordisk', display: 'NVO' },
  { symbol: 'XOM', name: 'Exxon', display: 'XOM' },
  { symbol: 'MA', name: 'Mastercard', display: 'MA' },
  { symbol: 'ORCL', name: 'Oracle', display: 'ORCL' },
  { symbol: 'PG', name: 'P&G', display: 'PG' },
  { symbol: 'COST', name: 'Costco', display: 'COST' },
  { symbol: 'JNJ', name: 'J&J', display: 'JNJ' },
  { symbol: 'HD', name: 'Home Depot', display: 'HD' },
  { symbol: 'NFLX', name: 'Netflix', display: 'NFLX' },
  { symbol: 'BAC', name: 'BofA', display: 'BAC' },

  // Europe indices
  { symbol: '^FTSE', name: 'FTSE 100', display: 'FTSE' },
  { symbol: '^GDAXI', name: 'DAX 40', display: 'DAX' },
  { symbol: '^FCHI', name: 'CAC 40', display: 'CAC' },
  { symbol: '^STOXX50E', name: 'Euro Stoxx 50', display: 'STOXX50' },

  // Nordics indices
  { symbol: '^SSMI', name: 'SMI', display: 'SMI' },
  { symbol: '^AEX', name: 'AEX', display: 'AEX' },
  { symbol: '^OSLO', name: 'OSEBX', display: 'OSEBX' },

  // Asia-Pacific indices
  { symbol: '^N225', name: 'Nikkei 225', display: 'N225' },
  { symbol: '^HSI', name: 'Hang Seng', display: 'HSI' },
  { symbol: '^SSEC', name: 'Shanghai Composite', display: 'SSEC' },
  { symbol: '^KS11', name: 'KOSPI', display: 'KOSPI' },
  { symbol: '^BSESN', name: 'Sensex', display: 'SENSEX' },
  { symbol: '^NSEI', name: 'Nifty 50', display: 'NIFTY' },
  { symbol: '^AXJO', name: 'ASX 200', display: 'ASX' },
  { symbol: '^TWII', name: 'TWSE', display: 'TWSE' },
];

export const CRYPTO_IDS = ['bitcoin', 'ethereum', 'solana', 'ripple'] as const;

export const CRYPTO_MAP: Record<string, { name: string; symbol: string }> = {
  bitcoin: { name: 'Bitcoin', symbol: 'BTC' },
  ethereum: { name: 'Ethereum', symbol: 'ETH' },
  solana: { name: 'Solana', symbol: 'SOL' },
  ripple: { name: 'XRP', symbol: 'XRP' },
};
