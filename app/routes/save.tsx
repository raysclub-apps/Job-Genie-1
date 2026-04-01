import { Link } from "@remix-run/react";

export default function Save() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Save & Share</h1>

      <p>Generated documents will be saved to Drive here.</p>

      <Link to="/linkedin">
        <button>Continue to LinkedIn</button>
      </Link>
    </div>
  );
}
