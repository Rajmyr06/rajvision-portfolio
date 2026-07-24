import { useEffect } from "react";
import { config } from "../config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  useEffect(() => {
    const isCompactView = window.innerWidth <= 1024;

    // Compact layouts use native scrolling. Initializing Lenis and immediately
    // stopping it can leave the document locked when the desktop splash is
    // intentionally skipped.
    if (isCompactView) {
      document.documentElement.classList.remove(
        "lenis",
        "lenis-stopped",
        "lenis-locked",
        "lenis-scrolling",
        "lenis-smooth"
      );
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "auto";
      return;
    }

    // Initialize Lenis smooth scroll
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
      infinite: false,
    });
    lenis.on("scroll", ScrollTrigger.update);

    // Start paused
    lenis.stop();

    // Handle smooth scroll animation frame
    let animationFrameId = 0;
    function raf(time: number) {
      lenis?.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Handle navigation links
    const links = document.querySelectorAll(".header ul a");
    const onLinkClick = (e: Event) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        const elem = e.currentTarget as HTMLAnchorElement;
        const section = elem.getAttribute("data-href");
        if (section && lenis) {
          const target = document.querySelector(section) as HTMLElement;
          if (target) {
            lenis.scrollTo(target, {
              offset: 0,
              duration: 1.2,
            });
          }
        }
      }
    };

    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", onLinkClick);
    });

    // Handle resize
    const onResize = () => {
      lenis?.resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      links.forEach((elem) => elem.removeEventListener("click", onLinkClick));
      window.removeEventListener("resize", onResize);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  const initials = config.developer.fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {initials}
        </a>
        <a
          href={`mailto:${config.contact.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {config.contact.email}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#experience" href="#experience">
              <HoverLinks text="EXPERIENCE" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="PROJECTS" />
            </a>
          </li>
          <li>
            <a data-href="#skills" href="#skills">
              <HoverLinks text="SKILLS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
