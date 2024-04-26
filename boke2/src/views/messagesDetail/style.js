import styled from "styled-components";

export const MessagesDetailWrapper = styled.div`
  > .content {
    width: 970px;
    margin: 0 auto;


    .mainbox{
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-top: 30px;
      padding: 30px;
      background: #fff;
    }

    .messagebox{
      display: flex;
      flex-direction: column;
      gap: 15px;

      .mine{
        display: flex;
        flex-direction: row-reverse;
        .box{
          padding: 15px;
          border-radius: 10px;
          background-color: #03a7ff33;
          display: flex;
          gap: 15px;
          .time{
            fons-size: 12px;
            line-height: 20px;
          }
        }
      }

      .other{
        display: flex;
        .box{
          padding: 15px;
          border-radius: 10px;
          background-color: #ff454533;
          display: flex;
          gap: 15px;
          .time{
            fons-size: 12px;
            line-height: 20px;
          }
        }
      }
    }

    .topinfo {
      display: flex;
      gap: 40px;
      align-items: center;


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

    .content{
      margin-top: 30px;
    }
    .imgbox {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      margin-top: 30px;

      .imgitem{
        width: 313px;
        height: 313px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .comment{
      margin-top: 30px;
    }
  }
`;
