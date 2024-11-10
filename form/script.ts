//---==== FORM ====---//

let submitBtn = document.getElementById('submit') as HTMLButtonElement;

let userNameInput = document.getElementById('userName') as HTMLInputElement;
let objectiveInput = document.getElementById('objective') as HTMLInputElement;

let telInput = document.getElementById('tel') as HTMLInputElement;
let emailInput = document.getElementById('email') as HTMLInputElement

let educationInput = document.getElementById('education') as HTMLInputElement;
let experienceInput = document.getElementById('experience') as HTMLInputElement;
let proSkillsInput = document.getElementById('pro_skills') as HTMLInputElement;

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();

  let userName = userNameInput.value;
  let objective = objectiveInput.value;

  let phone = telInput.value
  let email = emailInput.value

  let education = educationInput.value;
  let experience = experienceInput.value;
  let proSkills = proSkillsInput.value;

  if (userName.trim() === '' ||
      objective.trim() === '' ||

      phone.trim() === '' ||
      email.trim() === '' ||

      education.trim() === '' ||
      experience.trim() === '' ||
      proSkills.trim() === '' )

      {
        alert('Please fill out the full form!');
      }

  else {
    localStorage.setItem('userName', userName);
    localStorage.setItem('objective', objective)

    localStorage.setItem('phone', phone);
    localStorage.setItem('email', email);

    localStorage.setItem('education', education);
    localStorage.setItem('experience', experience);
    localStorage.setItem('skills', proSkills);

    window.location.href = '../resume/index.html';
  }

});
