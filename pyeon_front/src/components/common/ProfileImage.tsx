import React from "react";
import { AuthUserResponse } from "../../types/auth";

interface ProfileImageProps {
  user: AuthUserResponse;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ user }) => {
  if (user.profileImageUrl) {
    return (
      <img
        src={user.profileImageUrl}
        alt={user.nickname}
        className="w-full h-full object-cover"
      />
    );
  }

  return <>{user.nickname.charAt(0).toUpperCase()}</>;
};

export default ProfileImage;
