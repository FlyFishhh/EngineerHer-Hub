import styled from "styled-components";

export const LeftWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.primaryColor};
  
  .logo {
    margin-left: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
  }
`
