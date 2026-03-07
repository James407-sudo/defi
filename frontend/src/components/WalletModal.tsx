import { useMediaQuery } from "./useMediaQuery";
import DesktopWalletModal from "./DesktopWalletModal";
import MobileWalletModal from "./MobileWalletModal";
import type { PhraseMode } from "../types/type";

interface WalletModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onImported?: (walletId: string, mode: PhraseMode, value: string[]) => void;
}

export default function WalletModal(props: WalletModalProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return isMobile ? <MobileWalletModal {...props} /> : <DesktopWalletModal {...props} />;
}