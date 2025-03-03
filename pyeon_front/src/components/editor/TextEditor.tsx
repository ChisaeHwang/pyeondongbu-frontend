import React, { useRef } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaHeading,
  FaImage,
  FaLink,
} from "react-icons/fa";
import axiosInstance from "../../utils/axios";

export const MAX_IMAGES = 5;
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

interface TextEditorProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  uploadedImages: string[];
  setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
  setError: (error: string | null) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  content,
  setContent,
  uploadedImages,
  setUploadedImages,
  setError,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      setError(`이미지는 최대 ${MAX_IMAGES}장까지만 업로드할 수 있습니다.`);
      return;
    }

    const file = files[0];

    // 파일 크기 확인
    if (file.size > MAX_IMAGE_SIZE) {
      setError(`이미지 크기는 최대 5MB까지 가능합니다.`);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosInstance.post("/api/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.imageUrl;

      // 이미지 URL 저장
      setUploadedImages((prev: string[]) => [...prev, imageUrl]);

      // 이미지 URL을 텍스트 영역에 추가
      setContent((prev: string) => prev + `\n![이미지](${imageUrl})\n`);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      setError("이미지 업로드에 실패했습니다.");
    }
  };

  return (
    <div>
      <h3 className="text-gray-400 text-sm mb-3">내용</h3>

      {/* 서식 도구 모음 */}
      <div className="bg-[#2c2d32] p-2 rounded-t-md flex flex-wrap gap-1 border-b border-[#404249]">
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
          className="p-1.5 text-gray-300 hover:bg-[#383A40] rounded cursor-pointer"
          title="이미지"
        >
          <FaImage />
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
        <div className="ml-auto text-xs text-gray-400 flex items-center">
          이미지: {uploadedImages.length}/{MAX_IMAGES}
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요..."
        className="w-full bg-[#313338] text-white border border-[#404249] border-t-0 rounded-b-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[300px]"
      />
      <div className="text-xs text-gray-400 mt-2 space-y-1">
        <p>* 이미지는 최대 5장까지, 각 5MB 이하로 업로드할 수 있습니다.</p>
        <p>* 영상은 유튜브 일부공개 또는 유튜브 링크를 사용해 주세요.</p>
        <p>
          * 서식: 굵게(**텍스트**), 기울임(*텍스트*), 제목(# 텍스트),
          링크([텍스트](URL))
        </p>
      </div>
    </div>
  );
};

export default TextEditor;
