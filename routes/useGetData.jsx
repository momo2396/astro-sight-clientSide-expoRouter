import { useQuery } from "@tanstack/react-query";
export const backendURL = "https://astro-sight-server.vercel.app";
const useGetData = (url) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [backendURL + url],
    queryFn: async () => {
      const res = await fetch(backendURL + url);
      const resData = await res.json();
      // console.log(resData);
      return resData;
    },
  });

  return { data, isLoading, isError, refetch };
};

export default useGetData;
