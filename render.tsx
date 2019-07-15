import React from "react";
import { resolve, basename } from "path";
import { promises } from "fs";
import { renderToNodeStream, renderToString } from "react-dom/server";
import Markdown from "markdown-it";
import { parse } from "yaml";
import { Post, Content } from "./themes/post";
import { Static } from "./themes/static";
import { Layout } from "./themes/layout";

const { readFile, writeFile, readdir } = promises;
const md = new Markdown();
const output = resolve(__dirname, "..", "public");

const render = (
  inputPath: string,
  Component: React.FC<Content>
): Promise<void> =>
  readdir(inputPath)
    .then(contents =>
      Promise.all(
        contents.map(contentFilename =>
          readFile(resolve(inputPath, contentFilename), {
            encoding: "utf8"
          })
            .then(raw => {
              const [meta, ...contents] = raw
                .split("---")
                .map(text => text.trim())
                .filter(text => text !== "");
              const content = contents.join("\n---\n");

              const { id, ...postMeta } = parse(meta);
              const html = renderToString(
                <Layout title={postMeta.title}>
                  <Component
                    {...postMeta}
                    id={id ? id : contentFilename}
                    body={md.render(content)}
                  />
                </Layout>
              );
              const file = resolve(output, `${basename(contentFilename)}.html`);
              return writeFile(file, html);
            })
            .catch(err => {
              console.log(contentFilename);
              console.error(err);
            })
        )
      )
    )
    .then(() => {
      console.log(`${inputPath} generated.`);
    });

render(resolve(__dirname, "..", "documents", "post"), Post);
render(resolve(__dirname, "..", "documents", "static"), Static);
