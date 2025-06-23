import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";


export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    console.log("No session found, redirecting to login");
    redirect("/auth/login");
  }

  return <div>{children}</div>;
}
