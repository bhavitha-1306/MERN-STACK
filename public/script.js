function generatePassword(){
    let length=document.getElementById("length").value;
    let uppercase=document.getElementById("uppercase").checked;
    let numbers=document.getElementById("numbers").checked;
    let special=document.getElementById("specialcharacters").checked;
    let chars="abcderfghijklmnopqrstuvwxyz";
    if(uppercase){
        chars+="ABCDEFGHIJKLMLNOPQRSTUVWXYZ";
    }
    if(numbers){
        chars+="0123456789"
    }
    if(special){
        chars+="!@#$%^&*()"
    }
    let password="";
    for(let i=0;i<length;i++){
        let randomindex=Math.floor(Math.random()*chars.length);
        password+=chars[randomindex];
    }
    document.getElementById("password").value=password;
    savepassword(password,length,uppercase,numbers,special);
}
function savepassword(password,length,uppercase,number,special){
    //send req to express server
    fetch("/save-password",{
        method:"POST",
        //telling the data is in json format
        headers:{
            "content-type":"application/json"
        },
        //converts objects into json strings      hasuppercase renaming variable
        body:JSON.stringify({password,length,hasuppercase:uppercase,hasnumber:number,hasspecial:special})
    });
}
function copypass(){
    let password=document.getElementById("password");
    navigator.clipboard.writeText(
     password.value
    );

    alert("Password copied");
}