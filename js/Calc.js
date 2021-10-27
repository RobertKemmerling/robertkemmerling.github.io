





function FindRes() {
    valNum = document.getElementById('inputResistance').value
    //read and select the right Resistor series
    
    Res_select = document.getElementById('inputE').value
    switch(Res_select) {
        case "E12":
            Res_values = new Array(0, 1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2);
            break;
        case "E24":
            Res_values = new Array(0, 1, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1);
            break;
        case "E96":
            Res_values = new Array(0.00, 1.00, 1.02, 1.05, 1.07, 1.10, 1.13, 1.15, 1.18, 1.21, 1.24, 1.27, 1.30, 1.33, 1.37, 1.40, 1.43, 1.47, 1.50, 1.54, 1.58, 1.62, 1.65, 1.69, 1.74, 1.78, 1.82, 1.87, 1.91, 1.96, 2.00, 2.05, 2.10, 2.15, 2.21, 2.26, 2.32, 2.37, 2.43, 2.49, 2.55, 2.61, 2.67, 2.74, 2.80, 2.87, 2.94, 3.01, 3.09, 3.16, 3.24, 3.32, 3.40, 3.48, 3.57, 3.65, 3.74, 3.83, 3.92, 4.02, 4.12, 4.22, 4.32, 4.42, 4.53, 4.64, 4.75, 4.87, 4.99, 5.11, 5.23, 5.36, 5.49, 5.62, 5.76, 5.90, 6.04, 6.19, 6.34, 6.49, 6.65, 6.81, 6.98, 7.15, 7.32, 7.50, 7.68, 7.87, 8.06, 8.25, 8.45, 8.66, 8.87, 9.09, 9.31, 9.53, 9.76);
            break;
        default:
    }


    //At the moment I make a huge list of resistor values (I do not like that)
    //next time I should make some limits (if the resistance of each resistor is over the target resistance there is no point to calculate the series resistance)
    var all_Res_values = [];
    var x = 0;
    for (var i = 0; i < 10; i++){
        for (var j = 1; j < Res_values.length; j++){
            all_Res_values[x] = Math.round((Res_values[j] * (Math.pow(10, i)))*100)/100;
            x ++;
        }
    }

      
    d = [["Resistor 1", "", "Resistor 2", "Error (%)"]]; //title of the table (also this resets the data array)
    res_series(valNum, all_Res_values); // looks for the best series resistor combination
    res_para(valNum, all_Res_values); // looks for the best parrallel resistor combination
    d.sort(sortFunction);
    tableCreate("resulttable", d, 1)
}




//generates a html table from a 2D array while adapting the size of the table
//The funktion requires a target ID which defines where the table will be generated
//The second argument then is a array with the content of the table
//The third argument defines if the previous content of the target location should be deleted
//WARNING: the delet funktion will not distinguish between a previous table or other content
//example: tableCreate("maintext",mydata_array)
function tableCreate(target,input,delet = 0) {
    var location = document.getElementById(target);
    if (delet == 1){location.innerHTML = "";}
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.style.height = '50px';
    tbl.style.font = 'Arial';
    var tbdy = document.createElement('tbody'); // make the table body
    for (var i = 0; i < input.length; i++) {
      var tr = document.createElement('tr'); // make a row
      for (var j = 0; j < input[0].length; j++) {
        if (i == 0) {
            var td = document.createElement('th'); // make a title
        }
        else{
            var td = document.createElement('td'); //make a data point
        }
        td.appendChild(document.createTextNode(input[i][j]));
        tr.appendChild(td)
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    location.appendChild(tbl)
}



//looks for the closest value to the target for series resistors (only 2 resistors)
function res_series(target,R){
    d_series = [[]]; //basicly I just make a list of every possebilety
    var shift_rep = 0;
    for (var i = 0; i < R.length; i++){ //for every R1
        for (var j = shift_rep; j < R.length; j++){ //for every R2
            err_hold = ((target - (R[i] + R[j]))/target) * 100; //error = DeltaR/R*100 
            d_series.push([R[i], "+", R[j], err_hold.toPrecision(4), Math.abs(err_hold)]); //saves everything (yes its bad just wait a bit I will fix it)
        }
        shift_rep++;
    }
    d_series.sort(sortFunction); //sort the huge list
    for (var i = 1; i < 5; i++){ //takes the best 5 results and saves it onto the main data array
        d.push(d_series[i]); 
    }
}


//looks for the closest value to the target for parrales resistors (only 2 resistors)
function res_para(target,R){
    d_para = [[]]; //basicly I just make a list of every possebilety
    var shift_rep = 0;
    for (var i = 0; i < R.length; i++){ //for every R1
        for (var j = 1; j < R.length; j++){ //for every R2
            err_hold = (((1/target) - (1/(R[i]) + 1/(R[j])))/(target)) * 100; //error = DeltaG/G*100 
            d_para.push([R[i], "//", R[j], err_hold.toPrecision(4), Math.abs(err_hold)]); //saves everything (yes its bad just wait a bit I will fix it)
        }
        shift_rep++;
    }
    d_para.sort(sortFunction); //sort the huge list
    for (var i = 1; i < 5; i++){ //takes the best 5 results and saves it onto the main data array
        d.push(d_para[i]); 
    }
}


//required for .sort
//I have no Idea what it does but I assume stack overflow knows what it does
function sortFunction(a, b) {
    if (a[4] === b[4]) {
        return 0;
    }
    else {
        return (a[4] < b[4]) ? -1 : 1;
    }
}