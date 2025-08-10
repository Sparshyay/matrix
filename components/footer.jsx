import Link from "next/link";
import { Github, Twitter, Dribbble } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Matrix Studio</p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Link aria-label="GitHub" href="https://github.com" target="_blank" className="hover:text-foreground">
            <Github className="h-5 w-5" />
          </Link>
          <Link aria-label="Twitter" href="https://x.com" target="_blank" className="hover:text-foreground">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link aria-label="Dribbble" href="https://dribbble.com" target="_blank" className="hover:text-foreground">
            <Dribbble className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


