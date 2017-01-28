import Model from '../../src/models/model'
import { expect } from 'chai'

describe('Model', () => {
    it('provides a fromData constructor', () => {
        expect((new Model({foo: 'bar'})).foo).to.equal('bar')
    })
})

