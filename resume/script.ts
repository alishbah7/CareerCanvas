//---==== DISPLAYING DATA FUNCTIONALITY ====---//
let template1 = document.getElementById('template1');
let template2 = document.getElementById('template2');
let template3 = document.getElementById('template3');
let template4 = document.getElementById('template4');
let template5 = document.getElementById('template5');
let template = localStorage.getItem('template');

[template1, template2, template3, template4, template5].forEach(temp => {
    if (temp) temp.style.display = 'none';
});

if (template === '1' && template1) {
    template1.style.display = 'flex';
} else if (template === '2' && template2) {
    template2.style.display = 'flex';
} else if (template === '3' && template3) {
    template3.style.display = 'flex';
} else if (template === '4' && template4) {
    template4.style.display = 'flex';
} else if (template === '5' && template5) {
    template5.style.display = 'flex';
}

let userName = localStorage.getItem('userName');
let objective = localStorage.getItem('objective');
let phone = localStorage.getItem('phone');
let email = localStorage.getItem('email');
let edu = localStorage.getItem('education');
let exp = localStorage.getItem('experience');
let skills = localStorage.getItem('skills');

if (userName && 
    objective && 
    phone && 
    email && 
    edu && 
    exp && 
    skills) {

    let activeTemplate = document.querySelector(`#template${template}`);
    
    if (activeTemplate) {
        let name = activeTemplate.querySelector('#name');
        let obj = activeTemplate.querySelector('#obj');
        let ph = activeTemplate.querySelector('#ph');
        let em = activeTemplate.querySelector('#em');
        let displayEdu = activeTemplate.querySelector('#displayEdu');
        let displayExp = activeTemplate.querySelector('#displayExp');
        let displaySkills = activeTemplate.querySelector('#displaySkills');

        if (name) name.innerHTML = userName;
        if (obj) obj.innerHTML = objective;
        if (ph) ph.innerHTML = phone;
        if (em) em.innerHTML = email;

        let eduArray = edu.split(',');
        let expArray = exp.split(',');
        let skillsArray = skills.split(',');

        eduArray.forEach(valueEdu => {
            if (displayEdu) displayEdu.innerHTML += `<li>${valueEdu}</li>`;
        });

        expArray.forEach(valueExp => {
            if (displayExp) displayExp.innerHTML += `<li>${valueExp}</li>`;
        });

        skillsArray.forEach(valueSkills => {
            if (displaySkills) displaySkills.innerHTML += `<li>${valueSkills}</li>`;
        });
    }
}

//---==== EDITING FUNCTIONALITY ====---//
function updateLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
}

document.querySelectorAll('[contenteditable=true]').forEach(e => {
    e.addEventListener('input', () => {
        let fieldId = e.getAttribute('id');
        if (fieldId === 'name') updateLocalStorage('userName', e.innerHTML);
        if (fieldId === 'obj') updateLocalStorage('objective', e.innerHTML);
        if (fieldId === 'ph') updateLocalStorage('phone', e.innerHTML);
        if (fieldId === 'em') updateLocalStorage('email', e.innerHTML);
        if (fieldId === 'displayEdu') updateLocalStorage('education', getListItemsText(e as HTMLUListElement));
        if (fieldId === 'displayExp') updateLocalStorage('experience', getListItemsText(e as HTMLUListElement));
        if (fieldId === 'displaySkills') updateLocalStorage('skills', getListItemsText(e as HTMLUListElement));
    });
});

function getListItemsText(ul: HTMLUListElement): string {
    return Array.from(ul.querySelectorAll('li')).map(li => li.innerText).join(',');
}

//---==== DOWNLOADING FUNCTIONALITY ====---//
let downloadBtn = document.getElementById('download');

downloadBtn?.addEventListener('click', function(){
    window.print()
})

//---==== SHAREABLE LINK ====---//
let shareBtn = document.getElementById('share');

