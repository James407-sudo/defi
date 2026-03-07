export type Step = "idle" | "connecting" | "phrase" | "connected" | "error";
export type PhraseMode = "seed" | "privatekey" | "keystore";

export interface Wallet {
  id: string;
  name: string;
  tag?: string;
  icon: React.ReactNode;
}