'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

var popUp = document.getElementsByClassName("PopUp")[0] ;
var popUpClose = document.getElementById("closePopUp");
var search = document.getElementById("SearchBtn");

popUpClose.onclick = function() {
    popUp.classList.remove("Active");
    popUp.classList.add("Inactive");
};

/*var checked = false;
var deleteBtn = document.getElementById("deleteBtn");
var CheckBox = document.getElementsByClassName("deleteCheck");



Array.from(CheckBox).forEach((element)=>{
    element.onclick = function(){
        enableDeleteBtn(findChecked());
    };
});

function findChecked() {
    checked= false;
    for(var i=0; i<CheckBox.length;i++) {
        if(CheckBox[i].checked) {
            CheckBox[i].value = CheckBox[i].id;
            checked = true;

        }
    }
    return checked;
}


function enableDeleteBtn(state) {
    if(state){ 
        deleteBtn.style.display = 'block';
    } else {
        deleteBtn.style.display = 'none';
    }   
}

// deleteBtn.onclick= function() {
//     var checkedArr = [];
//     for(var i=0; i<CheckBox.length;i++) {
//         if(CheckBox[i].checked) {
//             checkedArr.push(CheckBox[i].id);
//         }
//     }
//     console.log("array : "+checkedArr);
// };

// function addEvent(element, type, handler) {
//     if(element.attachEvent) {
//         element.attachEvent("on"+type, handler);
//     } else {
//         element.addEventListener(type, handler);
//     }
// }
*/
