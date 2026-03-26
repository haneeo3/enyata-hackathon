import { useState, useRef } from "react";

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

  .left-cta {
    display: inline-flex;
    align-items: center;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.25);
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    padding: 11px 22px;
    border-radius: 50px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    position: relative; z-index: 1;
    width: fit-content;
    user-select: none;
  }

  .left-cta:hover { background: rgba(255,255,255,0.2); }
  .left-cta:active { transform: scale(0.96); }

  .right-panel {
    flex: 1;
    background: var(--bg-form);
    display: flex;
    flex-direction: column;
    padding: 28px 52px 24px;
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
    margin-bottom: 18px;
    transition: color 0.2s;
    user-select: none;
    width: fit-content;
  }

  .back-link:hover { color: var(--text-dark); }

  .stepper {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 14px;
  }

  .step-pill {
    width: 28px; height: 9px;
    border-radius: 10px;
    background: var(--purple-bright);
  }

  .step-pill.done { background: #22c55e; }

  .form-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(20px, 2.2vw, 30px);
    font-weight: 800;
    color: var(--text-dark);
    letter-spacing: -0.8px;
    margin-bottom: 4px;
  }

  .form-step-label {
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 20px;
  }

  .form { display: flex; flex-direction: column; gap: 14px; }

  .field { display: flex; flex-direction: column; gap: 5px; }

  label {
    font-size: 12.5px;
    font-weight: 500;
    color: var(--text-dark);
  }

  label span { color: var(--text-muted); font-weight: 400; }

  input, select, textarea {
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--input-bg);
    padding: 0 13px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: var(--text-dark);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
  }

  input, select { height: 42px; }

  textarea {
    height: 80px;
    padding: 10px 13px;
    resize: none;
    line-height: 1.5;
  }

  input::placeholder, textarea::placeholder { color: #adb5bd; }

  input:focus, select:focus, textarea:focus {
    border-color: var(--purple-bright);
    box-shadow: 0 0 0 3px rgba(108, 60, 225, 0.12);
  }

  input.error, select.error, textarea.error {
    border-color: var(--red);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .error-msg {
    font-size: 11.5px;
    color: var(--red);
    margin-top: 1px;
  }

  .select-wrap { position: relative; }
  .select-wrap select { cursor: pointer; padding-right: 36px; }
  .select-arrow {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--text-muted);
  }

  /* PHOTO UPLOAD */
  .photo-upload {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .photo-preview {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #e9e4fa;
    border: 2px dashed #c4b5fd;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .photo-preview:hover { border-color: var(--purple-bright); }

  .photo-preview img {
    width: 100%; height: 100%;
    object-fit: cover;
  }

  .photo-upload-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .photo-upload-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--white);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 8px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12.5px;
    font-weight: 500;
    color: var(--text-dark);
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    width: fit-content;
  }

  .photo-upload-btn:hover { border-color: var(--purple-bright); background: #f5f0ff; }

  .photo-hint {
    font-size: 11px;
    color: var(--text-muted);
  }

  /* RATE INPUT */
  .rate-wrap { position: relative; }
  .rate-prefix {
    position: absolute;
    left: 13px; top: 50%;
    transform: translateY(-50%);
    font-size: 13px;
    color: var(--text-muted);
    font-weight: 500;
    pointer-events: none;
  }
  .rate-wrap input { padding-left: 30px; }

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

  .signin-row {
    text-align: center;
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 10px;
    padding-bottom: 4px;
  }

  .signin-row a {
    color: var(--purple-bright);
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
  }

  .signin-row a:hover { text-decoration: underline; }

  @media (max-width: 860px) {
    .page { flex-direction: column; height: auto; overflow: visible; }
    .left-panel { width: 100%; padding: 40px 28px; min-height: auto; }
    .right-panel { padding: 28px 24px; height: auto; }
  }
`;

const CATEGORIES = [
  "Videographer", "Photographer", "Graphic Designer", "Copywriter",
  "Social Media Manager", "Animator", "Brand Strategist", "Podcast Host",
  "Content Writer", "Illustrator", "Motion Designer", "Other",
];

export default function CreatorSignupStepTwo({ onNext }) {
  const [form, setForm] = useState({
    category: "",
    bio: "",
    rate: "",
    portfolio: "",
  });
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const fileRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const validate = () => {
    const e = {};
    if (!form.category) e.category = "Please select a category";
    if (!form.bio.trim()) e.bio = "Short bio is required";
    if (!form.rate.trim()) e.rate = "Please enter your starting rate";
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
    setTimeout(() => onNext && onNext(), 300);
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
          <h1 className="left-headline">Start getting matched today.</h1>
          <p className="left-sub">
            Join thousands of creators and businesses already using Vynder to find the right fit.
          </p>
          <button className="left-cta">Free to join</button>
        </div>

        <div className="right-panel">
          <div className="back-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to home
          </div>

          <div className="stepper">
            <div className="step-pill done" />
            <div className="step-pill" />
          </div>

          <h2 className="form-title">Create Account</h2>
          <p className="form-step-label">Step 2 of 2 — Your Profile</p>

          <div className="form">

            <div className="field">
              <label>Category</label>
              <div className="select-wrap">
                <select name="category" value={form.category} onChange={handleChange} className={errors.category ? "error" : ""}>
                  <option value="" disabled>Select your creator type</option>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <svg className="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.category && <span className="error-msg">⚠ {errors.category}</span>}
            </div>

            <div className="field">
              <label>Upload profile photo <span>(optional)</span></label>
              <div className="photo-upload">
                <div className="photo-preview" onClick={() => fileRef.current.click()}>
                  {photo ? (
                    <img src={photo} alt="preview" />
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  )}
                </div>
                <div className="photo-upload-info">
                  <button className="photo-upload-btn" type="button" onClick={() => fileRef.current.click()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    Choose photo
                  </button>
                  <span className="photo-hint">PNG or JPG, max 2MB</span>
                </div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
            </div>

            <div className="field">
              <label>Short Bio</label>
              <textarea
                name="bio"
                placeholder="e.g. Lagos-based videographer, 4yrs experience"
                value={form.bio}
                onChange={handleChange}
                className={errors.bio ? "error" : ""}
              />
              {errors.bio && <span className="error-msg">⚠ {errors.bio}</span>}
            </div>

            <div className="field">
              <label>Starting Rate (per project)</label>
              <div className="rate-wrap">
                <span className="rate-prefix">₦</span>
                <input
                  name="rate"
                  placeholder="e.g. 150,000"
                  value={form.rate}
                  onChange={handleChange}
                  className={errors.rate ? "error" : ""}
                />
              </div>
              {errors.rate && <span className="error-msg">⚠ {errors.rate}</span>}
            </div>

            <div className="field">
              <label>Portfolio Link <span>(optional)</span></label>
              <input
                name="portfolio"
                placeholder="https://"
                value={form.portfolio}
                onChange={handleChange}
              />
            </div>

            <button className="submit-btn" onClick={handleSubmit}>
              Finish Setup
            </button>

            <p className="signin-row">
              Already have an account? <a href="#">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
