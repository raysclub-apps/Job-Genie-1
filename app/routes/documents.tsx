import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { commitWizard, getWizard } from "~/utils/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const wizard = await getWizard(request);
  if (!wizard.profile) return redirect("/profile");
  if (!wizard.target) return redirect("/target");
  return { ok: true };
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const resume = form.get("resume");
  const cover = form.get("cover");

  const errors: Record<string, string> = {};
  if (!(resume instanceof File) || resume.size === 0) errors.resume = "Resume is required";
  if (!(cover instanceof File) || cover.size === 0) errors.cover = "Cover letter is required";
  if (Object.keys(errors).length) return { errors };

  const wizard = await getWizard(request);
  if (!wizard.profile || !wizard.target) return redirect("/profile");

  const next = {
    ...wizard,
    documents: { resumeName: resume.name, coverLetterName: cover.name },
  };

  return redirect("/generate", {
    headers: { "Set-Cookie": await commitWizard(request, next) },
  });
}

export default function Documents() {
  const data = useActionData<typeof action>();

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto", fontFamily: "system-ui" }}>
      <h2>Documents (Required)</h2>
      <p>MVP: upload both files. Later this becomes “Pick from Google Drive”.</p>

      <Form method="post" encType="multipart/form-data">
        <div style={{ display: "grid", gap: 10 }}>
          <label>
            Resume (PDF/DOCX)*<br />
            <input type="file" name="resume" accept=".pdf,.doc,.docx" />
            {data?.errors?.resume ? <div style={{ color: "crimson" }}>{data.errors.resume}</div> : null}
          </label>

          <label>
            Cover letter (PDF/DOCX)*<br />
            <input type="file" name="cover" accept=".pdf,.doc,.docx" />
            {data?.errors?.cover ? <div style={{ color: "crimson" }}>{data.errors.cover}</div> : null}
          </label>

          <button type="submit">Next: Generate</button>
        </div>
      </Form>
    </div>
  );
}
