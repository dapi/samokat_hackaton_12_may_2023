import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useEditNewsMutation,
  useGetNewsSingleQuery,
} from "../../../services/news/newsRealApi";
import { News } from "../../api/models/news";

const EventForm = () => {
  const { query } = useRouter();
  const { data } = useGetNewsSingleQuery(query.id?.toString() || "1");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<News>();

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [reset, data]);
  const [editNews] = useEditNewsMutation();
  const onSubmit: SubmitHandler<News> = async (data) => {
    try {
      await editNews(data).unwrap();
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
        Редактировать новость
      </Typography>
      <Typography className="text-center mb-8">
        Добавьте детали для редактирования новости
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
          size="lg"
          color="blue"
          placeholder="Введите название"
          {...register("Title")}
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
          {...register("Body")}
        />
        <div className="flex items-center">
          <label>Сделать новостью дня</label>
          <Controller
            name="IsMain"
            control={control}
            render={({ field }) => <Checkbox {...field} value="false" />}
          />
        </div>
        {/* <Input size="lg" type="time" color="blue" placeholder="Enter Time" /> */}
        <Button type="submit" size="lg" className="mt-6 bg-blue-400">
          Изменить
        </Button>
      </form>
    </Card>
  );
};

export default EventForm;
