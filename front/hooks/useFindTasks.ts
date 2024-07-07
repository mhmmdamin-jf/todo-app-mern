import { searchTasks } from "@/slices/taskSlice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useFindTasks = ({ title }: { title: string }) => {
  const dispatcher = useDispatch<any>();
  const { data, isPending, error } = useQuery({
    queryKey: ["todo", title],
    queryFn: async () => await dispatcher(searchTasks({ title })),
  });
  return { error, data, isPending };
};
