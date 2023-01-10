import React from 'react';
import styled from 'styled-components';

export const StyledDataAnnotations = styled.div`
position: absolute;
display: flex;
align-items: center;
justify-content: center;
background: #EF7058;
width: 32px;
height: 32px;
border-radius: 50%;
left: ${ props => (props.theme.pos.x - 16) + 'px' };
top: ${ props => (props.theme.pos.y - 16) + 'px' };
filter: drop-shadow(0px 2px 6px rgba(69, 69, 69, 0.5));
z-index: 1; 
font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
text-align: center;
color: #FFFFFF;
transition: appear 2s linear 0s;

& .fullComment {
  z-index: 1000; 
  position: absolute;
  display: flex;
  top: 50px;
  padding: 12px 20px;
  padding-right: 40px;
  background: #FFF;
  border: 1px solid #EFEFF0;
  border-radius: 4px;
  animation: appear .2s linear 0s;
  color: #9398A2;
  min-width: 200px;
  /* justify-content: space-between; */
  gap: 10px;
  /* min-width: 250px; */
  width: 360px;
  align-items: center;
  align-content: center;
  

  & > div {
    /* max-width: 200px; */

    & .authorComment {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      color: #4A4A4A;
      text-align: start;

    }
    & .commentComment {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: #4A4A4A;
      text-align: start;
      margin-top: 4px;
      width: 100%;
    }
  }

  & > div:first-child {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    background: #EF7058;
    min-width: 32px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #FFFFFF;
  }

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    background: #FFF;
    position: absolute;
    top: -5px;
    left: 47%;
  }

  & img {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 12px;
    height: 15px;

    &:hover {
      transform: scale(1.1);
    }
  }
}



@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
`;
// left: ${ props => (props.theme.pos.x * 576) + 'px' };
// top: ${ props => (props.theme.pos.y * 323) + 'px' };
// left: ${ props => {console.log(Object.keys(props.theme.theme.allComments[props.theme.key - 1])) ; return 1} };

export const StyledCommentField = styled.div`
position: absolute;
display: flex;
align-items: center;
justify-content: center;
background: #EF7058;
width: 32px;
height: 32px;
border-radius: 50%;
left: ${ props => (props.theme.x - 16) + 'px' };
top: ${ props => (props.theme.y - 16) + 'px' };
filter: drop-shadow(0px 2px 6px rgba(69, 69, 69, 0.5));
transition: appear .2s linear 0s;
z-index: 998; 


& > span {
  
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #FFFFFF;
  transition: appear .2s linear 0s;

}

& > div {
  position: absolute;
  top: 50px;
  padding: 12px 20px;
  /* width: 250px; */
  /* height: 69px; */
  background: #FFF;
  border: 1px solid #EFEFF0;
  border-radius: 4px;
  animation: appear .2s linear 0s;


  &::before {
    content: '';
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    background: #FFF;
    position: absolute;
    top: -5px;
    left: 47%;
  }

  & > input {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #9398A2;
    outline: none;
    border-bottom: 1px solid rgba(147,152,162,0.5);
    padding-right: 20px;
  }
  
  & > img {
    position: absolute;
    top: 14px;
    left: 85%;
  }
}

@keyframes appear {
  from {
    opacity: 0;
    scale: .95;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}
`;
