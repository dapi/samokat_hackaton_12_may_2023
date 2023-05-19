import {Badge} from "./badge";
import {Task} from "./task";
import {Gift} from "./gift";

export interface Employee {
    ID: number;
    Name: string;
    Balance: string;
    About: string;
    RocketChatID: string;
    ImageUrl: string;

    Badges: Badge[];
    Tasks:  Task[];
    Gifts:  Gift[];
}
