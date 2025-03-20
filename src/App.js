"use client"

import { useState } from "react"
import AnagramGame from "./components/AnagramGame"

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "24px",
  marginBottom: "20px",
  border: "1px solid #fed7aa",
  maxWidth: "350px",
  marginLeft: "auto",
  marginRight: "auto",
}

const themeStyle = {
  backgroundColor: "#ffedd5",
  padding: "12px 20px",
  borderRadius: "8px",
  fontSize: "1.3rem",
  fontWeight: "bold",
  color: "#9a3412",
  marginBottom: "24px",
  letterSpacing: "1px",
  maxWidth: "150px",
  marginLeft: "auto",
  marginRight: "auto",
  textAlign: "center",
}

const buttonStyle = {
  padding: "14px 28px",
  fontSize: "1.2rem",
  color: "#fff",
  backgroundColor: "#ea580c",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  transition: "all 0.2s",
  width: "80%", // ボタンの幅を統一
  marginBottom: "16px", // ボタン間の間隔を調整
}

// ボタンのホバー効果を追加するための関数
const addHoverEffect = (e) => {
  e.target.style.backgroundColor = "#f97316"
  e.target.style.transform = "translateY(-2px)"
}

const removeHoverEffect = (e) => {
  e.target.style.backgroundColor = "#ea580c"
  e.target.style.transform = "translateY(0)"
}

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [mode, setMode] = useState("")

  const startGame = (selectedMode) => {
    setMode(selectedMode)
    setIsStarted(true)
  }

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        background: "linear-gradient(to bottom, #fff7ed, #ffedd5)",
        minHeight: "100vh",
        color: "#9a3412",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isStarted ? (
        <AnagramGame mode={mode} onGameEnd={() => setIsStarted(false)} />
      ) : (
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h1
            style={{
              color: "#c2410c",
              fontSize: "2.8rem",
              marginBottom: "1.2rem",
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            アナグラムゲーム
          </h1>
          <p
            style={{
              color: "#ea580c",
              marginBottom: "2.5rem",
              fontSize: "1.2rem",
            }}
          >
            テーマを選択してください
          </p>
          <div style={cardStyle}>
            <div style={themeStyle}>テーマ一覧</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <button
                onClick={() => startGame("anime")}
                onMouseEnter={addHoverEffect}
                onMouseLeave={removeHoverEffect}
                style={buttonStyle}
              >
                アニメ
              </button>
              <button
                onClick={() => startGame("game")}
                onMouseEnter={addHoverEffect}
                onMouseLeave={removeHoverEffect}
                style={buttonStyle}
              >
                ゲーム
              </button>
              <button
                onClick={() => startGame("country")}
                onMouseEnter={addHoverEffect}
                onMouseLeave={removeHoverEffect}
                style={buttonStyle}
              >
                国名
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

