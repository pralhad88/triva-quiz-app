
// Redux Action defined here onen is setting name of user and another is updating the score of user.
export function setName(name) {
    return {
        type: 'SET_NAME',
        name,
    }
}

export function updateScore(score) {
    return {
        type: 'UPDATE_SCORE',
        score,
    }
}