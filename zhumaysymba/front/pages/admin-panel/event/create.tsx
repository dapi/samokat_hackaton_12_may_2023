import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  EventRequest,
  useAddEventMutation,
} from "../../../services/event/eventRealApi";

const EventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventRequest>();
  const [addEvent] = useAddEventMutation();
  const onSubmit: SubmitHandler<EventRequest> = async (data) => {
    try {
      await addEvent(data).unwrap();
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
        Создать мероприятие
      </Typography>
      <Typography className="text-center mb-8">
        Опишите детали для добавления мероприятия
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
          Добавить
        </Button>
      </form>
    </Card>
  );
};

export default EventForm;
