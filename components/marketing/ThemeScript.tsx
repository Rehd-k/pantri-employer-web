import Script from "next/script";
import { THEME_STORAGE_KEY } from "@/lib/theme";

const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;if(d){r.classList.add("dark");r.style.colorScheme="dark";}else{r.style.colorScheme="light";}}catch(e){}})();`;

export function ThemeScript() {
  return (
    <Script id="pantri-theme-init" strategy="beforeInteractive">
      {themeInitScript}
    </Script>
  );
}
