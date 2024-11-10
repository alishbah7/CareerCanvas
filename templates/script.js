var template1 = document.getElementById('template1');
var template2 = document.getElementById('template2');
var template3 = document.getElementById('template3');
var template4 = document.getElementById('template4');
var template5 = document.getElementById('template5');
template1 === null || template1 === void 0 ? void 0 : template1.addEventListener('click', function () {
    localStorage.setItem('template', '1');
    window.location.href = '../form/index.html';
});
template2 === null || template2 === void 0 ? void 0 : template2.addEventListener('click', function () {
    localStorage.setItem('template', '2');
    window.location.href = '../form/index.html';
});
template3 === null || template3 === void 0 ? void 0 : template3.addEventListener('click', function () {
    localStorage.setItem('template', '3');
    window.location.href = '../form/index.html';
});
template4 === null || template4 === void 0 ? void 0 : template4.addEventListener('click', function () {
    localStorage.setItem('template', '4');
    window.location.href = '../form/index.html';
});
template5 === null || template5 === void 0 ? void 0 : template5.addEventListener('click', function () {
    localStorage.setItem('template', '5');
    window.location.href = '../form/index.html';
});
