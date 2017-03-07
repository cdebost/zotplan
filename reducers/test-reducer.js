const INCREMENT = "increment";

const initialState = {
    counter: 0
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                counter: counter + 1
            };
        default:
            return state;
    }
}

export function increment() {
    return {
        type: INCREMENT
    };
}