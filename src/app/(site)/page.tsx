import HomePage from "@/features/site/components/(home)";

import { getCsrfToken } from "@/utils/csrf";

export default async function Home() {
  const csrfToken = await getCsrfToken();

  return <HomePage csrfToken={csrfToken} />;
}
