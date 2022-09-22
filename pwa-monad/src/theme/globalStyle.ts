import { createGlobalStyle } from "styled-components";
import { colors, fonts } from "theme";

const GlobalStyle = createGlobalStyle`
  body { 
    display: "column";
    background: ${colors.white};
    font-family: ${fonts.main};
  }
  .App {
    background: ${colors.white};
    color: white;
    overflow-y: auto;
    display: column;
    height: 100%;
    @media all and (display-mode: standalone) {
      background: ${colors.white};
    }
  }

  .lbl-cap1{
    font-family: ${fonts.main};
    color: ${colors.purpleDark};
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 40px;
    text-align: center;
    @media only screen and (max-width: 374px) {
      font-size: 30px;
      line-height: 36px;
    }
  }
  .lbl-cap2{
    font-family: ${fonts.main};
    color: ${colors.greenLight2};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
  }
  .lbl-desc1{
    font-family: ${fonts.main};
    color: ${colors.purpleDark};
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    @media only screen and (max-width: 374px) {
      font-size: 14px;
      line-height: 18px;
    }
  }
  .lbl-desc2{
    font-family: ${fonts.main};
    color: ${colors.purpleDark};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    @media only screen and (max-width: 374px) {
      font-size: 12px;
      line-height: 16px;
    }
  }
  .lbl-warning1{
    font-family: ${fonts.main};
    color: ${colors.warning};
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 18px;
    text-align: center;
  }
  .lbl-warning2{
    font-family: ${fonts.main};
    color: ${colors.orange};
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
  }
  .button-title{
    font-family: ${fonts.main};
    color: ${colors.purpleDark};
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.005em;
    @media only screen and (max-width: 374px) {
      font-size: 14px;
      line-height: 14px;
    }
  }
  .colorGreen {
    color: ${colors.greenLight2} !important;
  }
  .colorOrange {
    color: ${colors.orange} !important;
  }
  .textarea-resize{
    letter-spacing: 0.00938em;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: rgb(45, 45, 99);
    transition: border-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-size: 14px;
    font-family: Sora;
    color: rgb(245, 245, 245);
    width: calc(100% - 14px);
    padding: 7px;
    border-width: 0px;
    border-bottom: 2px solid white;
  }
`;

export default GlobalStyle;
