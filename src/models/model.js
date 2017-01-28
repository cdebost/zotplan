export default class Model {

    constructor(data) {
        for (let i in data) {
            if (data.hasOwnProperty(i)) {
                this[i] = data[i]
            }
        }
    }
}

