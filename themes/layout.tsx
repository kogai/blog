import React from "react";

export const Layout: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title
}) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
        name="viewport"
      />
      <title>{title}</title>
    </head>
    <body>{children}</body>
  </html>
);
