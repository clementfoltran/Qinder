const password_len_message = document.getElementById("password_len_message");
const password_up_message = document.getElementById("password_up_message");
const password_num_message = document.getElementById("password_num_message");
const password_spe_message = document.getElementById("password_spe_message");

function checkPassword()
{
    var password = (document.getElementById("newPassword") as HTMLInputElement).value;
    console.log(password);
    
    var anUpperCase = /[A-Z]/;
    var aLowerCase = /[a-z]/; 
    var aNumber = /[0-9]/;
    var aSpecial = /[!|@|#|$|%|^|&|*|(|)|=|+|-|_]/;
 
        if (password.length < 12)
        {
            password_len_message.innerHTML = "✗ 12 characters or more";
            password_len_message.style.color = "red";
        } else {
            password_len_message.innerHTML = "✓ 12 characters or more";
            password_len_message.style.color = "green";
        }

        var numUpper = 0;
        var numNums = 0;
        var numSpecials = 0;
        for (var i = 0; i < password.length; i++){
            if (anUpperCase.test(password[i]))
                numUpper++;
            else if (aNumber.test(password[i]))
                numNums++;
            else if (aSpecial.test(password[i]))
                numSpecials++;
        }
        if (numUpper < 1)
        {
            password_up_message.innerHTML = "✗ Upper characters";
            password_up_message.style.color = "red";
        } else 
        {
            password_up_message.innerHTML = "✓ Upper characters";
            password_up_message.style.color = "green";
        }
        if (numNums < 1)
        {
            password_num_message.innerHTML = "✗ Numbers";
            password_num_message.style.color = "red";
        } else 
        {
            password_num_message.innerHTML = "✓ Numbers";
            password_num_message.style.color = "green";
        }
        if (numSpecials < 1)
        {
            password_spe_message.innerHTML = "✗ Special characters";
            password_spe_message.style.color = "red";
        } else 
        {
            password_spe_message.innerHTML = "✓ Special characters";
            password_spe_message.style.color = "green";
        }
    
}