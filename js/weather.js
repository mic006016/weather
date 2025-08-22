const apiKey = "ee2b04ae861795ee155dd477455fd663"
const kakaoKey = "62cbdfa7264404e7bff45e319f1af4c7"
const reqUrl = "https://api.openweathermap.org/data/2.5/weather"
const iconUrl = "https://openweathermap.org/img/wn/10d@2x.png"
const weather = {
  myData: {},
  allData: [
    {
      name: "서울",
      lat: 37.566535,
      lon: 126.977969,
      weather: {},
      clsNm: "seoul",
    },
    { name: "부산", lat: 35.179554, lon: 129.075642, weather: {}, clsNm: "" },
    { name: "제주", lat: 33.489011, lon: 126.498302, weather: {}, clsNm: "" },
    { name: "원주", lat: 37.342219, lon: 127.919135, weather: {}, clsNm: "" },
    { name: "대구", lat: 35.871435, lon: 128.601445, weather: {}, clsNm: "" },
    { name: "세종", lat: 36.480132, lon: 127.289021, weather: {}, clsNm: "" },
    { name: "광주", lat: 35.159545, lon: 126.852601, weather: {}, clsNm: "" },
    {
      name: "독도",
      lat: 37.241411,
      lon: 131.870155,
      weather: {},
      clsNm: "dokdo",
    },
    {
      name: "속초",
      lat: 38.204543,
      lon: 128.591835,
      weather: {},
      clsNm: "sokcho",
    },
  ],
}
function getIcon(code, lg = false) {
  return code
    ? `https://openweathermap.org/img/wn/${code}${lg ? "@2x" : ""}.png`
    : "-"
}
function getOverlay(icon, name, temp, clsNm) {
  return `
  <div class="map-overlay-wrapper ${clsNm}">
    <div class="inner-wrap">
      <div class="icon-wp">
        <img
          src="${getIcon(icon)}"
          alt="지도날씨아이콘"
          class="map-icon"
        />
      </div>
      <div class="temp-wp">
        <span class="city-name">${name}</span>
        <span class="city-temp">${temp}</span>℃
      </div>
    </div>
  </div>`
}
function getCoords() {
  return new Promise((resolve) => {
  let defaultLat = 37.566535
  let defaultLon = 126.9779692
  navigator.geolocation.getCurrentPosition(
    (res) => {
      resolve({
        lat: res?.coords?.latitude ?? defaultLat,
        lon: res?.coords?.longitude ?? defaultLon
      })
    },
    (err) => {
      console.log(err)
      resolve({ lat: defaultLat, lon: defaultLon })
    }
  )
  })
}
async function getWeather(lat, lon) {
  // const req = `${reqUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  // const { data } = await axios.get(req);
  const params = { lat, lon, appid: apiKey, units: "metric"}
  const { data } = await axios.get(reqUrl, { params })
  return data
}

function renderInfo() {
  // 구조분해할당
  const { temp, feels_like, temp_max, temp_min, humidity } = weather.myData?.main || {}
  const { description, icon } = weather.myData?.weather?.[0] || {}
  // const temp = weather.myData?.main?.temp || "-"
  // const max = weather.myData?.main?.temp_max || "-"
  // const min = weather.myData?.main?.temp_min || "-"
  // const humidity = weather.myData?.main?.humidity || "-"
  // const description = weather.myData?.weather?.[0]?.description || "-"
  // const icon = getIcon(weather.myData?.weather?.[0]?.icon, true);
  const info = document.querySelector(".info-wrapper")
  info.querySelector(".main-temp").innerText = temp || "-"
  info.querySelector(".feels-temp").innerText = feels_like || "-"
  info.querySelector(".max-temp").innerText = temp_max || "-"
  info.querySelector(".min-temp").innerText = temp_min || "-"
  info.querySelector(".humidity").innerText = humidity || "-"
  info.querySelector(".description").innerText = description || "-"
  info.querySelector(".weather-icon").src = getIcon(icon, true)
}

async function initInfo() {
  const { lat, lon } = await getCoords(); // 나의 위치
  weather.myData = await getWeather(lat, lon)
  renderInfo();
}

async function initMap() {
  const pms = weather.allData.map((city) => getWeather(city.lat, city.lon))
  const values = await Promise.all(pms)
  weather.allData.forEach((city, idx) => (city.weather = values[idx]))

  const mapEl = document.getElementById("map")
  const mapOption = {
    center: new kakao.maps.LatLng(35.871435, 128.771445),
    level: 13,
    draggable: false,
    scrollwheel: false,
    disableDoubleClick: true,
    disableDoubleClickZoom: true,
  }
  const map = new kakao.maps.Map(mapEl, mapOption)

  weather.allData.forEach((city) => {
    const temp = city.weather?.main?.temp
    const icon = city.weather?.weather?.[0]?.icon
    const position = new kakao.maps.LatLng(city.lat, city.lon)
    const marker = new kakao.maps.Marker({ position })
    var overlay = new kakao.maps.CustomOverlay({
      position,
      content: getOverlay(icon, city.name, temp, city.clsNm),
      xAnchor: 0,
      yAnchor: 0,
    });
    marker.setMap(map)
    overlay.setMap(map)
  });
}

async function init() {
  initInfo()
  initMap()
}

window.addEventListener("load", init)

// .then절
// QueryString(params)

// function init2() {
//   getCoords().then(async ({ lat, lon }) => {
//     console.log(await getWeather(lat, lon));
//   });
// }

// window.addEventListener("load", init)

// flowchart TD
//     A[페이지 로드] --> B[init() 실행]
//     B --> C[getcoords() 호출]
//     C -->|성공적으로 위치 획득| D[lat, lon 반환]
//     C -->|실패 시 기본값 사용| D
//     D --> E[getWeather(lat, lon) 호출]
//     E --> F[axios.get()로 API 요청]
//     F --> G[OpenWeatherMap 서버]
//     G --> H[날씨 데이터 응답]
//     H --> I[data 반환]
//     I --> J[console.log(weather)]
