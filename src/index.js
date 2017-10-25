
import  {ajax} from  "./ajax"
var ajax_params = {

    //data12
    dataType: "json", // Get it! // "script" not check
    url: "http://httpbin.org/post", // Get it!
    data: { name: 1, str: "str" }, // Get it!
    method: "POST", // Get it!
    header: { "eererererer": "r" }, // Get it!
    username: "max", // Not Check
    password: "ten", // Not Check

    //events
    beforeSend: () => { console.log("beforeSend") }, // Get it!
    success: (a, b) => { alert("Success: ", a, b) }, // Get it!
    error: (a, b) => { console.log("Error: ", a, b) }, // Get it!
    complete: (a, b) => { console.log("Complete: ", a, b) }, // Get it!

    //flags
    async: true, // Get it!
    global: true, // Get it!
}



document.addEventListener('startAjax', function(event) {
    console.log("Start Ajax event:", event)
});
document.addEventListener('endAjax', function(event) {
    console.log("End Ajax event:", event)
});



var one_ajax = new ajax(ajax_params)
console.log(one_ajax)