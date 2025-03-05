import AnagramGame from "./components/AnagramGame"

function App() {
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
        <AnagramGame />
      </div>
    </div>
  )
}

export default App

