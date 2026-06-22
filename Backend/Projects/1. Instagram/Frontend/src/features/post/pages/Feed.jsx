/* eslint-disable react-hooks/exhaustive-deps */
import Post from "../components/Post";
import "../style/feed.scss";
import { usePost } from "../hooks/usePost";
import { useEffect } from "react";

const Feed = () => {
  const { Feed, handleGetFeed, Loading } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (Loading || !Feed) {
    return (
      <main>
        <h1>Feed is Loading...</h1>
      </main>
    );
  }

  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
          {Feed.map((post) => (
            <Post
              key={post._id}
              post={post}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Feed;