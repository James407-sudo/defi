import type { Wallet } from "../types/type";

function PanelConnected({ wallet, onClose, onDisconnect }: { wallet: Wallet; onClose?: () => void; onDisconnect: () => void }) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 px-10 text-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden" style={{ background: "#1e2428", border: "1px solid #2a2f35" }}>
            <div className="scale-150">{wallet.icon}</div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#00ff88", border: "2px solid #161a1d" }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
        <div>
          <p className="text-base font-semibold mb-1" style={{ color: "#e2e6ea" }}>{wallet.name} Imported</p>
          <p className="text-xs" style={{ color: "#00ff88", opacity: 0.8 }}>Wallet successfully linked</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono" style={{ background: "#1e2428", border: "1px solid #2a2f35", color: "#8899aa" }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "#00ff88" }} />
          0x71C7…{Math.random().toString(16).slice(2, 6).toUpperCase()}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <button onClick={onClose} className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all" style={{ background: "#00ff88", color: "#000" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#00e67a")} onMouseLeave={e => (e.currentTarget.style.background = "#00ff88")}>
            Continue
          </button>
          <button onClick={onDisconnect} className="w-full py-2 rounded-xl text-xs font-medium transition-all" style={{ color: "#4a5568" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#e2e6ea")} onMouseLeave={e => (e.currentTarget.style.color = "#4a5568")}>
            Disconnect
          </button>
        </div>
      </div>
    );
}

export default PanelConnected;