import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const fetchPosts = async ({
  pageParam = 1,
  query,
}: {
  pageParam: number;
  query: PostQuery;
}) => {
  const { pageSize } = query;
  const totalPosts = 100; // Known total posts
  const start = totalPosts - pageParam * pageSize;
  const { data } = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    {
      params: {
        _start: start >= 0 ? start : 0,
        _limit: pageSize,
      },
    }
  );
  return data.reverse(); // Reverse to ensure descending order within the fetched posts
};

const usePosts = (query: PostQuery) => {
  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, query }),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default usePosts;
