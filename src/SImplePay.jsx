import React, { useState, useEffect } from "react";

export default function SimplePay() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("Max Muster");
  const [status, setStatus] = useState("idle");
  const [show, setShow] = useState(false);
  const [timestamp, setTimestamp] = useState("");

  const handlePay = () => {
    if (!amount) return;

    const now = new Date();
    const formatted = now.toLocaleString("de-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    setTimestamp(formatted);
    setStatus("success");
  };

  const handleClose = () => {
    setStatus("idle");
    setAmount("");
    setShow(false);
  };

  useEffect(() => {
    if (status === "success") {
      setTimeout(() => setShow(true), 50);
    }
  }, [status]);

  return (
    <div style={styles.container}>
      {status === "idle" && (
        <div style={styles.screen}>
          <input
            type="text"
            placeholder="Empfänger"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="CHF 0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.inputAmount}
          />
          <button style={styles.button} onClick={handlePay}>
            Bezahlen
          </button>
        </div>
      )}

      {status === "success" && (
        <div style={styles.successScreen}>
          
          <div
            style={{
              ...styles.hexOuter,
              transform: show ? "scale(1)" : "scale(0.8)",
              opacity: show ? 1 : 0
            }}
          >
            <div style={styles.hexInner}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  width: 58,
                  height: 58,
                  strokeDasharray: 30,
                  strokeDashoffset: show ? 0 : 30,
                  transition: "stroke-dashoffset 0.5s ease 0.25s"
                }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <div style={{ ...styles.successText, opacity: show ? 1 : 0 }}>
            Zahlung erfolgreich
          </div>

          <div style={{ ...styles.timestamp, opacity: show ? 1 : 0 }}>
            {timestamp}
          </div>

          <div
            style={{
              ...styles.card,
              transform: show ? "translateY(0)" : "translateY(20px)",
              opacity: show ? 1 : 0
            }}
          >
            <div style={styles.amount}>
              CHF {parseFloat(amount || 0).toFixed(2)}
            </div>
            <div style={styles.divider}></div>
            <div style={styles.recipientLabel}>An</div>
            <div style={styles.recipient}>{recipient}</div>
          </div>

          {/* SCHLIESSEN BUTTON FIXIERT UNTEN */}
          <button style={styles.closeButton} onClick={handleClose}>
            Schliessen
          </button>

        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    background: "#f2f2f2"
  },
  screen: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 18
  },
  input: {
    width: "85%",
    padding: 14,
    fontSize: 16,
    borderRadius: 12,
    border: "1px solid #ddd",
    textAlign: "center"
  },
  inputAmount: {
    width: "85%",
    padding: 18,
    fontSize: 26,
    fontWeight: 600,
    borderRadius: 14,
    border: "1px solid #ddd",
    textAlign: "center"
  },
  button: {
    width: "85%",
    padding: 16,
    fontSize: 17,
    borderRadius: 14,
    border: "none",
    background: "black",
    color: "white"
  },
  successScreen: {
    position: "fixed",
    inset: 0,
    background: "linear-gradient(180deg, #24b35a 0%, #128a40 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 100
  },
  hexOuter: {
    width: 140,
    height: 140,
    background: "rgba(255,255,255,0.15)",
    clipPath:
      "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.4s cubic-bezier(.22,.61,.36,1)"
  },
  hexInner: {
    width: 110,
    height: 110,
    background: "rgba(255,255,255,0.25)",
    clipPath:
      "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  successText: {
    marginTop: 20,
    color: "white",
    fontSize: 18,
    fontWeight: 600
  },
  timestamp: {
    marginTop: 6,
    color: "rgba(255,255,255,0.85)",
    fontSize: 14
  },
  card: {
    marginTop: 28,
    background: "white",
    borderRadius: 22,
    padding: "26px 30px",
    minWidth: "280px",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
    transition: "all 0.4s ease"
  },
  amount: {
    fontSize: 28,
    fontWeight: 700,
    color: "#111"
  },
  divider: {
    height: 1,
    background: "#eee",
    margin: "16px 0"
  },
  recipientLabel: {
    fontSize: 13,
    color: "#888"
  },
  recipient: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: 500,
    color: "#222"
  },
  closeButton: {
    position: "absolute",
    bottom: 30,
    width: "85%",
    padding: 16,
    borderRadius: 16,
    border: "none",
    background: "rgba(255,255,255,0.9)",
    fontSize: 16,
    fontWeight: 600
  }
};