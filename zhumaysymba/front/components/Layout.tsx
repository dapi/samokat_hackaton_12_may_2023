import Image from "next/image";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { useGetEmployeeQuery } from "../services/employee/employeeRealApi";

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const employee = useGetEmployeeQuery("12").data;
  return (
    <div className="bg-dark min-h-screen h-full">
      <Toaster />
      <div className="border-b-2 border-gray-100/10">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <ul className="flex items-center pl-0 py-3">
            <Link className="nav__link text-black text-lg" href="/">
              <Image src="/logo.svg" alt="Логотип" width={180} height={60} />
            </Link>
            <Link className="nav__link text-md text-white ml-12" href="/events">
              Мероприятия
            </Link>
            <Link className="nav__link text-md text-white ml-6" href="/staff">
              Сотрудники
            </Link>
            <Link
              className="nav__link text-md text-white ml-6 disabled"
              href="#"
            >
              Бронь мест
            </Link>
            <Link className="nav__link text-md text-white ml-6" href="/market">
              Магазин
            </Link>
            <Link
              className="nav__link text-md text-white ml-6"
              href="/admin-panel"
            >
              Админка
            </Link>
          </ul>
          <div className="flex">
            <div className="search relative">
              <Image
                className="absolute top-2.5 left-3"
                src="/search.svg"
                alt="Аватар"
                width={24}
                height={24}
              />
              <input
                className="border-2 border-grey rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 ring-white"
                type="search"
                placeholder="Search..."
              />
            </div>
            <div className="flex items-center ml-6">
              <Image src="/coin.svg" alt="Монетка" width={28} height={28} />
              <p className="text-white text-lg">{employee?.Balance}</p>
            </div>
            <Link href="/profile">
              <Image
                className="profile ml-6"
                src="/avatar.svg"
                alt="Аватар"
                width={36}
                height={36}
              />
            </Link>
          </div>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
