const {URL} = require('../../../es6-node/jsURL')

{
  const gh = new URL('/warren-bank', 'https://github.com/warren-bank/js-url/commits/master')
  const qs = gh.searchParams

  qs.set('tab', 'repositories')

  console.log(gh.href)
}
