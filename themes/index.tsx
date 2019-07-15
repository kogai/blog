import React from "react";
import dayjs from "dayjs";

export type Props = {
  posts: { date: string; title: string; filename: string }[];
  statics: { title: string; filename: string }[];
};

export const Index: React.FC<Props> = ({ posts, statics }) => (
  <section>
    <h1>dev log</h1>
    <hr />
    <h2>Posts</h2>
    <ul>
      {posts
        .sort((a, b) => {
          const aDate = dayjs(a.date);
          const bDate = dayjs(b.date);
          if (aDate.isSame(bDate)) {
            return 0;
          }
          return aDate.isBefore(bDate) ? 1 : -1;
        })
        .map(({ title, filename, date }) => (
          <li key={title}>
            <span style={{ marginRight: 10 }}>
              {dayjs(date).format("YYYY-MM-DD")}
            </span>
            <a href={`/${filename}`}>{title}</a>
          </li>
        ))}
    </ul>
    <hr />
    <h2>Pages</h2>
    <ul>
      {statics.map(({ title, filename }) => (
        <li key={title}>
          <a href={`/${filename}`}>{title}</a>
        </li>
      ))}
    </ul>
  </section>
);
