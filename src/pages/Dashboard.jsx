import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --purple-deep: #3a1a8a;
    --purple-mid: #4e22c4;
    --purple-bright: #6c3ce1;
    --purple-btn: #7b4ff0;
    --purple-light: #f3f0ff;
    --green: #22c55e;
    --green-light: #dcfce7;
    --orange: #f97316;
    --orange-light: #fff7ed;
    --red: #ef4444;
    --text-dark: #111118;
    --text-muted: #6b7280;
    --border: #e5e7eb;
    --bg: #f5f6fa;
    --white: #ffffff;
    --sidebar-w: 248px;
    --radius: 14px;
    --radius-sm: 8px;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); }

  .layout { display: flex; min-height: 100vh; }

  /* ── SIDEBAR ── */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--white);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 100;
    padding: 28px 0;
  }

  .sidebar-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 24px 28px;
    border-bottom: 1px solid var(--border);
  }

  .brand-name {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: var(--text-dark);
    letter-spacing: -0.5px;
  }

  .biz-badge {
    background: var(--purple-light);
    color: var(--purple-bright);
    font-size: 11px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 20px;
  }

  .sidebar-company {
    font-size: 13px;
    color: var(--text-muted);
    padding: 12px 24px 0;
    font-weight: 500;
  }

  .sidebar-section-label {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #9ca3af;
    text-transform: uppercase;
    padding: 20px 24px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-muted);
    cursor: pointer;
    border-radius: 0;
    transition: background 0.15s, color 0.15s;
    position: relative;
    user-select: none;
    text-decoration: none;
  }

  .nav-item:hover { background: var(--bg); color: var(--text-dark); }

  .nav-item.active {
    background: var(--purple-btn);
    color: var(--white);
    margin: 0 12px;
    border-radius: var(--radius-sm);
    padding: 10px 12px;
  }

  .nav-item.active svg { stroke: var(--white); }

  .nav-badge {
    margin-left: auto;
    background: var(--purple-btn);
    color: var(--white);
    font-size: 11px;
    font-weight: 700;
    padding: 1px 7px;
    border-radius: 20px;
    min-width: 20px;
    text-align: center;
  }

  .nav-item.active .nav-badge {
    background: rgba(255,255,255,0.25);
  }

  .nav-icon { width: 18px; height: 18px; stroke: currentColor; fill: none; flex-shrink: 0; }

  .sidebar-bottom {
    margin-top: auto;
    border-top: 1px solid var(--border);
    padding-top: 12px;
  }

  .nav-item.logout { color: #ef4444; }
  .nav-item.logout:hover { background: #fef2f2; }
  .nav-item.logout svg { stroke: #ef4444; }

  /* ── MAIN ── */
  .main {
    margin-left: var(--sidebar-w);
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* TOP BAR */
  .topbar {
    background: var(--white);
    border-bottom: 1px solid var(--border);
    padding: 18px 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .topbar-left h1 {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: var(--text-dark);
    letter-spacing: -0.4px;
  }

  .topbar-left p {
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 2px;
  }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon-btn {
    width: 40px; height: 40px;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    background: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: border-color 0.2s, background 0.2s;
  }

  .icon-btn:hover { border-color: var(--purple-bright); background: var(--purple-light); }

  .notif-dot {
    position: absolute;
    top: 7px; right: 7px;
    width: 8px; height: 8px;
    background: var(--red);
    border-radius: 50%;
    border: 1.5px solid var(--white);
  }

  /* CONTENT */
  .content { padding: 32px 36px; }

  .greeting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .greeting-row h2 {
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: var(--text-dark);
    letter-spacing: -0.5px;
  }

  .greeting-row p {
    font-size: 13.5px;
    color: var(--text-muted);
    margin-top: 4px;
  }

  .post-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--purple-btn);
    color: var(--white);
    border: none;
    border-radius: 50px;
    padding: 12px 22px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }

  .post-btn:hover { background: #6a40e0; box-shadow: 0 6px 20px rgba(108,60,225,0.3); }
  .post-btn:active { transform: scale(0.97); }

  .post-btn .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transform: scale(0);
    animation: ripple 0.5s linear;
    pointer-events: none;
  }

  @keyframes ripple { to { transform: scale(4); opacity: 0; } }

  /* STATS BANNER */
  .stats-banner {
    background: linear-gradient(135deg, #2a0f7a 0%, #5128d4 60%, #3a1a8a 100%);
    border-radius: var(--radius);
    padding: 28px 32px;
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
  }

  .stats-banner::before {
    content: '';
    position: absolute;
    width: 260px; height: 260px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
    top: -80px; right: 200px;
  }

  .stat-block {
    flex: 1;
    padding: 0 28px;
    border-right: 1px solid rgba(255,255,255,0.15);
  }

  .stat-block:first-child { padding-left: 0; }
  .stat-block:last-child { border-right: none; }

  .stat-label {
    font-size: 12.5px;
    color: rgba(255,255,255,0.65);
    font-weight: 500;
    margin-bottom: 8px;
  }

  .stat-value {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: var(--white);
    letter-spacing: -0.5px;
    margin-bottom: 8px;
  }

  .stat-sub {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
  }

  .stat-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 11.5px;
    font-weight: 600;
  }

  .stat-badge.green { background: rgba(34,197,94,0.2); color: #4ade80; }
  .stat-badge.orange { background: rgba(249,115,22,0.2); color: #fb923c; }

  .banner-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 28px;
    flex-shrink: 0;
  }

  .make-payment-btn {
    background: var(--white);
    color: var(--purple-btn);
    border: none;
    border-radius: 50px;
    padding: 11px 22px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
  }

  .make-payment-btn:hover { background: #f3f0ff; }
  .make-payment-btn:active { transform: scale(0.97); }

  .make-payment-btn .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(108,60,225,0.15);
    transform: scale(0);
    animation: ripple 0.5s linear;
    pointer-events: none;
  }

  .view-history-btn {
    background: transparent;
    color: rgba(255,255,255,0.8);
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s;
    text-align: center;
  }

  .view-history-btn:hover { color: var(--white); }

  /* METRIC CARDS */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }

  .metric-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px 22px;
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .metric-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); transform: translateY(-2px); }

  .metric-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .metric-title { font-size: 13px; color: var(--text-muted); font-weight: 500; }

  .metric-icon {
    width: 34px; height: 34px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }

  .metric-icon.blue { background: #eff6ff; }
  .metric-icon.purple { background: var(--purple-light); }
  .metric-icon.green { background: var(--green-light); }
  .metric-icon.orange { background: var(--orange-light); }

  .metric-value {
    font-family: 'Syne', sans-serif;
    font-size: 30px;
    font-weight: 800;
    color: var(--text-dark);
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }

  .metric-sub { font-size: 12px; color: var(--text-muted); }

  /* BOTTOM GRID */
  .bottom-grid {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 24px;
  }

  /* ACTIVITY TABLE */
  .section-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px 16px;
    border-bottom: 1px solid var(--border);
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--text-dark);
  }

  .view-all-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: var(--purple-bright);
    font-weight: 600;
    cursor: pointer;
    background: none;
    border: none;
    transition: gap 0.2s;
  }

  .view-all-btn:hover { gap: 8px; }

  table { width: 100%; border-collapse: collapse; }

  thead th {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
    text-align: left;
    padding: 12px 24px;
    background: #fafafa;
    border-bottom: 1px solid var(--border);
  }

  tbody tr {
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
  }

  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: #fafafa; }

  tbody td {
    padding: 16px 24px;
    font-size: 13.5px;
    color: var(--text-dark);
    font-weight: 500;
  }

  .amount-neg { color: var(--red); font-weight: 600; }

  .status-pill {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }

  .status-pill.pending { background: #fff7ed; color: #c2410c; }
  .status-pill.paid { background: var(--green-light); color: #15803d; }
  .status-pill.in-progress { background: var(--purple-light); color: var(--purple-btn); }

  /* CREATORS PANEL */
  .creators-panel { display: flex; flex-direction: column; gap: 0; }

  .creators-panel .section-header { border-bottom: 1px solid var(--border); }

  .ai-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--purple-light);
    color: var(--purple-bright);
    font-size: 11.5px;
    font-weight: 600;
    padding: 5px 10px;
    border-radius: 20px;
    margin: 16px 20px 8px;
  }

  .creator-card {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
  }

  .creator-card:last-child { border-bottom: none; }
  .creator-card:hover { background: #fafafa; }

  .creator-top {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 8px;
  }

  .avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--white);
    flex-shrink: 0;
  }

  .avatar.ao { background: linear-gradient(135deg, #6c3ce1, #4e22c4); }
  .avatar.ce { background: linear-gradient(135deg, #6c3ce1, #4e22c4); }
  .avatar.fa { background: linear-gradient(135deg, #6c3ce1, #4e22c4); }

  .creator-info { flex: 1; min-width: 0; }

  .creator-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-dark);
  }

  .creator-role {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 1px;
  }

  .creator-score {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--purple-bright);
    background: var(--purple-light);
    padding: 3px 8px;
    border-radius: 6px;
  }

  .creator-desc {
    font-size: 12.5px;
    color: var(--text-muted);
    line-height: 1.5;
    margin-bottom: 10px;
  }

  .view-profile-btn {
    width: 100%;
    background: transparent;
    border: 1.5px solid var(--border);
    border-radius: 50px;
    padding: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--purple-bright);
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }

  .view-profile-btn:hover { background: var(--purple-light); border-color: var(--purple-bright); }

  /* PAYMENT MODAL */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(10,5,30,0.55);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    z-index: 999;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: var(--white);
    border-radius: 20px;
    padding: 32px;
    width: 100%;
    max-width: 440px;
    animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .modal-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: var(--text-dark);
  }

  .modal-close {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: var(--bg);
    border: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-muted);
    font-size: 18px;
    transition: background 0.2s;
  }

  .modal-close:hover { background: var(--border); }

  .modal-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }

  .modal-label { font-size: 13px; font-weight: 500; color: var(--text-dark); }

  .modal-input {
    height: 46px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text-dark);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
    appearance: none;
    background: var(--white);
  }

  .modal-input:focus {
    border-color: var(--purple-bright);
    box-shadow: 0 0 0 3px rgba(108,60,225,0.12);
  }

  .modal-input::placeholder { color: #adb5bd; }

  .modal-select-wrap { position: relative; }
  .modal-select-wrap .modal-input { cursor: pointer; padding-right: 36px; -webkit-appearance: none; }
  .modal-select-arrow {
    position: absolute; right: 12px; top: 50%;
    transform: translateY(-50%);
    pointer-events: none; color: var(--text-muted);
  }

  .modal-submit {
    width: 100%;
    height: 50px;
    background: var(--purple-btn);
    color: var(--white);
    border: none;
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
    transition: background 0.2s, transform 0.15s;
    position: relative;
    overflow: hidden;
  }

  .modal-submit:hover { background: #6a40e0; }
  .modal-submit:active { transform: scale(0.98); }
  .modal-submit .ripple {
    position: absolute; border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transform: scale(0);
    animation: ripple 0.5s linear;
    pointer-events: none;
  }

  .modal-success {
    text-align: center;
    padding: 12px 0;
  }

  .modal-success-icon {
    width: 64px; height: 64px;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
    font-size: 28px;
  }

  .modal-success h3 {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: var(--text-dark);
    margin-bottom: 8px;
  }

  .modal-success p {
    font-size: 13.5px;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .modal-success-btn {
    background: var(--purple-btn);
    color: var(--white);
    border: none;
    border-radius: var(--radius-sm);
    padding: 12px 28px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .modal-success-btn:hover { background: #6a40e0; }

  /* RESPONSIVE */
  @media (max-width: 1100px) {
    .metrics-grid { grid-template-columns: repeat(2, 1fr); }
    .bottom-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .main { margin-left: 0; }
    .stats-banner { flex-direction: column; gap: 20px; }
    .stat-block { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.15); padding: 0 0 20px; }
    .stat-block:last-child { border-bottom: none; }
    .banner-actions { padding-left: 0; flex-direction: row; }
    .content { padding: 20px 16px; }
    .topbar { padding: 16px 20px; }
  }
`;

const activity = [
  { creator: "Amara Okon", project: "Product Launch Video", amount: "₦120,000", status: "pending", date: "Mar 18, 2026" },
  { creator: "Chidi Eze", project: "Brand Photography", amount: "₦85,000", status: "paid", date: "Mar 12, 2026" },
  { creator: "Funmi Adeyemi", project: "Social Media Pack", amount: "₦60,000", status: "paid", date: "Mar 5, 2026" },
  { creator: "Tunde Balogun", project: "UI/UX Audit Report", amount: "₦45,000", status: "in-progress", date: "Feb 28, 2026" },
];

const creators = [
  { initials: "AO", cls: "ao", name: "Amara Okon", role: "Videographer · Lagos", score: "96%", desc: "Specialises in product launch videos and brand documentaries." },
  { initials: "CE", cls: "ce", name: "Chidi Eze", role: "Photographer · Lagos", score: "91%", desc: "Commercial and lifestyle photographer with 5+ years experience." },
  { initials: "FA", cls: "fa", name: "Funmi Adeyemi", role: "Social Media Manager · Abuja", score: "87%", desc: "Manages content strategy and execution for 10+ brands monthly." },
];

const navItems = [
  { label: "Dashboard", icon: "grid", active: true },
  { label: "Job Requests", icon: "briefcase", badge: 2 },
  { label: "Messages", icon: "message" },
  { label: "Notifications", icon: "bell" },
  { label: "Transaction History", icon: "clock" },
];

const NavIcon = ({ type, className }) => {
  const icons = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></>,
    message: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  };
  return (
    <svg className={`nav-icon ${className || ""}`} viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  );
};

function createRipple(e) {
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
}

export default function Dashboard() {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [payment, setPayment] = useState({ creator: "", amount: "", note: "" });

  const handlePaymentSubmit = (e) => {
    if (!payment.creator || !payment.amount) return;
    createRipple(e);
    setTimeout(() => setPaymentSuccess(true), 300);
  };

  const closeModal = () => {
    setShowPayment(false);
    setPaymentSuccess(false);
    setPayment({ creator: "", amount: "", note: "" });
  };

  const getHour = () => {
    const h = new Date().getHours();
    if (h < 12) return "morning";
    if (h < 17) return "afternoon";
    return "evening";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div>
            <div className="sidebar-brand">
              <span className="brand-name">vynder</span>
              <span className="biz-badge">Biz</span>
            </div>
            <div className="sidebar-company">TechCorp Nigeria</div>

            <div className="sidebar-section-label">
              MENU
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
            </div>

            {navItems.map((item) => (
              <div key={item.label} className={`nav-item ${item.active ? "active" : ""}`}>
                <NavIcon type={item.icon} />
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>

          <div className="sidebar-bottom">
            <div className="sidebar-section-label">
              ACCOUNT
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
            </div>
            <div className="nav-item">
              <NavIcon type="settings" />
              Settings
            </div>
            <div className="nav-item logout">
              <NavIcon type="logout" />
              Logout
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">

          {/* TOPBAR */}
          <div className="topbar">
            <div className="topbar-left">
              <h1>Dashboard</h1>
              <p>Overview of your creator activity, projects, and payments</p>
            </div>
            <div className="topbar-right">
              <div className="icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
                <div className="notif-dot" />
              </div>
              <div className="icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="content">

            {/* GREETING */}
            <div className="greeting-row">
              <div>
                <h2>Good {getHour()}, Emeka 👋</h2>
                <p>Here's your business activity at a glance</p>
              </div>
              <button className="post-btn" onClick={createRipple}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Post a Brief
              </button>
            </div>

            {/* STATS BANNER */}
            <div className="stats-banner">
              <div className="stat-block">
                <div className="stat-label">Total Spent</div>
                <div className="stat-value">₦685,000</div>
                <div className="stat-sub">All time</div>
              </div>
              <div className="stat-block">
                <div className="stat-label">This Month</div>
                <div className="stat-value">₦205,000</div>
                <div className="stat-sub">
                  <span className="stat-badge green">📈 +12%</span>
                  &nbsp; vs last month
                </div>
              </div>
              <div className="stat-block">
                <div className="stat-label">Pending Payment</div>
                <div className="stat-value">₦120,000</div>
                <div className="stat-sub">
                  <span className="stat-badge orange">⏳ 1 awaiting</span>
                </div>
              </div>
              <div className="banner-actions">
                <button className="make-payment-btn" onClick={(e) => { createRipple(e); setShowPayment(true); }}>
                  Make Payment
                </button>
                <button className="view-history-btn">View history</button>
              </div>
            </div>

            {/* METRIC CARDS */}
            <div className="metrics-grid">
              {[
                { title: "Active Briefs", value: 4, sub: "2 receiving bids", icon: "blue", color: "#3b82f6", iconPath: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></> },
                { title: "Job Requests Sent", value: 9, sub: "3 accepted", icon: "purple", color: "#7b4ff0", iconPath: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></> },
                { title: "Active Projects", value: 3, sub: "In progress", icon: "green", color: "#22c55e", iconPath: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></> },
                { title: "Completed", value: 6, sub: "All time", icon: "orange", color: "#f97316", iconPath: <><polyline points="20 6 9 17 4 12"/></> },
              ].map((m) => (
                <div className="metric-card" key={m.title}>
                  <div className="metric-header">
                    <span className="metric-title">{m.title}</span>
                    <div className={`metric-icon ${m.icon}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {m.iconPath}
                      </svg>
                    </div>
                  </div>
                  <div className="metric-value">{m.value}</div>
                  <div className="metric-sub">{m.sub}</div>
                </div>
              ))}
            </div>

            {/* BOTTOM GRID */}
            <div className="bottom-grid">

              {/* ACTIVITY TABLE */}
              <div className="section-card">
                <div className="section-header">
                  <span className="section-title">Recent Activity</span>
                  <button className="view-all-btn">
                    View all
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Creator</th>
                      <th>Project</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activity.map((row, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{row.creator}</td>
                        <td style={{ color: "var(--text-muted)" }}>{row.project}</td>
                        <td className="amount-neg">-{row.amount}</td>
                        <td>
                          <span className={`status-pill ${row.status}`}>
                            {row.status === "in-progress" ? "In Progress" : row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                          </span>
                        </td>
                        <td style={{ color: "var(--text-muted)" }}>{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* RECOMMENDED CREATORS */}
              <div className="section-card creators-panel">
                <div className="section-header">
                  <span className="section-title">Recommended Creators</span>
                  <button className="view-all-btn">Browse</button>
                </div>
                <div className="ai-badge">
                  ✦ AI Matched to Your Briefs
                </div>
                {creators.map((c) => (
                  <div className="creator-card" key={c.name}>
                    <div className="creator-top">
                      <div className={`avatar ${c.cls}`}>{c.initials}</div>
                      <div className="creator-info">
                        <div className="creator-name">{c.name}</div>
                        <div className="creator-role">{c.role}</div>
                      </div>
                      <span className="creator-score">{c.score}</span>
                    </div>
                    <div className="creator-desc">{c.desc}</div>
                    <button className="view-profile-btn">View Profile</button>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal">
            {!paymentSuccess ? (
              <>
                <div className="modal-header">
                  <span className="modal-title">Make a Payment</span>
                  <button className="modal-close" onClick={closeModal}>×</button>
                </div>

                <div className="modal-field">
                  <label className="modal-label">Select Creator</label>
                  <div className="modal-select-wrap">
                    <select
                      className="modal-input"
                      value={payment.creator}
                      onChange={(e) => setPayment({ ...payment, creator: e.target.value })}
                    >
                      <option value="" disabled>Choose a creator</option>
                      <option>Amara Okon — Product Launch Video</option>
                      <option>Chidi Eze — Brand Photography</option>
                      <option>Funmi Adeyemi — Social Media Pack</option>
                      <option>Tunde Balogun — UI/UX Audit</option>
                    </select>
                    <svg className="modal-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                <div className="modal-field">
                  <label className="modal-label">Amount (₦)</label>
                  <input
                    className="modal-input"
                    type="number"
                    placeholder="e.g. 120000"
                    value={payment.amount}
                    onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
                  />
                </div>

                <div className="modal-field">
                  <label className="modal-label">Note <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></label>
                  <input
                    className="modal-input"
                    placeholder="e.g. Final payment for project"
                    value={payment.note}
                    onChange={(e) => setPayment({ ...payment, note: e.target.value })}
                  />
                </div>

                <button
                  className="modal-submit"
                  onClick={handlePaymentSubmit}
                  disabled={!payment.creator || !payment.amount}
                  style={{ opacity: !payment.creator || !payment.amount ? 0.5 : 1, cursor: !payment.creator || !payment.amount ? "not-allowed" : "pointer" }}
                >
                  Confirm Payment
                </button>
              </>
            ) : (
              <div className="modal-success">
                <div className="modal-success-icon">✓</div>
                <h3>Payment Sent!</h3>
                <p>Your payment of ₦{Number(payment.amount).toLocaleString()} has been sent successfully.</p>
                <button className="modal-success-btn" onClick={closeModal}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
