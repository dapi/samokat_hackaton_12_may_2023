import { IEvent } from "./event";

export interface News {
    ID: number;
    ImageUrl: string;
    Title: string;
    Body: string;
    IsMain?: boolean;
    EventID?: number;
    Event?: IEvent;
}
