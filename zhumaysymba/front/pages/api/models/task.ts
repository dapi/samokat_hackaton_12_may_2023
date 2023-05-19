import { Employee } from "./employee";

export interface Task {
    ID: number;
    Name: string;
    Description: string;
    Reward: number;
    EventID: number;
    Employees: Employee[];
}
