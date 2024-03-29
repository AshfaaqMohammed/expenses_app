const usernameField = document.querySelector('#usernameField');
const feedBackFArea = document.querySelector('.invalid_feedback');
const emailField = document.querySelector('#emailField');
const emailfeedBackFArea= document.querySelector('.emailfeedBackFArea');
const usernameSuccessOutput = document.querySelector('.usernameSuccessOutput');
const emailSuccessOutput = document.querySelector('.emailSuccessOutput');
const showPasswordToggle = document.querySelector(".showPasswordToggle");
const passwordField = document.querySelector('#passwordField')
const submitBtn = document.querySelector(".submit-btn")

const handleToggleInput = (e) => {

    if(showPasswordToggle.textContent === 'SHOW'){
        showPasswordToggle.textContent = 'HIDE';
        passwordField.setAttribute('type', 'text');
    }else{
        showPasswordToggle.textContent = 'SHOW';
        passwordField.setAttribute('type', 'password');
    }

};



showPasswordToggle.addEventListener('click',handleToggleInput);

emailField.addEventListener('keyup', (e)=>{
    const emailVal = e.target.value;

    emailSuccessOutput.style.display='block';
    emailSuccessOutput.textContent=`Checking ${emailVal}`;

    emailField.classList.remove("is-invalid");
    emailfeedBackFArea.style.display = "none";

    if(emailVal.length>0){
        fetch('/authentication/validate-email',{
        body:JSON.stringify({ email: emailVal }),
        method: "POST",
    })
    .then(res=>res.json()
    .then(data=>{
        console.log("data",data);
        emailSuccessOutput.style.display='none';
        if (data.email_error){
            submitBtn.setAttribute("disabled","disabled");
            submitBtn.disabled=true;
            emailField.classList.add("is-invalid");
            emailfeedBackFArea.style.display = "block";
            emailfeedBackFArea.innerHTML=`<p>${data.email_error}</p>`
        }
        else{
            submitBtn.removeAttribute("disabled");
        }
    }));
    }
});


usernameField.addEventListener('keyup', (e)=>{
    const usernameVal = e.target.value;

    usernameSuccessOutput.style.display='block';
    usernameSuccessOutput.textContent=`Checking ${usernameVal}`;


    usernameField.classList.remove("is-invalid");
    feedBackFArea.style.display = "none";


    
    if(usernameVal.length>0){
        fetch('/authentication/validate-username',{
        body:JSON.stringify({ username: usernameVal }),
        method: "POST",
    })
    .then(res=>res.json()
    .then(data=>{
        usernameSuccessOutput.style.display='none';
        if (data.username_error){
            usernameField.classList.add("is-invalid");
            feedBackFArea.style.display = "block";
            feedBackFArea.innerHTML=`<p>${data.username_error}</p>`
            submitBtn.disabled=true;
        }else{
            submitBtn.removeAttribute("disabled");
        }
    }));
    }
    
});