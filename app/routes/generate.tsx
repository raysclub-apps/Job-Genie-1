import { Link } from "@remix-run/react";

export default function Generate() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Generate Resume Package</h1>

      <p>Backend will generate optimized resume and cover letter here.</p>

      <Link to="/review">
        <button>Next: Review</button>
      </Link>
    </div>
  );
}
