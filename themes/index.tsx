import React from "react";
import dayjs from "dayjs";

export type Props = {
  posts: { date: string; title: string; filename: string }[];
  statics: { title: string; filename: string }[];
};

export const Index: React.FC<Props> = ({ posts, statics }) => (
  <section>
    <article>
      <h1>Posts</h1>
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
    </article>
    <article>
      <h1>Pages</h1>
      <ul>
        {statics.map(({ title, filename }) => (
          <li key={title}>
            <a href={`/${filename}`}>{title}</a>
          </li>
        ))}
      </ul>
    </article>
  </section>
);
