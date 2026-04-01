import { Link } from "@remix-run/react";

export default function Connect() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Connect Google Drive</h1>
      <p>This is a temporary stub until OAuth is added.</p>

      <Link to="/profile">
        <button>Continue</button>
      </Link>
    </div>
  );
}
