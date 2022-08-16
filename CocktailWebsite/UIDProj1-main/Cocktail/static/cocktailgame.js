let interval;
let done = false;

function countdown() {
  clearInterval(interval);
  interval = setInterval( function() {
      var timer = $('.js-timeout').html();
      timer = timer.split(':');
      var minutes = timer[0];
      var seconds = timer[1];
      seconds -= 1;
      if (minutes < 0) return;
      else if (seconds < 0 && minutes != 0) {
          minutes -= 1;
          seconds = 59;
      }
      else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

      $('.js-timeout').html(minutes + ':' + seconds);

      if (done == true) {
          clearInterval(interval);
      }

      if (minutes == 0 && seconds == 0) {
          clearInterval(interval);
          alert("You're out of time! You must start over!")
          window.location.href = "http://127.0.0.1:5000/cocktailgame/ginandtonic";
      };
  }, 1000);
}
function deductTen(){
    clearInterval(interval);
    var timer = $('.js-timeout').html();
    timer = timer.split(':');
    var minutes = timer[0];
    var seconds = timer[1];
    seconds = seconds-10;
    $('.js-timeout').html(minutes + ':' + seconds);
    countdown();

}
let images = [
    "https://www.nicepng.com/png/full/85-859751_orange-juice-bottle-clipart.png",
    "https://www.nicepng.com/png/full/174-1746111_clip-art-royalty-free-stock-collection-of-free.png",
    "https://www.nicepng.com/png/full/100-1000748_roses-sweetened-lime-juice.png",
    "https://www.nicepng.com/png/full/293-2939694_tonic-and-licorice-ledgers-tonic-water.png",
    "https://www.nicepng.com/png/full/67-678248_750-ml-agave-organic-nectar-monin-vanilla-syrup.png",
    "https://www.nicepng.com/png/full/849-8497547_camarena-silver-tequila-camarena-tequila.png",
    "https://www.nicepng.com/png/full/638-6385672_bombay-sapphire-london-dry-gin-bombay-sapphire-gin.png",
    "https://www.nicepng.com/png/full/21-219751_limes-wedges-cuts-chopped-wedge-of-lime.png",
    "https://www.nicepng.com/png/full/703-7037179_gabriel-boudier-bartender-curacao-triple-sec-liqueur.png",
    "https://www.nicepng.com/png/full/8-80183_cherry-free-download-png-red-cherries-fridge-magnet.png"
]
let items = [
    "orange",
    "grenadine",
    "limejuice",
    "tonic",
    "simple",
    "tequila",
    "gin",
    "lime",
    "triplesec",
    "cherry"
]

