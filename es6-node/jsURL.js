const regexs = {
  url: new RegExp('^([^/:]+:)//(?:([^/:@]+):?([^/:@]+)?@)?([^/:]+)(?::(\\d+))?(/[^\\?#]*)(\\?[^#]*)?(#[.]*)?$')
}

class URL {
  constructor(url, base) {
    if (base)
      url = URL.resolve(url, base) || ''

    const matches = regexs.url.exec(url)
    if (!matches) throw new Error("Failed to construct 'URL': Invalid URL")

    this.href         = matches[0] || ''
    this.protocol     = matches[1] || ''
    this.username     = matches[2] || ''
    this.password     = matches[3] || ''
    this.hostname     = matches[4] || ''
    this.port         = matches[5] || ''
    this.host         = this.port ? `${this.hostname}:${this.port}` : this.hostname
    this.origin       = `${this.protocol}//${this.host}`
    this.pathname     = matches[6] || ''
    this.search       = matches[7] || ''
    this.hash         = matches[8] || ''
    this.searchParams = new URLSearchParams(this.search)
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

    else
      return `${baseURL.protocol}//${baseURL.username ? (baseURL.password ? `${baseURL.username}:${baseURL.password}@` : `${baseURL.username}@`) : ''}${baseURL.host}${baseURL.pathname.replace(/[^\/]+$/, '')}${url}`
  }

  toString() {
    return `${this.protocol}//${this.username ? (this.password ? `${this.username}:${this.password}@` : `${this.username}@`) : ''}${this.host}${this.pathname}${this.searchParams.toString()}${this.hash}`
  }

  toJSON() {
    return this.toString()
  }
}

class URLSearchParams {
  constructor(search) {
    this.map = {}

    if (search && (search[0] === '?'))
      search = search.substring(1)

    if (search) {
      const pairs = search.split('&')
      pairs.forEach(pair => {
        const index = pair.indexOf('=')

        if (index > 0) {
          const key = pair.substring(0, index)
          const val = (index + 1 < pair.length) ? pair.substring(index + 1) : ''

          if (!this.map[key])
            this.map[key] = []

          this.map[key].push(val)
        }
      })
    }
  }

  has(key) {
    return !!this.map[key]
  }

  get(key) {
    return this.map[key] ? this.map[key][0] : null
  }

  getAll(key) {
    return this.map[key] ? [...this.map[key]] : []
  }

  set(key, val) {
    this.map[key] = [val]
  }

  append(key, val) {
    if (!this.map[key])
      this.map[key] = []

    this.map[key].push(val)
  }

  delete(key, val) {
    if (!this.map[key]) return

    if (val) {
      const index = this.map[key].indexOf(val)
      if (index >= 0) {
        this.map[key].splice(index, 1)

        if (!this.map[key].length)
          delete this.map[key]
      }
    }
    else {
      delete this.map[key]
    }
  }

  keys() {
    return Object.keys(this.map)
  }

  toString(exclude_question_mark) {
    let search = ''
    const keys = this.keys()
    keys.forEach(key => {
      const vals = this.map[key]
      vals.forEach(val => {
        let prefix = search ? '&' : exclude_question_mark ? '' : '?'
        search += `${prefix}${key}=${val}`
      })
    })
    return search
  }
}

try {
  if (module instanceof Object)
    module.exports = {URL, URLSearchParams}
}
catch(e) {}

try {
  if (window instanceof Object)
    window.jsURL = URL
}
catch(e) {}
