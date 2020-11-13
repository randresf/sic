import React from "react";
import { Menu } from "antd";

const SideBar = (props) => {
  const handleClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256 }}
      mode="inline"
      defaultSelectedKeys={["1"]}
    >
      <Menu.Item key="1">Ver Disponibilidad</Menu.Item>
      <Menu.Item key="2">Ver Disponibilidad</Menu.Item>
      <Menu.Item key="3">Ver Disponibilidad</Menu.Item>
      <Menu.Item key="4">Ver Disponibilidad</Menu.Item>
    </Menu>
  );
};

export default SideBar;
