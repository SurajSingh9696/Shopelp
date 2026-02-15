import { useUIStore } from "../store/useUIStore";

const CURRENCY_CONFIG = {
  USD: {
    locale: "en-US",
    symbol: "$"
  },
  INR: {
    locale: "en-IN",
    symbol: "₹"
  }
};

export function formatCurrency(value, overrideCurrency = null) {
  // Get currency from store or use override
  const currency = overrideCurrency || (typeof window !== "undefined" ? 
    localStorage.getItem("currency") || "INR" : "INR");
  
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG["INR"];
  
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value || 0);
}

export function getCurrencySymbol(currency = null) {
  const activeCurrency = currency || (typeof window !== "undefined" ? 
    localStorage.getItem("currency") || "INR" : "INR");
  
  const config = CURRENCY_CONFIG[activeCurrency] || CURRENCY_CONFIG["INR"];
  return config.symbol;
}
