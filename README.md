### [_jsURL_](https://github.com/warren-bank/js-url)

Javascript drop-in replacement _URL_ class library for [Node.js](https://nodejs.org/api/url.html#class-url) and the [browser](https://developer.mozilla.org/en-US/docs/Web/API/URL).

The important difference is that this library does not perform any encoding or decoding.<br />
Further reading: [1](https://stackoverflow.com/questions/45516070)

#### Class Import

* __in Node.js__:
  ```bash
    npm install --save @warren-bank/url
  ```
  ```javascript
    const {URL, parse} = require('@warren-bank/url')

    {
      const gh = new URL('https://github.com/warren-bank')
      const qs = gh.searchParams

      gh.username = 'user'
      gh.password = 'pass'
      gh.port     = 443
      gh.hash     = '#language-options'

      qs.set('tab', 'repositories')

      console.log('URL.href = '         + gh.href)
      console.log('parse(URL.href) = '  + JSON.stringify(parse(gh.href),  null, 2))
      console.log('parse(URL) = '       + JSON.stringify(parse(gh),       null, 2))
      console.log('parse(URL, true) = ' + JSON.stringify(parse(gh, true), null, 2))
    }
  ```

* __in the browser__:
  ```html
    <html>
    <head>
      <script src="https://cdn.jsdelivr.net/gh/warren-bank/js-url/es5-browser/jsURL.js"></script>
      <script>
        {
          // temporarily override global URL class with external implementation within scope of block
          const {URL, parse} = window.jsURL

          const gh = new URL('https://github.com/warren-bank')
          const qs = gh.searchParams

          gh.username = 'user'
          gh.password = 'pass'
          gh.port     = 443
          gh.hash     = '#language-options'

          qs.set('tab', 'repositories')

          window.alert('URL.href = '         + gh.href)
          window.alert('parse(URL.href) = '  + JSON.stringify(parse(gh.href),  null, 2))
          window.alert('parse(URL) = '       + JSON.stringify(parse(gh),       null, 2))
          window.alert('parse(URL, true) = ' + JSON.stringify(parse(gh, true), null, 2))
        }
      </script>
    </head>
    </html>
  ```

#### Limitations

The following methods are not implemented:

* [URL static methods](https://developer.mozilla.org/en-US/docs/Web/API/URL#static_methods)
  - [createObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
  - [revokeObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL)

- - - -

#### Requirements:

* release version: [`v2.0.0`](https://github.com/warren-bank/js-url/releases/tag/v2.0.0) (and lower)
  * Node.js version: v6.4.0 (and higher)
    * [ES6 support](http://node.green/)
      * v0.10.48+: [const](https://node.green/#ES2015-bindings-const)
      * v4.09.01+: [arrow functions](https://node.green/#ES2015-functions-arrow-functions)
      * v5.12.00+: [spread syntax for iterable objects](https://node.green/#ES2015-syntax-spread-syntax-for-iterable-objects)
      * v6.04.00+: [let](https://node.green/#ES2015-bindings-let)
      * v6.04.00+: [class statement with static methods](https://node.green/#ES2015-functions-class)
* release version: [`v2.0.1`](https://github.com/warren-bank/js-url/releases/tag/v2.0.1) (and higher)
  * Node.js version: v12.0.0 (and higher)
    * [ES6 support](http://node.green/)
      * v12.00.00+: [private instance class fields](https://node.green/#ES2022-features-instance-class-fields)

#### Legal

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
