const regexs = {
  url:  new RegExp('^([^/:]+:)//(?:([^/:@]+):?([^/:@]+)?@)?([^/:]+)(?::(\\d+))?(/[^\\?#]*)(\\?[^#]*)?(#.*)?$'),
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
    let baseURL

    try {
      new URL(url)
      // url is valid
      return url
    }
    catch(e) {}

    try {
      baseURL = new URL(base)
    }
    catch(e) {
      // base is not valid
      return null
    }

    // url is not absolute, base is valid:
    // resolve url relative to base

    if (!url)
      return base

    else if (url.substring(0, 2) === '//')
      return `${baseURL.protocol}${url}`

    else if (url.substring(0, 1) === '/')
      return `${baseURL.protocol}//${baseURL.username ? (baseURL.password ? `${baseURL.username}:${baseURL.password}@` : `${baseURL.username}@`) : ''}${baseURL.host}${url}`

    else if (url.substring(0, 1) === '?')
      return `${baseURL.protocol}//${baseURL.username ? (baseURL.password ? `${baseURL.username}:${baseURL.password}@` : `${baseURL.username}@`) : ''}${baseURL.host}${baseURL.pathname}${url}`

    else if (url.substring(0, 1) === '#')
      return `${baseURL.protocol}//${baseURL.username ? (baseURL.password ? `${baseURL.username}:${baseURL.password}@` : `${baseURL.username}@`) : ''}${baseURL.host}${baseURL.pathname}${baseURL.search}${url}`

    else
      return `${baseURL.protocol}//${baseURL.username ? (baseURL.password ? `${baseURL.username}:${baseURL.password}@` : `${baseURL.username}@`) : ''}${baseURL.host}${baseURL.pathname.replace(/[^\/]+$/, '')}${url}`
  }

  toString() {
    return `${this.protocol}//${this.username ? (this.password ? `${this.username}:${this.password}@` : `${this.username}@`) : ''}${this.host}${this.pathname}${this.search}${this.hash}`
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

try {
  if (module instanceof Object)
    module.exports = {URL, URLSearchParams, parse}
}
catch(e) {}

try {
  if (window instanceof Object)
    window.jsURL = {URL, URLSearchParams, parse}
}
catch(e) {}
