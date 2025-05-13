import * as esbuild from "https://deno.land/x/esbuild@v0.25.4/mod.js";

await esbuild.build({
  entryPoints: ["mod.ts"],
  bundle: true,
  outfile: "dist/lib.js",
  minify: true,
});
await esbuild.stop();
