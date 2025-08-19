export function EarlyThemeDetection({
  nonce,
  force,
}: {
  nonce?: string
  force?: 'light' | 'dark'
}) {
  return (
    <script
      id="theme-detection"
      nonce={nonce ?? undefined}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: We need this.
      dangerouslySetInnerHTML={{
        __html: `
              (() => {
                const classList = document.documentElement.classList;
                const style = document.documentElement.style;
                const theme = localStorage?.theme
                const system = window.matchMedia("(prefers-color-scheme: dark)");
                const force = ${force}
                if (theme == null) {
                  if (force == null) {
                    if (system.matches) {
                      classList.remove("light");  
                      classList.add("dark");
                      style.colorScheme = "dark";
                    } else {
                      classList.remove("dark");
                      classList.add("light");
                      style.colorScheme = "light";
                    }
                  } else {
                    localStorage.setItem("theme", force);
                    classList.remove("light");
                    classList.remove("dark");
                    classList.add(force);
                    style.colorScheme = force;
                  }
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
