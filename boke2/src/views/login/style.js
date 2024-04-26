import styled from "styled-components";

export const LoginWrapper = styled.div`
  > .login {
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding-top: 25vh;
    background: linear-gradient(276.46deg, #a0d6ff -15.94%, #ffffff 100.8%),
      linear-gradient(0deg, #fff, #fff);
    > .login-form {
      max-width: 400px;
      margin: 0 auto;
      text-align: center;
      .title {
        font-size: 24px;
        padding: 20px;
      }
      .ant-form-item-control-input-content {
        display: flex;
        justify-content: space-between;
      }
      .login-form-button {
        width: 100% !important;
      }
    }
  }
`;
