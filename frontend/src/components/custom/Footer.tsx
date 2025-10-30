import { Link } from "react-router";
import { TypographyP } from "../ui/typographyP";
import { TypographyH3 } from "../ui/typographyH3";
import { cn } from "../../lib/utils";

const Footer = () => {
  const menuItems = [
    {
      title: "Compte",
      links: [
        { text: "Inscription", url: "/signup" },
        { text: "Connexion", url: "/signin" },
        { text: "Profil", url: "#" },
      ],
    },
    {
      title: "Captain Planet",
      links: [
        { text: "A propos", url: "#" },
        { text: "Contact", url: "#" },
        { text: "Mentions légales", url: "#" },
        { text: "Confidentialité", url: "#" },
      ],
    },
  ];

  return (
    <section className="bg-primary p-8">
      <footer className="container mx-auto">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-6">
          <Link
            to={"/"}
            className={cn(
              "col-span-1 lg:col-span-2",
              "flex items-center gap-2 justify-center"
            )}
          >
            <img
              src="/grey-cap-logo.svg"
              className="h-12 w-12"
              alt="grey captain planet logo"
            />
            <TypographyP className="font-sansitaBoldItalic font-medium text-xl md:text-3xl text-background leading-none w-20 md:w-28">
              Captain Planet
            </TypographyP>
          </Link>

          <div className="col-span-1 lg:col-span-4 grid grid-cols-2 gap-8 ">
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx} className="text-left">
                <TypographyH3 className="mb-4 font-bold text-background">
                  {section.title}
                </TypographyH3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="text-muted hover:text-background hover:font-medium"
                    >
                      <Link to={link.url}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <TypographyP
          className={cn(
            "text-muted text-center text-sm ",
            "mt-24 pt-8",
            "border-t border-background"
          )}
        >
          © 2025 CaptainPlanet.com. All rights reserved.
        </TypographyP>
      </footer>
    </section>
  );
};

export { Footer };
