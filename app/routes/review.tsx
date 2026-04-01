export default function Review() {
  return (
    <div style={{ padding: 20 }}>
      <h1>AI Review</h1>

      <p>Here the resume will be sent to ChatGPT and Gemini for critique.</p>

      <textarea
        style={{ width: "100%", height: 200 }}
        defaultValue="Paste AI feedback here..."
      />
    </div>
  );
}
