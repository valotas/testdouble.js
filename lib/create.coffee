_ = require('lodash')
store = require('./store')
calls = require('./store/calls')
stubbings = require('./store/stubbings')

module.exports = (nameOrType) ->
  if nameOrType?.prototype?
    createTestDoublesForEntireType(nameOrType)
  else
    createTestDouble(nameOrType)

createTestDouble = (name) ->
  _.tap createTestDoubleFunction(), (testDouble) ->
    if name?
      store.for(testDouble).name = name
      testDouble.toString = -> "[test double for \"#{name}\"]"
    else
      testDouble.toString = -> "[test double (unnamed)]"

createTestDoubleFunction = ->
  testDouble = (args...) ->
    calls.log(testDouble, args, this)
    stubbings.get(testDouble, args)

createTestDoublesForEntireType = (type) ->
  _.reduce Object.getOwnPropertyNames(type.prototype), (memo, name) ->
    memo[name] = if _.isFunction(type.prototype[name])
      createTestDouble("#{type.name}##{name}")
    else
      type.prototype[name]
    memo
  , {}
