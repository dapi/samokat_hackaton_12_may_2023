/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import { MainContent } from "../components/MainContent";
import NewsCard from "../components/News";
import { useGetNewsQuery } from "../services/news/newsRealApi";

const Home: NextPage = () => {
  const { data } = useGetNewsQuery();
  return (
    <>
      <MainContent
        title="Революционные перемены в работе коллектива уже здесь"
        description=" Нам предоставят новое оборудование, которое поможет увеличить
            производительность и качество продукции. Мы будем проводить
            регулярные тренинги и семинары, чтобы повышать квалификацию и
            поддерживать наш уровень профессионализма."
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80"
      />
      <ul className="product-list grid grid-cols-3 gap-4">
        {data?.map((news, index) => {
          if (!news.IsMain) {
            return (
              <Link key={index} href={`/news/${news.ID}`}>
                <li className="product-card mt-8">
                  <NewsCard isAdmin={false} {...news} />
                </li>
              </Link>
            );
          }
        })}
      </ul>
    </>
  );
};

export default Home;
