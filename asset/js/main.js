const questions = [{
    "id": 1,
    "text": "Favorite color",
    "answers": [{
        "id": 1,
        "text": "Red",
        "responses": 10
    }, {
        "id": 2,
        "text": "Green",
        "responses": 20
    }, {
        "id": 3,
        "text": "Blue",
        "responses": 5
    }]
}, {
    "id": 2,
    "text": "Favorite animal",
    "answers": [{
        "id": 1,
        "text": "Dog",
        "responses": 150
    }, {
        "id": 2,
        "text": "Cat",
        "responses": 100
    }, {
        "id": 3,
        "text": "Bird",
        "responses": 17
    }]
}];

const action = {
    type: "VOTE",
    questionId: 1,
    answerId: 3
};

// Modify this to return a new state with the adjusted "responses" count.
function questionReducer(state, action) {
    switch (action.type) {
        case 'VOTE':
            // create a copy of original state
            let newState = state.slice();
            for(let i = 0; i < newState.length; i++){
                if(newState[i].id === action.questionId){
                    for(let j = 0; j < newState[i].answers.length; j++){
                        if(newState[i].answers[j].id === action.answerId){
                            newState[i].answers[j].responses += 1;
                        }
                    }
                }
            }
            // return a new state
            return Object.assign({}, newState);
        default:
            return state;
    }
}

const answer = questionReducer(questions, action);

document.getElementById("answer").innerHTML = JSON.stringify(answer, null, 2);
