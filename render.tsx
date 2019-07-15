import React from "react";
import { resolve } from "path";
import { createWriteStream, createReadStream, readFileSync } from "fs";
import { renderToNodeStream, renderToString } from "react-dom/server";
import Markdown from "markdown-it";
import { parse } from "yaml";
import { Post } from "./themes/root";

const md = new Markdown();
const input = resolve(__dirname, "..", "documents", "post");
const [meta, content] = readFileSync(
  resolve(input, "writing-interpreter-in-rust.md"),
  {
    encoding: "utf8"
  }
)
  .split("---")
  .map(text => text.trim())
  .filter(text => text !== "");

const postMeta = parse(meta);

const html = renderToString(
  <html>
    <head>
      <title>{postMeta.title}</title>
    </head>
    <body>
      <Post {...postMeta} body={md.render(content)} />
    </body>
  </html>
);

console.log(html);
