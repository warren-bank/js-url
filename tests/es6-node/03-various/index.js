const {URL}  = require('../../../es6-node/jsURL')
const assert = require('assert/strict')

let errors_counter = 0

const test = (url_1, base) => {
  try {
    const url_2 = URL.resolve(url_1, base)

    const URL_1 = new URL(url_1, base)
    const URL_2 = new URL(url_2)

    assert.equal(url_1, URL_1.toString())
    assert.equal(url_2, URL_2.toString())
    assert.equal(url_1, url_2)
  }
  catch(e) {
    console.log(`FAIL: ${JSON.stringify({url: url_1, base}, null, 2)}`)
    errors_counter++
  }
}

test('http://www.example.com/')
test('http://www.example.com/path/to/myfile')
test('http://www.example.com:8080/path/to/myfile')
test('http://myusername@www.example.com:8080/path/to/myfile')
test('http://myusername:mypassword@www.example.com:8080/path/to/myfile')
test('http://myusername:mypassword@www.example.com:8080/path/to/myfile?a=1&b=2&c=3')
test('http://myusername:mypassword@www.example.com:8080/path/to/myfile?a=1&b=2&c[]=3&c[]=4')
test('http://myusername:mypassword@www.example.com:8080/path/to/myfile?a=1&b=2&c[]=3&c[]=4#myhash')

if (!errors_counter)
  console.log('SUCCESS: all tests passed')
