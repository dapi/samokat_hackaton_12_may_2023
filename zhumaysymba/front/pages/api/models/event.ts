import {Task} from "./task";

export interface IEvent {
    ID: number;
    Name: string;
    Description: string;
    ImageUrl: string;
    Place: string;
    Date: string;
    Price: number;
    IsActive: boolean;

    Tasks?: Task[];
}
