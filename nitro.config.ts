// https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',
  preset: process.env.PRESET === 'VERCEL' ? 'vercel-edge' : undefined,
});
