import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getMemberInfo } from "./apis/members";
import useUserStore from "./stores/useUserStore";
// import ScrollBarStyles from "resources/styles/ScrollBarStyles";
import RootPage from "./pages/RootPage";
import StudentLobbyPage from "./pages/StudentLobbyPage.tsx";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChildRegisterPage from "./pages/ChildRegisterPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import { LoadingProvider } from "./stores/LoadingProvider.tsx";
import GlobalLoading from "./components/common/GlobalLoading.tsx";

function App() {
  const location = useLocation();
  const { tokenInfo, setTokenInfo, setUserInfo } = useUserStore();

  // URL 쿼리에서 토큰 값 추출 및 저장
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get("token");

    if (accessToken) {
      // URL에서 받은 token으로 accessToken 설정
      setTokenInfo({
        accessToken: accessToken,
        refreshToken: "",
      });
    }
  }, [location.search, setTokenInfo]);

  // 초기화 및 회원 정보 가져오기
  useEffect(() => {
    const storedTokenInfo = localStorage.getItem("tokenInfo"); // 로컬스토리지에서 tokenInfo 가져오기
    if (storedTokenInfo) {
      const parsedTokenInfo = JSON.parse(storedTokenInfo);
      setTokenInfo(parsedTokenInfo);
    }
  }, [setTokenInfo]);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const response = await getMemberInfo();
        setUserInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("회원 가져오기 실패", error);
      }
    };

    if (tokenInfo.accessToken) {
      initializeUser();
    } else {
      console.log("accesstoken없음");
    }
  }, [tokenInfo, setUserInfo]);

  return (
    <>
      {/*{location.pathname.startsWith("/m/") ||*/}
      {/*location.pathname.startsWith("/app/") ? null : (*/}
      {/*    <ScrollBarStyles />*/}
      {/*)}*/}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/" element={<RootPage />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/studentlobby" element={<StudentLobbyPage />} />
          <Route path="/childregister" element={<ChildRegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <App />
        <GlobalLoading />
      </LoadingProvider>
    </BrowserRouter>
  );
}
