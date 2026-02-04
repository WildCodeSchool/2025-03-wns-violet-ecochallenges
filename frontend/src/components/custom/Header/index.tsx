import { cn } from "../../../lib/utils";
import { useScrolled } from "../../../hooks/useIsScrolled";
import { useRef, useState, type RefObject } from "react";
import MobileMenuButton from "./MobileMenuButton";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import LogoLink from "./LogoLink";
import { useOnClickOutside } from "usehooks-ts";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { ChevronUp } from "lucide-react";

const Header = () => {
  const isScrolled = useScrolled();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isUserConnected = useAuthStore((state) => state.isConnected);
  const userPictureUrl = useAuthStore((state) => state.user?.pictureUrl);

  useOnClickOutside([menuRef, closeButtonRef] as RefObject<HTMLElement>[], () =>
    setIsMobileMenuOpen(false)
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-10",
        "bg-background text-white",
        "transition-shadow duration-300",
        isScrolled || isMobileMenuOpen ? "shadow-md" : "shadow-none"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          "max-w-7xl px-4 py-3 m-auto"
        )}
      >
        <LogoLink />

        {isUserConnected ? (
          <Button
            variant="ghost"
            className="hover:bg-transparent md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            ref={closeButtonRef}
          >
            <Avatar>
              <AvatarImage src={userPictureUrl} />
              <AvatarFallback className="border border-white">
                <Spinner className="w-4 h-4 text-white" />
              </AvatarFallback>
            </Avatar>
            <ChevronUp
              className={
                isMobileMenuOpen
                  ? "rotate-180 transition-transform"
                  : "transition-transform"
              }
            />
          </Button>
        ) : (
          <MobileMenuButton
            isMenuOpen={isMobileMenuOpen}
            setIsMenuOpen={setIsMobileMenuOpen}
            ref={closeButtonRef}
          />
        )}

        <DesktopMenu />
      </div>
      <MobileMenu
        isMenuOpen={isMobileMenuOpen}
        setIsMenuOpen={setIsMobileMenuOpen}
        ref={menuRef}
      />
    </header>
  );
};

export default Header;
