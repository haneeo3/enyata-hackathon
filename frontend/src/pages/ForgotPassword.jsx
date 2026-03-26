import { useState } from "react";

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

  .brand-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 36px;
    position: relative; z-index: 1;
  }

  .brand-name {
    font-family: 'Syne', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--white);
    letter-spacing: -0.5px;
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
    color: var(--white);
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
    font-size: clamp(20px, 2.2vw, 30px);
    font-weight: 800;
    color: var(--text-dark);
    letter-spacing: -0.8px;
    margin-bottom: 8px;
  }

  .form-subtitle {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 32px;
    line-height: 1.6;
    max-width: 360px;
  }

  .form { display: flex; flex-direction: column; gap: 16px; }

  .field { display: flex; flex-direction: column; gap: 5px; }

  label {
    font-size: 12.5px;
    font-weight: 500;
    color: var(--text-dark);
  }

  input {
    height: 44px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--input-bg);
    padding: 0 13px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: var(--text-dark);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }

  input::placeholder { color: #adb5bd; }

  input:focus {
    border-color: var(--purple-bright);
    box-shadow: 0 0 0 3px rgba(108, 60, 225, 0.12);
  }

  input.error {
    border-color: var(--red);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .error-msg {
    font-size: 11.5px;
    color: var(--red);
    margin-top: 1px;
  }

  .submit-btn {
    height: 46px;
    background: var(--purple-btn);
    color: var(--white);
    border: none;
    border-radius: var(--radius);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    margin-top: 4px;
  }

  .submit-btn:hover {
    background: #6a40e0;
    box-shadow: 0 6px 24px rgba(108, 60, 225, 0.35);
  }

  .submit-btn:active { transform: scale(0.977); }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .submit-btn .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transform: scale(0);
    animation: ripple 0.55s linear;
    pointer-events: none;
  }

  @keyframes ripple { to { transform: scale(4); opacity: 0; } }

  /* SUCCESS STATE */
  .success-state {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    animation: fadeUp 0.4s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .success-icon-wrap {
    width: 56px; height: 56px;
    border-radius: 16px;
    background: #dcfce7;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }

  .success-title {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: var(--text-dark);
    letter-spacing: -0.5px;
  }

  .success-sub {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.6;
    max-width: 340px;
    margin-bottom: 8px;
  }

  .back-to-login-btn {
    height: 44px;
    background: var(--white);
    color: var(--purple-bright);
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    padding: 0 24px;
    transition: border-color 0.2s, background 0.2s;
  }

  .back-to-login-btn:hover { border-color: var(--purple-bright); background: #f5f0ff; }

  @media (max-width: 860px) {
    .page { flex-direction: column; height: auto; overflow: visible; }
    .left-panel { width: 100%; padding: 40px 28px; min-height: auto; }
    .right-panel { padding: 40px 24px; height: auto; justify-content: flex-start; }
  }
`;

export default function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    if (!email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address";
    return "";
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
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    createRipple(e);
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">

        <div className="left-panel">
          <div className="brand-row">
            <span className="brand-name">vynder</span>
          </div>

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
          <div className="back-link" onClick={onBackToLogin}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Login
          </div>

          {!sent ? (
            <>
              <div className="form-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7b4ff0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>

              <h2 className="form-title">Forgot Password</h2>
              <p className="form-subtitle">
                Welcome back to Vynder<br />
                Enter the email linked to your account
              </p>

              <div className="form">
                <div className="field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                    className={error ? "error" : ""}
                  />
                  {error && <span className="error-msg">⚠ {error}</span>}
                </div>

                <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </div>
            </>
          ) : (
            <div className="success-state">
              <div className="success-icon-wrap">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="success-title">OTP Sent!</h2>
              <p className="success-sub">
                We've sent a one-time password to <strong>{email}</strong>. Check your inbox and follow the link to reset your password.
              </p>
              <button className="back-to-login-btn" onClick={onBackToLogin}>
                Back to Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
