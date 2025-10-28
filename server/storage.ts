import { type EmployeeRegistration, type InsertEmployeeRegistration } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getEmployeeRegistration(id: string): Promise<EmployeeRegistration | undefined>;
  createEmployeeRegistration(registration: InsertEmployeeRegistration): Promise<EmployeeRegistration>;
}

export class MemStorage implements IStorage {
  private registrations: Map<string, EmployeeRegistration>;

  constructor() {
    this.registrations = new Map();
  }

  async getEmployeeRegistration(id: string): Promise<EmployeeRegistration | undefined> {
    return this.registrations.get(id);
  }

  async createEmployeeRegistration(insertRegistration: InsertEmployeeRegistration): Promise<EmployeeRegistration> {
    const id = randomUUID();
    const registration: EmployeeRegistration = { 
      id,
      fullName: insertRegistration.fullName,
      age: insertRegistration.age,
      gender: insertRegistration.gender,
      phoneNumber: insertRegistration.phoneNumber,
      email: insertRegistration.email ?? null,
      password: insertRegistration.password,
      languagesKnown: insertRegistration.languagesKnown,
      region: insertRegistration.region,
      skills: insertRegistration.skills,
      pastWorkDetails: insertRegistration.pastWorkDetails ?? null,
      workProofUrl: insertRegistration.workProofUrl ?? null,
      videoIntroUrl: insertRegistration.videoIntroUrl ?? null,
      certificationTags: insertRegistration.certificationTags ?? null,
      aadhaarNumber: insertRegistration.aadhaarNumber,
      panNumber: insertRegistration.panNumber ?? null,
      idProofUrl: insertRegistration.idProofUrl,
      termsAccepted: insertRegistration.termsAccepted,
      status: "pending"
    };
    this.registrations.set(id, registration);
    return registration;
  }
}

export const storage = new MemStorage();
