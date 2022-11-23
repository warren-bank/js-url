const {URL}  = require('../../../es6-node/jsURL')
const assert = require('assert/strict')

let errors_counter = 0

const test = (url_1, base) => {
  try {
    const url_2 = URL.resolve(url_1, base)

    const URL_1 = new URL(url_1, base)
    const URL_2 = new URL(url_2)

    assert.equal(url_2, URL_1.toString())
    assert.equal(url_2, URL_2.toString())

    if (!base)
      assert.equal(url_1, url_2)
    else if (url_1.indexOf('://') === -1)
      assert.equal(
        url_2.lastIndexOf(url_1),
        (url_2.length - url_1.length)
      )
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

{
  const test_rel = (url) => {
    test(url, 'http://myusername:mypassword@www.example.com:8080/path/to/myfile?a=1&b=2&c[]=3&c[]=4#myhash')
  }

  test_rel('')
  test_rel('//www.example2.com/')
  test_rel('/')
  test_rel('/path2/to/myfile2')
  test_rel('myfile2')
  test_rel('myfile2?x=1&y=2&z[]=3&z[]=4')
  test_rel('myfile2?x=1&y=2&z[]=3&z[]=4#hash2')
  test_rel('/path2/to/myfile2?x=1&y=2&z[]=3&z[]=4#hash2')
  test_rel('//www.example2.com/path2/to/myfile2?x=1&y=2&z[]=3&z[]=4#hash2')
  test_rel('https://www.example2.com/path2/to/myfile2?x=1&y=2&z[]=3&z[]=4#hash2')
}

if (!errors_counter)
  console.log('SUCCESS: all tests passed')
