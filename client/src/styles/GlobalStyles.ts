import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background: #FFFECB;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }
`;
