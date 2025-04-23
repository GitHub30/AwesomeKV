# AwesomeKV

JavaScript
```js
// Add key-value pairs
await fetch('https://awesomekv.dev/mynamespace/key', { method: 'PUT', body: 'value' })

// Get value by key
const res = await fetch('https://awesomekv.dev/mynamespace/key')
console.log(await res.text())

// Delete value by key
await fetch('https://awesomekv.dev/mynamespace/key', { method: 'DELETE' })
```

Python
```python
import requests

# Add key-value pairs
requests.put('https://awesomekv.dev/mynamespace/key', 'value')
# Get value by key
print(requests.get('https://awesomekv.dev/mynamespace/key').text)
# Delete value by key
requests.delete('https://awesomekv.dev/mynamespace/key')
```

Use with file extension
https://awesomekv.dev/mynamespace/foo.svg

## Overview  
AwesomeKV is a serverless HTTP key–value store API built on Cloudflare Workers KV, providing global distribution, low-latency reads, and simple RESTful endpoints with built-in CORS support and automatic MIME-type handling.

## Key Features  
- **Global, Low-Latency Storage**: Data is cached at every Cloudflare edge location for ultra-fast reads worldwide.  
- **Simple RESTful API**: Supports `GET`, `PUT`/`POST`, and `DELETE` on `/key` paths, returning clear status codes (200, 201, 404).  
- **CORS Support**: Enables both preflighted and simple cross-origin requests via standard `Access-Control-Allow-*` headers.  
- **Automatic MIME-Type Handling**: Dynamically sets `Content-Type` based on file extension using a curated lookup table of common MIME types.  
- **Lightweight & Scalable**: Zero server management; scales automatically with Cloudflare’s global network.  

## Architecture  
AwesomeKV binds a Cloudflare Worker script to a KV namespace. On each HTTP request, the Worker inspects the method and URL path, interacts with KV via `env.KV.get/put/delete`, and returns responses with appropriate headers.

## API Endpoints  
- `GET /<key>`: Returns the value or 404 if missing (cache-first, then origin).  
- `PUT /<key>` / `POST /<key>`: Stores the request body under `<key>`, returns 201.  
- `DELETE /<key>`: Deletes `<key>`, returns 200.  

## CORS & MIME Handling  
Cross-origin requests are enabled by setting `Access-Control-Allow-Origin`, `-Methods`, `-Headers`, and related headers. MIME types are determined at runtime via a mapping of extensions (e.g., `.json`, `.png`) to IANA-registered media types, ensuring correct `Content-Type` responses.

## Performance & Limits  
Reads from edge cache typically complete in single-digit milliseconds. KV limits include a maximum value size of 25 MiB, key size up to 512 bytes, and rate limits (free tier: 100 k reads/day, 1 k writes/day; paid: higher quotas).

## Technology Stack  
- **Runtime**: Cloudflare Workers (JavaScript/TypeScript)  
- **Storage**: Workers KV namespace  
- **CLI & Deployment**: Wrangler for local development and deployment  

## Use Cases  
- Configuration or feature-flag storage for edge applications  
- CDN-backed serving of static assets (images, JSON)  
- Caching user preferences and session metadata  

## Roadmap  
1. Bulk operations (multi-key GET/DELETE)  
2. Built-in TTL/expiration management  
3. API authentication (API keys, JWT)  
4. Dashboard UI for browsing keys  
5. Metrics & analytics integration  
