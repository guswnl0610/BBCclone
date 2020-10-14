(() => {
  const stepElems = document.querySelectorAll(".step");
  const graphElems = document.querySelectorAll(".graphic-item");
  const actions = {
      birdFlies(flag) {
          let tmpbird = document.querySelector('[data-index="2"] .bird');
          if(flag){
            tmpbird.style.transform = `translateX(${window.innerWidth}px)`;
          }
          else{
            tmpbird.style.transform = `translateX(-100%)`;    
          }
      },
      birdFlies2(flag) {
        let tmpbird = document.querySelector('[data-index="5"] .bird');
        if(flag){
          tmpbird.style.transform = `translate(${window.innerWidth}px,
            ${-window.innerHeight * 0.7}px )`;
        }
        else{
          tmpbird.style.transform = `translateX(-100%)`;    
        }
    }
  }


  let curitem = graphElems[0]; // 현재 활성화된 visible class가 붙을 graphic item
  let curindex;

  const io = new IntersectionObserver((entries, observer) => {
    //이것이 지금 보이는지? 얼만큼 올라왔는지? 이런걸 알려줌. 자세한건 구글~
    //관찰하는 대상이 사라지거나 나타날때마다 콜백함수가 호출이된다
    // console.log(entries[0].target.dataset.index);
    curindex = entries[0].target.dataset.index * 1;
  });

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]); //stepelems를 관찰할 목록에 등록함
    // stepElems[i].setAttribute('data-index',i);
    stepElems[i].dataset.index = i; //위랑 아래랑 같은말임
    graphElems[i].dataset.index = i;
    //각 element에 data-index 속성 부여
  }

  function activate(action) {
    curitem.classList.add("visible");
    if(action){
        actions[action](true);
    }
  }

  function inactivate() {
    curitem.classList.remove("visible");
    if(curitem.dataset.action){
        actions[curitem.dataset.action](false);
    }
  }

  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;
    for (let i = curindex - 1; i < curindex + 2; i++) {
      if (i < 0 || i >= stepElems.length) continue;
      step = stepElems[i];
      boundingRect = step.getBoundingClientRect();
      if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
        inactivate(curitem.dataset.action);
        curitem = graphElems[step.dataset.index];
        activate(curitem.dataset.action);
      }
    }
  });

  window.addEventListener('load', ()=>{
    setTimeout(() => {
       scrollTo(0,0); 
    });
  });

  activate();
})(); //전역변수 사용을 피하기 위함. console.log(안에있는변수)하면 에러남
//이름이 없는 화살표함수 만들고 ()로 감싼담에 마지막 ()로 실행해준것임
