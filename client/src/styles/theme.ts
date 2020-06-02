export type Theme = {
  colors: {
    primary: string;
    light: string;
    dark: string;
  };
  shadow: {
    default: string;
  };
  transition: {
    default: string;
  };
  media: {
    tablet: string;
  };
};

export const theme: Theme = {
  colors: {
    primary: "#bf0000",
    light: "rgba(255, 255, 255, 0.95)",
    dark: "rgba(0, 0, 0, 0.95)",
  },
  shadow: {
    default: "rgba(0, 0, 0, 0.42) 2px 2px 17px -1px;",
  },
  transition: {
    default: "all 0.3s",
  },
  media: {
    tablet: createMedia(786),
  },
};

function createMedia(size: number): string {
  return `@media screen and (min-width: ${size}px)`;
}
