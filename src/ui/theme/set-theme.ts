import type { Theme } from './utils'

export async function setTheme(theme: Theme): Promise<void> {
  localStorage.setItem('theme', theme as string)
}
