const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Expose-Headers': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Private-Network': 'true',
}

export default {
  async fetch(request, env) {
    try {
      if (request.method.toUpperCase() === 'GET') {
        const url = new URL(request.url)
        if (url.pathname === '/') {
          return new Response(null, { status: 302, headers: { ...headers, 'location': 'https://github.com/GitHub30/AwesomeKV' } })
        }
        const value = await env.KV.get(request.url)
        return new Response(value, { status: value ? 200 : 404, headers: { ...headers, ...additionalHeaders(url) } })
      }

      if (['POST', 'PUT'].includes(request.method.toUpperCase())) {
        await env.KV.put(request.url, request.body)
        return new Response(null, { status: 201, headers })
      }

      if (request.method.toUpperCase() === 'DELETE') {
        await env.KV.delete(request.url)
        return new Response(null, { headers })
      }

      return new Response(null, { headers })
    } catch (e) {
      return new Response(e.message, { status: 500, headers })
    }
  }
}

// https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/MIME_types/Common_types
const mimeTypes = {
  // Audio
  aac: "audio/aac",
  mid: "audio/midi",
  midi: "audio/x-midi",
  mp3: "audio/mpeg",
  oga: "audio/ogg",
  wav: "audio/wav",
  weba: "audio/webm",
  opus: "audio/opus",

  // Video
  avi: "video/x-msvideo",
  mpeg: "video/mpeg",
  ogv: "video/ogg",
  webm: "video/webm",
  ts: "video/mp2t",
  "3gp": "video/3gpp",
  "3g2": "video/3gpp2",

  // Text & Document
  txt: "text/plain",
  css: "text/css",
  csv: "text/csv",
  htm: "text/html",
  html: "text/html",
  js: "text/javascript",
  mjs: "text/javascript",
  json: "application/json",
  jsonld: "application/ld+json",
  ics: "text/calendar",

  // Image
  bmp: "image/bmp",
  gif: "image/gif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  webp: "image/webp",
  ico: "image/vnd.microsoft.icon",
  tif: "image/tiff",
  tiff: "image/tiff",

  // Application & Others
  abw: "application/x-abiword",
  arc: "application/x-freearc",
  azw: "application/vnd.amazon.ebook",
  bin: "application/octet-stream",
  bz: "application/x-bzip",
  bz2: "application/x-bzip2",
  csh: "application/x-csh",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  eot: "application/vnd.ms-fontobject",
  epub: "application/epub+zip",
  gz: "application/gzip",
  jar: "application/java-archive",
  mpkg: "application/vnd.apple.installer+xml",
  odp: "application/vnd.oasis.opendocument.presentation",
  ods: "application/vnd.oasis.opendocument.spreadsheet",
  odt: "application/vnd.oasis.opendocument.text",
  ogx: "application/ogg",
  otf: "font/otf",
  pdf: "application/pdf",
  php: "application/x-httpd-php",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  rar: "application/vnd.rar",
  rtf: "application/rtf",
  sh: "application/x-sh",
  swf: "application/x-shockwave-flash",
  tar: "application/x-tar",
  ttf: "font/ttf",
  vcard: "text/vcard",
  vsd: "application/vnd.visio",
  xhtml: "application/xhtml+xml",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xml: "application/xml",
  xul: "application/vnd.mozilla.xul+xml",
  zip: "application/zip",
  "7z": "application/x-7z-compressed"
}

function additionalHeaders(url) {
  const extention = url.pathname.split('.').pop()
  if (mimeTypes.hasOwnProperty(extention)) {
    return { 'Content-Type': mimeTypes[extention] }
  }
  return {}
}
