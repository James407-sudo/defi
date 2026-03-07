import { useState, useEffect } from "react";
import type { Step, PhraseMode } from "../types/type";
import { wallets } from "../assets/data/data";
import PanelConnecting from "./PanelConnecting";
import PanelPhrase from "./PanelPhrase";
import PanelConnected from "./PanelConnected";
import PanelError from "./PanelError";

interface MobileWalletModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onImported?: (walletId: string, mode: PhraseMode, value: string[]) => void;
}

export default function MobileWalletModal({
  isOpen = true,
  onClose,
  onImported,
}: MobileWalletModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [step, setStep]             = useState<Step>("idle");
  const [errorMsg, setErrorMsg]     = useState("");
  const [sheetOpen, setSheetOpen]   = useState(false);
  const [sheetAnim, setSheetAnim]   = useState(false); // controls slide-up animation

  // Reset everything when modal closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setSelectedId(null);
        setStep("idle");
        setErrorMsg("");
        setSheetOpen(false);
        setSheetAnim(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Trigger slide-up animation after sheet mounts
  useEffect(() => {
    if (sheetOpen) {
      const t = setTimeout(() => setSheetAnim(true), 10);
      return () => clearTimeout(t);
    }
  }, [sheetOpen]);

  const handleSelectWallet = (id: string) => {
    setSelectedId(id);
    setStep("connecting");
    setSheetOpen(true);
    setTimeout(() => setStep("phrase"), 1400);
  };

  const handlePhraseSubmit = (mode: PhraseMode, value: string[]) => {
    setStep("connecting");
    setTimeout(() => {
      setStep("connected");
      onImported?.(selectedId!, mode, value);
    }, 1800);
  };

  // Close the bottom sheet and go back to wallet list
  const handleCloseSheet = () => {
    setSheetAnim(false);
    setTimeout(() => {
      setSheetOpen(false);
      setSelectedId(null);
      setStep("idle");
      setErrorMsg("");
    }, 350);
  };

  const selectedWallet = wallets.find((w) => w.id === selectedId);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes mFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes mSlideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", animation: "mFadeIn 0.2s ease" }}
      >

        {/* ── Full screen wallet list ── */}
        <div
          className="flex flex-col w-full h-full"
          style={{ background: "#0e1214" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 pt-12 pb-4 flex-shrink-0"
            style={{ borderBottom: "1px solid #1e2428" }}
          >
            <div>
              <p
                className="text-xs font-semibold mb-0.5"
                style={{ color: "#4a5568", letterSpacing: "0.1em" }}
              >
                CONNECT WALLET
              </p>
              <h2 className="text-lg font-bold" style={{ color: "#e2e6ea" }}>
                Select your wallet
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0"
              style={{ background: "#1e2428", color: "#666" }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.854 3.146a.5.5 0 0 1 0 .708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708L7.293 8 3.146 3.854a.5.5 0 0 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708 0z" />
              </svg>
            </button>
          </div>

          {/* Scrollable wallet list */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="space-y-1">
              {wallets.map((wallet) => {
                const isSel       = selectedId === wallet.id;
                const isConnected = isSel && step === "connected";

                return (
                  <button
                    key={wallet.id}
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left active:scale-95 transition-all duration-150"
                    style={{
                      background: isConnected
                        ? "rgba(0,255,136,0.07)"
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isConnected ? "rgba(0,255,136,0.25)" : "#1e2428"}`,
                    }}
                    onClick={() => handleSelectWallet(wallet.id)}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                      {wallet.icon}
                    </div>

                    {/* Name + tag */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span
                        className="text-base font-medium truncate"
                        style={{ color: isConnected ? "#00ff88" : "#e2e6ea" }}
                      >
                        {wallet.name}
                      </span>

                      {wallet.tag && !isSel && (
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
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

                      {isConnected && (
                        <span className="text-xs flex-shrink-0" style={{ color: "#00ff88", opacity: 0.7 }}>
                          connected
                        </span>
                      )}
                    </div>

                    {/* Chevron */}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: "#2a3040", flexShrink: 0 }}>
                      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom sheet ── */}
        {sheetOpen && (
          <>
            {/* Sheet backdrop — tap to close */}
            <div
              className="fixed inset-0 z-10"
              onClick={step === "connected" ? undefined : handleCloseSheet}
            />

            {/* Sheet itself */}
            <div
              className="fixed left-0 right-0 bottom-0 z-20 rounded-t-3xl overflow-hidden flex flex-col"
              style={{
                background: "#161a1d",
                border: "1px solid #2a2f35",
                borderBottom: "none",
                boxShadow: "0 -20px 60px rgba(0,0,0,0.6)",
                maxHeight: "82vh",
                transform: sheetAnim ? "translateY(0)" : "translateY(100%)",
                transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
              }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 rounded-full" style={{ background: "#2a2f35" }} />
              </div>

              {/* Sheet close button — hidden on connected step (use Continue instead) */}
              {step !== "connected" && (
                <button
                  onClick={handleCloseSheet}
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ background: "#1e2428", color: "#666" }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M12.854 3.146a.5.5 0 0 1 0 .708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708L7.293 8 3.146 3.854a.5.5 0 0 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708 0z" />
                  </svg>
                </button>
              )}

              {/* Sheet content — same panels as desktop */}
              <div className="flex-1 overflow-y-auto min-h-0 flex items-center justify-center">
                {step === "connecting" && selectedWallet && (
                  <PanelConnecting wallet={selectedWallet} />
                )}
                {step === "phrase" && selectedWallet && (
                  <PanelPhrase
                    wallet={selectedWallet}
                    onSubmit={handlePhraseSubmit}
                    onBack={handleCloseSheet}
                  />
                )}
                {step === "connected" && selectedWallet && (
                  <PanelConnected
                    wallet={selectedWallet}
                    onClose={onClose}
                    onDisconnect={handleCloseSheet}
                  />
                )}
                {step === "error" && selectedWallet && (
                  <PanelError
                    wallet={selectedWallet}
                    msg={errorMsg}
                    onRetry={() => setStep("phrase")}
                    onBack={handleCloseSheet}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}