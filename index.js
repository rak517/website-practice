//DOMContentLoaded - 브라우저가 HTML을 전부 읽고 DOM 트리를 완성하는 즉시 발생한다. 
//이미지 파일(<img>)이나 스타일시트 등의 기타 자원은 기다리지 않는다.
document.addEventListener("DOMContentLoaded", function() {
  const overMenu = document.getElementById("overMenu");
  const overMenu2 = document.getElementById("overMenu2");
  const parentNavItem = document.querySelector(".nav-ul-item3"); // 상위 메뉴 아이템
  const parentNavItem2 = document.querySelector(".nav-ul-item4");
  // 마우스 오버 시 하위 메뉴 표시
  parentNavItem.addEventListener("mouseover", function() {
      overMenu.style.display = "block";
  });
  parentNavItem2.addEventListener("mouseover", function(){
      overMenu2.style.display = "block";
  }); 

  // 마우스 아웃 시 하위 메뉴 숨김
  parentNavItem.addEventListener("mouseout", function() {
      overMenu.style.display = "none";
  });
  parentNavItem2.addEventListener("mouseout", function(){
      overMenu2.style.display = "none"; 
  }); 
});
//콜백함수 (onLoad call back func)
function call_js(){
    //ui객체참조변수 선언
    let slideshow = document.querySelector(".slideshow");
    let slideshow_slides = document.querySelector(".slideshow_slides");
    //a > img 객체배일
    let slides = document.querySelectorAll(".slideshow_slides a");
    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");
    let indicators = document.querySelectorAll(".indicator a");
    //회전목마 현재위치값, 시간설정, 슬라이드수
    let currentIndex = 0;
    let timer = null;
    let slideCount = slides.length;
    //회전목마이미지를 우측으로 배치시켜준다.
    for(let i=0;i<slideCount;i++){
        let newLeft = i*100+'%';
        slides[i].style.left = newLeft;
    }

    //회전목마를 움직인다. () slideshow_slides 왼쪽으로 -100% 이동
    function gotoSlide(index){
        currentIndex = index;
        let newLeft = index*-100+'%';
        slideshow_slides.style.left = newLeft;
        indicators.forEach((e)=>{
            e.classList.remove("active");
        });
        indicators[currentIndex].classList.add("active");
    }
    //index = 0번부터 3번까지 3초간 gotoSlide(index)
    gotoSlide(0);

    //3초간
    function startTimer(){
        timer = setInterval(()=>{
            currentIndex += 1;
            let index = currentIndex % slideCount;
            gotoSlide(index)
        },3000);
    }

    startTimer();

    //이벤트처리
    slideshow_slides.addEventListener("mouseenter", function(){
        clearInterval(timer);
    });

    slideshow_slides.addEventListener("mouseleave", function(){
        startTimer();
    });
    prev.addEventListener("mouseenter", function(){
        clearInterval(timer);
    });
    next.addEventListener("mouseenter", function(){
        clearInterval(timer);
    });

    prev.addEventListener("click", function(e){
        e.preventDefault() //a tag 기본기능을 막는다.
        currentIndex -= 1;
        if(currentIndex < 0){
            currentIndex = slideCount -1;
        }
        gotoSlide(currentIndex);
    });

    next.addEventListener("click", function(e){
        e.preventDefault() //a tag 기본기능 막기
        currentIndex += 1;
        if(currentIndex > slideCount -1){
            currentIndex = 0;
        }
        gotoSlide(currentIndex);
    });

    indicators.forEach((e)=>{
        e.addEventListener("mouseenter", ()=>{
            clearInterval(timer);
        });
    });
    for(let i=0;i<indicators.length;i++){
        indicators[i].addEventListener("click",(e)=>{
            e.preventDefault();
            gotoSlide(i)
        });
    }

}
function loadHTML(id){
    const html = `${id}.html`;
    const target = document.getElementById("article");
    target.innerHTML = '';
    fetch(html)
        .then(response => response.text())
        .then(content => {
            target.innerHTML = content;
            const script = document.createElement('script');
            script.src = `${id}.js`;
            script.defer = true;
            document.head.appendChild(script);
        }) 
}
