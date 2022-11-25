const {URL} = require('../../../es6-node/jsURL')

{
  const gh = new URL('https://github.com/warren-bank')
  const qs = gh.searchParams

  qs.set('tab', 'repositories')

  console.log(gh.href)
}
