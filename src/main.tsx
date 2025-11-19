import "reflect-metadata";

import { createRoot } from "react-dom/client";

import * as ort from "onnxruntime-web";

import "@/app/globals.css";
import "@/app/lib/webgpu.ts";

import App from "./app/App.tsx";

ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.23.2/dist/";
ort.env.logLevel = "warning";

createRoot(document.getElementById("root")!).render(<App />);
