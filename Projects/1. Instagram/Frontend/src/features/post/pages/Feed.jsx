/* eslint-disable react-hooks/exhaustive-deps */
import Post from "../components/Post";
import "../style/feed.scss";
import { usePost } from "../hooks/usePost";
import { useEffect } from "react";
import Nav from "../../shared/components/Nav";
import LOADING from "../components/LOADING";

const Feed = () => {
  const { Feed, handleGetFeed, Loading, handleLike, handleUnlike } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (Loading || !Feed) {
    return (
      <LOADING />
    );
  }

  return (
    <main className="feed-page">
      <div className="feed">
        <Nav />
        <div className="posts">
          {Feed.map((post) => (
            <Post
              key={post._id}
              post={post}
              Loading={Loading}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Feed;