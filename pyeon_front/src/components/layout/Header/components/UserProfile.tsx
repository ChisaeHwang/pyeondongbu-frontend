import { PiUserCircle, PiNotePencil } from "react-icons/pi";
import { AuthUserResponse } from "../../../../types/auth";

interface UserProfileProps {
  user: AuthUserResponse;
  onNavigate: (path: string) => void;
}

export const UserProfile = ({ user, onNavigate }: UserProfileProps) => {
  return (
    <>
      <div className="flex items-center gap-4 px-4 py-3">
        <img
          src={user.profileImageUrl}
          alt={user.nickname}
          className="w-12 h-12 rounded-full border-2 border-gray-700"
        />
        <div>
          <p className="text-white font-medium text-lg">{user.nickname}</p>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>
      <div className="border-t border-[#2c2d32] pt-6">
        <button
          onClick={() => onNavigate("/profile")}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white text-lg hover:bg-white/5 transition-colors rounded-lg"
        >
          <PiUserCircle className="text-2xl" />
          <span>프로필 수정</span>
        </button>
        <button
          onClick={() => onNavigate("/my-posts")}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white text-lg hover:bg-white/5 transition-colors rounded-lg"
        >
          <PiNotePencil className="text-2xl" />
          <span>내가 쓴 글</span>
        </button>
      </div>
    </>
  );
};
