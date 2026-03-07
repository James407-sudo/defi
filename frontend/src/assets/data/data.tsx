import type { Wallet } from "../../types/type";

export const wallets: Wallet[] = [
    {
      id: "metamask", name: "MetaMask", tag: "RECOMMENDED",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-10 h-10 object-contain" />,
    },
    {
      id: "trust", name: "Trust Wallet",
      icon: <img src="https://trustwallet.com/assets/images/media/assets/TWT.png" alt="Trust Wallet" className="w-10 h-10 object-contain rounded-xl" />,
    },
    {
      id: "phantom", name: "Phantom",
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#534bb1,#551bf9)" }}>
          <svg width="22" height="22" viewBox="0 0 128 128" fill="none">
            <ellipse cx="64" cy="64" rx="48" ry="48" fill="white" />
            <ellipse cx="64" cy="64" rx="30" ry="30" fill="#534bb1" />
            <circle cx="54" cy="60" r="7" fill="white" /><circle cx="74" cy="60" r="7" fill="white" />
          </svg>
        </div>
      ),
    },
    {
      id: "coinbase", name: "Coinbase Wallet",
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#0052ff" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="white" /><circle cx="12" cy="12" r="5" fill="#0052ff" /></svg>
        </div>
      ),
    },
    {
      id: "okx", name: "OKX Wallet",
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#000" }}>
          <svg width="22" height="22" viewBox="0 0 40 40" fill="white"><rect x="4" y="4" width="14" height="14" /><rect x="22" y="4" width="14" height="14" /><rect x="4" y="22" width="14" height="14" /><rect x="22" y="22" width="14" height="14" /></svg>
        </div>
      ),
    },
    {
      id: "uniswap", name: "Uniswap Wallet",
      icon: <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg,#ff007a,#ff69b4)" }}>🦄</div>,
    },
    {
      id: "ledger", name: "Ledger Wallet",
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#111", border: "1px solid #333" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" fill="none" stroke="white" strokeWidth="1.5" /><rect x="13" y="3" width="8" height="8" rx="1" fill="none" stroke="white" strokeWidth="1.5" /></svg>
        </div>
      ),
    },
    {
      id: "trezor", name: "Trezor Wallet",
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#1db954" }}>
          <svg width="16" height="20" viewBox="0 0 18 22" fill="white"><path d="M9 0C5.686 0 3 2.686 3 6v2H0v14h18V8h-3V6C15 2.686 12.314 0 9 0zm0 2c2.21 0 4 1.79 4 4v2H5V6c0-2.21 1.79-4 4-4zm0 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" /></svg>
        </div>
      ),
    },
    {
      id: "rabby", name: "Rabby Wallet",
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#8b7ff5,#5b4fcf)" }}>
          <svg width="22" height="18" viewBox="0 0 28 22" fill="white"><ellipse cx="14" cy="14" rx="10" ry="8" /><ellipse cx="7" cy="7" rx="4" ry="6" transform="rotate(-15 7 7)" /><ellipse cx="21" cy="7" rx="4" ry="6" transform="rotate(15 21 7)" /><circle cx="10" cy="14" r="2" fill="#8b7ff5" /><circle cx="18" cy="14" r="2" fill="#8b7ff5" /></svg>
        </div>
      ),
    },
    {
      id: "solflare", name: "Solflare Wallet",
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#fc8c03,#f43f00)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2L15 9H22L16.5 13.5L18.5 21L12 16.5L5.5 21L7.5 13.5L2 9H9L12 2Z" /></svg>
        </div>
      ),
    },
    {
      id: "magiceden", name: "Magic Eden",
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#e42575,#9a1750)" }}>
          <span className="text-white font-black text-sm">ME</span>
        </div>
      ),
    },
    {
      id: "walletconnect", name: "WalletConnect",
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#3b99fc" }}>
          <svg width="22" height="14" viewBox="0 0 24 15" fill="white"><path d="M4.91 3.37C8.74-.46 14.93-.46 18.76 3.37l.49.48c.2.2.2.52 0 .72l-1.67 1.64c-.1.1-.26.1-.36 0l-.67-.66C13.9 2.9 9.77 2.9 7.22 5.55l-.72.7c-.1.1-.26.1-.36 0L4.47 4.61c-.2-.2-.2-.52 0-.72l.44-.52zm16.27 3.03 1.49 1.46c.2.2.2.52 0 .72l-6.72 6.6c-.2.2-.52.2-.72 0L10.5 10.5c-.05-.05-.13-.05-.18 0l-4.73 4.68c-.2.2-.52.2-.72 0L.36 8.58c-.2-.2-.2-.52 0-.72L1.85 6.4c.2-.2.52-.2.72 0l4.73 4.68c.05.05.13.05.18 0l4.73-4.68c.2-.2.52-.2.72 0l4.73 4.68c.05.05.13.05.18 0l4.73-4.68c.2-.2.52-.2.72 0z" /></svg>
        </div>
      ),
    },
    {
      id: "bybit", name: "Bybit Wallet",
      icon: <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#f7a600" }}><span className="text-black font-black text-xs">BY</span></div>,
    },
    {
      id: "safepal", name: "SafePal Wallet",
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)" }}>
          <svg width="18" height="20" viewBox="0 0 24 26" fill="#4fc3f7"><path d="M12 1L3 5v7c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5L12 1z" /></svg>
        </div>
      ),
    },
  ];