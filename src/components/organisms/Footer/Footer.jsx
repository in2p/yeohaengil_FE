import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlinePlusCircle,
  AiOutlineSend,
  AiOutlineUser,
} from 'react-icons/ai';

const Icon = styled.button`
  border: none;
  float: left;
  width: 20%;
  text-align: center;
  font-size: 24px;
  background-color: transparent;
`;

const NavWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 375px;
  height: 53px;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  border-top: 2px solid rgba(0, 0, 0, 0.623);
  padding: 8px 0px;
`;

const routes = [
  { path: '/', icon: <AiOutlineHome /> },
  { path: '/search', icon: <AiOutlineSearch /> },
  { path: '/posting', icon: <AiOutlinePlusCircle /> },
  { path: '/messages', icon: <AiOutlineSend /> },
  { path: '/mypage', icon: <AiOutlineUser /> },
];

function NavigationButton({ path, icon }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return <Icon onClick={handleClick}>{icon}</Icon>;
}

function Footer() {
  const hideFooter = useLocation();

  if (hideFooter.pathname.startsWith('/login')) return null;

  return (
    <NavWrapper>
      {routes.map((route, i) => (
        <NavigationButton
          key={route.path}
          path={route.path}
          icon={route.icon}
        />
      ))}
    </NavWrapper>
  );
}

export default Footer;
