function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


function checkaccount(){
  let user = getCookie("Username");
  if (user != "") {
    document.getElementById("userpage").style.display = "block";
    document.getElementById("loginpage").style.display = "none";
    document.getElementById("usernamedisplay").innerHTML = user;
  } else {
    document.getElementById("userpage").style.display = "none";
    document.getElementById("loginpage").style.display = "block";
  }  
}
function makeaccount(){
    var name = "";
    name = document.getElementById("nameinput").value;
    setCookie("Username",name,300);
    checkaccount();
}