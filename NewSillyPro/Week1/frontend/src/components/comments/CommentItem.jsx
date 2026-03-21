const CommentItem = ({
  comment,
  depth,
  replyInputs,
  replyOpen,
  toggleReply,
  handleReplyChange,
  handleReplySubmit,
}) => {
  return (
    <div
      className="border rounded p-3 space-y-2 bg-white"
      style={{ marginLeft: depth * 20 }}
    >
      <div>

        <p className="font-semibold">
          {comment.author?.username || "User"}
        </p>

        <p>{comment.content}</p>

      </div>

      {/* Reply button */}
      <button
        onClick={() => toggleReply(comment._id)}
        className="text-sm text-blue-600"
      >
        Reply
      </button>

      {/* Reply box */}
      {replyOpen[comment._id] && (
        <div className="flex gap-2 mt-2">

          <input
            type="text"
            placeholder="Write reply..."
            value={replyInputs[comment._id] || ""}
            onChange={(e) =>
              handleReplyChange(comment._id, e.target.value)
            }
            className="flex-1 border px-2 py-1 rounded"
          />

          <button
            onClick={() => handleReplySubmit(comment._id)}
            className="border px-3 py-1 rounded"
          >
            Send
          </button>

        </div>
      )}

      {/* Nested Replies */}
      {comment.replies?.length > 0 && (
        <div className="space-y-3 mt-3">

          {comment.replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              depth={depth + 1}
              replyInputs={replyInputs}
              replyOpen={replyOpen}
              toggleReply={toggleReply}
              handleReplyChange={handleReplyChange}
              handleReplySubmit={handleReplySubmit}
            />
          ))}

        </div>
      )}
    </div>
  );
};

export default CommentItem;