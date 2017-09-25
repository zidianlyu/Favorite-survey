const surveyAction = (questionId, answerId) => {
    return {type: "VOTE", questionId: questionId, answerId: answerId};
}
export default surveyAction;
