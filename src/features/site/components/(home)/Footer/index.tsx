import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full p-6 mt-16">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <div>© 2025 Croi</div>
        <div className="flex flex-col gap-1 text-center">
        <Link
          href="https://www.linkedin.com/in/monishkadam "
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Made with ❤️
        </Link>
        <Link
          href="https://buymeacoffee.com/monishkadam"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Support the vision ☕️
        </Link>
        </div>
        <div className="flex gap-6">
          <Link
            href="/pricing"
            className="hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/terms-and-conditions"
            className="hover:text-foreground transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/support"
            className="hover:text-foreground transition-colors"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};
