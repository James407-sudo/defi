import { useState, useEffect } from "react";
import type { Step, PhraseMode } from "../types/type";
import { wallets } from "../assets/data/data";
import PanelConnecting from "./PanelConnecting";
import PanelPhrase from "./PanelPhrase";
import PanelConnected from "./PanelConnected";
import PanelError from "./PanelError";

interface WalletModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onImported?: (walletId: string, mode: PhraseMode, value: string[]) => void;
}

export default function WalletModal({
  isOpen = true,
  onClose,
  onImported,
}: WalletModalProps) {
  const [hoveredId, setHoveredId]   = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [step, setStep]             = useState<Step>("idle");
  const [errorMsg, setErrorMsg]     = useState("");

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setSelectedId(null);
        setStep("idle");
        setErrorMsg("");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleSelectWallet = (id: string) => {
    if (step === "connecting") return;
    setSelectedId(id);
    setStep("connecting");
    setTimeout(() => setStep("phrase"), 1400);
  };

  const handlePhraseSubmit = (mode: PhraseMode, value: string[]) => {
    setStep("connecting");
    setTimeout(() => {
      setStep("connected");
      onImported?.(selectedId!, mode, value);
    }, 1800);
  };

  const handleReset = () => {
    setSelectedId(null);
    setStep("idle");
    setErrorMsg("");
  };

  const selectedWallet = wallets.find((w) => w.id === selectedId);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* Responsive media query overrides */}
      <style>{`
        @media (min-width: 768px) {
          .wallet-left-panel {
            border-bottom: none !important;
            border-right: 1px solid #2a2f35 !important;
            max-height: 100% !important;
            flex: 1;
          }
        }
      `}</style>

      {/* Modal container — column on mobile, row on desktop */}
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col md:flex-row"
        style={{
          background: "#161a1d",
          border: "1px solid #2a2f35",
          boxShadow: "0 30px 100px rgba(0,0,0,0.7)",
          height: "min(640px, 90vh)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full transition-all"
          style={{ color: "#555" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#ccc")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#555")}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M12.854 3.146a.5.5 0 0 1 0 .708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708L7.293 8 3.146 3.854a.5.5 0 0 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708 0z" />
          </svg>
        </button>

        {/* ── Left: wallet list ─────────────────────────────────────────────── */}
        {/* On mobile: fixed height ~38%, scrollable, bottom border            */}
        {/* On desktop (md+): flex-1, full height, right border                */}
        <div
          className="wallet-left-panel overflow-y-auto py-4 px-4 md:py-6 md:px-5"
          style={{
            borderBottom: "1px solid #2a2f35",
            maxHeight: "38%",
            scrollbarWidth: "thin",
            scrollbarColor: "#2a2f35 transparent",
          }}
        >
          <div className="space-y-0.5">
            {wallets.map((wallet) => {
              const isHov       = hoveredId === wallet.id;
              const isSel       = selectedId === wallet.id;
              const isConnected = isSel && step === "connected";
              const isActive    = isSel && (step === "connecting" || step === "phrase");

              return (
                <button
                  key={wallet.id}
                  disabled={step === "connecting"}
                  className="w-full flex items-center gap-3 md:gap-4 px-3 md:px-4 py-3 md:py-3.5 rounded-xl text-left transition-all duration-150 disabled:cursor-not-allowed"
                  style={{
                    background:
                      isSel ? "rgba(255,255,255,0.07)"
                      : isHov ? "rgba(255,255,255,0.04)"
                      : "transparent",
                    border: `1px solid ${
                      isConnected ? "rgba(0,255,136,0.25)"
                      : isSel     ? "#383e46"
                      : isHov     ? "#2a2f35"
                      : "transparent"
                    }`,
                    opacity: step === "connecting" && !isSel ? 0.35 : 1,
                  }}
                  onMouseEnter={() => setHoveredId(wallet.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleSelectWallet(wallet.id)}
                >
                  {/* Icon — slightly smaller on mobile */}
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                    {wallet.icon}
                  </div>

                  <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                    <span
                      className="text-sm md:text-base font-medium truncate"
                      style={{ color: isConnected ? "#00ff88" : "#e2e6ea" }}
                    >
                      {wallet.name}
                    </span>

                    {wallet.tag && !isSel && (
                      <span
                        className="text-xs font-bold px-1.5 md:px-2 py-0.5 rounded flex-shrink-0"
                        style={{
                          color: "#00ff88",
                          background: "rgba(0,255,136,0.07)",
                          letterSpacing: "0.07em",
                          border: "1px solid rgba(0,255,136,0.16)",
                          fontSize: "10px",
                        }}
                      >
                        {wallet.tag}
                      </span>
                    )}

                    {isActive && (
                      <span className="text-xs flex-shrink-0" style={{ color: "#4a5568" }}>
                        connecting…
                      </span>
                    )}
                    {isConnected && (
                      <span className="text-xs flex-shrink-0" style={{ color: "#00ff88", opacity: 0.7 }}>
                        connected
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right: step panel ────────────────────────────────────────────── */}
        {/* Takes remaining height on mobile, flex-1 on desktop               */}
        <div
          className="flex-1 flex items-center justify-center overflow-y-auto min-h-0"
          style={{ background: "#161a1d" }}
        >
          {/* Idle */}
          {step === "idle" && (
            <div className="flex flex-col items-center gap-3 px-10 text-center select-none">
              <div style={{ opacity: 0.12 }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e2e6ea" strokeWidth="1.2">
                  <rect x="2" y="6" width="20" height="14" rx="2" />
                  <path d="M16 13a1 1 0 1 1 0 .001" />
                  <path d="M2 10h20" />
                </svg>
              </div>
              <p className="text-sm font-medium" style={{ color: "#2e3a46" }}>
                Select a wallet to get started
              </p>
            </div>
          )}

          {step === "connecting" && selectedWallet && (
            <PanelConnecting wallet={selectedWallet} />
          )}

          {step === "phrase" && selectedWallet && (
            <PanelPhrase
              wallet={selectedWallet}
              onSubmit={handlePhraseSubmit}
              onBack={handleReset}
            />
          )}

          {step === "connected" && selectedWallet && (
            <PanelConnected
              wallet={selectedWallet}
              onClose={onClose}
              onDisconnect={handleReset}
            />
          )}

          {step === "error" && selectedWallet && (
            <PanelError
              wallet={selectedWallet}
              msg={errorMsg}
              onRetry={() => setStep("phrase")}
              onBack={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}