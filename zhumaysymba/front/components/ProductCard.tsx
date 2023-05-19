import Image from "next/image";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { Gift } from "../pages/api/models/gift";
import { useBuyGiftMutation } from "../services/gift/giftRealApi";

const ProductCard: FC<Gift> = ({ ID, Src, Name, Price }) => {
  const [buyGift] = useBuyGiftMutation();

  return (
    <>
      <img className="rounded-md" src={Src} alt="Картинка товара" />
      <div className="info">
        <p className="text-lg font-medium text-white mt-1">{Name}</p>
        <div className="flex items-center">
          <p className="text-md text-white">{Price}</p>
          <Image
            className="ml-2"
            src="/coin.svg"
            alt="валюта"
            width={26}
            height={26}
          />
        </div>
        <button
          className="w-full py-1.5 mt-2 bg-coral text-white flex justify-center rounded-md"
          onClick={async () => {
            try {
              await buyGift({
                EmployeeID: 12,
                GiftID: ID,
              }).unwrap();
              toast.success("Товар успешно добавлен");
            } catch (err: any) {
              if (err?.data === "not enough money") {
                toast.error("На счету недостаточно средств");
              } else {
                toast.error("Упс... Что-то пошло не так :(");
              }
            }
          }}
        >
          <Image src="/cart.svg" alt="Иконка корзины" width={24} height={24} />
          <span className="ml-2">Купить</span>
        </button>
      </div>
    </>
  );
};

export default ProductCard;
