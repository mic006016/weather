## Today's Weather

OpenWeatherMap API와 Kakao Maps SDK를 활용하여 사용자의 현재 위치 날씨와 전국 주요 도시의 날씨를 시각화한 웹 페이지입니다.

### 1. 주요 기능

- **위치 기반 날씨 제공**: Geolocation API를 사용하여 접속자의 현재 위치 기온, 체감 온도, 습도, 기상 상태 등을 출력합니다.
- **전국 날씨 지도**: Kakao Maps API를 연동하여 서울, 부산, 제주, 독도 등 전국 9개 주요 지점의 날씨를 지도 위에 커스텀 오버레이로 표시합니다.
- **반응형 디자인**: 미디어 쿼리를 통해 모바일 및 데스크톱 환경에 최적화된 레이아웃을 제공합니다.
- **다크모드 지원**: CSS 변수(`:root`)를 활용하여 테마 변경이 용이한 구조로 설계되었습니다.

### 2. 사용 기술 및 라이브러리

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Library**: jQuery 3.7.1, Axios 1.11.0
- **API**:
    - [OpenWeatherMap API](https://openweathermap.org/api) (날씨 데이터)
    - [Kakao Maps API](https://apis.map.kakao.com/) (지도 서비스)

### 3. 프로젝트 구조

- `index.html`: 메인 페이지 레이아웃 및 API 로드
- `css/`
    - `fonts.css`: Pretendard 웹 폰트 설정
    - `base.css`: CSS Reset 및 공통 변수 설정
    - `weather.css`: 날씨 상세 정보 및 지도 오버레이 스타일
- `js/`
    - `weather.js`: 위치 정보 획득, 날씨 API 호출 및 데이터 렌더링 로직

### 4. API 설정 정보

프로젝트 실행을 위해 다음 API 키가 `js/weather.js`에 설정되어 있습니다.

- `apiKey`: OpenWeatherMap 인증 키
- `kakaoKey`: Kakao Maps JavaScript 키
