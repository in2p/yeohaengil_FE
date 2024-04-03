import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import Header from './components/organisms/Header/Header.jsx';
import Footer from './components/organisms/Footer/Footer.jsx';

import SearchPage from './components/pages/SearchPage/SearchPage.jsx';
import Main from './components/pages/MainPage/Main.js';
import PostingPage from './components/pages/PostingPage/PostingPage.jsx';
import MessageListPage from './components/pages/MessageListPage/MessageListPage.jsx';
import MyPage from './components/pages/MyPage/MyPage.jsx';
import MapPage from './components/pages/MapPage/MapPage.jsx';
import FollowPage from './components/pages/FollowPage/FollowPage.jsx';
import LoginPage from './components/pages/Login/LoginPage.jsx';

import SettingPrev from './components/pages/SettingPage/SettingPrev.jsx';
import LoginLoadingPage from './components/pages/Login/LoginLoadingPage.jsx';

import useToken from './hooks/useToken.js';
import PhotoPage from './components/pages/PostingPage/PhotoPage.jsx';
import SettingModifyPage from './components/pages/SettingPage/SettingModifyPage.jsx';
import PostPage from './components/pages/PostPage/PostPage.jsx';
// in app.js
axios.defaults.withCredentials = true;
let vh = window.innerHeight * 0.01;
vh = document.documentElement.style.setProperty('--vh', `${vh}px`);

function App() {
  // 이렇게 할바에 리덕스로 관리하는게 좋을 것 같다.
  // const { token, setToken } = useToken();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  // if (!cookies.token) {
  //   return (
  //     <BrowserRouter>
  //       <div className="App fullContainer">
  //         <Routes>
  //           <Route path="/*" element={<LoginPage />} />
  //           <Route
  //             path="/login/oauth2/*"
  //             // element={<LoginLoadingPage setToken={saveToken} />}
  //             element={<LoginLoadingPage />}
  //           />
  //         </Routes>
  //       </div>
  //     </BrowserRouter>
  //   );
  // }

  // isLoggedIn 으로 토큰의 유효성을 서버에 검사 해야하나
  // 1. 서버에게 토큰의 유호성 검사 하라고 시키기
  // 2. 재랜더링 마다 리프레쉬 토큰으로 jwt 토큰 받아와서 성공하면 isLoggedIn 에 저장하기
  // 정답: 요청을 수신 할때마다 로그인의 상태를 확인 할 수 있다.
  document.body.classList.remove('bg-main');
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="fullContainer">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/posting" element={<PostingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/messages" element={<MessageListPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="follow" element={<FollowPage />} />
            <Route path="/map" element={<MapPage />} />
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/login/oauth2/kakao" element={<LoginHandler />} />
            <Route path="/login/oauth2/naver" element={<LoginHandler />} /> */}
            <Route path="/setting" element={<SettingPrev />} />
            <Route path="/modifyProfile" element={<SettingModifyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/postingphoto" element={<PhotoPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route
              path="/login/oauth2/*"
              // element={<LoginLoadingPage setToken={saveToken} />}
              element={<LoginLoadingPage />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
