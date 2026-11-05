import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer className="border-t border-[#f3f1ec18] bg-[#0c0b0b] text-[#f3f1ec]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center shrink-0">
            <Image
              src="/images/fullsphere-logo-white.png"
              alt="Full Sphere Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-[#f3f1ec] block">FULL SPHERE</span>
            <span className="text-[9px] font-mono text-[#9c9590] uppercase tracking-wider block">
              ALL POSSIBILITIES. ONE SPHERE.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#9c9590]">
          <Link href="/#studio" className="hover:text-[#f3f1ec] transition-colors">STUDIO</Link>
          <Link href="/#approach" className="hover:text-[#f3f1ec] transition-colors">APPROACH</Link>
          <Link href="/#work" className="hover:text-[#f3f1ec] transition-colors">PORTFOLIO</Link>
          <Link href="/projects" className="hover:text-[#f3f1ec] transition-colors">PROJECTS</Link>
          <Link href="/#services" className="hover:text-[#f3f1ec] transition-colors">SERVICES</Link>
          <Link href="/#contact" className="hover:text-[#d7193a] transition-colors">CONTACT</Link>
        </div>

        <div className="text-[11px] font-mono text-[#9c9590] text-center sm:text-right">
          <p>© {new Date().getFullYear()} FULL SPHERE GROUP</p>
          <p className="text-[#d7193a]">FULLSPHEREGROUP@GMAIL.COM</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


