import React from "react";

export const Layout: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title
}) => (
  <html>
    <head>
      <title>{title}</title>
    </head>
    <body>{children}</body>
  </html>
);
