import React from "react";

export type Content = {
  title: string;
  id: string;
  body: string;
};

export const Static: React.FC<Content> = ({ title, id, body }) => (
  <section>
    <h1>{title}</h1>
    <hr />
    <article dangerouslySetInnerHTML={{ __html: body }} />
  </section>
);