shareBtn?.addEventListener('click', function () {

    let userData = {
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
    let encodedData = btoa(JSON.stringify(userData));
    let shareableURL = `${window.location.origin}${window.location.pathname}?resume/${encodeURIComponent(userName || '')}&data=${encodedData}`;

    //--== APPS NAVIGATOR ==--//
    if (navigator.share) {
        navigator.share({
            title: `${userName}'s Resume`,
            text: 'Check out my resume!',
            url: shareableURL,
        });
    } else {
        navigator.clipboard.writeText(shareableURL);
        alert('Shareable link copied to clipboard!');
    }
});

//--== FETCHING DATA FROM URL ==--//
function getUrlParameter(name: string): string | null {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

window.addEventListener('DOMContentLoaded', () => {
    let encodedData = getUrlParameter('data');

    if (encodedData) {
        try {

            //--== CONVERTING DATA BACK TO ITS ORIGINAL FORM ==--//
            let decodedData = JSON.parse(atob(encodedData));

            let { template, userName, objective, phone, email, education, experience, skills } = decodedData;

            document.querySelectorAll('.template').forEach(temp => {
                if (temp instanceof HTMLElement) temp.style.display = 'none';
            });

            let activeTemplate = document.getElementById(`template${template}`);

            if (activeTemplate instanceof HTMLElement) {
                activeTemplate.style.display = 'flex';

                let nameField = activeTemplate.querySelector('#name') as HTMLElement | null;
                let objField = activeTemplate.querySelector('#obj') as HTMLElement | null;
                let phoneField = activeTemplate.querySelector('#ph') as HTMLElement | null;
                let emailField = activeTemplate.querySelector('#em') as HTMLElement | null;
                let displayEdu = activeTemplate.querySelector('#displayEdu') as HTMLUListElement | null;
                let displayExp = activeTemplate.querySelector('#displayExp') as HTMLUListElement | null;
                let displaySkills = activeTemplate.querySelector('#displaySkills') as HTMLUListElement | null;

                if (nameField) nameField.innerText = userName || '';
                if (objField) objField.innerText = objective || '';
                if (phoneField) phoneField.innerText = phone || '';
                if (emailField) emailField.innerText = email || '';

                if (displayEdu) {
                    displayEdu.innerHTML = (education || '').split(',').map((item: string) => `<li>${item}</li>`).join('');
                }

                if (displayExp) {
                    displayExp.innerHTML = (experience || '').split(',').map((item: string) => `<li>${item}</li>`).join('');
                }

                if (displaySkills) {
                    displaySkills.innerHTML = (skills || '').split(',').map((item: string) => `<li>${item}</li>`).join('');
                }
            }

            //--== DISABLING EDITING FUNCTIONALITY FOR SHARED LINKS ==--//
            document.querySelectorAll('[contenteditable=true]').forEach(e => {
                if (e instanceof HTMLElement) e.removeAttribute('contenteditable');
            });

            //--== HIDING HEADER, TITLE AND CHANGE TEMPLATE BUTTON ==--//
            let header = document.getElementById('header') as HTMLElement;
            let tempTitle = document.querySelector('.tempTitle') as HTMLElement | null;
            let download = document.getElementById('download') as HTMLElement | null;
            let share = document.getElementById('share') as HTMLElement | null;
            let changeBtn = document.getElementById('changeBtn') as HTMLElement | null;
            let changeBg = document.getElementById('changeBg') as HTMLElement | null;
            let changeFont = document.getElementById('changeFont') as HTMLElement | null;
            
            if (header) header.style.display = 'none';
            if (tempTitle) tempTitle.style.display = 'none';
            if (download) download.style.display = 'none';
            if (share) share.style.display = 'none';
            if (changeBtn) changeBtn.style.display = 'none';
            if (changeBg) changeBg.style.display = 'none';
            if (changeFont) changeFont.style.display = 'none';

        } catch (error) {
            console.error("error fetching data:");
        }
    }
});

//---==== BACKGROUND COLOR CUSTOMIZATION ====---//
document.addEventListener("DOMContentLoaded", () => {

    let template = localStorage.getItem('template');
    let activeTemplate = document.getElementById(`template${template}`) as HTMLElement | null;

    if (activeTemplate) {
        let backgroundElements = [
            activeTemplate.querySelector('.user-name-temp1'),
            activeTemplate.querySelector('.right-section-temp1'),
            activeTemplate.querySelector('.content-temp2') as HTMLElement | null,
            activeTemplate.querySelector('.user-name-temp2') as HTMLElement | null,
            activeTemplate.querySelector('.left-section-temp3') as HTMLElement | null,
            activeTemplate.querySelector('.profile-objective-temp3') as HTMLElement | null,
            activeTemplate.querySelector('.upperLayer') as HTMLElement | null,
            activeTemplate.querySelector('.eduH') as HTMLElement | null,
            activeTemplate.querySelector('.expH') as HTMLElement | null,
            activeTemplate.querySelector('.skillH') as HTMLElement | null,
            activeTemplate.querySelector('.personalInfo') as HTMLElement | null,
            activeTemplate.querySelector('.contactSkillsSec') as HTMLElement | null,
        ];

        backgroundElements.forEach((element) => {
            if (element) {

                element.addEventListener('dblclick', () => {
                    element.setAttribute("contenteditable", "true");
                });
        
                element.addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    openColorPicker(element);
                });
        
                let tapHoldTimeout;
                element.addEventListener("touchstart", () => {
                    tapHoldTimeout = setTimeout(() => {
                        openColorPicker(element);
                    }, 500);
                });
        
                element.addEventListener("touchend", () => {
                    clearTimeout(tapHoldTimeout);
                });
            }
        });
        
        function openColorPicker(element) {
            let colorInput = document.createElement("input");
            colorInput.type = "color";
            colorInput.style.position = "absolute";
            colorInput.style.visibility = "hidden";
            document.body.appendChild(colorInput);
            colorInput.click();
        
            colorInput.addEventListener("input", () => {
                let chosenColor = colorInput.value;
                element.style.backgroundColor = chosenColor;
                localStorage.setItem(`bgColor-template${template}-${element.className}`, chosenColor);
            });
        
            colorInput.addEventListener("change", () => {
                document.body.removeChild(colorInput);
            });
        };
    }
});

//---==== FONT COLOR CUSTOMIZATION ====---//
document.addEventListener("DOMContentLoaded", () => {

    let template = localStorage.getItem('template');
    let activeTemplate = document.getElementById(`template${template}`);

    if (activeTemplate) {
        let fontColorChanger = Array.from(activeTemplate.querySelectorAll('.changeFontColor'));

        let selectedFontColor = localStorage.getItem(`fontColor-template${template}`);
        if (selectedFontColor) {
            fontColorChanger.forEach((color: any) => {
                color.style.color = selectedFontColor;
            });
        }

        let changeFontBtn = document.getElementById('changeFont');
        if (changeFontBtn) {
            changeFontBtn.addEventListener("click", () => {
                let colorInput = document.createElement("input");
                colorInput.type = "color";
                colorInput.style.position = "absolute";
                colorInput.style.visibility = "hidden";
                document.body.appendChild(colorInput);
                colorInput.click();

                colorInput.addEventListener("input", () => {
                    let chosenColor = colorInput.value;
                    fontColorChanger.forEach((element: any) => {
                        element.style.color = chosenColor;
                    });

                    localStorage.setItem(`fontColor-template${template}`, chosenColor);
                });

                colorInput.addEventListener("change", () => {
                    document.body.removeChild(colorInput);
                });
            });
        }
    }
});

