import { getTasks } from "@/slices/taskSlice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
export const useTasks = ({ category }: { category: string }) => {
  const dispatcher = useDispatch();
  const { data, error, isPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => dispatcher(getTasks({ category }) as any),
  });
  return { data, error, isPending };
};
