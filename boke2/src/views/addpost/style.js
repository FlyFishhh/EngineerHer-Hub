import styled from "styled-components";

export const AddpostWrapper = styled.div`
  > .content {
    width: 970px;
    margin: 0 auto;

    .postarea {
      height: 75vh;
      margin-top: 30px;
      border: 1px solid #eee;
      background: #fff;
      padding: 15px;
      border-radius: 10px;

      .ant-btn-primary {
        margin-top: 20px;
        color: #fff;
        border-color: #000;
        background: #000;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      }
    }
  }
`;
