// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  pgTable,
  timestamp,
  varchar,
  real,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `letitbe_${name}`);

export const users = pgTable("user", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 256 }),
  bloodPressureLow: integer("blood_pressure_low").default(0),
  bloodPressureHigh: integer("blood_pressure_high").default(0),
  bloodSugar: real("blood_sugar").default(0),
  height: real("height").default(0),
  weight: real("weight").default(0),
  emergency_number: varchar("emergency_number", { length: 15 }).default(
    "+918318616613",
  ),
  dateOfBirth: timestamp("date_of_birth"),
  oxygenLevel: integer("oxygen_level").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  nextReminder: timestamp("next_reminder").$onUpdate(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }),
});
