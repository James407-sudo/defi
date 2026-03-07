function Spinner() {
    return (
        <>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ animation: "spin 0.9s linear infinite" }}>
            <circle cx="26" cy="26" r="22" stroke="#2a2f35" strokeWidth="3" />
            <path d="M48 26a22 22 0 0 0-22-22" stroke="#00ff88" strokeWidth="3" strokeLinecap="round" />
        </svg>
        </>
    );
}

export default Spinner;