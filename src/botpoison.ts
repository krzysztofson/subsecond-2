/**
 * Botpoison spam protection for the Formspark forms. Formspark checks the
 * `_botpoison` field with the secret key set in its dashboard; only the
 * public key ships here (VITE_BOTPOISON_PUBLIC_KEY in .env).
 * The client is loaded on first use, and solving starts when a visitor
 * focuses a form, so the proof-of-work is usually done by submit time.
 */

export const BOTPOISON_FIELD = '_botpoison';

const PUBLIC_KEY: string = import.meta.env.VITE_BOTPOISON_PUBLIC_KEY ?? '';

let pending: Promise<string> | null = null;

async function solve(): Promise<string> {
  const { default: Botpoison } = await import('@botpoison/browser');
  const { solution } = await new Botpoison({ publicKey: PUBLIC_KEY }).challenge();
  return solution;
}

/** Start solving a challenge ahead of submit. Safe to call repeatedly. */
export function prepareBotpoison(): void {
  if (!PUBLIC_KEY || pending) return;
  pending = solve();
  // A failure surfaces when the solution is awaited at submit; don't log it twice.
  pending.catch(() => {});
}

/**
 * A fresh, single-use solution for the `_botpoison` field, or null when no
 * public key is configured. Rejects if the challenge can't be solved.
 */
export async function getBotpoisonSolution(): Promise<string | null> {
  if (!PUBLIC_KEY) return null;
  const solution = pending ?? solve();
  pending = null;
  return solution;
}
