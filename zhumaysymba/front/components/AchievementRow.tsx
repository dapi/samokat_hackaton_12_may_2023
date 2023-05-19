import Image from "next/image";
import { FC } from "react";
import {Badge} from "../pages/api/models/badge";

const AchievementRow: FC<Badge> = ({ ImageURL, Name, CreatedAt }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <Image
        className="mx-auto"
        src={ImageURL}
        alt="Картинка достижения"
        width={26}
        height={26}
      />
      <p className="mt-1 text-center text-white font-medium text-lg">{Name}</p>
    </div>
    <p className="mt-1 text-center text-white text-md">{CreatedAt.split("T")[0]}</p>
  </div>
);

export default AchievementRow;
