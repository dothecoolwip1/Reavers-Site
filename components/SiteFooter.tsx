import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { navItems, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand">
            <BrandMark className="footer-mark" />
            <div>
              <strong>Red Deer Reavers</strong>
              <p>Historical Armored Combat Sports Association</p>
            </div>
          </div>
          <p className="footer-copy">
            Full contact armored sport in Central Alberta. Newcomers are welcome
            to see a practice, meet the team, and find out whether buhurt is for them.
          </p>
        </div>

        <div>
          <h2 className="footer-heading">Explore</h2>
          <div className="footer-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="footer-heading">Connect</h2>
          <div className="footer-links">
            <a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={site.hacsa} target="_blank" rel="noreferrer">HACSA Team Directory</a>
          </div>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Red Deer Reavers</span>
        <span>Forged in Central Alberta</span>
      </div>
    </footer>
  );
}
