import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  EventRequest,
  useEditEventMutation,
  useGetEventQuery,
} from "../../../services/event/eventRealApi";

const EventForm = () => {
  const { query } = useRouter();
  const { data } = useGetEventQuery(query?.id?.toString() || "1");
  console.log(data);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventRequest>();

  useEffect(() => {
    console.log(data);
    reset(data);
  }, [reset, data]);
  const [editEvent] = useEditEventMutation();
  const onSubmit: SubmitHandler<EventRequest> = async (data) => {
    try {
      await editEvent(data).unwrap();
      toast.success("Мероприятие успешно добавлено");
    } catch (err) {
      console.log(err);
      toast.error("Упс... Что-то пошло не так :(");
    }
  };

  return (
    <Card
      color="white"
      shadow={true}
      className="p-8 max-w-md mx-auto rounded-lg"
    >
      <Typography variant="h4" className="text-center mb-6">
        Изменить мероприятие
      </Typography>
      <Typography className="text-center mb-8">
        Введите детали для изменения мероприятия
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
          size="lg"
          color="blue"
          placeholder="Введите название"
          {...register("Name")}
        />
        <Input
          size="lg"
          color="blue"
          placeholder="Добавьте ссылочку на изображение"
          {...register("ImageUrl")}
        />
        <Input
          size="lg"
          color="blue"
          placeholder="Введите описание"
          {...register("Description")}
        />
        <Input
          size="lg"
          color="blue"
          placeholder="Укажите место, где будет проходить мероприятие"
          {...register("Place")}
        />
        <Input
          size="lg"
          type="date"
          color="blue"
          placeholder="Enter Data"
          {...register("Date")}
        />
        {/* <Input size="lg" type="time" color="blue" placeholder="Enter Time" /> */}
        <Button type="submit" size="lg" className="mt-6 bg-blue-400">
          Изменить
        </Button>
      </form>
    </Card>
  );
};

export default EventForm;
