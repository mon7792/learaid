import { redirect } from "next/navigation";

import { getUser } from "@/utils/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUser();

  if (session) {
    redirect("/dashboard");
  }

  return <div>{children}</div>;
}
