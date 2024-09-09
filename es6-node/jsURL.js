const regexs = {
  url:  new RegExp('^([^/:]+:)?(?://(?:([^/:@]+):?([^/:@]+)?@)?([^:/\\?#]+)(?::(\\d+))?)?(/[^\\?#]*|[^\\?#]+)?(\\?[^#]*)?(#.*)?$'),
  host: /^([^:]+)(?::(\d+))?$/
}

class URL {
  #_searchParams = ''

  constructor(url, base) {
    if (base)
      url = URL.resolve(url, base) || ''

    this.href = url
  }

  static resolve(url, base) {
    const srcURL = new URL(base)
    const dstURL = new URL(url)

    const fields = ['protocol', 'username', 'password', 'hostname', 'port', 'pathname', 'search', 'hash']

    // copy missing fields in order, and stop when the 1st populated field is encountered.
    // when the 1st populated field is pathname, do the equivalent to: path.join(base_pathname, url_pathname)
    for (let i=0; i < fields.length; i++) {
      let field = fields[i]

      if ((field === 'pathname') && dstURL[field] && srcURL[field] && (dstURL[field][0] !== '/'))
        dstURL[field] = srcURL[field].replace(/[^\/]*$/, '') + dstURL[field]
      if (dstURL[field])
        break
      if (srcURL[field])
        dstURL[field] = srcURL[field]
    }

    return dstURL.toString()
  }

  toString() {
    return `${this.protocol}${this.host ? `//${this.username ? (this.password ? `${this.username}:${this.password}@` : `${this.username}@`) : ''}${this.host}` : ''}${this.pathname}${this.search}${this.hash}`
  }

  toJSON() {
    return this.toString()
  }

  get href() {
    return this.toString()
  }

  set href(url) {
    const matches = regexs.url.exec(url)
    if (!matches) throw new Error("Failed to construct 'URL': Invalid URL")

    this.protocol     = matches[1] || ''
    this.username     = matches[2] || ''
    this.password     = matches[3] || ''
    this.hostname     = matches[4] || ''
    this.port         = matches[5] || ''
    this.pathname     = matches[6] || ''
    this.search       = matches[7] || ''
    this.hash         = matches[8] || ''
  }

  get host() {
    return this.port ? `${this.hostname}:${this.port}` : this.hostname
  }

  set host(host) {
    const matches = regexs.host.exec(host)
    if (!matches) throw new Error("Failed to update 'URL': Invalid host")

    this.hostname     = matches[1] || ''
    this.port         = matches[2] || ''
  }

  // read-only
  get origin() {
    return `${this.protocol}//${this.host}`
  }

  get search() {
    return this.#_searchParams.toString()
  }

  set search(search) {
    this.#_searchParams = new URLSearchParams(search)
  }

  // read-only
  get searchParams() {
    return this.#_searchParams
  }

  // ===================
  // additional methods:
  // ===================

  parse(parseQueryString = false) {
    return {
      slashes:  true,
      href:     this.href,
      protocol: this.protocol,
      username: this.username,
      password: this.password,
      auth:     `${this.username ? (this.password ? `${this.username}:${this.password}` : `${this.username}`) : ''}`,
      hostname: this.hostname,
      port:     this.port,
      host:     this.host,
      pathname: this.pathname,
      search:   this.search,
      path:     `${this.pathname}${this.search}`,
      query:    (parseQueryString ? this.searchParams.parse() : this.searchParams.toString(/* exclude_question_mark= */ true)),
      hash:     this.hash
    }
  }
}

class URLSearchParams {
  #_map    = {}
  #_sorted = false

