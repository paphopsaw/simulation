import * as esbuild from "https://deno.land/x/esbuild@v0.25.4/mod.js";
import * as _ from "../mod.ts"; // This is for watching the file
import { serveDir, serveFile } from "jsr:@std/http/file-server";

// Build the project
await esbuild.build({
  entryPoints: ["examples/index.ts"],
  bundle: true,
  outfile: "public/lib.js",
  minify: true,
});
await esbuild.stop();

Deno.serve({ port: 8080 }, (req: Request) => {
  const pathname = new URL(req.url).pathname;

  if (pathname === "/") {
    return serveFile(req, "./public/index.html");
  }

  if (pathname === "/lib.js") {
    return serveFile(req, "./public/lib.js");
  }

  if (pathname.startsWith("/static")) {
    return serveDir(req, {
      fsRoot: "public",
      urlRoot: "static",
    });
  }

  return new Response("404: Not Found", {
    status: 404,
  });
});
