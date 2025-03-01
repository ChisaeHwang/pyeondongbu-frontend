import React from "react";
import ReactMarkdown from "react-markdown";

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <div className="mb-8">
      <div className="prose prose-invert max-w-none text-gray-100">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PostContent;
