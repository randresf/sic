import React from "react";
import { Button } from "antd";

const WrapperButton = ({ children }) => (
  <Button type="primary">{children}</Button>
);

export default WrapperButton;
