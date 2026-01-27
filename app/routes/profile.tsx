import { createCookieSessionStorage } from "@remix-run/node";

type WizardState = {
  connectedDrive?: boolean;

  profile?: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
  };

  target?: {
    workType: "remote" | "hybrid" | "onsite";
    jobRole: string;
    company?: string;
  };

  documents?: {
    resumeName: string;
    coverLetterName: string;
  };
};

const sessionSecret = process.env.SESSION_SECRET || "dev-secret-change-me";

export const wizardSession = createCookieSessionStorage({
  cookie: {
    name: "__wizard",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getWizard(request: Request): Promise<WizardState> {
  const session = await wizardSession.getSession(request.headers.get("Cookie"));
  return (session.get("wizard") || {}) as WizardState;
}

export async function commitWizard(request: Request, next: WizardState) {
  const session = await wizardSession.getSession(request.headers.get("Cookie"));
  session.set("wizard", next);
  return wizardSession.commitSession(session);
}

export async function clearWizard(request: Request) {
  const session = await wizardSession.getSession(request.headers.get("Cookie"));
  session.unset("wizard");
  return wizardSession.commitSession(session);
}
