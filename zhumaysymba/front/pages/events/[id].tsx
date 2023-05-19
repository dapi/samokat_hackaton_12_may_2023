import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import TaskRow from "../../components/Task";
import { useGetTasksQuery } from "../../services/tasks/taskRealApi";
import {useGetEventQuery} from "../../services/event/eventRealApi";
import Image from "next/image";

const EventPage = () => {
  const router = useRouter();

  const tasks = useGetTasksQuery().data;

  const { query } = useRouter();
  const event = useGetEventQuery(query.id?.toString() || "1")?.data;

  return (
    <>
      <img
        className="object-cover w-full h-96 z-10"
        src={event?.ImageUrl}
      />
      <div className="flex flex-row">
        <div className="basis-1/2 z-20 -mt-16 ml-1">
          <p className="text-white text-5xl font-bold w-4/5">
            {event?.Name}
          </p>
          <p className="text-white mt-6">
            {event?.Description}{" "}
          </p>
        </div>
          <div className="flex flex-row justify-between">
              <div className="basis-2/5 z-20 ml-1 drop-shadow-xl">
                  <button className="-mt-32 mb-16 flex items-center relative text-white border-2 pl-10 py-3 pr-2 text-2xl rounded-full border-white shadow-red-500/20 mb-4">
                      ЗАРЕГИСТРИРОВАТЬСЯ
                  </button>
              </div>
              <div className="basis-3/5 z-20 -mt-12 ml-1">
                  <p className="cringe-text text-transparent text-5xl font-bold text-right tracking-wider">
                  </p>
              </div>
          </div>
        <ul className="ml-8 pb-4 basis-1/2">
          {!!router?.query.isAdmin && (
            <Button
              className="px-6 py-3 mt-4"
              onClick={() => {
                router.push({
                  pathname: "../admin-panel/task/create",
                  query: {
                    eventID: router.query.id,
                  },
                });
              }}
            >
              Добавить
            </Button>
          )}
          {event?.Tasks?.map((task, index) => (
            <li className="product-card mt-4" key={index}>
              <TaskRow isAdmin={!!router?.query.isAdmin || false} {...task} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EventPage;
