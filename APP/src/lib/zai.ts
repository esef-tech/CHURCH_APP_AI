import ZAI from "z-ai-web-dev-sdk";

/**
 * Singleton ZAI SDK instance for backend use only.
 * z-ai-web-dev-sdk MUST be used in server-side code.
 */
let _zai: ZAI | null = null;

export async function getZai(): Promise<ZAI> {
  if (_zai) return _zai;
  _zai = await ZAI.create();
  return _zai;
}
