import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const fetchComments = async (postId: number) => {
  const { data } = await axios.get<Comment[]>(
    `https://jsonplaceholder.typicode.com/comments`,
    {
      params: { postId },
    }
  );
  return data;
};

const useComments = (postId: number) => {
  return useQuery<Comment[], Error>(
    ["comments", postId],
    () => fetchComments(postId),
    {
      enabled: !!postId,
    }
  );
};

export default useComments;
