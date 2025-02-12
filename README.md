# Try catch ts

Error as values, wrap your functions with functional try-catch blocks.

## Installation

```bash
npm i try-catch-ts
```

## Usage

```js
const response = await tryFn<{ name: string }>(async () => {
  const result = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  return await result.json();
});

if (!response.ok) {
  console.log(response.error.message);

  return;
}

console.log(response.data.name);
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
