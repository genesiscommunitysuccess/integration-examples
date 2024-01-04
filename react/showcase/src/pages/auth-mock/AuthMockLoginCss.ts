import { css } from '@microsoft/fast-element'

export default css`
  :host {
    background-size: 300% 300%;
    background-image: linear-gradient(
      -45deg,
      rgb(59, 173, 227) 0%,
      rgba(87, 111, 230, 1) 25%,
      rgba(152, 68, 183, 1) 51%,
      rgb(255, 53, 127) 100%
    );
    animation: animateBG 10s ease infinite;
  }

  @keyframes animateBG {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`
