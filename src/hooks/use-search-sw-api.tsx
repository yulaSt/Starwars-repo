import { useQueries } from "@tanstack/react-query";
import { getStarWarsData } from "../api/star-wars";
import { categories } from "../interfaces/endpoints";
import useStore from "../store/store";
import { useShallow } from "zustand/shallow";

const useSearchSwApi = (searchTerm: string) => {
  const { setCategory } = useStore(
    useShallow((state) => ({
      setCategory: state.setCategory,
      getCategory: state.getCategory
    }))
  )

  const queries = useQueries({
    queries: categories.map((endpoint) => ({
      queryKey: [endpoint.name, searchTerm],
      queryFn: async ({ signal}: {signal: AbortSignal}) => {
     
        const data = await getStarWarsData(`${endpoint.url}/?search=${searchTerm}`, signal)
        if (!signal.aborted) {
          setCategory(endpoint.name, data.results)
        }
        return data
      },
      enabled: searchTerm.length > 0,
    })),
  });

  // Check if any of the queries are loading or have errors
  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const error = queries.find((query) => query.isError)?.error;

  return { isLoading, isError, error };
};
export default useSearchSwApi;
