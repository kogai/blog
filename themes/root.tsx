import React from "react";

type Content = {
  title: string;
  id: string;
  date: string;
  tags: string[];
  body: string;
};

type Props = {
  posts: Content[];
  statics: Content[];
};

export const Post: React.FC<Content> = ({ title, id, date, tags, body }) => (
  <div>
    <h1>{title}</h1>
    <span>{date}</span>
    <ul>
      {tags.map(tag => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
    <hr />
    <section dangerouslySetInnerHTML={{ __html: body }}></section>
  </div>
);
