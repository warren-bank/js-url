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
    const {URL} = require('@warren-bank/url')

    {
      const gh = new URL('https://github.com/warren-bank')
      const qs = gh.searchParams

      qs.set('tab', 'repositories')

      console.log(gh.href)
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
          const URL = window.jsURL

          const gh = new URL('https://github.com/warren-bank')
          const qs = gh.searchParams

          qs.set('tab', 'repositories')

          window.alert(gh.href)
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
* [URLSearchParams instance methods](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#instance_methods)
  - [entries()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/entries)
  - [forEach()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/forEach)

#### Legal

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
