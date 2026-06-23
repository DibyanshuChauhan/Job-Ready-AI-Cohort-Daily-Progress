import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { BsBookmark } from "react-icons/bs";

const Post = ({ post, handleLike, handleUnlike }) => {
    return (
        <div className="post">
            <div className="user">
                <img
                    src={post.user?.profileImage}
                    alt={post.user?.username}
                />
                <p>{post.user?.username}</p>
            </div>

            <img
                className="post-image"
                src={post.imgUrl}
                alt="post"
            />

            <div className="post-actions">
                <div className="left-actions">

                    {post.isLiked ? (
                        <FaHeart
                            className="liked"
                            onClick={() => handleUnlike(post._id)}
                        />
                    ) : (
                        <FaRegHeart
                            onClick={() => handleLike(post._id)}
                        />
                    )}

                    <FiMessageCircle />
                    <LuSend />
                </div>

                <BsBookmark />
            </div>

            <div className="bottom">
                <p className="caption">
                    {post.caption}
                </p>
            </div>
        </div>
    );
};

export default Post;