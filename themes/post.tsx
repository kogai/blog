import React from "react";

export type Content = {
  title: string;
  id: string;
  date: string;
  tags: string[];
  body: string;
};

export const Post: React.FC<Content> = ({ title, id, date, tags, body }) => (
  <section>
    <h1>{title}</h1>
    <span>{date}</span>
    <ul>
      {tags.map(tag => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
    <hr />
    <article dangerouslySetInnerHTML={{ __html: body }} />
  </section>
);
