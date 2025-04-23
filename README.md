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
