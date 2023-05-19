import {Employee} from "./employee";
export interface Unit {
    ID?: string;
    Name: string;

    EmployeeUnits: {Employee: Employee}[];
    Units: Unit[];
}
