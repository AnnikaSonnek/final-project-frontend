import styled, { css } from 'styled-components';

const mediaQuery = css`
  @media (max-width: 668px) {
    .menu-button-container {
      display: flex;
    }
    .menu {
      position: absolute;
      top: 0;
      margin-top: 50px;
      left: 0;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
    }
    #menu-toggle ~ .menu li {
      height: 0;
      margin: 0;
      padding: 0;
      border: 0;
      transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    #menu-toggle:checked ~ .menu li {
      border: 1px solid #333;
      height: 2.5em;
      padding: 0.5em;
      transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .menu > li {
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0.5em 0;
      width: 100%;
      color: white;
      background-color: #222;
    }
    .menu > li:not(:last-child) {
      border-bottom: 1px solid #444;
    }
  }
`;
export const LogoPicture = styled.div`
  display: flex;
  scale: 15%;
  padding-top: 7px;
  align-items: flex-start;
  margin-right: auto;
  ${mediaQuery}
`;

export const Greeting = styled.p`
margin-right: 2em;
`;

export const TopNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #210440;
  height: 50px;
  padding: 10px;
  padding-left: 0px;
  ${mediaQuery}
`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
  ${mediaQuery}
`;

export const MenuItem = styled.li`
  margin: 0 1rem;
  overflow: hidden;
  ${mediaQuery}
`;

export const MenuButtonContainer = styled.div`
  display: none;
  height: 100%;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mediaQuery}
`;

export const MenuButton = styled.span`
  display: block;
  background-color: #210440;
  position: absolute;
  height: 4px;
  width: 30px;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;

  &::before,
  &::after {
    content: '';
    display: block;
    background-color: #210440;
    position: absolute;
    height: 4px;
    width: 30px;
    transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 2px;
  }

  &::before {
    margin-top: -8px;
  }

  &::after {
    margin-top: 8px;
  }
`;

export const MenuToggle = styled.input`
  display: none;
`;

