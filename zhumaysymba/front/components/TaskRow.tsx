import Image from "next/image";
import {FC} from "react";
import {Badge} from "../pages/api/models/badge";
import {Task} from "../pages/api/models/task";

const TaskRow: FC<Task> = ({Name, EventID, Reward}) => (
    <div className="flex justify-between items-center">
        <div className="block items-center">
            <p className="block mt-1 text-white font-medium text-md">{Name}</p>
            <p className="block mt-1 text-[#DCDCDC] text-sm">{EventID}</p>
        </div>
        <div className="flex items-center">
            <p className="mt-1 text-white font-medium text-md">{Reward}</p>
            <Image
                src="/coin.svg"
                alt="Картинка монеты"
                width={24}
                height={24}
            /></div>
    </div>

);

export default TaskRow;
