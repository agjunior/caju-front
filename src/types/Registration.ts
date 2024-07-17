import { RegistrationStatus } from "~/enums/RegistrationStatus";

export interface Registration {
    id?: string;
    admissionDate: string;
    email: string;
    employeeName: string;
    status: RegistrationStatus;
    cpf: string;
}