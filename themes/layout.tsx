import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  postTitle?: string;
};
export const Layout: React.FC<Props> = ({ children, title, postTitle }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
        name="viewport"
      />
      <link rel="stylesheet" href="/style.css" />
      <title>{postTitle ? `${postTitle} | ${title}` : title}</title>
    </head>
    <body>
      <header>
        <h1>
          <a href="/">{title}</a>
        </h1>
      </header>
      {children}
    </body>
  </html>
);
