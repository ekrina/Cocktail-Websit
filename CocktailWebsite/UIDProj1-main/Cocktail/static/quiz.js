let scoreNum = "0"

$(document).ready(function() {
        if (qno == 3) {
            let score = "<br>You got " + n + "/2 questions correct!<br>Press Done to learn about more drinks.";
            $("#question_number").prepend(score);
            let new2_div = "<div class='top_padding'> <button onclick=location.href='/' class='bigbutton white-text'>Done</button></div>"
        $("#question").append(new2_div)
        }
        else {
        let new_div = "<div>" + quiz.questions[qno-1] + "<br> (select all that apply)</div>"
        $("#question").append(new_div)

        let q = "Question  " + (qno) + "/2"
        $("#question_number").prepend(q)

        // $form = $("<form></form>")
        let form = '<input type="checkbox" id = "1" value="'+quiz.options[qno-1][0]+'"><label for = "1">&ensp;'+quiz.options[qno-1][0]+'</label><br>'
        form += '<input type="checkbox" id = "2" value="'+quiz.options[qno-1][1]+'"><label for = "2">&ensp;'+quiz.options[qno-1][1]+'</label><br>'
        form += '<input type="checkbox" id = "3" value="'+quiz.options[qno-1][2]+'"><label for = "3">&ensp;'+quiz.options[qno-1][2]+'</label><br>'
        form += '<input type="checkbox" id = "4" value="'+quiz.options[qno-1][3]+'"><label for = "4">&ensp;'+quiz.options[qno-1][3]+'</label><br>'
        form += '<input type="checkbox" id = "5" value="'+quiz.options[qno-1][4]+'"><label for = "5">&ensp;'+quiz.options[qno-1][4]+'</label><br>'
        $("#options").append(form)

        let button = '<button id = "submit" class = "bigbutton white-text center" > Submit </button>'
        $("#submit_button").append(button)
        let next = parseInt(qno)
        next += 1
        console.log(next)
        $("#submit").click(function() {
            $("#submit_button").css('display', 'none')
            let button = '<button id = "next" class = "bigbutton white-text center" > Next </button>'
            console.log(document.getElementById('1').checked)
            $("#next_button").append(button)
            let data_to_save = {"1": document.getElementById('1').checked,
                                "2": document.getElementById('2').checked,
                                "3": document.getElementById('3').checked,
                                "4": document.getElementById('4').checked,
                                "5": document.getElementById('5').checked,
                                "qno": qno,
                                "quiz": quiz}
            console.log(data_to_save)
            $.ajax({
                type: "POST",
                url: "check_answer",                
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data : JSON.stringify(data_to_save),
                success: function(result){
                    console.log(result)
                    let correct = result["correct"]
                    let message = result["message"]
                    let n = result["n"]
                    // alert(correct)
                    if(correct){
                        $("#feedback").text("Correct!")
                        $("#message").text(message.concat("!"))
                        scoreNum +=1;
                    }
                    else{
                        $("#feedback").text("Incorrect!")
                        $("#message").text(message.concat("."))
                    }
                },
                error: function(request, status, error){
                    console.log("Error");
                    console.log(request)
                    console.log(status)
                    console.log(error)
                }
            })
            $("#next").click(function(){
                window.location.replace("http://127.0.0.1:5000/quiz/"+quiz.id+"/"+next);
            })
        })
    }
})