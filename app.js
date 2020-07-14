const container = document.querySelector('.container');
const clearButton = document.querySelector('.clear');
const submitButton = document.querySelector('.submit');
const numInput = document.querySelector('.num')
const listContent = document.querySelector('.list-content')

const errmsg = msg => {
  alert(msg)
}

clearButton.addEventListener('click', () => {
  const items = document.querySelectorAll('.item-invisible');
  items.forEach(item => {
    item.classList.toggle('item-visible');
    item.classList.toggle('item-invisible');
  });
  numInput.value = ""
  listContent.innerHTML = ""
});

const invalidN = "올바른 숫자를 입력 해 주세요"
const invalidOT = "올바른 ○, △ 값을 입력 해 주세요"

submitButton.addEventListener('click', () => {
  let n = Number.parseInt(numInput.value)
  let o = Number.parseInt(document.querySelector('input[name="O"]:checked').value);
  let t = Number.parseInt(document.querySelector('input[name="T"]:checked').value);
  
  // check n
  if(!Number.isInteger(n)) return errmsg(invalidN);
  if(n < 123 || n > 987) return errmsg(invalidN);
  
  let n1 = ~~(n/100)
  let n2 = ~~(n/10)%10
  let n3 = n%10

  if(n1 > 9 || n1 == 0 || n2 == 0 || n3 == 0)
    return errmsg(invalidN);
  if(n1 == n2 || n1 == n3 || n2 == n3)
    return errmsg(invalidN);

  // check o t
  if(o + t > 3)
    return errmsg(invalidOT);

  let history = document.createElement('div')
  history.innerText = n+' ○:'+o+' △:'+t
  listContent.appendChild(history);

  const items = document.querySelectorAll('.item-visible');
  items.forEach(item => {
    let v = item.value;
    let i = ~~(v/100);
    let j = ~~(v/10)%10;
    let k = v%10;
  
    if(i != j && i != k && j != k) {
      let cntO = 0;
      let cntT = 0;

      if(n1 == i) cntO++
      else if(n1 == j || n1 == k) cntT++
      if(n2 == j) cntO++
      else if(n2 == i || n2 == k) cntT++
      if(n3 == k) cntO++
      else if(n3 == i || n3 == j) cntT++

      if(o != cntO || t != cntT) {
        item.classList.toggle('item-visible');
        item.classList.toggle('item-invisible');
      }
    }
  });
})

for(i = 1; i <= 9; i++)
  for(j = 1; j <= 9; j++)
    for(k = 1; k <= 9; k++) {
  if(i == j || i == k || j == k) continue;
  let num = i*100+j*10+k;
  let item = document.createElement('div');
  item.classList.add('item')
  item.classList.add('item-visible')
  item.value = num
  item.innerText = num
  container.append(item)
}