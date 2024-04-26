import styled from "styled-components";

export const NotificationsWrapper = styled.div`
  > .content {
    width: 970px;
    margin: 0 auto;

    .dot {
      display: inline-block;
      background-color: red;
      color: #fff;
      font-size: 9px;
      width: 20px;
      height: 20px;
      padding: 0px;
      text-align: center;
      line-height: 20px;
      border-radius: 50%;
      transform: translate(3px, -9px);
    }

    .item {
      display: flex;
      gap: 40px;
      -webkit-box-align: center;
      align-items: center;
      margin-top: 10px;
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
