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
    --bg: #f5f6fa;
    --white: #ffffff;
    --radius: 12px;
    --radius-sm: 8px;
    --red: #ef4444;
  }

  .page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    padding: 24px 16px;
  }

  .card {
    background: var(--white);
    border-radius: 20px;
    padding: 40px 40px 36px;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 4px 32px rgba(60, 26, 138, 0.08);
  }

  .shield-wrap {
    width: 60px; height: 60px;
    border-radius: 16px;
    background: #ede9fe;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: var(--text-dark);
    letter-spacing: -0.6px;
    margin-bottom: 10px;
  }

  .card-sub {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.65;
    margin-bottom: 28px;
    max-width: 380px;
  }

  .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 8px; }

  label {
    font-size: 12.5px;
    font-weight: 500;
    color: var(--text-dark);
  }

  .input-wrap { position: relative; }

  input {
    height: 48px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    background: #f9fafb;
    padding: 0 44px 0 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: var(--text-dark);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    letter-spacing: 2px;
    width: 100%;
  }

  input::placeholder {
    color: #adb5bd;
    font-weight: 400;
    letter-spacing: 0;
  }

  input:focus {
    border-color: var(--purple-bright);
    box-shadow: 0 0 0 3px rgba(108, 60, 225, 0.12);
    background: #fff;
  }

  input.error {
    border-color: var(--red);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .input-icon {
    position: absolute;
    right: 14px; top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    pointer-events: none;
  }

  .char-count {
    font-size: 11.5px;
    color: var(--text-muted);
    text-align: right;
    margin-top: 4px;
  }

  .char-count.max { color: var(--purple-bright); font-weight: 600; }

  .error-msg {
    font-size: 11.5px;
    color: var(--red);
    margin-top: 2px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* SECURITY NOTICE */
  .security-notice {
    display: flex;
    gap: 12px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: var(--radius-sm);
    padding: 14px 16px;
    margin: 20px 0 28px;
  }

  .security-notice-icon {
    flex-shrink: 0;
    margin-top: 1px;
  }

  .security-notice p {
    font-size: 12.5px;
    color: #166534;
    line-height: 1.6;
  }

  .submit-btn {
    width: 100%;
    height: 48px;
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

  /* SUCCESS */
  .success-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
    animation: fadeUp 0.4s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .success-icon-wrap {
    width: 68px; height: 68px;
    border-radius: 50%;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
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
    max-width: 320px;
    margin-bottom: 12px;
  }

  .continue-btn {
    width: 100%;
    height: 46px;
    background: var(--purple-btn);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 8px;
  }

  .continue-btn:hover { background: #6a40e0; }

  /* LOADING DOTS */
  .loading-dots {
    display: inline-flex;
    gap: 4px;
    align-items: center;
  }

  .loading-dots span {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #fff;
    animation: dot-pulse 1.2s infinite;
  }

  .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes dot-pulse {
    0%, 80%, 100% { opacity: 0.3; transform: scale(0.85); }
    40% { opacity: 1; transform: scale(1); }
  }

  @media (max-width: 540px) {
    .card { padding: 28px 20px 24px; }
  }
`;

export default function BVNVerification({ onContinue }) {
  const [bvn, setBvn] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 11);
    setBvn(val);
    if (error) setError("");
  };

  const validate = () => {
    if (!bvn) return "BVN is required";
    if (bvn.length !== 11) return "BVN must be exactly 11 digits";
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
    setTimeout(() => { setLoading(false); setVerified(true); }, 1500);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="card">

          {!verified ? (
            <>
              <div className="shield-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7b4ff0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>

              <h2 className="card-title">Verify Your Identity</h2>
              <p className="card-sub">
                Enter your Bank Verification Number (BVN) to verify your identity and secure your account.
              </p>

              <div className="field">
                <label>BVN (11 digits)</label>
                <div className="input-wrap">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 12345678910"
                    value={bvn}
                    onChange={handleChange}
                    className={error ? "error" : ""}
                  />
                  <div className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                  </div>
                </div>
                <div className={`char-count ${bvn.length === 11 ? "max" : ""}`}>
                  {bvn.length}/11 digits{bvn.length === 11 ? " ✓" : ""}
                </div>
                {error && <span className="error-msg">⚠ {error}</span>}
              </div>

              <div className="security-notice">
                <div className="security-notice-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <p>
                  Your BVN is securely encrypted and used solely for identity verification. We do not store or share your banking details.
                </p>
              </div>

              <button className="submit-btn" onClick={handleSubmit} disabled={loading || bvn.length !== 11}>
                {loading ? (
                  <span className="loading-dots">
                    <span /><span /><span />
                  </span>
                ) : "Continue"}
              </button>
            </>
          ) : (
            <div className="success-state">
              <div className="success-icon-wrap">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="success-title">Identity Verified!</h2>
              <p className="success-sub">
                Your BVN has been verified successfully. Your account is now secure and ready to use.
              </p>
              <button className="continue-btn" onClick={onContinue}>
                Continue to Dashboard
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
