import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loggedInUser, setLoginInUser] = useState("");
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoginInUser(localStorage.getItem("loggedInUser") || "User");
    // Trigger entrance animation after mount
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => navigate("/login"), 1000);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 16px rgba(139, 0, 139, 0.22); }
          50%      { box-shadow: 0 0 30px rgba(139, 0, 139, 0.38); }
        }
        @keyframes particleDrift {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
        }
        @keyframes waveHand {
          0%   { transform: rotate(0deg); }
          10%  { transform: rotate(14deg); }
          20%  { transform: rotate(-8deg); }
          30%  { transform: rotate(14deg); }
          40%  { transform: rotate(-4deg); }
          50%  { transform: rotate(10deg); }
          60%  { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }

        .home-wrapper {
          min-height: 100vh;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #fdfbff 0%, #f6ecff 55%, #f0ddff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: fixed;
          inset: 0;
          overflow: auto;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        .home-wrapper::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139, 0, 139, 0.14) 0%, transparent 70%);
          top: -100px;
          right: -100px;
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .home-wrapper::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(199, 3, 199, 0.11) 0%, transparent 70%);
          bottom: -80px;
          left: -80px;
          border-radius: 50%;
          animation: float 8s ease-in-out infinite reverse;
        }

        .home-card {
          background: #fff;
          border: 1px solid rgba(139, 0, 139, 0.08);
          border-radius: 15px;
          box-shadow: 8px 8px 24px rgb(91, 84, 84, 0.2);
          padding: 50px 40px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .home-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .avatar-ring {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: linear-gradient(135deg, darkmagenta, #b10bb1);
          padding: 4px;
          margin: 0 auto 28px;
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.6s ease 0.3s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .home-card.visible .avatar-ring {
          opacity: 1;
          transform: scale(1);
        }

        .avatar-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #fff, #f7ecff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          font-weight: 700;
          color: darkmagenta;
          letter-spacing: 2px;
        }

        .wave-emoji {
          display: inline-block;
          font-size: 36px;
          margin-bottom: 8px;
          opacity: 0;
          transition: opacity 0.4s ease 0.5s;
        }

        .home-card.visible .wave-emoji {
          opacity: 1;
          animation: waveHand 2s ease-in-out 0.6s;
        }

        .greeting-text {
          font-size: 16px;
          color: rgba(63, 63, 70, 0.7);
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 8px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
        }

        .home-card.visible .greeting-text {
          opacity: 1;
          transform: translateY(0);
        }

        .username-text {
          font-size: 42px;
          font-weight: 800;
          background: linear-gradient(90deg, darkmagenta, #c026d3, #b10bb1, darkmagenta);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
          margin-bottom: 12px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.65s, transform 0.6s ease 0.65s;
          line-height: 1.2;
        }

        .home-card.visible .username-text {
          opacity: 1;
          transform: translateY(0);
        }

        .welcome-subtitle {
          font-size: 16px;
          color: rgba(63, 63, 70, 0.78);
          margin-bottom: 36px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s;
          line-height: 1.6;
        }

        .home-card.visible .welcome-subtitle {
          opacity: 1;
          transform: translateY(0);
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139, 0, 139, 0.25), transparent);
          margin-bottom: 30px;
          opacity: 0;
          transition: opacity 0.6s ease 0.9s;
        }

        .home-card.visible .divider {
          opacity: 1;
        }

        .stats-row {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-bottom: 36px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.95s, transform 0.6s ease 0.95s;
        }

        .home-card.visible .stats-row {
          opacity: 1;
          transform: translateY(0);
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: darkmagenta;
        }

        .stat-label {
          font-size: 12px;
          color: rgba(82, 82, 91, 0.85);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
        }

        .logout-btn {
          background: darkmagenta;
          color: white;
          border: none;
          padding: 14px 48px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          animation: fadeSlideUp 0.6s ease forwards;
          animation-delay: 1.1s;
        }

        .logout-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .logout-btn:hover {
          transform: translateY(-2px);
          background: rgb(199, 3, 199);
          box-shadow: 0 8px 20px rgba(139, 0, 139, 0.25);
        }

        .logout-btn:hover::before {
          left: 100%;
        }

        .logout-btn:active {
          transform: translateY(0);
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .date-badge {
          display: inline-block;
          background: #f6ecff;
          border: 1px solid rgba(139, 0, 139, 0.16);
          border-radius: 20px;
          padding: 6px 16px;
          font-size: 13px;
          color: #5b5561;
          margin-bottom: 28px;
          opacity: 0;
          transition: opacity 0.6s ease 0.4s;
        }

        .home-card.visible .date-badge {
          opacity: 1;
        }
      `}</style>

      <div className="home-wrapper">
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${15 + i * 15}%`,
              bottom: "10%",
              background: [
                "#8b008b",
                "#b10bb1",
                "#c026d3",
                "#d946ef",
                "#a21caf",
                "#c026d3",
              ][i],
              animation: `particleDrift ${4 + i * 0.8}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
              opacity: 0.6,
            }}
          />
        ))}

        <div className={`home-card ${mounted ? "visible" : ""}`}>
          <div className="date-badge">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="avatar-ring">
            <div className="avatar-inner">{getInitials(loggedInUser)}</div>
          </div>

          <div className="wave-emoji">👋</div>

          <p className="greeting-text">{greeting}</p>

          <h1 className="username-text">{loggedInUser}</h1>

          <p className="welcome-subtitle">
            Welcome back! We're glad to see you again.
            <br />
            Your dashboard is ready and waiting.
          </p>

          <div className="divider" />

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value">✓</div>
              <div className="stat-label">Authenticated</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">🔒</div>
              <div className="stat-label">Secure Session</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">⚡</div>
              <div className="stat-label">Active</div>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogOut}>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
