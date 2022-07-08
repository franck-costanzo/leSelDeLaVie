export default function signUp() {
    
    //-----------------user friendly password--------
    let password = document.querySelector("[name='password']")
    let p = document.querySelectorAll("p")
    let check=document.getElementById('check')
    let data = new FormData()
    let email=document.querySelector("[name='email']")
    let regexLowerCase = /[a-z]{1,}/
    let regexUpperCase = /[A-Z]{1,}/
    let regexNumber = /[0-9]{1,}/
    //let regexSpeCharac = /^[^@&".()!_$*€£`+=\/;?#]+$/
    let passwordMinLength = /^[A-Za-z0-9\d@$!%*?&].{6,}$/
    
    password.addEventListener("keyup", () => {
    
    console.log(password.value)
    
        if (regexLowerCase.test(password.value) == true) {
            // on mondifie le style avec la commande style.color
            p[0].style.color = 'aqua'
    
        } else {
    
            p[0].style.color = 'grey'
        }
    
    
        if (regexUpperCase.test(password.value) == true) {
    
            // on mondifie le style avec la commande style.color
            p[1].style.color = 'aqua'
    
        } else {
    
            p[1].style.color = 'grey'
        }
    
    
        if (passwordMinLength.test(password.value) == true) {
            console.log(passwordMinLength.test(password.value))
            // on mondifie le style avec la commande style.color
            p[2].style.color = 'aqua'
    
        } else {
            p[2].style.color = 'grey'
        }
    
        if (regexNumber.test(password.value) == true) {
    
            p[3].style.color = 'aqua'
    
        } else {
    
            p[3].style.color = 'grey'
        }
    }
    )
    
    email.addEventListener("keyup", () => {
        check.innerHTML=''  
        data.append('email', (email.value))
        fetch('./Model/Model.php?test=1',
            {
                method: 'POST',
                body: data,
            })
            .then(response => response.json())
            .then((results) => check.innerHTML += results);
            
    
    
    })
}