//---==== FORM ====---//
var submitBtn = document.getElementById('submit');
var userNameInput = document.getElementById('userName');
var objectiveInput = document.getElementById('objective');
var telInput = document.getElementById('tel');
var emailInput = document.getElementById('email');
var educationInput = document.getElementById('education');
var experienceInput = document.getElementById('experience');
var proSkillsInput = document.getElementById('pro_skills');
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var userName = userNameInput.value;
    var objective = objectiveInput.value;
    var phone = telInput.value;
    var email = emailInput.value;
    var education = educationInput.value;
    var experience = experienceInput.value;
    var proSkills = proSkillsInput.value;
    if (userName.trim() === '' ||
        objective.trim() === '' ||
        phone.trim() === '' ||
        email.trim() === '' ||
        education.trim() === '' ||
        experience.trim() === '' ||
        proSkills.trim() === '') {
        alert('Please fill out the full form!');
    }
    else {
        localStorage.setItem('userName', userName);
        localStorage.setItem('objective', objective);
        localStorage.setItem('phone', phone);
        localStorage.setItem('email', email);
        localStorage.setItem('education', education);
        localStorage.setItem('experience', experience);
        localStorage.setItem('skills', proSkills);
        window.location.href = '../resume/index.html';
    }
});
