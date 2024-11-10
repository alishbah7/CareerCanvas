//---==== CHANGING TEMPLATE FUNCTIONALITY ====---//

let template1 = document.getElementById('template1');
let template2 = document.getElementById('template2');
let template3 = document.getElementById('template3');
let template4 = document.getElementById('template4');
let template5 = document.getElementById('template5');

template1?.addEventListener('click', function(){
    localStorage.setItem('template', '1')
    window.location.href = '../resume/index.html'
})

template2?.addEventListener('click', function(){
    localStorage.setItem('template', '2')
    window.location.href = '../resume/index.html'
})

template3?.addEventListener('click', function(){
    localStorage.setItem('template', '3')
    window.location.href = '../resume/index.html'
})

template4?.addEventListener('click', function(){
    localStorage.setItem('template', '4')
    window.location.href = '../resume/index.html'
})

template5?.addEventListener('click', function(){
    localStorage.setItem('template', '5')
    window.location.href = '../resume/index.html'
})