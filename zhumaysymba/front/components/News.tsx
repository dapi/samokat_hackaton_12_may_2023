import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { FC } from "react";
import toast from "react-hot-toast";
import { News } from "../pages/api/models/news";
import { useDeleteNewsMutation } from "../services/news/newsRealApi";

const NewsCard: FC<News & { isAdmin: boolean }> = ({
  ID,
  ImageUrl,
  Title,
  Body,
  isAdmin,
}) => {
  const router = useRouter();
  const [deleteNews] = useDeleteNewsMutation();
  return (
    <div className="cursor-pointer">
      <img
        className="object-cover h-44 w-full rounded-md"
        src={ImageUrl}
        alt="Картинка новости"
        onClick={() => {
          // @ts-ignore
          window.location = `https://samokat.somnoynadno.ru/news/${ID}`;
        }}
      />
      <div className="info py-2">
        <p className="text-xl text-white font-bold mb-6">{Title}</p>
        <p className="mt-3 text-white text-base font-regular h-20">{Body}</p>
        {isAdmin && (
          <div className="flex gap-4 items-center mt-2">
            <Button
              className="w-full bg-amber-500 shadow-amber-500/20 hover:shadow-amber-500/40 text-white rounded-md font-medium py-3 px-6"
              onClick={() => {
                router.push({
                  pathname: "/admin-panel/news/edit",
                  query: {
                    id: ID,
                  },
                });
              }}
            >
              Изменить
            </Button>
            <Button
              className="w-full bg-red-500 shadow-red-500/20 hover:shadow-red-500/40 text-white rounded-md font-medium p-3 py-3 px-6"
              onClick={async () => {
                try {
                  await deleteNews(ID).unwrap();
                  toast.success("Новость успешно удалена");
                } catch (err) {
                  console.log(err);
                  toast.error("Упс... Что-то пошло не так :(");
                }
              }}
            >
              Удалить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default NewsCard;
