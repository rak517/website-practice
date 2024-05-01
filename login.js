var user = "asdf";
var password = "asd123!";


function login() {
  var $idInput = document.getElementById("idInput");
  var $pwInput = document.getElementById("pwInput");
  if ($idInput.value === "" || $pwInput.value === "") {
      alert("아이디와 비밀번호를 모두 입력해 주세요");
    return false;
  } else if ($pwInput.value !== password) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  } else if ($idInput.value !== user) {
    alert("아이디가 일치하지 않습니다.");
    return false;
  } else {
    window.location = "./index.html";
    return true;
  }
}
