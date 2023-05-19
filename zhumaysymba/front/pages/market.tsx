import { useRouter } from "next/router";
import ProductCard from "../components/ProductCard";
import { useGetGiftsQuery } from "../services/gift/giftRealApi";

const Market = () => {
  const { push, query } = useRouter();
  let category = query?.category;

  if (typeof category !== "string") {
    category = "";
  }
  const { data } = useGetGiftsQuery(category || "");

  const categoryHandler = (e: any) => {
    const target = e.target as HTMLLIElement;
    push({ query: { ...query, category: target.innerText } });
  };

  return (
    <>
      <div className="p-4 mt-2">
        <ul className="flex justify-center text-white text-lg">
          <li className="cursor-pointer" onClick={(e) => categoryHandler(e)}>
            Одежда
          </li>
          <li
            className="cursor-pointer ml-6"
            onClick={(e) => categoryHandler(e)}
          >
            Техника
          </li>
          <li
            className="cursor-pointer ml-6"
            onClick={(e) => categoryHandler(e)}
          >
            Сувениры
          </li>
          <li
            className="cursor-pointer ml-6"
            onClick={(e) => categoryHandler(e)}
          >
            Другое
          </li>
        </ul>
      </div>
      <ul className="h-full mt-2 grid grid-cols-5 gap-x-6 gap-y-2">
        {data?.filter(v => category ? v.Category === category : true)?.map((product, index) => (
          <li className="cursor-pointer" key={index}>
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Market;
