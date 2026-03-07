import type { Wallet } from "../types/type";

function PanelError({ wallet, msg, onRetry, onBack }: { wallet: Wallet; msg: string; onRetry: () => void; onBack: () => void }) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 px-10 text-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden" style={{ background: "#1e2428", border: "1px solid #2a2f35", opacity: 0.6 }}>
            <div className="scale-150">{wallet.icon}</div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#ff4444", border: "2px solid #161a1d" }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </div>
        </div>
        <div>
          <p className="text-base font-semibold mb-1" style={{ color: "#e2e6ea" }}>Import Failed</p>
          <p className="text-xs leading-relaxed" style={{ color: "#ff6666", opacity: 0.85 }}>{msg}</p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <button onClick={onRetry} className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all" style={{ background: "#1e2428", color: "#e2e6ea", border: "1px solid #2a2f35" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#4a5568")} onMouseLeave={e => (e.currentTarget.style.borderColor = "#2a2f35")}>
            Try Again
          </button>
          <button onClick={onBack} className="w-full py-2 rounded-xl text-xs font-medium transition-all" style={{ color: "#4a5568" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#e2e6ea")} onMouseLeave={e => (e.currentTarget.style.color = "#4a5568")}>
            Try another wallet
          </button>
        </div>
      </div>
    );
}

export default PanelError;