import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { z } from "zod";

import { users } from "../auth/schema";

export const boardTypeEnum = [
  "feature_request",
  "bug",
  "question",
  "performance",
  "documentation",
] as const;

export const boardType = pgEnum("board_type", boardTypeEnum);

export type BoardType = (typeof boardType.enumValues)[number];

export const posts = pgTable("posts", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  description: text().notNull(),
  board: boardType().notNull().default("feature_request"),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  authorId: text()
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const postUpvotes = pgTable(
  "post_upvotes",
  {
    id: uuid().primaryKey().defaultRandom(),
    postId: uuid()
      .references(() => posts.id, {
        onDelete: "cascade",
      })
      .notNull(),
    userId: text()
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp()
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("unique_user_post").on(table.userId, table.postId)],
);

export const postComments = pgTable("post_comments", {
  id: uuid().primaryKey().defaultRandom(),
  postId: uuid()
    .references(() => posts.id, {
      onDelete: "cascade",
    })
    .notNull(),
  userId: text()
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  content: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
