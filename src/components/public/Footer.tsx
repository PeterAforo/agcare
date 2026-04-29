import Link from "next/link";
import Image from "next/image";
// Social icons as inline SVGs (lucide-react doesn't include brand icons)
const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
);
const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
);

const footerMenu = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/profile" },
  { label: "Programmes", href: "/causes/programs" },
  { label: "Projects", href: "/causes/projects" },
  { label: "News", href: "/media/news" },
  { label: "Contact", href: "/contacts" },
];

export default function Footer() {
  return (
    <footer className="py-[60px]" style={{ backgroundColor: "#20212b", color: "#a9a9ab" }}>
      <div className="container mx-auto px-4">
        {/* Main 4-column row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + Socials */}
          <div>
            <div className="footer-logo">
              <Link href="/">
                <Image
                  src="/images/logo_white.png"
                  alt="AGREDS"
                  width={180}
                  height={60}
                  className="max-h-[50px] lg:max-h-[60px] w-auto h-auto"
                />
              </Link>
            </div>
            <ul className="flex p-0 mt-[27px] mb-[30px] sm:mb-0" style={{ color: "#fff" }}>
              <li className="list-none mr-[40px]">
                <a href="#" className="text-inherit hover:opacity-75 transition-opacity">
                  <FacebookIcon />
                </a>
              </li>
              <li className="list-none mr-[40px]">
                <a href="#" className="text-inherit hover:opacity-75 transition-opacity">
                  <TwitterIcon />
                </a>
              </li>
              <li className="list-none">
                <a href="#" className="text-inherit hover:opacity-75 transition-opacity">
                  <InstagramIcon />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[20px] font-bold mb-[20px]" style={{ color: "#fff" }}>Contacts</h4>
            <div className="mb-[30px] lg:mb-0">
              <p className="mb-0 leading-[32px]">
                Assemblies of God Relief &amp; Development Services (AGREDS)
                <br />
                P.O. Box AN 7593, Accra &ndash; Ghana
              </p>
              <p className="mb-0 leading-[32px]">
                Phone:{" "}
                <a href="tel:+233302779458" className="text-inherit no-underline hover:opacity-75 transition-opacity">
                  +233 (0) 302 779 458
                </a>
              </p>
              <p className="mb-0 leading-[32px]">
                Email:{" "}
                <a href="mailto:info@agredsghana.org" className="text-inherit no-underline hover:opacity-75 transition-opacity">
                  info@agredsghana.org
                </a>
              </p>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-[20px] font-bold mb-[20px]" style={{ color: "#fff" }}>Menu &amp; Links</h4>
            <ul className="flex flex-wrap p-0 m-0 mb-[30px] sm:mb-0">
              {footerMenu.map((item) => (
                <li key={item.label} className="list-none w-1/2">
                  <Link
                    href={item.href}
                    className="inline-block relative leading-[32px] no-underline transition-opacity hover:opacity-75"
                    style={{ color: "#a9a9ab" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Donate */}
          <div>
            <h4 className="text-[20px] font-bold mb-[20px]" style={{ color: "#fff" }}>Donate</h4>
            <p className="mb-0 leading-[32px]">
              Support our mission to bring hope, education, healthcare, and relief to
              vulnerable communities across Ghana.
            </p>
            <Link
              href="/get-involved/donate"
              className="block w-full text-center font-bold text-[14px] uppercase mt-[4px] px-[30px] py-[13px] rounded-full transition-all hover:-translate-y-[3px]"
              style={{ backgroundColor: "#efc940", color: "#333" }}
            >
              Donate Now
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center md:items-baseline justify-between mt-[50px] md:mt-[70px]">
          <p className="mb-[15px] md:mb-0 text-center md:text-left text-[14px]" style={{ color: "#65656b" }}>
            &copy; 2025 AGREDS. All Rights Reserved.
          </p>
          <div className="text-center md:text-right text-[14px]" style={{ color: "#65656b" }}>
            <Link href="/privacy" className="no-underline hover:underline" style={{ color: "inherit" }}>
              Privacy Policy
            </Link>
            <span className="px-[8px]">|</span>
            <Link href="/terms" className="no-underline hover:underline" style={{ color: "inherit" }}>
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
