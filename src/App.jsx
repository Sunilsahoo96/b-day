import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelopeOpenText } from "react-icons/fa";
import "./App.css"; // Include the CSS below in this file or your stylesheet
import logo from "./assets/sir.png";
import c_logo from "./assets/sanvima_logo.png";
import audio from "./assets/audio.mp3";

export default function App() {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef(null);

  const birthdayData = {
    imageUrl: "./assets/react.svg",
    message:
      "From all of us at Sanvima Solutions, we wish you a year as inspiring as your leadership and as bright as your vision. 🌟May this special day bring you endless happiness, success, and beautiful moments to cherish. ",
    logoUrl: c_logo,
    companyName: "Sanvima Solutions",
  };

  function cardOpen() {
    setOpened(true);
  }

  const balloonColors = [
    "#ff4d6d", "#2ecc71", "#f39c12", "#9b59b6", "#3498db",
    "#e74c3c", "#1abc9c", "#ff66cc", "#00b4d8", "#ffd60a",
    "#ff7b00", "#8338ec", "#06d6a0", "#ef476f", "#ff9f1c",
  ];

  useEffect(() => {
    const playMusic = async () => {
      try {
        await audioRef.current.play();
      } catch {
        console.log("Autoplay blocked by browser");
      }
    };
    if (opened) playMusic();
  }, [opened]);

  return (
    <div className={`main-bg min-vh-100 position-relative overflow-hidden ${opened ? "with-logo-gap" : ""}`}>
      {/* Company Logo with gap toggle */}
      <div className={`company-logo-container ${opened ? "with-gap" : ""}`}>
        <img
          src={birthdayData.logoUrl}
          alt="Company Logo"
          className="company-logo"
        />
      </div>

      {!opened ? (
        // ENVELOPE SCREEN with bounce animation
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div
            className={`envelope-wrapper ${opened ? "opened" : "bouncing"}`}
            onClick={cardOpen}
            style={{ cursor: "pointer" }}
          >
            <div className="envelope">
              <div className="envelope-back"></div>
              <div className="envelope-left"></div>
              <div className="envelope-right"></div>
              <div className="envelope-bottom"></div>
              <div className="envelope-top-flap"></div>
            </div>
          </div>
          <p className="mt-4 text-dark fs-4 animate-blink">
            <button
              style={{
                background: "transparent",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#333",
              }}
              onClick={cardOpen}
            >
              <FaEnvelopeOpenText />
              Open me
            </button>
          </p>
        </div>
      ) : (
        // MAIN BIRTHDAY CELEBRATION
        <div className="celebration-container position-relative min-vh-100 p-0">
          {[...Array(120)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="confetti position-absolute"
              style={{
                width: `${Math.random() * 8 + 5}px`,
                height: `${Math.random() * 8 + 5}px`,
                backgroundColor:
                  balloonColors[Math.floor(Math.random() * balloonColors.length)],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `confettiFall ${Math.random() * 3 + 2}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}

          {[...Array(14)].map((_, i) => {
            const size = Math.random() * 40 + 40;
            return (
              <div
                key={`balloon-${i}`}
                className="balloon-container position-absolute"
                style={{
                  bottom: "-160px",
                  left: `${5 + i * 6}%`,
                  animation: `floatUp ${8 + i}s ease-in infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <div
                  className="balloon rounded-circle"
                  style={{
                    width: `${size}px`,
                    height: `${size * 1.3}px`,
                    backgroundColor: balloonColors[i % balloonColors.length],
                    boxShadow: `inset -5px -5px 10px rgba(0,0,0,0.15), 0 0 15px ${
                      balloonColors[i % balloonColors.length]
                    }88`,
                  }}
                ></div>
                <div
                  className="balloon-thread"
                  style={{
                    height: `${size * 2}px`,
                    backgroundColor: "rgba(0,0,0,0.2)",
                    left: "50%",
                  }}
                ></div>
              </div>
            );
          })}

          <div className="content-card">
            <div className="image-container animate-fadein">
              <img
                src={logo}
                alt="Birthday celebration"
                className="rounded-pill"
              />
            </div>
            <div className="message-container animate-pop text-center p-4">
              <h1 className="cursive-birthday-text">Happy Birthday Sir!</h1>
              <p className="special-text mt-3" style={{ textAlign: "justify" }}>
                {birthdayData.message}
              </p>
              <p className="special-text small mt-3">💙– Team Sanvima Solutions</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer with fixed or relative position based on opened state */}
      <footer className={`app-footer ${opened ? "opened" : ""}`}>
        <p>Made with ❤️ by Sunil</p>
      </footer>

      {/* Music */}
      <audio ref={audioRef} loop autoPlay>
        <source src={audio} type="audio/mpeg" />
      </audio>
    </div>
  );
}
