import TimelineCard from "../components/TimelineCard";
import TotalPostsBadge from "../components/TotalPostsBadge";
import usePosts from "../react-query/hooks/usePosts";
import useUsers, { User } from "../react-query/hooks/useUsers";

const PostList = () => {
  const pageSize = 10;
  const {
    data: postData,
    isLoading: postsLoading,
    error: postsError,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts({ pageSize });
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers();

  if (postsLoading || usersLoading) {
    return <p>Loading....</p>;
  }

  if (postsError) {
    return <p>{postsError.message}</p>;
  }

  if (usersError) {
    return <p>{usersError.message}</p>;
  }

  const users = usersData?.reduce(
    (acc: { [key: number]: string }, user: User) => {
      acc[user.id] = user.name;
      return acc;
    },
    {}
  );

  const postsWithUserNames = postData.pages
    .flat()
    .map((post) => ({
      ...post,
      userName: users[post.userId] || "Unknown User",
    }))
    .sort((a, b) => b.id - a.id);

  console.log("postsWithUserNames", postsWithUserNames);
  console.log("postsWithUserNames lenght", postsWithUserNames.length);
  // console.log("pages", postData.pages[postData.pages.length - 1][9]);
  // console.log("pages", postData.pages[postData.pages.length - 1].length);

  return (
    <div className="container d-flex flex-column align-items-center">
      <TotalPostsBadge text="Total Posts" number={postsWithUserNames.length} />
      <ul className="list-group">
        {postsWithUserNames.map((post) => (
          <li key={post.id} className="list-group-item">
            {/* <h2>{post.title}</h2>
            <p>By: {post.userName}</p>
            <p>{post.body}</p> */}
            <TimelineCard
              title={post.title}
              username={post.userName}
              description={post.body}
            />
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary w-25 my-3"
        onClick={() => fetchNextPage()}
        disabled={
          isFetchingNextPage || postsWithUserNames.length >= 100
          // postData.pages[postData.pages.length - 1].length === 0
        }
      >
        {isFetchingNextPage ? `Loading Data` : `Load More`}
      </button>
    </div>
  );
};

export default PostList;
