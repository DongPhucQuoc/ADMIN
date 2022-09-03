import { useState, useEffect } from "react";
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { getTokenLocal } from "utils/Common";
import { GetProfile } from "../services/Setting.Service";

const MyAvatar = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const tokenLocal = getTokenLocal();
    if (tokenLocal && tokenLocal.length) {
      GetProfile()
      .then(res => setUser(res.data.result))
      .catch(e => console.log(e));
    }
  }, [getTokenLocal()]);

  return (
    <div className="logo">
      <Avatar size={64} icon={<img src="https://img.icons8.com/bubbles/2x/admin-settings-male.png"/>} />
      <p className="info__login">
        {user ? user.lastName + " " + user.firstName : "LOADING"}
      </p>
    </div>
  )
}

export default MyAvatar
