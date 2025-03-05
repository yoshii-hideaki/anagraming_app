"use client"

import { useState, useEffect } from "react"

// 共通のボタンスタイル
const buttonStyle = {
  padding: "8px 16px",
  margin: "5px",
  borderRadius: "8px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
}

// プライマリボタン（オレンジ）
const primaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#ea580c",
  color: "white",
}

// セカンダリボタン（薄いオレンジ）
const secondaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "white",
  color: "#ea580c",
  border: "1px solid #fdba74",
}

// カードスタイル
const cardStyle = {
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  marginBottom: "20px",
  border: "1px solid #fed7aa",
}

// インプットスタイル（回答欄）
const inputStyle = {
    width: "calc(100%)",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #fdba74",
    marginBottom: "15px",
    textAlign: "center",
    boxSizing: "border-box", // これで padding, border を含めた幅指定になる
    display: "block", // 中央寄せを確実にする
    marginLeft: "auto",
    marginRight: "auto",
  }  

// アラートスタイル
const alertStyle = {
  padding: "10px 15px",
  borderRadius: "8px",
  marginBottom: "15px",
  fontWeight: "500",
}

// 成功アラート
const successAlertStyle = {
  ...alertStyle,
  backgroundColor: "#ecfdf5",
  color: "#047857",
  border: "1px solid #a7f3d0",
}

// エラーアラート
const errorAlertStyle = {
  ...alertStyle,
  backgroundColor: "#fef2f2",
  color: "#b91c1c",
  border: "1px solid #fecaca",
}

// ヒントアラート
const hintAlertStyle = {
  ...alertStyle,
  backgroundColor: "#eff6ff",
  color: "#1e40af",
  border: "1px solid #bfdbfe",
}

// 問題表示スタイル
const questionStyle = {
  backgroundColor: "#ffedd5",
  padding: "15px",
  borderRadius: "8px",
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#9a3412",
  marginBottom: "20px",
  letterSpacing: "2px",
}

function shuffleWord(word) {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")
}

function AnagramGame() {
  const [titles, setTitles] = useState([])
  const [answer, setAnswer] = useState("")
  const [question, setQuestion] = useState("")
  const [userInput, setUserInput] = useState("")
  const [hint, setHint] = useState("")
  const [result, setResult] = useState(null) // "correct", "incorrect", null
  const [memo, setMemo] = useState("")

  useEffect(() => {
    const sampleTitles = [
      "Error：うまく問題が取得できていません"
    ]

    fetch("/titles.json")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTitles(data)
          startNewGame(data)
        } else {
          setTitles(sampleTitles)
          startNewGame(sampleTitles)
        }
      })
      .catch(() => {
        setTitles(sampleTitles)
        startNewGame(sampleTitles)
      })
  }, [])

  function startNewGame(currentTitles = titles) {
    if (!currentTitles || currentTitles.length === 0) return
    const selectedWord = currentTitles[Math.floor(Math.random() * currentTitles.length)]
    setAnswer(selectedWord)
    setQuestion(shuffleWord(selectedWord))
    setUserInput("")
    setHint("")
    setResult(null)
  }

  function checkAnswer() {
    if (userInput === answer) {
      setResult("correct")
    } else {
      setResult("incorrect")
    }
  }

  function showHint() {
    setHint(`最初の文字: ${answer[0]}`)
  }

  function showAnswer() {
    setHint(`答え: ${answer}`)
  }

  function copyQuestion() {
    navigator.clipboard.writeText(question)
    setHint("問題をコピーしました！")
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      checkAnswer()
    }
  }

  return (
    <div>
      {/* 問題カード */}
      <div style={cardStyle}>
        <div style={questionStyle}>
          <span style={{ opacity: 0.7, marginRight: "10px", fontSize: "1rem" }}>【問題】</span>
          {question}
        </div>

        <input
          type="text"
          placeholder="ここに回答を入力してください"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={inputStyle}
        />

        {result === "correct" && <div style={successAlertStyle}>正解！おめでとうございます！</div>}

        {result === "incorrect" && <div style={errorAlertStyle}>残念、不正解です。もう一度挑戦してみましょう。</div>}

        {hint && (
          <div style={hintAlertStyle}>
            <span style={{ fontWeight: "bold" }}></span> {hint}
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
          <button onClick={checkAnswer} style={primaryButtonStyle}>
            回答をチェック
          </button>
          <button onClick={() => startNewGame(titles)} style={secondaryButtonStyle}>
            次の問題
          </button>
          <button onClick={showHint} style={secondaryButtonStyle}>
            ヒントを表示
          </button>
          <button onClick={showAnswer} style={secondaryButtonStyle}>
            答えを表示
          </button>
          <button onClick={copyQuestion} style={secondaryButtonStyle}>
            問題をコピー
          </button>
        </div>
      </div>

      {/* メモカード */}
      <div style={cardStyle}>
        <h3 style={{ color: "#c2410c", marginTop: 0, marginBottom: "15px", fontSize: "1.2rem" }}>
          メモ
        </h3>
        <textarea
          name="comment"
          placeholder="メモ欄としてご自由にお使いください"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          style={{
            width: "100%",
            minHeight: "200px",
            padding: "12px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #fdba74",
            boxSizing: "border-box",
            resize: "vertical",
          }}
        />
      </div>
    </div>
  )
}

export default AnagramGame
