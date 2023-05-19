import Image from "next/image";
import { FC } from "react";
import {Badge} from "../pages/api/models/badge";

const AchievementCard: FC<Badge> = ({ ImageURL, Name, CreatedAt }) => (
  <div className="flex flex-col justify-center">
    <Image
      className="mx-auto"
      src={ImageURL}
      alt="Картинка достижения"
      width={128}
      height={128}
    />
    <p className="mt-1 text-center text-white font-medium">{Name}</p>
    <p className="mt-1 text-center text-white">{CreatedAt.split("T")[0]}</p>
  </div>
);

export default AchievementCard;
