import { useEffect, useState, useRef, useCallback } from "react";
import {
  getPostComment,
  createComment,
  createCommentReply,
} from "../../service/commentService";
import CommentItem from "./CommentItem";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [newComment, setNewComment] = useState("");

  const [replyInputs, setReplyInputs] = useState({});
  const [replyOpen, setReplyOpen] = useState({});

  const observer = useRef();

  // Fetch comments
  const fetchComments = async (currentPage = 1) => {
    try {
      setLoading(true);

      const data = await getPostComment({ postId, page: currentPage });

      const incoming = data.comments || data;

      setComments((prev) =>
        currentPage === 1 ? incoming : [...prev, ...incoming]
      );

      if (!incoming.length) setHasMore(false);
    } catch (error) {
      console.error("Fetch comments error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(1);
  }, [postId]);

  // Infinite scroll trigger
  const lastCommentRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchComments(nextPage);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page]
  );

  // Create comment
  const handleCreateComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    try {
      const data = await createComment({
        postId,
        content: { content: newComment },
      });

      const newC = data.comment || data;

      setComments((prev) => [newC, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Create comment error:", error);
    }
  };

  // Reply input change
  const handleReplyChange = (id, value) => {
    setReplyInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Toggle reply
  const toggleReply = (id) => {
    setReplyOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Recursive reply insertion
  const insertReply = (comments, parentId, reply) => {
    return comments.map((comment) => {
      if (comment._id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }

      if (comment.replies?.length) {
        return {
          ...comment,
          replies: insertReply(comment.replies, parentId, reply),
        };
      }

      return comment;
    });
  };

  // Submit reply
  const handleReplySubmit = async (commentId) => {
    const content = replyInputs[commentId];

    if (!content?.trim()) return;

    try {
      const data = await createCommentReply({
        commentId,
        content: { content },
      });

      const reply = data.reply || data;

      setComments((prev) => insertReply(prev, commentId, reply));

      setReplyInputs((prev) => ({
        ...prev,
        [commentId]: "",
      }));

      setReplyOpen((prev) => ({
        ...prev,
        [commentId]: false,
      }));
    } catch (error) {
      console.error("Reply error:", error);
    }
  };

  return (
    <div className="mt-8 space-y-6">

      <h3 className="text-xl font-semibold">Comments</h3>

      {/* Comment Form */}
      <form
        onSubmit={handleCreateComment}
        className="flex gap-2"
      >
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
        />

        <button className="border px-4 py-2 rounded">
          Comment
        </button>
      </form>

      {/* Comment List */}
      <div className="space-y-4">

        {comments.map((comment, index) => {
          if (comments.length === index + 1) {
            return (
              <div ref={lastCommentRef} key={comment._id}>
                <CommentItem
                  comment={comment}
                  depth={0}
                  replyInputs={replyInputs}
                  replyOpen={replyOpen}
                  toggleReply={toggleReply}
                  handleReplyChange={handleReplyChange}
                  handleReplySubmit={handleReplySubmit}
                />
              </div>
            );
          }

          return (
            <CommentItem
              key={comment._id}
              comment={comment}
              depth={0}
              replyInputs={replyInputs}
              replyOpen={replyOpen}
              toggleReply={toggleReply}
              handleReplyChange={handleReplyChange}
              handleReplySubmit={handleReplySubmit}
            />
          );
        })}

      </div>

      {loading && <p>Loading comments...</p>}
    </div>
  );
};

export default CommentSection;