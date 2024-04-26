import styled from "styled-components";

export const ItemWrapper = styled.div`
  flex-shrink: 0;
  box-sizing: border-box;
  width: ${(props) => props.itemWidth};
  padding: 8px;

  .inner {
    width: 100%;
    display: flex;
    gap: 15px;
    .top {
      display: flex;
      height:40px;
      flex-direction: column;
      justify-content: space-between;
    }
    }
    .name {
      // height:20px;
      // line-heightx;20px;
    }
    .time {
      // height:20px;
      // line-heightx;20px;
    }
  }
  .comment-action {
    padding-left: 8px;
    cursor: 'auto';
    font-size:16px;
  }
  
  [class*='-col-rtl'] .comment-action {
    padding-right: 8px;
    padding-left: 0;
    font-size:16px;
    
  }
  .anticon-heart{
    font-size:16px;
  }
  .anticon-message{
    font-size:16px;
  }
  .anticon-tag{
    font-size:16px;
  }

  .ant-list-items {
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: #fff;
    border-radius: 10px;
}
`;
