let n = 0
$(document).ready(function(){
    let t = drink["ingredients"].length
    $(".ingredients").empty()
    $(".ingredients").append("<div class='inglabel center tiny'>Check off the ingredient you learn as you watch the video!</div>")
    $.each(drink["ingredients"], function(index,value){
        let item = $("<div class='inglabel ingpad leftjust' ><input type='checkbox' id="+index+" class='check' value="+value+"<label for="+index+">&nbsp;"+value+"</label> </div>")
        $(".ingredients").append(item)
        $("#"+index).change(function(){
            if ($("#"+index+':checked').length == $("#"+index).length) {
               n += 1
               if (n == t){
                $('#game').prop('disabled', false);
               }
               console.log(n)
               console.log(t)
            }
        });
    })
})