import { serve } from "bun";
import { api } from "./api";
import index from "./index.html";

serve({
  static: {
    "/": index,
  },
  fetch: api.handle,
  development: true,
  idleTimeout: 60,
});

console.log("Server started at http://localhost:3000");
