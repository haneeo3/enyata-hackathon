import { useState, } from "react";
import CreatorSignupStepOne from "./CreatorSignupStepOne";
import CreatorSignupStepTwo from "./CreatorSignupStepTwo";
import BusinessSignupStepOne from "./BusinessSignupStepOne";
import BusinessSignup from "./BusinessSignup"; // step 2
import CreatorSignIn from "./CreatorSignIn";
import ForgotPassword from "./ForgotPassword";
import EnterOTP from "./EnterOTP";
import ResetPassword from "./ResetPassword";

/*
  Screens:
  "landing"
  "creator-signup-1" | "creator-signup-2"
  "business-signup-1" | "business-signup-2"
  "creator-signin" | "forgot" | "otp" | "reset"
  "business-signin"   → just navigates to Dashboard externally via onDashboard prop
*/

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --purple: #5b21b6;
    --purple-bright: #7c3aed;
    --purple-mid: #8b5cf6;
    --purple-light: #a78bfa;
    --purple-soft: #ede9fe;
    --purple-softer: #f5f3ff;
    --text: #0f0a1e;
    --text-muted: #6b6889;
    --border: #e5e1f0;
    --white: #ffffff;
    --off-white: #faf9ff;
    --radius: 16px;
  }

  .vl-page {
    font-family: 'DM Sans', sans-serif;
    background: var(--white);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ---- NAV ---- */
  .vl-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 56px;
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(91,33,182,0.07);
    transition: all 0.3s;
  }

  .vl-nav-logo {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 900;
    color: var(--purple);
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .vl-nav-logo-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--purple-mid);
    animation: pulse-dot 2s infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.6; }
  }

  .vl-nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .vl-nav-signin {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-muted);
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 50px;
    transition: color 0.2s, background 0.2s;
  }

  .vl-nav-signin:hover { color: var(--purple); background: var(--purple-soft); }

  .vl-nav-cta {
    font-size: 14px;
    font-weight: 600;
    color: var(--white);
    background: var(--purple-bright);
    border: none;
    cursor: pointer;
    padding: 10px 22px;
    border-radius: 50px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(124,58,237,0.3);
  }

  .vl-nav-cta:hover {
    background: var(--purple);
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(124,58,237,0.4);
  }

  /* ---- HERO ---- */
  .vl-hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 120px 24px 80px;
    position: relative;
    overflow: hidden;
  }

  .vl-hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .vl-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.12;
  }

  .vl-blob-1 {
    width: 700px; height: 700px;
    background: radial-gradient(circle, #7c3aed, #5b21b6);
    top: -200px; right: -200px;
  }

  .vl-blob-2 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #a78bfa, #8b5cf6);
    bottom: -100px; left: -150px;
  }

  .vl-blob-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, #c4b5fd, #ddd6fe);
    top: 40%; left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.08;
  }

  /* grid overlay */
  .vl-hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(91,33,182,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(91,33,182,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .vl-hero-content {
    position: relative;
    z-index: 1;
    max-width: 820px;
  }

  .vl-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--white);
    border: 1px solid var(--border);
    color: var(--purple);
    font-size: 12px;
    font-weight: 600;
    padding: 7px 18px;
    border-radius: 50px;
    margin-bottom: 32px;
    box-shadow: 0 2px 12px rgba(91,33,182,0.08);
    letter-spacing: 0.2px;
  }

  .vl-badge-blink {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--purple-mid);
    animation: pulse-dot 2s infinite;
  }

  .vl-h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(40px, 7vw, 80px);
    font-weight: 900;
    line-height: 1.02;
    letter-spacing: -2.5px;
    color: var(--text);
    margin-bottom: 22px;
  }

  .vl-h1 em {
    color: var(--purple-bright);
    font-style: italic;
    position: relative;
  }

  .vl-h1 em::after {
    content: '';
    position: absolute;
    bottom: 4px; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--purple-bright), var(--purple-light));
    border-radius: 2px;
    opacity: 0.4;
  }

  .vl-sub {
    font-size: 17px;
    color: var(--text-muted);
    line-height: 1.7;
    max-width: 500px;
    margin: 0 auto 48px;
  }

  .vl-hero-btns {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 64px;
  }

  .vl-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--purple-bright);
    color: var(--white);
    border: none;
    padding: 15px 32px;
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 6px 24px rgba(124,58,237,0.35);
  }

  .vl-btn-primary:hover {
    background: var(--purple);
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(124,58,237,0.45);
  }

  .vl-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: var(--purple);
    border: 1.5px solid rgba(91,33,182,0.25);
    padding: 14px 30px;
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .vl-btn-ghost:hover {
    background: var(--purple-soft);
    border-color: var(--purple);
    transform: translateY(-1px);
  }

  /* ---- PROOF ROW ---- */
  .vl-proof {
    display: flex;
    gap: 0;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  .vl-proof-item {
    padding: 0 32px;
    text-align: center;
    position: relative;
  }

  .vl-proof-item + .vl-proof-item::before {
    content: '';
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 1px;
    background: var(--border);
  }

  .vl-proof-num {
    font-family: 'Syne', sans-serif;
    font-size: 32px;
    font-weight: 900;
    color: var(--purple-bright);
    letter-spacing: -1px;
  }

  .vl-proof-label {
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 3px;
    font-weight: 500;
  }

  /* ---- FEATURES ---- */
  .vl-features {
    padding: 100px 56px;
    background: var(--off-white);
    position: relative;
    overflow: hidden;
  }

  .vl-features-inner {
    max-width: 1080px;
    margin: 0 auto;
  }

  .vl-section-eyebrow {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--purple-mid);
    margin-bottom: 14px;
  }

  .vl-section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 900;
    letter-spacing: -1.5px;
    color: var(--text);
    margin-bottom: 56px;
    max-width: 520px;
    line-height: 1.1;
  }

  .vl-features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .vl-feat-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
  }

  .vl-feat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--purple-bright), var(--purple-light));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s;
  }

  .vl-feat-card:hover::before { transform: scaleX(1); }
  .vl-feat-card:hover { border-color: rgba(124,58,237,0.2); box-shadow: 0 8px 32px rgba(91,33,182,0.1); transform: translateY(-4px); }

  .vl-feat-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: var(--purple-soft);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
  }

  .vl-feat-title {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--text);
  }

  .vl-feat-desc {
    font-size: 13.5px;
    color: var(--text-muted);
    line-height: 1.7;
  }

  /* ---- CHOOSE SECTION ---- */
  .vl-choose {
    padding: 100px 56px;
    text-align: center;
    position: relative;
  }

  .vl-choose-inner {
    max-width: 800px;
    margin: 0 auto;
  }

  .vl-choose-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 900;
    letter-spacing: -1.5px;
    margin-bottom: 12px;
  }

  .vl-choose-sub {
    font-size: 16px;
    color: var(--text-muted);
    margin-bottom: 52px;
    line-height: 1.6;
  }

  .vl-account-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    text-align: left;
  }

  .vl-account-card {
    background: var(--white);
    border: 2px solid var(--border);
    border-radius: 20px;
    padding: 36px;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
  }

  .vl-account-card:hover {
    border-color: var(--purple-light);
    box-shadow: 0 12px 48px rgba(91,33,182,0.12);
    transform: translateY(-4px);
  }

  .vl-account-card-accent {
    position: absolute;
    top: 0; right: 0;
    width: 120px; height: 120px;
    border-radius: 0 20px 0 100%;
    opacity: 0.06;
  }

  .vl-account-card.business .vl-account-card-accent { background: var(--purple-bright); }
  .vl-account-card.creator .vl-account-card-accent { background: #059669; }

  .vl-account-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 16px;
  }

  .vl-account-card.business .vl-account-tag { background: var(--purple-soft); color: var(--purple); }
  .vl-account-card.creator .vl-account-tag { background: #D1FAE5; color: #065F46; }

  .vl-account-title {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 900;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
  }

  .vl-account-desc {
    font-size: 13.5px;
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 28px;
  }

  .vl-account-perks {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 28px;
  }

  .vl-account-perk {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
  }

  .vl-perk-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .business .vl-perk-dot { background: var(--purple-mid); }
  .creator .vl-perk-dot { background: #34d399; }

  .vl-card-btns {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .vl-card-btn-primary {
    width: 100%;
    padding: 13px;
    border: none;
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .business .vl-card-btn-primary {
    background: var(--purple-bright);
    color: var(--white);
    box-shadow: 0 4px 16px rgba(124,58,237,0.3);
  }

  .business .vl-card-btn-primary:hover { background: var(--purple); transform: translateY(-1px); }

  .creator .vl-card-btn-primary {
    background: #059669;
    color: var(--white);
    box-shadow: 0 4px 16px rgba(5,150,105,0.3);
  }

  .creator .vl-card-btn-primary:hover { background: #047857; transform: translateY(-1px); }

  .vl-card-btn-ghost {
    width: 100%;
    padding: 12px;
    background: transparent;
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .business .vl-card-btn-ghost {
    color: var(--purple);
    border: 1.5px solid rgba(91,33,182,0.2);
  }

  .business .vl-card-btn-ghost:hover { background: var(--purple-soft); border-color: var(--purple); }

  .creator .vl-card-btn-ghost {
    color: #059669;
    border: 1.5px solid rgba(5,150,105,0.2);
  }

  .creator .vl-card-btn-ghost:hover { background: #D1FAE5; border-color: #059669; }

  /* ---- FOOTER ---- */
  .vl-footer {
    padding: 36px 56px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--off-white);
  }

  .vl-footer-logo {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 900;
    color: var(--purple);
  }

  .vl-footer-copy {
    font-size: 13px;
    color: var(--text-muted);
  }

  /* ---- BUSINESS SIGNIN (inline, no split panel) ---- */
  .biz-signin-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 10, 30, 0.6);
    backdrop-filter: blur(8px);
    z-index: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .biz-signin-card {
    background: var(--white);
    border-radius: 20px;
    padding: 44px 40px;
    width: 100%;
    max-width: 440px;
    box-shadow: 0 24px 80px rgba(91,33,182,0.2);
    animation: slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
    position: relative;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .biz-close {
    position: absolute;
    top: 16px; right: 18px;
    background: none;
    border: none;
    font-size: 22px;
    cursor: pointer;
    color: var(--text-muted);
    line-height: 1;
    transition: color 0.2s;
  }

  .biz-close:hover { color: var(--text); }

  .biz-signin-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
  }

  .biz-signin-logo-name {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 900;
    color: var(--purple);
  }

  .biz-signin-logo-badge {
    background: var(--purple-soft);
    color: var(--purple);
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
  }

  .biz-signin-title {
    font-family: 'Syne', sans-serif;
    font-size: 24px;
    font-weight: 900;
    color: var(--text);
    letter-spacing: -0.8px;
    margin-bottom: 6px;
  }

  .biz-signin-sub {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 28px;
  }

  .biz-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 16px;
  }

  .biz-label {
    font-size: 12.5px;
    font-weight: 500;
    color: var(--text);
  }

  .biz-input {
    height: 44px;
    border: 1.5px solid #e5e1f0;
    border-radius: 9px;
    background: #faf9ff;
    padding: 0 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }

  .biz-input:focus {
    border-color: var(--purple-bright);
    box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
    background: var(--white);
  }

  .biz-input.error { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.1); }

  .biz-input-wrap { position: relative; }
  .biz-input-wrap .biz-input { padding-right: 44px; }

  .biz-eye {
    position: absolute;
    right: 13px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none;
    cursor: pointer;
    color: var(--text-muted);
    display: flex; align-items: center;
    padding: 0;
    transition: color 0.2s;
  }

  .biz-eye:hover { color: var(--purple-bright); }

  .biz-forgot {
    text-align: right;
    font-size: 12px;
    color: var(--purple);
    font-weight: 500;
    cursor: pointer;
    margin-top: -10px;
    margin-bottom: 4px;
  }

  .biz-forgot:hover { text-decoration: underline; }

  .biz-error { font-size: 11.5px; color: #ef4444; margin-top: 1px; }

  .biz-submit {
    width: 100%;
    height: 46px;
    background: var(--purple-bright);
    color: var(--white);
    border: none;
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 16px rgba(124,58,237,0.3);
    margin-top: 8px;
  }

  .biz-submit:hover { background: var(--purple); transform: translateY(-1px); box-shadow: 0 6px 24px rgba(124,58,237,0.4); }
  .biz-submit:active { transform: scale(0.977); }
  .biz-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  .biz-switch {
    text-align: center;
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 16px;
  }

  .biz-switch a {
    color: var(--purple);
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
  }

  .biz-switch a:hover { text-decoration: underline; }

  /* ANIMATIONS */
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .vl-anim-1 { animation: fade-up 0.6s ease both; }
  .vl-anim-2 { animation: fade-up 0.6s 0.1s ease both; }
  .vl-anim-3 { animation: fade-up 0.6s 0.2s ease both; }
  .vl-anim-4 { animation: fade-up 0.6s 0.3s ease both; }
  .vl-anim-5 { animation: fade-up 0.6s 0.4s ease both; }

  /* ---- RESPONSIVE ---- */
  @media (max-width: 900px) {
    .vl-nav { padding: 16px 24px; }
    .vl-features { padding: 72px 24px; }
    .vl-features-grid { grid-template-columns: 1fr; gap: 16px; }
    .vl-choose { padding: 72px 24px; }
    .vl-account-cards { grid-template-columns: 1fr; }
    .vl-footer { padding: 28px 24px; flex-direction: column; gap: 12px; text-align: center; }
  }

  @media (max-width: 480px) {
    .vl-nav { padding: 14px 16px; }
    .vl-hero { padding: 100px 16px 64px; }
    .vl-proof { gap: 0; flex-wrap: wrap; }
    .vl-proof-item { padding: 12px 18px; }
    .vl-proof-item + .vl-proof-item::before { display: none; }
    .biz-signin-card { padding: 36px 24px; }
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

function BusinessSignIn({ onSuccess, onClose, onSignUp }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
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

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1200);
  };

  return (
    <div className="biz-signin-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="biz-signin-card">
        <button className="biz-close" onClick={onClose}>×</button>

        <div className="biz-signin-logo">
          <span className="biz-signin-logo-name">vynder</span>
          <span className="biz-signin-logo-badge">Business</span>
        </div>

        <h2 className="biz-signin-title">Welcome back</h2>
        <p className="biz-signin-sub">Sign in to your business account</p>

        <div className="biz-field">
          <label className="biz-label">Work Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            className={`biz-input${errors.email ? " error" : ""}`}
          />
          {errors.email && <span className="biz-error">⚠ {errors.email}</span>}
        </div>

        <div className="biz-field">
          <label className="biz-label">Password</label>
          <div className="biz-input-wrap">
            <input
              name="password"
              type={showPwd ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className={`biz-input${errors.password ? " error" : ""}`}
            />
            <button className="biz-eye" type="button" onClick={() => setShowPwd(!showPwd)}>
              <EyeIcon open={showPwd} />
            </button>
          </div>
          {errors.password && <span className="biz-error">⚠ {errors.password}</span>}
        </div>

        <div className="biz-forgot">Forgot password?</div>

        <button className="biz-submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="biz-switch">
          No account yet? <a onClick={() => { onClose(); onSignUp(); }}>Create one</a>
        </p>
      </div>
    </div>
  );
}

export default function LandingPage({ onDashboard }) {
  const [screen, setScreen] = useState("landing");
  const [showBizSignin, setShowBizSignin] = useState(false);

  const go = (s) => setScreen(s);

  // Non-landing screens — render their own full-page components
  const fullScreens = {
    "creator-signup-1": (
      <CreatorSignupStepOne
        onNext={() => go("creator-signup-2")}
        onSignIn={() => go("creator-signin")}
      />
    ),
    "creator-signup-2": (
      <CreatorSignupStepTwo
        onNext={() => go("creator-signin")}
      />
    ),
    "business-signup-1": (
      <BusinessSignupStepOne
        onNext={() => go("business-signup-2")}
      />
    ),
    "business-signup-2": (
      <BusinessSignup
        onNext={() => onDashboard && onDashboard()}
      />
    ),
    "creator-signin": (
      <CreatorSignIn
        onForgotPassword={() => go("forgot")}
        onSignUp={() => go("creator-signup-1")}
      />
    ),
    "forgot": (
      <ForgotPassword
        onBackToLogin={() => go("creator-signin")}
        onOTPSent={() => go("otp")}
      />
    ),
    "otp": (
      <EnterOTP
        onVerify={() => go("reset")}
        onBack={() => go("forgot")}
      />
    ),
    "reset": (
      <ResetPassword
        onBack={() => go("creator-signin")}
        onSuccess={() => go("creator-signin")}
      />
    ),
  };

  if (screen !== "landing") {
    return fullScreens[screen] || null;
  }

  return (
    <>
      <style>{styles}</style>
      <div className="vl-page">

        {/* NAV */}
        <nav className="vl-nav">
          <div className="vl-nav-logo">
            vynder
            <div className="vl-nav-logo-dot" />
          </div>
          <div className="vl-nav-right">
            <button className="vl-nav-signin" onClick={() => setShowBizSignin(true)}>
              Sign In
            </button>
            <button
              className="vl-nav-cta"
              onClick={() => document.getElementById("vl-choose").scrollIntoView({ behavior: "smooth" })}
            >
              Get Started Free
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="vl-hero">
          <div className="vl-hero-bg">
            <div className="vl-blob vl-blob-1" />
            <div className="vl-blob vl-blob-2" />
            <div className="vl-blob vl-blob-3" />
            <div className="vl-hero-grid" />
          </div>

          <div className="vl-hero-content">
            <div className="vl-badge vl-anim-1">
              <div className="vl-badge-blink" />
              AI-Powered Matching
            </div>

            <h1 className="vl-h1 vl-anim-2">
              Where Businesses<br />
              <em>Find</em> the Right Creators
            </h1>

            <p className="vl-sub vl-anim-3">
              Vynder uses AI to match businesses with talented creators — then lets you communicate, collaborate, and pay in one place.
            </p>

            <div className="vl-hero-btns vl-anim-4">
              <button
                className="vl-btn-primary"
                onClick={() => document.getElementById("vl-choose").scrollIntoView({ behavior: "smooth" })}
              >
                Get Started Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <button className="vl-btn-ghost" onClick={() => setShowBizSignin(true)}>
                Sign In
              </button>
            </div>

            <div className="vl-proof vl-anim-5">
              {[["2k+","Creators"],["800+","Businesses"],["94%","Match Rate"],["₦680M+","Paid Out"]].map(([n, l]) => (
                <div className="vl-proof-item" key={l}>
                  <div className="vl-proof-num">{n}</div>
                  <div className="vl-proof-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="vl-features">
          <div className="vl-features-inner">
            <div className="vl-section-eyebrow">Why Vynder</div>
            <div className="vl-section-title">Built for how Africa creates.</div>

            <div className="vl-features-grid">
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  ),
                  title: "AI-Powered Matching",
                  desc: "Our AI studies every profile and makes smart, relevant recommendations — so the right people always find each other."
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  ),
                  title: "Built-in Messaging",
                  desc: "Discuss projects, share briefs, and close deals inside the app. No WhatsApp, no DMs, no scattered threads."
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  ),
                  title: "Seamless Payments",
                  desc: "Businesses pay creators directly through Vynder via Interswitch. Every transaction is tracked and receipted automatically."
                },
              ].map(f => (
                <div className="vl-feat-card" key={f.title}>
                  <div className="vl-feat-icon">{f.icon}</div>
                  <div className="vl-feat-title">{f.title}</div>
                  <div className="vl-feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHOOSE */}
        <section className="vl-choose" id="vl-choose">
          <div className="vl-choose-inner">
            <div className="vl-section-eyebrow" style={{ textAlign: "center" }}>Get Started</div>
            <h2 className="vl-choose-title">Join Vynder Today</h2>
            <p className="vl-choose-sub">Choose your account type to get started — it's free.</p>

            <div className="vl-account-cards">

              {/* BUSINESS */}
              <div className="vl-account-card business">
                <div className="vl-account-card-accent" />
                <span className="vl-account-tag">Business</span>
                <div className="vl-account-title">Find creators that fit your brand.</div>
                <div className="vl-account-desc">
                  Post briefs, get AI-matched to the right creators, manage projects, and pay securely — all in one place.
                </div>
                <div className="vl-account-perks">
                  {["Post unlimited briefs","AI creator matching","Built-in contracts & payments","Real-time project tracking"].map(p => (
                    <div className="vl-account-perk" key={p}>
                      <div className="vl-perk-dot" />
                      {p}
                    </div>
                  ))}
                </div>
                <div className="vl-card-btns">
                  <button className="vl-card-btn-primary" onClick={() => go("business-signup-1")}>
                    Sign Up as Business
                  </button>
                  <button className="vl-card-btn-ghost" onClick={() => setShowBizSignin(true)}>
                    Log In
                  </button>
                </div>
              </div>

              {/* CREATOR */}
              <div className="vl-account-card creator">
                <div className="vl-account-card-accent" />
                <span className="vl-account-tag">Creator</span>
                <div className="vl-account-title">Get discovered. Get paid doing what you love.</div>
                <div className="vl-account-desc">
                  Build your profile, receive job requests from matched businesses, and get paid directly through Vynder.
                </div>
                <div className="vl-account-perks">
                  {["AI-matched to relevant briefs","Receive job requests directly","Secure in-app payments","Track all your projects"].map(p => (
                    <div className="vl-account-perk" key={p}>
                      <div className="vl-perk-dot" />
                      {p}
                    </div>
                  ))}
                </div>
                <div className="vl-card-btns">
                  <button className="vl-card-btn-primary" onClick={() => go("creator-signup-1")}>
                    Sign Up as Creator
                  </button>
                  <button className="vl-card-btn-ghost" onClick={() => go("creator-signin")}>
                    Log In as Creator
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="vl-footer">
          <div className="vl-footer-logo">vynder</div>
          <div className="vl-footer-copy">© 2026 Vynder. Made for African creators and businesses.</div>
        </footer>

        {/* BUSINESS SIGN IN MODAL */}
        {showBizSignin && (
          <BusinessSignIn
            onClose={() => setShowBizSignin(false)}
            onSuccess={() => { setShowBizSignin(false); onDashboard && onDashboard(); }}
            onSignUp={() => { setShowBizSignin(false); go("business-signup-1"); }}
          />
        )}

      </div>
    </>
  );
}
