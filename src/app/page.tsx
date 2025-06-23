import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSession, signOut } from "@/lib/auth-client";

const samplePrompts = [
]

const handleSubmit = async (promptText: string) => {
}

const router = useRouter();
const { data: session } = useSession();

const handleSubmit = async (promptText: string) => {
}

        </div>
        <div className="flex gap-3">
          {session ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/pricing">Pricing</Link>
              </Button>
              <Button variant="ghost" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>
      </header>