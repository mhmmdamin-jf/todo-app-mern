import { getTodayTasks } from "@/slices/taskSlice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
export const useTasks = () => {
  const dispatcher = useDispatch();
  const { data, error, isPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => dispatcher(getTodayTasks() as any),
  });
  return { data, error, isPending };
};
