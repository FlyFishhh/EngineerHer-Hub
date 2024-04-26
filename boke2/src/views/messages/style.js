import styled from "styled-components";

export const MessagesWrapper = styled.div`
  > .content {
    width: 970px;
    margin: 0 auto;

    .item {
      display: flex;
      gap: 40px;
      -webkit-box-align: center;
      align-items: center;
      margin-top: 30px;
      border: 1px solid rgb(196 196 196);
      padding: 10px;
      border-radius: 10px;
      background: #fff;

      .contentbox {
        display: flex;
        flex-direction: column;
        height: 55px;
        width: 100%;
        justify-content: space-around;
      }

      .top {
        display: flex;
        gap: 50px;
        .time {
        }
      }
    }
  }
`;
