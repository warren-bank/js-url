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

const test_URL_constructor = (url, base) => {
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

const test_URL_constructor_with_one_parameter = test_URL_constructor

const default_base_URL = 'http://myusername:mypassword@www.example.com:8080/path/to/myfile?a=1&b=2&c[]=3&c[]=4#myhash'
const test_URL_constructor_with_two_parameters = (url) => test_URL_constructor(url, default_base_URL)

test_URL_constructor_with_one_parameter('/path/to/myfile')
test_URL_constructor_with_one_parameter('//localhost')
test_URL_constructor_with_one_parameter('//localhost/path/to/myfile')
test_URL_constructor_with_one_parameter('//user@localhost')
test_URL_constructor_with_one_parameter('//user:pass@localhost')
test_URL_constructor_with_one_parameter('//localhost?foo=bar')
test_URL_constructor_with_one_parameter('//localhost#baz')
test_URL_constructor_with_one_parameter('ftp://localhost')
test_URL_constructor_with_one_parameter('ftp://user:pass@localhost?foo=bar#baz')
test_URL_constructor_with_one_parameter('ftp://user:pass@localhost/path/to/myfile?foo=bar#baz')

test_URL_constructor_with_one_parameter('http://www.example.com/')
test_URL_constructor_with_one_parameter('http://www.example.com/path/to/myfile')
test_URL_constructor_with_one_parameter('http://www.example.com:8080/path/to/myfile')
test_URL_constructor_with_one_parameter('http://myusername@www.example.com:8080/path/to/myfile')
test_URL_constructor_with_one_parameter('http://myusername:mypassword@www.example.com:8080/path/to/myfile')
test_URL_constructor_with_one_parameter('http://myusername:mypassword@www.example.com:8080/path/to/myfile?a=1&b=2&c=3')
test_URL_constructor_with_one_parameter('http://myusername:mypassword@www.example.com:8080/path/to/myfile?a=1&b=2&c[]=3&c[]=4')
test_URL_constructor_with_one_parameter('http://myusername:mypassword@www.example.com:8080/path/to/myfile?a=1&b=2&c[]=3&c[]=4#myhash')

test_URL_constructor_with_two_parameters('/path/to/my_other_file')
test_URL_constructor_with_two_parameters('my_other_file')
test_URL_constructor_with_two_parameters('?x=1&y=2&z[]=3&z[]=4')
test_URL_constructor_with_two_parameters('#hash2')
test_URL_constructor_with_two_parameters('my_other_file?x=1&y=2&z[]=3&z[]=4#hash2')

if (!errors_counter)
  console.log('SUCCESS: all tests passed')
