import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "../../styles/jobDetail.css";

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  // 마크다운 형식 및 HTML 처리를 위한 콘텐츠 전처리
  const processedContent = content
    // 이미지 URL을 마크다운 이미지 형식으로 변환
    .replace(
      /(?<![![(])(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))(?![)\]])/gi,
      "![이미지]($1)"
    )
    // 마크다운 리스트 형식 개선 (- 항목 -> * 항목)
    .replace(/^- (.+)$/gm, "* $1")
    // 마크다운 리스트 형식 개선 (● 항목 -> * 항목)
    .replace(/^● (.+)$/gm, "* $1")
    // 마크다운 리스트 형식 개선 (○ 항목 -> * 항목)
    .replace(/^○ (.+)$/gm, "* $1")
    // 마크다운 리스트 형식 개선 (• 항목 -> * 항목)
    .replace(/^• (.+)$/gm, "* $1")
    // 줄바꿈 처리
    .replace(/\n/g, "  \n"); // 마크다운에서 줄바꿈을 위해 줄 끝에 공백 2개 추가

  return (
    <div className="mb-8">
      <div className="job-content">
        <div className="text-gray-300 min-h-[200px]">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              // 링크 처리 - 접근성 문제 해결
              a: ({ node, children, ...props }) => {
                // 링크에 내용이 없는 경우 href를 텍스트로 표시
                if (
                  !children ||
                  (Array.isArray(children) && children.length === 0)
                ) {
                  return (
                    <a target="_blank" rel="noopener noreferrer" {...props}>
                      {props.href || "링크"}
                    </a>
                  );
                }
                return (
                  <a target="_blank" rel="noopener noreferrer" {...props}>
                    {children}
                  </a>
                );
              },
              // 이미지 처리
              img: ({ node, ...props }) => (
                <img alt={props.alt || "이미지"} {...props} />
              ),
              // 리스트 처리
              ul: ({ node, ...props }) => (
                <ul className="list-disc" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal" {...props} />
              ),
            }}
          >
            {processedContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
