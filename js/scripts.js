function Darkmode() {
    if(document.getElementById("myonoffswitch").checked){

        document.getElementById("MainNavBar").classList.add("Dark")
        document.getElementById("MainNavBar").classList.remove("Light")

        document.getElementById("maincontainer").classList.add("Dark")
        document.getElementById("maincontainer").classList.remove("Light")

        document.getElementById("myfooter").classList.add("Dark")
        document.getElementById("myfooter").classList.remove("Light")

    }else{

        document.getElementById("MainNavBar").classList.remove("Dark")
        document.getElementById("MainNavBar").classList.add("Light")

        document.getElementById("maincontainer").classList.remove("Dark")
        document.getElementById("maincontainer").classList.add("Light")

        document.getElementById("myfooter").classList.remove("Dark")
        document.getElementById("myfooter").classList.add("Light")
        
    }
  }