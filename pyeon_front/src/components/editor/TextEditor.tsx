import React, { useRef, useState } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaHeading,
  FaImage,
  FaLink,
  FaEye,
  FaEdit,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { uploadImage, validateImageFile } from "../../utils/imageUpload";
import "../../styles/jobDetail.css";

export const MAX_IMAGES = 5;
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

interface TextEditorProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  uploadedImages: string[];
  setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
  setError?: (error: string | null) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  content,
  setContent,
  uploadedImages,
  setUploadedImages,
  setError,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isUploading, setIsUploading] = useState(false);

  // 텍스트 서식 적용 함수
  const applyFormat = (format: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let formattedText = "";
    let cursorPosition = 0;

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        cursorPosition = start + 2;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        cursorPosition = start + 1;
        break;
      case "underline":
        formattedText = `<u>${selectedText}</u>`;
        cursorPosition = start + 3;
        break;
      case "heading":
        formattedText = `\n# ${selectedText}\n`;
        cursorPosition = start + 3;
        break;
      case "ul":
        formattedText = `\n- ${selectedText}`;
        cursorPosition = start + 3;
        break;
      case "ol":
        formattedText = `\n1. ${selectedText}`;
        cursorPosition = start + 4;
        break;
      case "link":
        const url = prompt("링크 URL을 입력하세요:", "https://");
        if (url) {
          formattedText = `[${selectedText || "링크"}](${url})`;
          cursorPosition = start + 1;
        }
        break;
      default:
        return;
    }

    if (formattedText) {
      const newContent =
        content.substring(0, start) + formattedText + content.substring(end);
      setContent(newContent);

      // 선택된 텍스트가 있었다면 포맷 적용 후 선택 상태 유지
      setTimeout(() => {
        textarea.focus();
        if (selectedText) {
          textarea.setSelectionRange(start, start + formattedText.length);
        } else {
          textarea.setSelectionRange(
            start + cursorPosition,
            start + cursorPosition
          );
        }
      }, 0);
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // 이미지 개수 제한 확인
    if (uploadedImages.length >= MAX_IMAGES) {
      setError?.(`이미지는 최대 ${MAX_IMAGES}장까지만 업로드할 수 있습니다.`);
      return;
    }

    const file = files[0];

    // 파일 유효성 검사
    const validation = validateImageFile(file, 5); // 5MB 제한
    if (!validation.isValid) {
      setError?.(validation.message || "유효하지 않은 이미지입니다.");
      return;
    }

    setIsUploading(true);

    try {
      // Presigned URL 방식으로 이미지 업로드
      const imageUrl = await uploadImage(file);

      // 이미지 URL 저장
      setUploadedImages((prev: string[]) => [...prev, imageUrl]);

      // 이미지 URL을 텍스트 영역에 추가
      setContent((prev: string) => prev + `\n![이미지](${imageUrl})\n`);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      setError?.("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

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
    <div>
      <h3 className="text-gray-400 text-sm mb-3">내용</h3>

      {/* 서식 도구 모음 */}
      <div className="bg-[#2c2d32] p-2 rounded-t-md flex flex-wrap gap-1 border-b border-[#404249]">
        {/* 에디터/미리보기 탭 */}
        <div className="flex mr-4 border-r border-[#404249] pr-4">
          <button
            type="button"
            className={`p-1.5 text-gray-300 rounded flex items-center gap-1 ${
              activeTab === "edit" ? "bg-[#383A40]" : "hover:bg-[#383A40]"
            }`}
            onClick={() => setActiveTab("edit")}
            title="편집"
          >
            <FaEdit />
            <span className="text-xs">편집</span>
          </button>
          <button
            type="button"
            className={`p-1.5 text-gray-300 rounded flex items-center gap-1 ml-1 ${
              activeTab === "preview" ? "bg-[#383A40]" : "hover:bg-[#383A40]"
            }`}
            onClick={() => setActiveTab("preview")}
            title="미리보기"
          >
            <FaEye />
            <span className="text-xs">미리보기</span>
          </button>
        </div>

        {/* 서식 도구 (편집 모드에서만 표시) */}
        {activeTab === "edit" && (
          <>
            <button
              type="button"
              className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
              onClick={() => applyFormat("bold")}
              title="굵게"
            >
              <FaBold />
            </button>
            <button
              type="button"
              className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
              onClick={() => applyFormat("italic")}
              title="기울임"
            >
              <FaItalic />
            </button>
            <button
              type="button"
              className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
              onClick={() => applyFormat("underline")}
              title="밑줄"
            >
              <FaUnderline />
            </button>
            <div className="h-5 w-px bg-gray-600 mx-1"></div>
            <button
              type="button"
              className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
              onClick={() => applyFormat("heading")}
              title="제목"
            >
              <FaHeading />
            </button>
            <button
              type="button"
              className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
              onClick={() => applyFormat("ul")}
              title="글머리 기호"
            >
              <FaListUl />
            </button>
            <button
              type="button"
              className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
              onClick={() => applyFormat("ol")}
              title="번호 매기기"
            >
              <FaListOl />
            </button>
            <div className="h-5 w-px bg-gray-600 mx-1"></div>
            <button
              type="button"
              className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded"
              onClick={() => applyFormat("link")}
              title="링크"
            >
              <FaLink />
            </button>
            <label
              htmlFor="image-upload"
              className={`p-1.5 text-gray-300 hover:bg-[#383A40] rounded cursor-pointer ${
                isUploading ? "opacity-50 pointer-events-none" : ""
              }`}
              title="이미지 업로드"
            >
              <FaImage />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </label>
            {isUploading && (
              <span className="text-xs text-gray-400 ml-2 self-center">
                업로드 중...
              </span>
            )}
          </>
        )}

        <div className="ml-auto text-xs text-gray-400 flex items-center">
          이미지: {uploadedImages.length}/{MAX_IMAGES}
        </div>
      </div>

      {/* 에디터/미리보기 영역 */}
      {activeTab === "edit" ? (
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요..."
          className="w-full bg-[#313338] text-white border border-[#404249] border-t-0 rounded-b-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[300px]"
        />
      ) : (
        <div className="w-full bg-[#313338] text-white border border-[#404249] border-t-0 rounded-b-md px-4 py-2 min-h-[300px] overflow-auto">
          <div className="job-content">
            <div className="text-gray-300">
              {content.trim() ? (
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // 링크 처리
                    a: ({ node, children, ...props }) => {
                      // 링크에 내용이 없는 경우 href를 텍스트로 표시
                      if (
                        !children ||
                        (Array.isArray(children) && children.length === 0)
                      ) {
                        return (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                          >
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
              ) : (
                <div className="text-gray-500 italic">
                  내용을 입력하면 미리보기가 표시됩니다.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-400 mt-2 space-y-1">
        <p>* 이미지는 최대 5장까지, 각 5MB 이하로 업로드할 수 있습니다.</p>
        <p>* 영상은 유튜브 일부공개 또는 유튜브 링크를 사용해 주세요.</p>
        <p>
          * 서식: 굵게(**텍스트**), 기울임(*텍스트*), 제목(# 텍스트),
          링크([텍스트](URL))
        </p>
        <p>
          * 미리보기 탭에서 작성한 내용이 어떻게 보이는지 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default TextEditor;
