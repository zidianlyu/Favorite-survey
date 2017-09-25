const initSurveyState = [{
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


const SurveyReducer = (state = initSurveyState, action) => {
    switch (action.type) {
        case 'VOTE':
            // create a copy of original state
            let newState = state.slice();
            // debugger
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
            // console.log(newState);
            return newState;
        default:
            return state;
    }
}

export default SurveyReducer;
