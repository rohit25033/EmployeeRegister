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

// QSR Registration Schema
export const qsrRegistrations = pgTable("qsr_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phoneNumber: text("phone_number").notNull(),
  restaurantBrandName: text("restaurant_brand_name").notNull(),
  registeredBusinessName: text("registered_business_name"),
  pocFullName: text("poc_full_name").notNull(),
  pocEmail: text("poc_email").notNull(),
  contactNumber: text("contact_number").notNull(),
  restaurantAddress: text("restaurant_address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  pincode: text("pincode").notNull(),
  registrationNumber: text("registration_number").notNull(),
  fssaiLicense: text("fssai_license").notNull(),
  gstNumber: text("gst_number").notNull(),
  panNumber: text("pan_number").notNull(),
  gstCertificateUrl: text("gst_certificate_url"),
  fssaiCertificateUrl: text("fssai_certificate_url"),
  businessRegistrationProofUrl: text("business_registration_proof_url"),
  panCardUrl: text("pan_card_url"),
  bankAccountProofUrl: text("bank_account_proof_url"),
  fireSafetyCertificateUrl: text("fire_safety_certificate_url"),
  municipalNocUrl: text("municipal_noc_url"),
  shopExteriorPhotoUrl: text("shop_exterior_photo_url"),
  detailsAccuracyConfirmed: integer("details_accuracy_confirmed").notNull(),
  verificationConsent: integer("verification_consent").notNull(),
  status: text("status").notNull().default("pending"),
});

export const insertQsrRegistrationSchema = createInsertSchema(qsrRegistrations).omit({
  id: true,
  status: true,
});

export type InsertQsrRegistration = z.infer<typeof insertQsrRegistrationSchema>;
export type QsrRegistration = typeof qsrRegistrations.$inferSelect;

// Franchisee Registration Schema
export const franchiseeRegistrations = pgTable("franchisee_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phoneNumber: text("phone_number").notNull(),
  franchiseeBusinessName: text("franchisee_business_name").notNull(),
  registeredCompanyName: text("registered_company_name").notNull(),
  pocFullName: text("poc_full_name").notNull(),
  pocEmail: text("poc_email").notNull(),
  contactNumber: text("contact_number").notNull(),
  businessAddress: text("business_address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  pincode: text("pincode").notNull(),
  status: text("status").notNull().default("pending"),
});

export const insertFranchiseeRegistrationSchema = createInsertSchema(franchiseeRegistrations).omit({
  id: true,
  status: true,
});

export type InsertFranchiseeRegistration = z.infer<typeof insertFranchiseeRegistrationSchema>;
export type FranchiseeRegistration = typeof franchiseeRegistrations.$inferSelect;
