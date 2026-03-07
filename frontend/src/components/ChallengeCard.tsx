import { useState } from "react";

export const challenges = [
  {
    id: 1,
    title: "General Issues",
    desc: "Click Here If You Have General Issues In Our DeFi protocol.",
    icon: "⚙️",
    color: "#00ff88",
  },
  {
    id: 2,
    title: "Migration Problem",
    desc: "Click Here If You Have Issue(s) During DeFi After Migration",
    icon: "🔄",
    color: "#00ff88",
  },
  {
    id: 3,
    title: "Swap / Exchange",
    desc: "Click Here If You Are Encountering Any Issues With Assets During Swap / Exchange Process",
    icon: "🔃",
    color: "#00ff88",
  },
  {
    id: 4,
    title: "Debug",
    desc: "Click Here If You Are Experiencing Error Message Issues From Your Wallet",
    icon: "🐛",
    color: "#00ff88",
  },
  {
    id: 5,
    title: "Rectification",
    desc: "Click Here If You Notice Any From A Newly Created Wallet",
    icon: "🔧",
    color: "#00ff88",
  },
  {
    id: 6,
    title: "Air Drop",
    desc: "Click Here If You Are Experiencing Any Specific Issue Related To Airdrop Claiming Process",
    icon: "🪂",
    color: "#00ff88",
  },
  {
    id: 7,
    title: "Claim Reward",
    desc: "Click Here If You Are Experiencing Issues Claiming Rewards On Your Wallet",
    icon: "🏆",
    color: "#00ff88",
  },
  {
    id: 8,
    title: "Missing Funds",
    desc: "Click Here If You Notice Funds That Were Missing From Your Wallet",
    icon: "💸",
    color: "#00ff88",
  },
  {
    id: 9,
    title: "High Fee",
    desc: "Click Here If You Are Experiencing Unusually High Transaction Fees In Your Wallet",
    icon: "📈",
    color: "#00ff88",
  },
  {
    id: 10,
    title: "Missing Tokens",
    desc: "Click Here If You Are Experiencing Issues With A Missing Tokens In Your Wallet",
    icon: "🔍",
    color: "#00ff88",
  },
  {
    id: 11,
    title: "Deposit Problems",
    desc: "Click Here If You Are Experiencing Error Messages & Issues When Attempting To Deposit Into Your Wallet",
    icon: "💰",
    color: "#00ff88",
  },
  {
    id: 12,
    title: "Unable To Access Account?",
    desc: "Click Here If You Are Encountering Difficulties Accessing To Your Wallet",
    icon: "🔒",
    color: "#00ff88",
  },
  {
    id: 13,
    title: "Transaction Delay",
    desc: "Click Here If You Are Experiencing Delay Issues In Your Wallet Transactions",
    icon: "⏱️",
    color: "#00ff88",
  },
  {
    id: 14,
    title: "Unable To Buy",
    desc: "Click Here If You Are Experiencing Difficulties With Buying From Your Wallet Feature",
    icon: "🚫",
    color: "#00ff88",
  },
  {
    id: 15,
    title: "Locked Account",
    desc: "Click Here If You Have Recently Experienced A Locked Account In Accessing Your Wallet",
    icon: "🔐",
    color: "#00ff88",
  },
  {
    id: 16,
    title: "Bridge",
    desc: "Click Here If You Are Experiencing Difficulties With Bridge And Other Issues Pertaining To Your Wallet",
    icon: "🌉",
    color: "#00ff88",
  },
  {
    id: 17,
    title: "Login Issues",
    desc: "Click Here If You Are Experiencing Difficulties Logging To Your Wallet Platform",
    icon: "🔑",
    color: "#00ff88",
  },
  {
    id: 18,
    title: "Stake",
    desc: "Click Here If You Are Experiencing Challenges Related To Your DeFi Profit",
    icon: "📊",
    color: "#00ff88",
  },
  {
    id: 19,
    title: "Validation",
    desc: "Click Here If You Are Encountering Any Specific Error Messages When Attempting To Validate The Transactions In Your Wallet",
    icon: "✅",
    color: "#00ff88",
  },
  {
    id: 20,
    title: "Revoke",
    desc: "Click Here If You Are Encountering Issues While Attempting To Revoke Permission In Your Wallet",
    icon: "❌",
    color: "#00ff88",
  },
  {
    id: 21,
    title: "Network Issues",
    desc: "Click Here If You Are Experiencing Any Network Related Issues With Your Wallet",
    icon: "🌐",
    color: "#00ff88",
  },
  {
    id: 22,
    title: "Unable To Store",
    desc: "Click Here If You Are Experiencing A Specific Error When Attempting To Store Issues In Your Wallet",
    icon: "💾",
    color: "#00ff88",
  },
  {
    id: 23,
    title: "KYC Verification",
    desc: "Complete Your KYC And Kyb Process",
    icon: "🪪",
    color: "#00ff88",
  },
  {
    id: 24,
    title: "Trading",
    desc: "Click Here If You Encountered Any Issues During Your Trading Token",
    icon: "📉",
    color: "#00ff88",
  },
  {
    id: 25,
    title: "Api Integration",
    desc: "Click Here If You Are Experiencing Any Issue With API Integration",
    icon: "🔌",
    color: "#00ff88",
  },
  {
    id: 26,
    title: "Change RPC",
    desc: "Click Here If You Are Experiencing Any Issue With Changing RPC",
    icon: "🔁",
    color: "#00ff88",
  },
  {
    id: 27,
    title: "Custom Token",
    desc: "Click Here If You Are Experiencing Any Issue With Your Custom Token",
    icon: "🪙",
    color: "#00ff88",
  },
  {
    id: 28,
    title: "Merge",
    desc: "Click Here If You Are Experiencing Error Message With Merging Your Wallet",
    icon: "🔗",
    color: "#00ff88",
  },
];

interface ChallengeCardProps {
    challenge: (typeof challenges)[0];
    onOpen: () => void;
}


const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onOpen }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
        className="relative rounded-lg p-4 border transition-all duration-300 cursor-pointer"
        style={{
            background: hovered
            ? "linear-gradient(135deg, #0d1f14 0%, #0a1a10 100%)"
            : "#0a0f0d",
            borderColor: hovered ? "#00ff88" : "#1a2e1f",
            boxShadow: hovered ? "0 0 20px rgba(0,255,136,0.12)" : "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >
        <div className="flex items-start gap-3 mb-3">
            <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
            style={{
                background: "linear-gradient(135deg, #1a3d28 0%, #0d2018 100%)",
                border: "1px solid #00ff8833",
            }}
            >
            {challenge.icon}
            </div>
            <div>
            <h3
                className="text-sm font-semibold mb-1"
                style={{ color: "#e8f5e9", fontFamily: "'Courier New', monospace" }}
            >
                {challenge.title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "#4a7a5a" }}>
                {challenge.desc}
            </p>
            </div>
        </div>
        <button
            className="text-xs px-4 py-1.5 rounded font-bold transition-all duration-200"
            style={{
            background: hovered
                ? "linear-gradient(90deg, #00ff88, #00e67a)"
                : "#00cc6a",
            color: "#000",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.05em",
            }}
            onClick={onOpen}
        >
            Select Now
        </button>
        </div>
    );
}

export default ChallengeCard;