  constructor(search) {
    this.#_map = {}

    if (search && (search[0] === '?'))
      search = search.substring(1)

    if (search) {
      const pairs = search.split('&')
      pairs.forEach(pair => {
        const index = pair.indexOf('=')

        if (index > 0) {
          const key = pair.substring(0, index)
          const val = (index + 1 < pair.length) ? pair.substring(index + 1) : ''

          if (!this.#_map[key])
            this.#_map[key] = []

          this.#_map[key].push(val)
        }
      })
    }
  }

  has(key) {
    return !!this.#_map[key]
  }

  get(key) {
    return this.#_map[key] ? this.#_map[key][0] : null
  }

  getAll(key) {
    return this.#_map[key] ? [...this.#_map[key]] : []
  }

  set(key, val) {
    this.#_map[key] = [val]
  }

  append(key, val) {
    if (!this.#_map[key])
      this.#_map[key] = []

    this.#_map[key].push(val)
  }

  delete(key, val) {
    if (!this.#_map[key]) return

    if (val) {
      const index = this.#_map[key].indexOf(val)
      if (index >= 0) {
        this.#_map[key].splice(index, 1)

        if (!this.#_map[key].length)
          delete this.#_map[key]
      }
    }
    else {
      delete this.#_map[key]
    }
  }

  sort(sorted = true) {
    this.#_sorted = !!sorted
  }

  keys() {
    const keys = Object.keys(this.#_map)
    if (this.#_sorted) keys.sort()
    return keys
  }

  values() {
    const values = []
    for (const key in this.#_map) {
      values.push(...this.#_map[key])
    }
    if (this.#_sorted) values.sort()
    return values
  }

  entries() {
    const denormalized = []
    const keys = this.keys()
    keys.forEach(key => {
      const vals = this.#_sorted
        ? [...this.#_map[key]].sort()
        : this.#_map[key]
      vals.forEach(val => {
        denormalized.push([key, val])
      })
    })
    return denormalized
  }

  forEach(callback, thisArg) {
    const denormalized = this.entries()
    denormalized.forEach(([key, val]) => {
      callback.apply(thisArg, [val, key, this])
    })
  }

  toString(exclude_question_mark = false) {
    let search = ''
    const denormalized = this.entries()
    denormalized.forEach(([key, val]) => {
      let prefix = search ? '&' : exclude_question_mark ? '' : '?'
      search += `${prefix}${key}=${val}`
    })
    return search
  }

  toJSON() {
    return this.toString()
  }

  // ===================
  // additional methods:
  // ===================

  parse() {
    const map_clone = {}
    for (const key in this.#_map) {
      map_clone[key] = [...this.#_map[key]]
    }
    return map_clone
  }
}

const parse = (url, parseQueryString = false) => {
  return (new URL(url)).parse(parseQueryString)
}

const format = (urlObject) => {
  if (typeof urlObject === 'string')
    return urlObject

  if (!urlObject || (typeof urlObject !== 'object'))
    throw new Error('TypeError: parameter must either be an Object or a String.')

  if (urlObject.href)
    return urlObject.href

  const url = new URL('')

  for (let key of ['protocol', 'username', 'password', 'host', 'hostname', 'port', 'pathname', 'search', 'hash']) {
    let val = urlObject[key]

    if ((key === 'port') && (typeof val === 'number'))
      val = String(val)

    if (val) {
      if (typeof val !== 'string')
        throw new Error(`Error: "${key}" must be a String.`)

      url[key] = val
    }
  }

  if (urlObject.auth) {
    if (typeof urlObject.auth !== 'string')
      throw new Error('Error: "auth" must be a String.')

    const parts = auth.split(':')
    url.username = parts.shift()
    if (parts.length > 1)
      url.password = parts.join(':')
  }

  if (urlObject.query) {
    if (typeof urlObject.query !== 'object')
      throw new Error('Error: "query" must be an Object.')

    for (let key in urlObject.query) {
      url.searchParams.append(key, urlObject.query[key])
    }
  }

  if (url.protocol && !url.protocol.endsWith(':'))
    url.protocol = url.protocol + ':'

  if (url.pathname && !url.pathname.startsWith('/'))
    url.pathname = '/' + url.pathname

  return url.toString()
}

const resolve = (base, url) => URL.resolve(url, base)

try {
  if (module instanceof Object)
    module.exports = {URL, URLSearchParams, parse, format, resolve}
}
catch(e) {}

try {
  if (window instanceof Object)
    window.jsURL = {URL, URLSearchParams, parse, format, resolve}
}
catch(e) {}
