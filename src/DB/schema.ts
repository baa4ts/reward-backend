import { InferModel } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const rewardTable = sqliteTable("rewards_db", {
    id: int("id").primaryKey({ autoIncrement: true }),
    bg: text("bg").notNull().default("bg-gradient-to-r from-indigo-400 to-cyan-400"),
    icon: text("icon").notNull(),
    link: text("link").notNull(),
    category: text("category").notNull().default("Emotes"),
    amount: int("amount").notNull().default(0)
});

export type Reward_DB = InferModel<typeof rewardTable>;
