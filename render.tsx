import React from "react";
import { resolve, basename } from "path";
import { promises } from "fs";
import { renderToNodeStream, renderToString } from "react-dom/server";
import Markdown from "markdown-it";
import { parse } from "yaml";
import { Post, Content } from "./themes/post";
import { Static } from "./themes/static";
import { Layout } from "./themes/layout";
import { Index } from "./themes/index";

const { readFile, writeFile, readdir } = promises;
const md = new Markdown();
const output = resolve(__dirname, "..", "public");
const blogTitle = "kogai.devlog";

const render = (
  inputPath: string,
  Component: React.FC<Content>
): Promise<({ title: string; date?: string; filename: string })[]> =>
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
              const { id, title, date, ...postMeta } = parse(meta);

              const html = renderToString(
                <Layout title={blogTitle} postTitle={title}>
                  <Component
                    {...postMeta}
                    title={title}
                    date={date}
                    id={id ? id : contentFilename}
                    body={md.render(content)}
                  />
                </Layout>
              );

              const htmlFilename = `${basename(contentFilename, ".md")}.html`;
              const file = resolve(output, htmlFilename);

              return writeFile(file, html).then(() => ({
                filename: htmlFilename,
                title,
                date
              }));
            })
            .catch(err => {
              console.log(contentFilename);
              console.error(err);
            })
        )
      )
    )
    .then(results => {
      console.log(`${inputPath} generated.`);
      return results.filter(
        (x): x is { title: string; date: string; filename: string } => !!x
      );
    });

const postRoot = resolve(__dirname, "..", "documents", "post");
const staticRoot = resolve(__dirname, "..", "documents", "static");

Promise.all([render(postRoot, Post), render(staticRoot, Static)]).then(
  ([posts, statics]) => {
    const html = renderToString(
      <Layout title={blogTitle}>
        <Index
          posts={posts.map(({ date, ...post }) => ({
            date: date ? date : "",
            ...post
          }))}
          statics={statics}
        />
      </Layout>
    );
    return writeFile(resolve(output, "index.html"), html);
  }
);
