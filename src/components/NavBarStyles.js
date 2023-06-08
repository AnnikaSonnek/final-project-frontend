import styled from 'styled-components';

export const LogoPicture = styled.div`
  display: flex;
  scale: 15%;
  padding-top: 7px;
  align-items: center;
  margin-right: auto;
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
`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const MenuItem = styled.li`
  margin: 0 1rem;
  overflow: hidden;
`;

export const MenuButtonContainer = styled.div`
  display: none;
  height: 100%;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MenuToggle = styled.input`
  display: none;
`;

export const MenuButton = styled.div`
  display: block;
  background-color: #210440;
  position: absolute;
  height: 4px;
  width: 30px;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;

  &::before {
    content: '';
    margin-top: -8px;
  }

  &::after {
    content: '';
    margin-top: 8px;
  }
`;

export const MobileMenu = styled(Menu)`
  position: absolute;
  top: 0;
  margin-top: 50px;
  left: 0;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const MobileMenuItem = styled(MenuItem)`
  height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);

  &.checked {
    border: 1px solid #333;
    height: 2.5em;
    padding: 0.5em;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }
`;

export const MobileMenuButtonContainer = styled(MenuButtonContainer)`
  display: flex;
`;

export const MobileMenuButton = styled(MenuButton)`
  &:before {
    margin-top: 0px;
    transform: rotate(405deg);
  }

  &:after {
    margin-top: 0px;
    transform: rotate(-405deg);
  }
`;
