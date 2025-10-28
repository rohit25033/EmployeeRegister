import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const employeeRegistrations = pgTable("employee_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  phoneNumber: text("phone_number").notNull(),
  email: text("email"),
  password: text("password").notNull(),
  languagesKnown: text("languages_known").array().notNull(),
  region: text("region").notNull(),
  skills: text("skills").array().notNull(),
  pastWorkDetails: text("past_work_details"),
  workProofUrl: text("work_proof_url"),
  videoIntroUrl: text("video_intro_url"),
  certificationTags: text("certification_tags").array(),
  aadhaarNumber: text("aadhaar_number").notNull(),
  panNumber: text("pan_number"),
  idProofUrl: text("id_proof_url").notNull(),
  termsAccepted: integer("terms_accepted").notNull(),
  status: text("status").notNull().default("pending"),
});

export const insertEmployeeRegistrationSchema = createInsertSchema(employeeRegistrations).omit({
  id: true,
  status: true,
});

export type InsertEmployeeRegistration = z.infer<typeof insertEmployeeRegistrationSchema>;
export type EmployeeRegistration = typeof employeeRegistrations.$inferSelect;
