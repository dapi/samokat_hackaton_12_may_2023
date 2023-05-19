import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddTaskMutation } from "../../../services/tasks/taskRealApi";
import { Task } from "../../api/models/task";

const EventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>();
  const { query } = useRouter();
  const [addTask] = useAddTaskMutation();
  const [price, setPrice] = useState(150);

  const handlePriceChange = (event: { target: { value: any } }) => {
    setPrice(event.target.value);
  };

  const onSubmit: SubmitHandler<Task> = async (data) => {
    if (query.eventID) {
      data.EventID = +query.eventID;
    }

    data.Reward = +data.Reward;
    try {
      await addTask(data).unwrap();
      toast.success("Задача успешно добавлена");
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
        Добавить задачу
      </Typography>
      <Typography className="text-center mb-8">
        Укажите, пожалуйста, детали для добавления задачи
      </Typography>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Название
          <Input size="lg" placeholder="Enter Name" {...register("Name")} />
        </label>
        <label>
          Описание
          <Input
            size="lg"
            placeholder="Enter Description"
            {...register("Description")}
          />
        </label>
        <label>
          Награда: {price}
          <input
            type="range"
            min="0"
            max="300"
            step={10}
            value={price}
            {...register("Reward")}
            onChange={handlePriceChange}
            className="w-full"
          />
        </label>
        {/* <div>Deadline:
					<Input size="lg" type="date" placeholder="Enter Data" />
					<br></br>
					<Input size="lg" type="time" placeholder="Enter Time" />
				</div> */}
        <Button className="bg-blue-400" type="submit">
          Add Task
        </Button>
      </form>
    </Card>
  );
};

export default EventForm;
