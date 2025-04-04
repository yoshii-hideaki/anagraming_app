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

const addHoverEffect_primary = (e) => {
    e.target.style.backgroundColor = "#f97316"
    e.target.style.transform = "translateY(-2px)"
  }
  
const removeHoverEffect_primary = (e) => {
e.target.style.backgroundColor = "#ea580c"
e.target.style.transform = "translateY(0)"
}

const addHoverEffect_secondary = (e) => {
    e.target.style.backgroundColor = "#f3f4f6"
    e.target.style.transform = "translateY(-2px)"
  }
  
const removeHoverEffect_secondary = (e) => {
e.target.style.backgroundColor = "white"
e.target.style.transform = "translateY(0)"
}

const addHoverEffect_end = (e) => {
    e.target.style.backgroundColor = "#dc2626"
    e.target.style.transform = "translateY(-2px)"
  }
  
const removeHoverEffect_end = (e) => {
e.target.style.backgroundColor = "#ef4444"
e.target.style.transform = "translateY(0)"
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

const scoreStyle = {
  padding: "15px",
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#9a3412",
  marginBottom: "20px",
  letterSpacing: "2px",
}

function shuffleWord(word) {
  let array = word.split("");
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // 0 から i の範囲でランダム
    [array[i], array[j]] = [array[j], array[i]]; // 要素を交換
  }
  return array.join("");
}


function AnagramGame({ mode, onGameEnd }) {
  const [titles, setTitles] = useState([])
  const [answer, setAnswer] = useState("")
  const [question, setQuestion] = useState("")
  const [userInput, setUserInput] = useState("")
  const [hint, setHint] = useState("")
  const [result, setResult] = useState(null) // "correct", "incorrect", null
  const [memo, setMemo] = useState("")
  const [score, setScore] = useState(0)
  const [tmpscore, setTmpscore] = useState(0)

  useEffect(() => {
    const sampleTitles = [
      "Error：うまく問題が取得できていません"
    ]
  
    const titlesFile = mode === "anime" ? "/anime_titles.json" : mode === "game" ? "/game_titles.json" : mode === "country" ? "/country_names.json" : "/error.json";
  
    fetch(titlesFile)
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
  }, [mode])

  function startNewGame(currentTitles = titles) {
    if (currentTitles.length === 0) {
      setHint(`全ての問題が出題されました`)
      return;
    }
  
    // 未出題の中からランダムに1問選ぶ
    const randomIndex = Math.floor(Math.random() * currentTitles.length)
    const selectedWord = currentTitles[randomIndex]
  
    setAnswer(selectedWord)
    setQuestion(shuffleWord(selectedWord))
    setUserInput("")
    setHint("")
    setResult(null)
  
    // 出題済みの問題を削除
    setTitles(currentTitles.filter((_, index) => index !== randomIndex))
    setTmpscore(selectedWord.length * 100)
  }
  

  function checkAnswer() {
    if (userInput === answer) {
      setScore(score + tmpscore)
      startNewGame(titles)
      setResult("correct")
      setUserInput("")
    } else {
      setResult("incorrect")
      if (score - tmpscore / 10 > 0) {
        setScore(score - tmpscore / 10)
      } else {
        setScore(0)
      }
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

  // エンターキーで判定
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      checkAnswer()
    }
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
        }}
    >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1
            style={{
            color: "#c2410c",
            fontSize: "2.5rem",
            marginBottom: "0.5rem",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            }}
        >
            アナグラムゲーム
        </h1>
        <p
            style={{
            color: "#ea580c",
            marginBottom: "2rem",
            fontSize: "1.1rem",
            }}
        >
            単語を並べ替えて元の言葉を当てよう！
        </p>
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
                // onKeyDown={handleKeyDown}
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
                <button onClick={checkAnswer} onMouseEnter={addHoverEffect_primary} onMouseLeave={removeHoverEffect_primary} style={primaryButtonStyle}>
                    回答をチェック
                </button>
                <button onClick={() => startNewGame(titles)} onMouseEnter={addHoverEffect_secondary} onMouseLeave={removeHoverEffect_secondary} style={secondaryButtonStyle}>
                    次の問題
                </button>
                <button onClick={showHint} onMouseEnter={addHoverEffect_secondary} onMouseLeave={removeHoverEffect_secondary} style={secondaryButtonStyle}>
                    ヒントを表示
                </button>
                <button onClick={showAnswer} onMouseEnter={addHoverEffect_secondary} onMouseLeave={removeHoverEffect_secondary} style={secondaryButtonStyle}>
                    答えを表示
                </button>
                <button onClick={copyQuestion} onMouseEnter={addHoverEffect_secondary} onMouseLeave={removeHoverEffect_secondary} style={secondaryButtonStyle}>
                    問題をコピー
                </button>
                <button onClick={onGameEnd} onMouseEnter={addHoverEffect_end} onMouseLeave={removeHoverEffect_end} style={{ backgroundColor: "#ef4444", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer" }}>
                    ゲーム終了
                </button>
                </div>
            </div>

            {/* スコア表示 */}
            <div style={cardStyle}>
                <h3 style={{ color: "#c2410c", marginTop: 0, marginBottom: "15px", fontSize: "1.2rem" }}>
                スコア
                </h3>
                <div style={scoreStyle}>{score}</div>
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
        </div>
    </div>
  )
}

export default AnagramGame
