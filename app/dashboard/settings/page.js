"use client";

import { useUIStore } from "../../../store/useUIStore";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" }
];

const THEMES = [
  { code: "light", name: "Light Theme", icon: "☀️" },
  { code: "dark", name: "Dark Theme", icon: "🌙" }
];

export default function SettingsPage() {
  const { currency, setCurrency, theme, setTheme } = useUIStore();

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const currentCurrency = CURRENCIES.find(c => c.code === currency) || CURRENCIES[1];
  const currentTheme = THEMES.find(t => t.code === theme) || THEMES[1];

  return (
    <div className="rounded-2xl border border-border bg-card p-3 sm:p-4 lg:p-6 text-foreground shadow-soft">
      <h2 className="text-base sm:text-lg lg:text-xl font-semibold">Settings</h2>
      <p className="mt-2 text-xs sm:text-sm text-muted">
        Manage profile details, currency, and notification preferences.
      </p>
      <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
        <div className="rounded-xl border border-border bg-card/50 p-3 sm:p-4 lg:p-6">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">Currency Preference</h3>
          <p className="mt-1 text-xs sm:text-sm text-muted">Choose your preferred currency for display throughout the app.</p>
          
          <div className="mt-4">
            <label className="text-xs uppercase tracking-[0.2em] text-muted">Currency</label>
            <select
              value={currency}
              onChange={handleCurrencyChange}
              className="mt-2 w-full sm:max-w-xs rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
            >
              {CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.name} ({curr.code})
                </option>
              ))}
            </select>
          </div>
          
          <div className="mt-4 rounded-lg bg-primary/10 p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-foreground">
              <span className="font-semibold">Current:</span> {currentCurrency.symbol} {currentCurrency.name}
            </p>
            <p className="mt-1 text-xs text-muted">
              This will apply to all monetary values throughout the application.
            </p>
          </div>
        </div>
        
        <div className="rounded-xl border border-border bg-card/50 p-3 sm:p-4 lg:p-6">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">Data Management</h3>
          <p className="mt-1 text-xs sm:text-sm text-muted">Manage your data backups and exports.</p>
          
          <div className="mt-4 grid gap-3 sm:gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-card p-3 sm:p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Backup Status</p>
              <p className="mt-1 sm:mt-2 text-base sm:text-lg font-semibold">Weekly export enabled</p>
            </div>
            <div className="rounded-lg bg-card p-3 sm:p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Last Export</p>
              <p className="mt-1 sm:mt-2 text-base sm:text-lg font-semibold">Never</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
