# AwesomeKV

JavaScript
```js
// Add key-value pairs
await fetch('https://awesomekv.dev/key', { method: 'PUT', body: 'value' })

// Get value by key
const res = await fetch('https://awesomekv.dev/key')
console.log(await res.text())

// Delete value by key
await fetch('https://awesomekv.dev/key', { method: 'DELETE' })
```

Python
```python
import requests

# Add key-value pairs
requests.put('https://awesomekv.dev/key', 'value')
# Get value by key
print(requests.get('https://awesomekv.dev/key').text)
# Delete value by key
requests.delete('https://awesomekv.dev/key')
```

## Overview  
AwesomeKV is a serverless HTTP key–value store API built on Cloudflare Workers KV, providing global distribution, low-latency reads, and simple RESTful endpoints with built-in CORS support and automatic MIME-type handling citeturn2search1turn3search7.

## Key Features  
- **Global, Low-Latency Storage**: Data is cached at every Cloudflare edge location for ultra-fast reads worldwide citeturn2search1.  
- **Simple RESTful API**: Supports `GET`, `PUT`/`POST`, and `DELETE` on `/key` paths, returning clear status codes (200, 201, 404) citeturn2search0.  
- **CORS Support**: Enables both preflighted and simple cross-origin requests via standard `Access-Control-Allow-*` headers citeturn0search0turn2search2.  
- **Automatic MIME-Type Handling**: Dynamically sets `Content-Type` based on file extension using a curated lookup table of common MIME types citeturn0search1turn0search3.  
- **Lightweight & Scalable**: Zero server management; scales automatically with Cloudflare’s global network citeturn2search1.  

## Architecture  
AwesomeKV binds a Cloudflare Worker script to a KV namespace. On each HTTP request, the Worker inspects the method and URL path, interacts with KV via `env.KV.get/put/delete`, and returns responses with appropriate headers citeturn2search0turn2search2.

## API Endpoints  
- `GET /<key>`: Returns the value or 404 if missing (cache-first, then origin) citeturn2search0.  
- `PUT /<key>` / `POST /<key>`: Stores the request body under `<key>`, returns 201.  
- `DELETE /<key>`: Deletes `<key>`, returns 200.  

## CORS & MIME Handling  
Cross-origin requests are enabled by setting `Access-Control-Allow-Origin`, `-Methods`, `-Headers`, and related headers citeturn0search0turn2search2. MIME types are determined at runtime via a mapping of extensions (e.g., `.json`, `.png`) to IANA-registered media types, ensuring correct `Content-Type` responses citeturn0search1turn0search3.

## Performance & Limits  
Reads from edge cache typically complete in single-digit milliseconds citeturn3search7. KV limits include a maximum value size of 25 MiB, key size up to 512 bytes, and rate limits (free tier: 100 k reads/day, 1 k writes/day; paid: higher quotas) citeturn3search2turn3search0.

## Technology Stack  
- **Runtime**: Cloudflare Workers (JavaScript/TypeScript) citeturn2search1  
- **Storage**: Workers KV namespace citeturn2search1  
- **CLI & Deployment**: Wrangler for local development and deployment citeturn2search2  

## Use Cases  
- Configuration or feature-flag storage for edge applications citeturn2search1turn3search5  
- CDN-backed serving of static assets (images, JSON) citeturn2search5  
- Caching user preferences and session metadata citeturn2search1  

## Roadmap  
1. Bulk operations (multi-key GET/DELETE)  
2. Built-in TTL/expiration management  
3. API authentication (API keys, JWT)  
4. Dashboard UI for browsing keys  
5. Metrics & analytics integration  
