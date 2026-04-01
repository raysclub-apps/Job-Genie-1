export default function Linkedin() {
  return (
    <div style={{ padding: 20 }}>
      <h1>LinkedIn Manager</h1>

      <p>Upload resume and manage LinkedIn here.</p>

      <textarea
        style={{ width: "100%", height: 120 }}
        defaultValue="Generated LinkedIn headline..."
      />

      <textarea
        style={{ width: "100%", height: 120, marginTop: 20 }}
        defaultValue="Generated LinkedIn post..."
      />
    </div>
  );
}
