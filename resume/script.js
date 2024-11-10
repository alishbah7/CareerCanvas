//---==== DISPLAYING DATA FUNCTIONALITY ====---//
var template1 = document.getElementById('template1');
var template2 = document.getElementById('template2');
var template3 = document.getElementById('template3');
var template4 = document.getElementById('template4');
var template5 = document.getElementById('template5');
var template = localStorage.getItem('template');
[template1, template2, template3, template4, template5].forEach(function (temp) {
    if (temp)
        temp.style.display = 'none';
});
if (template === '1' && template1) {
    template1.style.display = 'flex';
}
else if (template === '2' && template2) {
    template2.style.display = 'flex';
}
else if (template === '3' && template3) {
    template3.style.display = 'flex';
}
else if (template === '4' && template4) {
    template4.style.display = 'flex';
}
else if (template === '5' && template5) {
    template5.style.display = 'flex';
}
var userName = localStorage.getItem('userName');
var objective = localStorage.getItem('objective');
var phone = localStorage.getItem('phone');
var email = localStorage.getItem('email');
var edu = localStorage.getItem('education');
var exp = localStorage.getItem('experience');
var skills = localStorage.getItem('skills');
if (userName &&
    objective &&
    phone &&
    email &&
    edu &&
    exp &&
    skills) {
    var activeTemplate = document.querySelector("#template".concat(template));
    if (activeTemplate) {
        var name_1 = activeTemplate.querySelector('#name');
        var obj = activeTemplate.querySelector('#obj');
        var ph = activeTemplate.querySelector('#ph');
        var em = activeTemplate.querySelector('#em');
        var displayEdu_1 = activeTemplate.querySelector('#displayEdu');
        var displayExp_1 = activeTemplate.querySelector('#displayExp');
        var displaySkills_1 = activeTemplate.querySelector('#displaySkills');
        if (name_1)
            name_1.innerHTML = userName;
        if (obj)
            obj.innerHTML = objective;
        if (ph)
            ph.innerHTML = phone;
        if (em)
            em.innerHTML = email;
        var eduArray = edu.split(',');
        var expArray = exp.split(',');
        var skillsArray = skills.split(',');
        eduArray.forEach(function (valueEdu) {
            if (displayEdu_1)
                displayEdu_1.innerHTML += "<li>".concat(valueEdu, "</li>");
        });
        expArray.forEach(function (valueExp) {
            if (displayExp_1)
                displayExp_1.innerHTML += "<li>".concat(valueExp, "</li>");
        });
        skillsArray.forEach(function (valueSkills) {
            if (displaySkills_1)
                displaySkills_1.innerHTML += "<li>".concat(valueSkills, "</li>");
        });
    }
}
//---==== EDITING FUNCTIONALITY ====---//
function updateLocalStorage(key, value) {
    localStorage.setItem(key, value);
}
document.querySelectorAll('[contenteditable=true]').forEach(function (e) {
    e.addEventListener('input', function () {
        var fieldId = e.getAttribute('id');
        if (fieldId === 'name')
            updateLocalStorage('userName', e.innerHTML);
        if (fieldId === 'obj')
            updateLocalStorage('objective', e.innerHTML);
        if (fieldId === 'ph')
            updateLocalStorage('phone', e.innerHTML);
        if (fieldId === 'em')
            updateLocalStorage('email', e.innerHTML);
        if (fieldId === 'displayEdu')
            updateLocalStorage('education', getListItemsText(e));
        if (fieldId === 'displayExp')
            updateLocalStorage('experience', getListItemsText(e));
        if (fieldId === 'displaySkills')
            updateLocalStorage('skills', getListItemsText(e));
    });
});
function getListItemsText(ul) {
    return Array.from(ul.querySelectorAll('li')).map(function (li) { return li.innerText; }).join(',');
}
//---==== DOWNLOADING FUNCTIONALITY ====---//
var downloadBtn = document.getElementById('download');
downloadBtn === null || downloadBtn === void 0 ? void 0 : downloadBtn.addEventListener('click', function () {
    window.print();
});
//---==== SHAREABLE LINK ====---//
var shareBtn = document.getElementById('share');
shareBtn === null || shareBtn === void 0 ? void 0 : shareBtn.addEventListener('click', function () {
    var userData = {
        template: localStorage.getItem('template'),
        userName: localStorage.getItem('userName'),
        objective: localStorage.getItem('objective'),
        phone: localStorage.getItem('phone'),
        email: localStorage.getItem('email'),
        education: localStorage.getItem('education'),
        experience: localStorage.getItem('experience'),
        skills: localStorage.getItem('skills'),
    };
    //--== DATA TO BASE64 FORMAT ==--//
    var encodedData = btoa(JSON.stringify(userData));
    var shareableURL = "".concat(window.location.origin).concat(window.location.pathname, "?resume/").concat(encodeURIComponent(userName || ''), "&data=").concat(encodedData);
    //--== APPS NAVIGATOR ==--//
    if (navigator.share) {
        navigator.share({
            title: "".concat(userName, "'s Resume"),
            text: 'Check out my resume!',
            url: shareableURL,
        });
    }
    else {
        navigator.clipboard.writeText(shareableURL);
        alert('Shareable link copied to clipboard!');
    }
});
//--== FETCHING DATA FROM URL ==--//
function getUrlParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
window.addEventListener('DOMContentLoaded', function () {
    var encodedData = getUrlParameter('data');
    if (encodedData) {
        try {
            //--== CONVERTING DATA BACK TO ITS ORIGINAL FORM ==--//
            var decodedData = JSON.parse(atob(encodedData));
            var template_1 = decodedData.template, userName_1 = decodedData.userName, objective_1 = decodedData.objective, phone_1 = decodedData.phone, email_1 = decodedData.email, education = decodedData.education, experience = decodedData.experience, skills_1 = decodedData.skills;
            document.querySelectorAll('.template').forEach(function (temp) {
                if (temp instanceof HTMLElement)
                    temp.style.display = 'none';
            });
            var activeTemplate = document.getElementById("template".concat(template_1));
            if (activeTemplate instanceof HTMLElement) {
                activeTemplate.style.display = 'flex';
                var nameField = activeTemplate.querySelector('#name');
                var objField = activeTemplate.querySelector('#obj');
                var phoneField = activeTemplate.querySelector('#ph');
                var emailField = activeTemplate.querySelector('#em');
                var displayEdu = activeTemplate.querySelector('#displayEdu');
                var displayExp = activeTemplate.querySelector('#displayExp');
                var displaySkills = activeTemplate.querySelector('#displaySkills');
                if (nameField)
                    nameField.innerText = userName_1 || '';
                if (objField)
                    objField.innerText = objective_1 || '';
                if (phoneField)
                    phoneField.innerText = phone_1 || '';
                if (emailField)
                    emailField.innerText = email_1 || '';
                if (displayEdu) {
                    displayEdu.innerHTML = (education || '').split(',').map(function (item) { return "<li>".concat(item, "</li>"); }).join('');
                }
                if (displayExp) {
                    displayExp.innerHTML = (experience || '').split(',').map(function (item) { return "<li>".concat(item, "</li>"); }).join('');
                }
                if (displaySkills) {
                    displaySkills.innerHTML = (skills_1 || '').split(',').map(function (item) { return "<li>".concat(item, "</li>"); }).join('');
                }
            }
            //--== DISABLING EDITING FUNCTIONALITY FOR SHARED LINKS ==--//
            document.querySelectorAll('[contenteditable=true]').forEach(function (e) {
                if (e instanceof HTMLElement)
                    e.removeAttribute('contenteditable');
            });
            //--== HIDING HEADER, TITLE AND CHANGE TEMPLATE BUTTON ==--//
            var header = document.getElementById('header');
            var tempTitle = document.querySelector('.tempTitle');
            var download = document.getElementById('download');
            var share = document.getElementById('share');
            var changeBtn = document.getElementById('changeBtn');
            var changeBg = document.getElementById('changeBg');
            var changeFont = document.getElementById('changeFont');
            if (header)
                header.style.display = 'none';
            if (tempTitle)
                tempTitle.style.display = 'none';
            if (download)
                download.style.display = 'none';
            if (share)
                share.style.display = 'none';
            if (changeBtn)
                changeBtn.style.display = 'none';
            if (changeBg)
                changeBg.style.display = 'none';
            if (changeFont)
                changeFont.style.display = 'none';
        }
        catch (error) {
            console.error("error fetching data:");
        }
    }
});
//---==== BACKGROUND COLOR CUSTOMIZATION ====---//
document.addEventListener("DOMContentLoaded", function () {
    var template = localStorage.getItem('template');
    var activeTemplate = document.getElementById("template".concat(template));
    if (activeTemplate) {
        var backgroundElements = [
            activeTemplate.querySelector('.user-name-temp1'),
            activeTemplate.querySelector('.right-section-temp1'),
            activeTemplate.querySelector('.content-temp2'),
            activeTemplate.querySelector('.user-name-temp2'),
            activeTemplate.querySelector('.left-section-temp3'),
            activeTemplate.querySelector('.profile-objective-temp3'),
            activeTemplate.querySelector('.upperLayer'),
            activeTemplate.querySelector('.eduH'),
            activeTemplate.querySelector('.expH'),
            activeTemplate.querySelector('.skillH'),
            activeTemplate.querySelector('.personalInfo'),
            activeTemplate.querySelector('.contactSkillsSec'),
        ];
        backgroundElements.forEach(function (element) {
            if (element) {
                element.addEventListener('dblclick', function () {
                    element.setAttribute("contenteditable", "true");
                });
                element.addEventListener("contextmenu", function (event) {
                    event.preventDefault();
                    openColorPicker(element);
                });
                var tapHoldTimeout_1;
                element.addEventListener("touchstart", function () {
                    tapHoldTimeout_1 = setTimeout(function () {
                        openColorPicker(element);
                    }, 500);
                });
                element.addEventListener("touchend", function () {
                    clearTimeout(tapHoldTimeout_1);
                });
            }
        });
        function openColorPicker(element) {
            var colorInput = document.createElement("input");
            colorInput.type = "color";
            colorInput.style.position = "absolute";
            colorInput.style.display = "none";
            document.body.appendChild(colorInput);
            colorInput.style.display = "block";
            colorInput.click();
            colorInput.addEventListener("input", function () {
                var chosenColor = colorInput.value;
                element.style.backgroundColor = chosenColor;
                localStorage.setItem("bgColor-template".concat(template, "-").concat(element.className), chosenColor);
            });
            colorInput.addEventListener("change", function () {
                document.body.removeChild(colorInput);
            });
        }
    }
});
//---==== FONT COLOR CUSTOMIZATION ====---//
document.addEventListener("DOMContentLoaded", function () {
    var template = localStorage.getItem('template');
    var activeTemplate = document.getElementById("template".concat(template));
    if (activeTemplate) {
        var fontColorChanger_1 = Array.from(activeTemplate.querySelectorAll('.changeFontColor'));
        var selectedFontColor_1 = localStorage.getItem("fontColor-template".concat(template));
        if (selectedFontColor_1) {
            fontColorChanger_1.forEach(function (color) {
                color.style.color = selectedFontColor_1;
            });
        }
        var changeFontBtn = document.getElementById('changeFont');
        if (changeFontBtn) {
            changeFontBtn.addEventListener("click", function () {
                var colorInput = document.createElement("input");
                colorInput.type = "color";
                colorInput.style.position = "absolute";
                colorInput.style.visibility = "hidden";
                document.body.appendChild(colorInput);
                colorInput.click();
                colorInput.addEventListener("input", function () {
                    var chosenColor = colorInput.value;
                    fontColorChanger_1.forEach(function (element) {
                        element.style.color = chosenColor;
                    });
                    localStorage.setItem("fontColor-template".concat(template), chosenColor);
                });
                colorInput.addEventListener("change", function () {
                    document.body.removeChild(colorInput);
                });
            });
        }
    }
});
