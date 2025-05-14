"use client"

export default function StyleTagTestPage() {
  return (
    <>
      <style jsx>{`
        .style-tag-test {
          background-color: orange;
          color: white;
          padding: 20px;
          margin: 20px;
          border-radius: 8px;
          font-weight: bold;
        }
      `}</style>

      <div style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Style Tag Test</h1>
        <div className="style-tag-test">
          This text should have orange background and white text if style tags are working.
        </div>
      </div>
    </>
  )
}