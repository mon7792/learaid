import { redirect } from "next/navigation";

import { getUser } from "@/utils/auth";


export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUser();

  if (!session) {
    console.log("No session found, redirecting to login");
    redirect("/auth/login");
  }

  return <div>{children}</div>;
}
