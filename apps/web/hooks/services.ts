import axios from "axios";
import useSWR from "swr";

export function useGetQuestions() {
  const fetcher = async () =>
    await axios.get("/api/questions").then((res) => res.data);
  const { data, error, isLoading } = useSWR(`/api/questions`, fetcher);

  return {
    data,
    isLoading,
    error,
  };
}
