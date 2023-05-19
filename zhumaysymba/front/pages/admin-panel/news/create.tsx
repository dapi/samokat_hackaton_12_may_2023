import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddNewsMutation } from "../../../services/news/newsRealApi";
import { News } from "../../api/models/news";

export type NewsRequest = Omit<News, "ID"> & { IsMain: boolean };

const NewsForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewsRequest>({
    defaultValues: {
      ImageUrl: "",
      Title: "",
      Body: "",
      IsMain: false,
    },
  });
  const [addNews] = useAddNewsMutation();
  const onSubmit: SubmitHandler<NewsRequest> = async (data) => {
    try {
      await addNews(data).unwrap();
      toast.success("Новость успешно добавлено");
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
        Создать новость
      </Typography>
      <Typography className="text-center mb-8">
        Введите детали для добавления новости
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
        <Button type="submit" size="lg" className="bg-blue-400">
          Добавить
        </Button>
      </form>
    </Card>
  );
};

export default NewsForm;
