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

  .container {
    max-width: 1440px;
    margin: auto;
    padding: 0 5%;

    @media screen and (min-width: 768px){
      padding: 0 10%;
    }
    
  }
`;
