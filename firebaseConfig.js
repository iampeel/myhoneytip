import firebase from "firebase/compat/app";

// 사용할 파이어베이스 서비스 주석을 해제
// import "firebase/auth";
import "firebase/compat/database";
// import "firebase/firestore";
// import "firebase/functions";
import "firebase/compat/storage";

// 파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
  apiKey: "AIzaSyB0Kb6SLdKpBj9no_-5rsREo2fU9f0mgzU",
  authDomain: "sparta-myhoneytip-pil.firebaseapp.com",
  // 아래 항목은 파이어베이스 홈페이지 > 빌드 > Realtime database에서 주소 복사
  databaseURL: "https://sparta-myhoneytip-pil-default-rtdb.firebaseio.com/",
  projectId: "sparta-myhoneytip-pil",
  storageBucket: "sparta-myhoneytip-pil.appspot.com",
  messagingSenderId: "1027051329245",
  appId: "1:1027051329245:web:b94ed54f22891474466d34",
  measurementId: "G-K3KWWCZ2P8",
};

// 파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//
export const firebase_db = firebase.database();
