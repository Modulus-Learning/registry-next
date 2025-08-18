export function EarlyThemeDetection({ nonce }: { nonce?: string }) {
  return (
    // biome-ignore lint/correctness/useUniqueElementIds: id is fine here.
    <script
      id="theme-detection"
      nonce={nonce ?? undefined}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: We need this.
      dangerouslySetInnerHTML={{
        __html: `
              (() => {
                const classList = document.documentElement.classList;
                const style = document.documentElement.style;
                const theme = localStorage.theme
                // This site defaults to dark mode, but respects user preference if set.
                // const dark = window.matchMedia("(prefers-color-scheme: dark)");
                if (localStorage.theme == null) {
                  localStorage.setItem("theme", "dark");
                  classList.add("dark");
                  style.colorScheme = "dark";
                } else {
                  if (theme === "dark") {
                    classList.remove("light");
                    classList.add("dark");
                    style.colorScheme = "dark";
                  } else if (theme === "light") {
                    classList.remove("dark");
                    classList.add("light");
                    style.colorScheme = "light";
                  }
                }
              })();
            `,
      }}
    />
  )
}
