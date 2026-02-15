const KAKAO_CLIENT_ID = '0d0a97f9482a11a9b73fedadd89ae9ff';
const REDIRECT_URI = 'http://localhost:3000/kakao/callback';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KakaoLoginButton = () => {
  return (
    <a href={KAKAO_AUTH_URL} style={{ display: 'inline-block' }}>
      <img src='/kakao_login_medium_narrow.png' alt='카카오 로그인' />
    </a>
  );
};
