import Image from "next/image";
import { useRouter } from "next/router";
import { useGetNewsSingleQuery } from "../../services/news/newsRealApi";

const EventPage = () => {
  const { query } = useRouter();
  const news = useGetNewsSingleQuery(query.id?.toString() || "1")?.data;
  return (
    <>
      <div className="relative">
        <img
          className="object-cover w-full h-[34rem] z-10"
          src={news?.ImageUrl}
        />
        <h1 className="absolute text-coral text-6xl font-bold top-4 left-4 drop-shadow-lg">
          {news?.Title}
        </h1>
        <p className="text-white mt-6">{news?.Body} </p>
      </div>
      <div className="flex flex-row justify-between">
        <div className="basis-2/5 z-20 ml-1">
          {!!news?.EventID && (
            <button className="-mt-32 mb-16 flex items-center relative text-white border-2 pl-10 py-3 pr-2 text-2xl rounded-full border-white mb-4">
              ЗАРЕГИСТРИРОВАТЬСЯ
              <Image
                alt="Картинка ссылочки"
                src="/arrow.svg"
                className="ml-6"
                width={42}
                height={42}
              />
            </button>
          )}
          <p className="text-white -mt-12">{news?.Event?.Description}</p>
        </div>
        <div className="basis-3/5 z-20 -mt-12 ml-1">
          <p className="cringe-text text-transparent text-5xl font-bold text-right tracking-wider">
            {news?.Event?.Name}
          </p>
        </div>
      </div>
    </>
  );
};

export default EventPage;
