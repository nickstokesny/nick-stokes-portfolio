import "../direct-test.css"

export default function DirectCssTestPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Direct CSS Import Test</h1>
      <div className="direct-test">
        This text should have purple background and white text if CSS imports are working.
      </div>

      {/* Also test inline styles */}
      <div
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "20px",
          margin: "20px",
          borderRadius: "8px",
        }}
      >
        This text should have green background and white text (using inline styles).
      </div>
    </div>
  )
}