# AwesomeKV

```js
// Add key-value pairs
await fetch('https://awesomekv.dev/key', { method: 'PUT', body: 'value' })

// Get value by key
const res = await fetch('https://awesomekv.dev/key')
console.log(await res.text())

// Delete value by key
await fetch('https://awesomekv.dev/key', { method: 'DELETE' })
```

