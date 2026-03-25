import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  .brand-badge {
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.2);
    color: var(--white);
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
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
    margin-bottom: 32px;
    position: relative; z-index: 1;
  }

  .left-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.18);
    padding: 9px 16px;
    border-radius: 50px;
    position: relative; z-index: 1;
    width: fit-content;
  }

  .left-pill-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #22c55e;
    flex-shrink: 0;
  }

  .left-pill span {
    font-size: 12.5px;
    color: rgba(255,255,255,0.85);
    font-weight: 500;
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

  .form-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(20px, 2.2vw, 30px);
    font-weight: 800;
    color: var(--text-dark);
    letter-spacing: -0.8px;
    margin-bottom: 6px;
  }

  .form-subtitle {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 32px;
    line-height: 1.5;
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

  .input-wrap { position: relative; }
  .input-wrap input { padding-right: 44px; }

  .eye-btn {
    position: absolute;
    right: 13px; top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    padding: 0;
    transition: color 0.2s;
  }

  .eye-btn:hover { color: var(--purple-bright); }

  .forgot-link {
    text-align: right;
    font-size: 12.5px;
    margin-top: -8px;
  }

  .forgot-link a {
    color: var(--purple-bright);
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
  }

  .forgot-link a:hover { text-decoration: underline; }

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

  .submit-btn .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transform: scale(0);
    animation: ripple 0.55s linear;
    pointer-events: none;
  }

  @keyframes ripple { to { transform: scale(4); opacity: 0; } }

  .signup-row {
    text-align: center;
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 12px;
  }

  .signup-row a {
    color: var(--purple-bright);
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
  }

  .signup-row a:hover { text-decoration: underline; }

  @media (max-width: 860px) {
    .page { flex-direction: column; height: auto; overflow: visible; }
    .left-panel { width: 100%; padding: 40px 28px; min-height: auto; }
    .right-panel { padding: 40px 24px; height: auto; justify-content: flex-start; }
  }
`;

const EyeIcon = ({ open }) => open ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function CreatorSignIn({ onForgotPassword, onSignUp }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    return e;
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
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    createRipple(e);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard2');
    }, 1200);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">

        <div className="left-panel">
          <div className="brand-row">
            <span className="brand-name">vynder</span>
            <span className="brand-badge">Creators</span>
          </div>
          <h1 className="left-headline">Good to have you back.</h1>
          <p className="left-sub">
            Opportunities don't wait. Log in and pick up where you left off.
          </p>
          <div className="left-pill">
            <div className="left-pill-dot" />
            <span>AI matches waiting for you</span>
          </div>
        </div>

        <div className="right-panel">
          <div className="back-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to home
          </div>

          <h2 className="form-title">Sign In</h2>
          <p className="form-subtitle">Welcome back to Vynder</p>

          <div className="form">
            <div className="field">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-msg">⚠ {errors.email}</span>}
            </div>

            <div className="field">
              <label>Password</label>
              <div className="input-wrap">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                />
                <button className="eye-btn" type="button" onClick={() => setShowPassword(!showPassword)}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && <span className="error-msg">⚠ {errors.password}</span>}
            </div>

            <div className="forgot-link">
              <a onClick={onForgotPassword}>Forgot Password</a>
            </div>

            <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="signup-row">
              Don't have an account? <a onClick={onSignUp}>Create one</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}