const {URL: URL_real} = require('url')
const {URL: URL_test} = require('../../../es6-node/jsURL')
const assert          = require('assert/strict')

let errors_counter = 0

const assert_equality_keys = ['protocol', 'username', 'password', 'hostname', 'port', 'pathname', 'search', 'hash', 'host', 'origin', 'search']

const assert_equality = (a, b) => {
  for (let key of assert_equality_keys) {
    try {
      assert.equal(a[key], b[key])
    }
    catch(e) {
      console.log(`FAIL: ${JSON.stringify({url: a.href, field: key, expected: a[key], asserted: b[key]}, null, 2)}`)
      errors_counter++
    }
  }
}

const test = (url, base) => {
  let url_real, url_test

  try {
    url_real = new URL_real(url, base)
  }
  catch(e) {
    console.log(`FAIL: ${JSON.stringify({url, base, error: 'unable to parse using real URL class'}, null, 2)}`)
    errors_counter++
    return
  }

  try {
    url_test = new URL_test(url, base)
  }
  catch(e) {
    console.log(`FAIL: ${JSON.stringify({url, base, error: 'unable to parse using test URL class'}, null, 2)}`)
    errors_counter++
    return
  }

  assert_equality(url_real, url_test)
}

test('//localhost')
test('//user@localhost')
test('//user:pass@localhost')
test('//localhost?foo=bar')
test('//localhost#baz')
test('ftp://localhost')
test('ftp://user:pass@localhost?foo=bar#baz')

test('http://www.example.com/')
test('http://www.example.com/path/to/myfile')
test('http://www.example.com:8080/path/to/myfile')
test('http://myusername@www.example.com:8080/path/to/myfile')
test('http://myusername:mypassword@www.example.com:8080/path/to/myfile')
test('http://myusername:mypassword@www.example.com:8080/path/to/myfile?a=1&b=2&c=3')
test('http://myusername:mypassword@www.example.com:8080/path/to/myfile?a=1&b=2&c[]=3&c[]=4')
test('http://myusername:mypassword@www.example.com:8080/path/to/myfile?a=1&b=2&c[]=3&c[]=4#myhash')

{
  const base = 'http://myusername:mypassword@www.example.com:8080/path/to/myfile?a=1&b=2&c[]=3&c[]=4#myhash'

  const test_rel = (url) => test(url, base)

  test_rel('?x=1&y=2&z[]=3&z[]=4')
  test_rel('#hash2')
}

if (!errors_counter)
  console.log('SUCCESS: all tests passed')