function makeDrag(items) {
    $(".leftside").empty()
    $(".rightside").empty()
    $(".leftT").empty()
    $(".leftM").empty()
    $(".leftB").empty()
    $(".rightT").empty()
    $(".rightM").empty()
    $(".rightB").empty()
    $(".leftside").append("<div class='row leftT'></div>")
    $(".leftside").append("<div class='row leftM'></div>")
    $(".leftside").append("<div class='row leftB'></div>")
    $(".rightside").append("<div class='row rightT'></div>")
    $(".rightside").append("<div class='row rightM'></div>")
    $(".rightside").append("<div class='row rightB'></div>")
    $(".leftT").append("<div class='leftside labelpad'>Orange Juice &nbsp;&nbsp;&nbsp; Grenadine</div>")
    $(".leftM").append("<div class='leftside labelpad'>Lime Juice</div>")
    $(".leftB").append("<div class='leftside labelpad'>Tonic Water &nbsp;&nbsp;&nbsp; Simple Syrup</div>")
    $(".rightT").append("<div class='rightside labelpad'>Tequila &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Gin</div>")
    $(".rightM").append("<div class='rightside labelpad limelabel'>Lime</div>")
    $(".rightB").append("<div class=' labelpad'>Triple Sec &nbsp;&nbsp;&nbsp;&nbsp; Cherry</div>")
   

    $.each(items, function(key, value) {
        $("." + value).hover(function() {
            $(this).draggable({revert: "valid"})
        })
        console.log(key)
        if (key < 2) {
            let elem = $("<img class="+value+" id="+value+" src='"+images[key]+"' alt='"+value+"'>")
            $(".leftT").append(elem)
            elem.draggable({revert: "invalid"})
        } else if (key == 2) {
            let elem = $("<img class="+value+" id="+value+" src='"+images[key]+"' alt='"+value+"'>")
            $(".leftM").append(elem)
            elem.draggable({revert: "invalid"})
        } else if (key > 2 && key < 5) {
            let elem = $("<img class="+value+" id="+value+" src='"+images[key]+"' alt='"+value+"'>")
            $(".leftB").append(elem)
            elem.draggable({revert: "invalid"})
        } else if (key > 4 && key < 7) {
            let elem = $("<img class="+value+" id="+value+" src='"+images[key]+"' alt='"+value+"'>")
            $(".rightT").append(elem)
            elem.draggable({revert: "invalid"})
        } else if (key == 7) {
            let elem = $("<img class="+value+" id="+value+" src='"+images[key]+"' alt='"+value+"'>")
            $(".rightM").append(elem)
            elem.draggable({revert: "invalid"})
        } else if (key > 7 && key < 10) {
            let elem = $("<img class="+value+" id="+value+" src='"+images[key]+"' alt='"+value+"'>")
            $(".rightB").append(elem)
            elem.draggable({revert: "invalid"})
        }
    })
}
let tequilasunrise = {
    "orange": 6,
    "tequila": 3,
    "grenadine": 1,
    "cherry": 7
}
let ginandtonic = {
    "tonic": 5,
    "gin": 4,
    "lime": 7
}
let margarita = {
    "tequila": 3,
    "limejuice": 1,
    "triplesec": 2,
    "simple":2,
    "lime": 7
}
let actual = {
    "orange": "Orange Juice",
    "tequila": "Tequila",
    "grenadine": "Grenadine",
    "cherry": "Maraschino Cherry",
    "limejuice" : "Lime Juice",
    "tonic": "Tonic water",
    "simple": "Simple Syrup",
    "gin": "Gin",
    "lime": "Lime",
    "triplesec": "Triple Sec"
}
let answer;
let dragged;
let realname;
let n = 0;
let drink = 0;
let correctdrag = [];
$(document).ready(function() {
    $('.js-timeout').text("2:00");
    countdown();
    makeDrag(items);
    if (top.location.pathname === '/cocktailgame/tequilasunrise') {
        drink = 0;
    }else if (top.location.pathname === '/cocktailgame/ginandtonic') {
        drink = 1;
    }else if (top.location.pathname === '/cocktailgame/margarita') {
        drink = 2;
    }
    $('.beaker').droppable({
        drop: function(event,ui) {
            dragged = $(ui.draggable).attr("id")
            if (correctdrag.includes(dragged) == true) {
                feedback.empty()
                feedback.append("Sorry, you've already put this ingredient in the drink!")
                feedback.dialog("open")
                makeDrag(items)
            }
            else {
                dialog.dialog("open");
            }
        }
    });
    hint = $("#dialog").dialog({
        autoOpen: false,
        height: 150,
        width: 350
    })
    $("#hintbutton").click(function() {
        hint.dialog("open");
        deductTen();
        $("#hintbutton").attr('disabled', 'true');
    })
    feedback = $("#feedback").dialog({
        autoOpen: false,
        height: 150,
        width: 250
    })
    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 150,
        width: 350,
        buttons: {
            "Yes": function(e) {
                console.log("Pressed Yes!");
                answer = $("#permit option:selected").val();  
                if (drink == 0 && n != 4) {
                    if (tequilasunrise[dragged] == answer) {
                        feedback.empty()
                        feedback.append("Correct!")
                        feedback.dialog("open")
                        n += 1
                        let fill = "<div class='fill' ></div>";
                        $(".gamepage").append(fill);
                        let filling = "<div class='drink "+dragged+"color'></div>";
                        $(".fill").append(filling)
                        correctdrag.push(dragged)
                        if (n == 4) {
                            done = true;
                            $("#drinkdone").removeAttr("disabled")
                            $(".fill").empty();
                            $(".beaker").attr("src", "https://www.nicepng.com/png/full/87-875522_cocktails-clipart-tequila-cocktail-clipart.png");
                            $("#success_message").append("Correct<br>Great Job!")
                        }
                    }
                    else if (dragged in tequilasunrise) {
                        realname = actual[dragged]
                        feedback.empty()
                        feedback.append(realname+" is in the drink, but that's not the right amount!")
                        feedback.dialog("open")
                    }
                    else {
                        realname = actual[dragged]
                        feedback.empty()
                        feedback.append("Sorry, "+realname+" is not in the drink!")
                        feedback.dialog("open")
                    }
                }
                if (drink == 1 && n != 3) {
                    console.log("hi")
                    if (ginandtonic[dragged] == answer) {
                        feedback.empty()
                        feedback.append("Correct!")
                        feedback.dialog("open")
                        n+=1
                        let fill = "<div class='fill' ></div>";
                        $(".gamepage").append(fill);
                        let filling = "<div class='drink "+dragged+"color'></div>";
                        $(".fill").append(filling)
                        correctdrag.push(dragged)
                        if (n == 3) {
                            done = true;
                            $("#drinkdone").removeAttr("disabled")
                            $(".fill").empty();
                            $(".beaker").attr("src", "https://www.nicepng.com/png/full/438-4389108_lemonade-png-download-image-gin-tonic-splash-hd.png");
                            $("#success_message").append("Correct<br>Great Job!");
                        }
                    }
                    else if (dragged in ginandtonic) {
                        realname = actual[dragged]
                        feedback.empty()
                        feedback.append(realname+" is in the drink, but that's not the right amount!")
                        feedback.dialog("open")
                    }
                    else {
                        realname = actual[dragged]
                        feedback.empty()
                        feedback.append("Sorry, "+realname+" is not in the drink!")
                        feedback.dialog("open")
                    }
                }           
                if (drink == 2 && n != 5) {
                    if (margarita[dragged] == answer) {
                        feedback.empty()
                        feedback.append("Correct!")
                        feedback.dialog("open")
                        n+=1
                        let fill = "<div class='fill' ></div>";
                        $(".gamepage").append(fill);
                        let filling = "<div class='drink "+dragged+"color'></div>";
                        $(".fill").append(filling)
                        correctdrag.push(dragged)
                        if (n == 5) {
                            done = true;
                            $("#drinkdone").removeAttr("disabled")
                            $(".fill").empty();
                            $(".beaker").attr("src", "https://www.nicepng.com/png/full/21-213087_margarita-png-hd-svg-library-library-margarita-cocktail.png");
                            $("#success_message").append("Correct<br>Great Job!")
                        }
                    }
                    else if (dragged in margarita) {
                        realname = actual[dragged]
                        feedback.empty()
                        feedback.append(realname+" is in the drink, but that's not the right amount!")
                        feedback.dialog("open")
                    }
                    else {
                        realname = actual[dragged]
                        feedback.empty()
                        feedback.append("Sorry, "+realname+" is not in the drink!")
                        feedback.dialog("open")
                    }
                }         
                console.log(answer)
                $(this).dialog("close");
                makeDrag(items);
            },
            Cancel: function() {
                $(this).dialog("close");
                makeDrag(items);
            }
        }
    });
})

