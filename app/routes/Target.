import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { commitWizard, getWizard } from "~/utils/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const wizard = await getWizard(request);
  if (!wizard.profile) return redirect("/profile");
  return { wizard };
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const workType = String(form.get("workType") || "").trim() as "remote" | "hybrid" | "onsite";
  const jobRole = String(form.get("jobRole") || "").trim();
  const company = String(form.get("company") || "").trim();

  const errors: Record<string, string> = {};
  if (!workType) errors.workType = "Required";
  if (!jobRole) errors.jobRole = "Required";
  if (Object.keys(errors).length) return { errors };

  const wizard = await getWizard(request);
  if (!wizard.profile) return redirect("/profile");

  const next = { ...wizard, target: { workType, jobRole, company: company || undefined } };

  return redirect("/documents", {
    headers: { "Set-Cookie": await commitWizard(request, next) },
  });
}

export default function Target() {
  const { wizard } = useLoaderData<typeof loader>();
  const data = useActionData<typeof action>();

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto", fontFamily: "system-ui" }}>
      <h2>Target</h2>
      <p>Hi {wizard.profile?.fullName}. Choose your work type and role.</p>

      <Form method="post">
        <div style={{ display: "grid", gap: 10 }}>
          <label>
            Work type*<br />
            <select name="workType" defaultValue="">
              <option value="" disabled>Select…</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
            {data?.errors?.workType ? <div style={{ color: "crimson" }}>{data.errors.workType}</div> : null}
          </label>

          <label>
            Job role*<br />
            <input name="jobRole" placeholder="e.g., Operations Coordinator" />
            {data?.errors?.jobRole ? <div style={{ color: "crimson" }}>{data.errors.jobRole}</div> : null}
          </label>

          <label>
            Company (optional)<br />
            <input name="company" placeholder="e.g., Acme Inc." />
          </label>

          <button type="submit">Next: Documents</button>
        </div>
      </Form>
    </div>
  );
}
