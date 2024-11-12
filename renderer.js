// 창 제어 버튼 핸들링
document.getElementById('minimize').addEventListener('click', () => {
  window.api.windowControl('minimize');
  console.log('Minimize button clicked');
});

document.getElementById('maximize').addEventListener('click', () => {
  window.api.windowControl('maximize');
  console.log('Maximize button clicked');
});

document.getElementById('close').addEventListener('click', () => {
  window.api.windowControl('close');
  console.log('Close button clicked');
});

// iframe의 src를 deviceId와 함께 설정하는 함수
function setIframeSrc() {
  const deviceId = getDeviceId();
  const iframe = document.getElementById('webview');
  const newSrc = `https://bedrock.es?deviceId=${deviceId}`;
  
  console.log(`Setting iframe src to: ${newSrc}`); // 디버깅을 위한 로그 추가
  iframe.src = newSrc;
}

// DOM이 완전히 로드된 후 iframe src 설정
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  setIframeSrc();
});

// Device ID를 가져오는 함수
function getDeviceId() {
  let deviceId = localStorage.getItem('deviceId'); // 로컬 저장소에서 deviceId 가져오기

  if (!deviceId) {
    // deviceId가 없을 경우, UUID 생성
    deviceId = generateUUID();
    localStorage.setItem('deviceId', deviceId); // 새로 생성한 UUID를 로컬 저장소에 저장
    console.log('New deviceId generated and saved:', deviceId);
  } else {
    console.log('Existing deviceId retrieved:', deviceId);
  }

  return deviceId;
}