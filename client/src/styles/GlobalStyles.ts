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

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  iframe {
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height:100%;
  }

  .container {
    max-width: 1260px;
    margin: auto;
    padding: 0 5%;

    @media screen and (min-width: 768px){
      padding: 0 8%;
    }
    
  }
`;
