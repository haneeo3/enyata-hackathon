import { useState, useRef, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --purple-bright: #6c3ce1;
    --purple-btn: #7b4ff0;
    --text-dark: #111118;
    --text-muted: #6b7280;
    --border: #e2e4ea;
    --bg-form: #f5f6fa;
    --white: #ffffff;
    --input-bg: #ffffff;
    --radius: 12px;
    --radius-sm: 8px;
    --red: #ef4444;
  }

  .page {
    display: flex;
    height: 100vh;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .left-panel {
    width: 42%;
    background: linear-gradient(145deg, #2a0f7a 0%, #4e22c4 50%, #3a1a8a 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 44px;
    flex-shrink: 0;
  }

  .left-panel::before {
    content: '';
    position: absolute;
    width: 380px; height: 380px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    top: -80px; right: -100px;
  }

  .left-panel::after {
    content: '';
    position: absolute;
    width: 260px; height: 260px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
    bottom: -60px; left: -80px;
  }

  .brand-name {
    font-family: 'Syne', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.5px;
    margin-bottom: 36px;
    position: relative; z-index: 1;
  }

  .lock-icon-wrap {
    width: 72px; height: 72px;
    border-radius: 20px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 28px;
    position: relative; z-index: 1;
  }

  .left-headline {
    font-family: 'Syne', sans-serif;
    font-size: clamp(26px, 2.8vw, 40px);
    font-weight: 800;
    color: #fff;
    line-height: 1.15;
    letter-spacing: -1px;
    margin-bottom: 16px;
    position: relative; z-index: 1;
  }

  .left-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.72);
    line-height: 1.65;
    max-width: 320px;
    position: relative; z-index: 1;
  }

  .right-panel {
    flex: 1;
    background: var(--bg-form);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 52px;
    overflow-y: auto;
    height: 100vh;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--text-muted);
    cursor: pointer;
    margin-bottom: 40px;
    transition: color 0.2s;
    user-select: none;
    width: fit-content;
  }

  .back-link:hover { color: var(--text-dark); }

  .form-icon {
    width: 56px; height: 56px;
    border-radius: 16px;
    background: #ede9fe;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .form-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(20px, 2.2vw, 28px);
    font-weight: 800;
    color: var(--text-dark);
    letter-spacing: -0.8px;
    margin-bottom: 8px;
  }

  .form-subtitle {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 36px;
    line-height: 1.6;
  }

  /* OTP BOXES */
  .otp-row {
    display: flex;
    gap: 14px;
    margin-bottom: 8px;
  }

  .otp-box {
    width: 64px;
    height: 64px;
    border: 2px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--input-bg);
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--text-dark);
    text-align: center;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    caret-color: var(--purple-bright);
  }

  .otp-box:focus {
    border-color: var(--purple-bright);
    box-shadow: 0 0 0 3px rgba(108, 60, 225, 0.14);
  }

  .otp-box.filled {
    border-color: var(--purple-bright);
    background: #f5f0ff;
  }

  .otp-box.error-box {
    border-color: var(--red);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .error-msg {
    font-size: 11.5px;
    color: var(--red);
    margin-bottom: 16px;
  }

  .resend-row {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 28px;
    margin-top: 8px;
  }

  .resend-btn {
    background: none;
    border: none;
    color: var(--purple-bright);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    transition: opacity 0.2s;
  }

  .resend-btn:disabled { opacity: 0.45; cursor: default; }

  .countdown {
    color: var(--text-muted);
    font-size: 13px;
  }

  .submit-btn {
    height: 46px;
    background: var(--purple-btn);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    width: 100%;
    max-width: 320px;
  }

  .submit-btn:hover {
    background: #6a40e0;
    box-shadow: 0 6px 24px rgba(108, 60, 225, 0.35);
  }

  .submit-btn:active { transform: scale(0.977); }

  .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .submit-btn .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transform: scale(0);
    animation: ripple 0.55s linear;
    pointer-events: none;
  }

  @keyframes ripple { to { transform: scale(4); opacity: 0; } }

  @media (max-width: 860px) {
    .page { flex-direction: column; height: auto; overflow: visible; }
    .left-panel { width: 100%; padding: 40px 28px; min-height: auto; }
    .right-panel { padding: 40px 24px; height: auto; justify-content: flex-start; }
    .otp-box { width: 52px; height: 52px; font-size: 22px; }
  }
`;

export default function EnterOTP({ onVerify, onBack }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    setError("");
    if (val && i < 3) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length === 4) {
      setOtp(pasted.split(""));
      inputs.current[3]?.focus();
    }
    e.preventDefault();
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setError("");
    setCountdown(30);
    setCanResend(false);
    inputs.current[0]?.focus();
  };

  const createRipple = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");
    const existing = btn.querySelector(".ripple");
    if (existing) existing.remove();
    btn.appendChild(circle);
  };

  const handleSubmit = (e) => {
    const code = otp.join("");
    if (code.length < 4) { setError("Please enter the 4-digit code"); return; }
    setError("");
    createRipple(e);
    setTimeout(() => onVerify && onVerify(), 300);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">

        <div className="left-panel">
          <div className="brand-name">vynder</div>

          <div className="lock-icon-wrap">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>

          <h1 className="left-headline">No worries, we've got you.</h1>
          <p className="left-sub">
            Enter your email and we'll send you an OTP to reset your password in seconds.
          </p>
        </div>

        <div className="right-panel">
          <div className="back-link" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Login
          </div>

          <div className="form-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7b4ff0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>

          <h2 className="form-title">Enter OTP</h2>
          <p className="form-subtitle">We sent a 4-digit code to your email</p>

          <div className="otp-row" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => inputs.current[i] = el}
                className={`otp-box${digit ? " filled" : ""}${error ? " error-box" : ""}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
              />
            ))}
          </div>

          {error && <p className="error-msg">⚠ {error}</p>}

          <div className="resend-row">
            Didn't get it?{" "}
            {canResend ? (
              <button className="resend-btn" onClick={handleResend}>Resend OTP</button>
            ) : (
              <span className="countdown">Resend in {countdown}s</span>
            )}
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={otp.join("").length < 4}
          >
            Verify OTP
          </button>
        </div>
      </div>
    </>
  );
}
