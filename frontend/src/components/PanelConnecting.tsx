import Spinner from "./Spinner";
import type { Wallet } from "../types/type";

function PanelConnecting({ wallet }: { wallet: Wallet }) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 px-10 text-center">
        <style>{`@keyframes pulse { 0%,100%{transform:scale(.8);opacity:.4} 50%{transform:scale(1.2);opacity:1} }`}</style>
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center" style={{ background: "#1e2428" }}>
              <div className="scale-125">{wallet.icon}</div>
            </div>
          </div>
          <div className="absolute -inset-2 flex items-center justify-center pointer-events-none">
            <Spinner />
          </div>
        </div>
        <div>
          <p className="text-base font-semibold mb-1" style={{ color: "#e2e6ea" }}>Connecting to {wallet.name}</p>
          <p className="text-xs leading-relaxed" style={{ color: "#4a5568" }}>Initializing secure connection…</p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "#00ff88", animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
    );
  }

export default PanelConnecting;