import styled from "styled-components";

export const ProfileWrapper = styled.div`
  > .content {
    width: 970px;
    margin: 0 auto;

    .userInfo {
      margin-top: 30px;
      display: flex;
      gap: 50px;
      align-items: center;
      .rightinfo {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100px;

        .name {
          font-size: 24px;
          font-weight: 600;
        }

        .count {
          display: flex;
          gap: 50px;
          text-align: center;
          .Following {
            cursor: pointer;
          }
          .Followers {
            cursor: pointer;
          }
        }
      }
    }

    .desc {
      margin-top: 30px;
    }

    .numbox{
      position: relative;
    }
    .panel {
      position: absolute;
      top: 54px;
      right: -75px;
      width: 240px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
      color: #666;
      z-index: 10;

      .top,
      .bottom {
        padding: 10px 0;

        .item {
          height: 40px;
          line-height: 40px;
          padding: 0 16px;
          display: flex;
          gap: 10px;

          &:hover {
            background-color: #f5f5f5;
          }
        }
      }

      .top {
        border-bottom: 1px solid #ddd;
      }
    }
  }
`;
