import { assert } from 'chai';


function sayHello(){
    return "Hello from JayKay";
}

describe('App', function(){
    it('app should return hello from jaykay', function(){
        assert.equal(sayHello(), "Hello from JayKay")
    })
});