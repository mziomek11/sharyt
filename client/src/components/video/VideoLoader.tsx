import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { theme } from "../../styles/theme";

const VideoLoader = () => {
  return <Loader type="Plane" color={theme.colors.primary} />;
};

export default VideoLoader;
