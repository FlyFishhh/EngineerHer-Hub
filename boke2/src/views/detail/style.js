import styled from "styled-components";

export const DetailWrapper = styled.div`
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
