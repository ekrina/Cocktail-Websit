from email import message
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

drinks = {
    "tequilasunrise" :{
        "id": "tequilasunrise",
        "title": "Tequila Sunrise",
        "video": "https://www.youtube.com/embed/_8gXKNqU9Mc",
        "ingredients": ["1 1/2 ounces of Tequila", "3/4 cup Orange juice", "3/4 ounces Grenadine", "1 Maraschino cherry"],
        "images": ["https://thumbs.dreamstime.com/b/bottle-mexican-tequila-white-background-stock-image-150427683.jpg", "https://assets.sainsburys-groceries.co.uk/gol/7736185/1/640x640.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROTiRh3FUZAb119bd88bOeZPjlZGKjLYxaJC3SwCA5rrp9PhsW0ghqAafQcgak-dmZL-c&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYd5eI92Lat-g-0L6OVMJ0jhZFUPIGNDZ0lA&usqp=CAU"]
    },
    "ginandtonic": {
        "id": "ginandtonic",
        "title": "Gin and Tonic",
        "video": "https://cdn.jwplayer.com/videos/aOvVQdyT-tXzwfO7V.mp4",
        "ingredients": ["2 ounces Gin", "1/2 cup Tonic Water", "1 Lime"],
        "images": ["https://www.thespruceeats.com/thmb/WsIZugwpzqLynmkB4ZqGrfcE_Og=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/gin-and-tonic-recipe-759300-hero-01-aa12e6504f944c54b8b9c589cc1d0ac6.jpg"]

    },
    "margarita": {
        "id": "margarita",
        "title": "Margarita",
        "video": "https://www.youtube.com/embed/6F6LdutFKyM",
        "ingredients": ["1 ounce Triple Sec", "3/4 ounces Lime Juice", "1 1/2 ounces Tequila", "1 ounce Simple Syrup", "1 Lime"],
        "images": [""]
    }
}
gamepictures = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK1CBfWklpfQLb7I6B0z0JLV1Qbckgu4zUsQ&usqp=CAU"]
quizzes = {
    "1" : {
        "id": "1",
        "title": "Tequila Sunrise Quiz",
        "questions": ["Which of the following ingredients can be found in a Tequila Sunrise?","How much orange juice is in one Tequila Sunrise?"],
        "options": [["Mint", "Tequila", "Gin", "Orange Juice", "Lime"], ["1/4 Cup","1/2 Cup", "3/4 Cup", "1 Cup","None"]],
        "values": [[False,True, False, True, False], [False, False, True, False, False]],
        "messages": ["Both Orange Juice and Tequila are found in a Tequila Sunrise", "There is 3/4 of a cup of orange juice in one Tequila Sunrise"]
    },
    "2" : {
        "id": "2",
        "title": "Gin and Tonic Quiz",
        "questions": ["Which of the following ingredients can be found in a Gin and Tonic?","How much tonic water is in one Gin and Tonic?"],
        "options": [["Tonic", "Tequila", "Gin", "Orange Juice", "Lime"], ["1/4 Cup","1/2 Cup", "3/4 Cup", "1 Cup","None"]],
        "values": [[True,False, True, False, True], [False, True, False, False, False]],
        "messages": ["Except for Tequila and Orange Juice, all of the above ingredients are in a Gin and Tonic", "There is a 1/2 cup of tonic in a Gin and Tonic"]
    },
    "3" : {
        "id": "3",
        "title": "Margarita Quiz",
        "questions": ["Which of the following ingredients can be found in a Margarita?","How much triple sec is in one Margarita?"],
        "options": [["Mint", "Tequila", "Gin", "Triple Sec", "Lime"], ["2 ounces","1 ounce", "3/4 Cup", "1 Cup","None"]],
        "values": [[False,True, False, True, True], [False, True, False, False, False]],
        "messages": ["Of these ingredients, tequila, triple sec, and lime are the ones in a Margarita", "There is 1 ounce of triple sec in a Margarita"]
    }
}
n = 0

@app.route('/')
def homepage():
    return render_template('homepage.html')

@app.route('/howtovid/<drinkname>')
def howto(drinkname):
    global drinks
    drink = drinks[drinkname]
    return render_template('howto.html', drink = drink)

@app.route('/cocktailgame/<drinkname>')
def cocktailgame(drinkname):
    global drinks
    drink = drinks[drinkname]
    return render_template('cocktailgame.html', drink = drink)

@app.route('/quiz/<id>/<qno>')
def quiz(id, qno):
    global quizzes
    global n
    current_quiz = quizzes[id]
    return render_template('quiz.html', quiz = current_quiz, qno = qno, n = n)

@app.route('/quizzes')
def display():
    global n 
    n = 0
    return render_template('quiz_landing.html')

@app.route('/quiz/<id>/check_answer', methods=['POST'])
def check_answer(id):
    global n
    json_data = request.get_json()
    qno = int(json_data["qno"])-1
    quiz = json_data["quiz"]
    # print(qno)
    # print()
    # print(quiz)
    # print()
    # print(quiz["values"])
    # print()
    # print(quiz["values"][qno])
    # print()
    answers = quiz["values"][qno]

    #print(quiz["messages"][qno])

    for i in range(1,6):
        if json_data[str(i)] != answers[i-1]:
            return jsonify(correct = False, message = quiz["messages"][qno], n = n)
    n += 1
    return jsonify(correct = True, message = quiz["messages"][qno], n = n)
        

# ajax for people.js
if __name__ == '__main__':
    app.run(debug=True)
