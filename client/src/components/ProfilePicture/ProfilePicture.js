import React from 'react';
import style from "./ProfilePicture.module.sass";
import {imgUrl} from "../../api/baseURL";

const ProfilePicture = (props) => {
  const {user, size, mediaPhone} = props;

  if (user.photo) {
    return <div className={`${style.userPhoto} ${style[size]} ${style[mediaPhone]}`}>
      <img src={`${imgUrl}/${user.id}/${user.photo}`} alt="avatar" className={style.profilePicture}/>
    </div>
  }
  return <div className={`${style.userInitials} ${style[size]} ${style[mediaPhone]}`}>
    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
  </div>
};

export default ProfilePicture;
