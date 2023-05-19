import Link from "next/link";
import EventCard from "../components/EventCard";
import { MainContent } from "../components/MainContent";
import { useGetEventsQuery } from "../services/event/eventRealApi";

export const Events = () => {
  const { data } = useGetEventsQuery();

  return (
    <>
      <MainContent
        title="IT-REVOLUTION: Открытие новых горизонтов в мире технологий!"
        description="Нам предоставят новое оборудование, которое поможет увеличить производительность и качество продукции. Мы будем проводить регулярные тренинги и семинары, чтобы повышать квалификацию и поддерживать наш уровень профессионализма."
        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      />
      <ul className="product-list grid grid-cols-4 gap-6 pb-4">
        {data?.map((event, index) => (
          <Link key={index} href="events/1">
            <li className="cursor-pointer product-card mt-8">
              <EventCard isAdmin={false} {...event} />
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Events;
