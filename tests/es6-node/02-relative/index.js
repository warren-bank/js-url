const {URL, parse} = require('../../../es6-node/jsURL')

{
  const gh = new URL('/warren-bank', 'https://github.com/warren-bank/js-url/commits/master')
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
