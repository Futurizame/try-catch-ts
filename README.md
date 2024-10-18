# Try catch ts

Error as values, wrap your functions with functional try-catch blocks.

## Installation

```bash
npm i try-catch-ts
```

## Usage

```js
import { tryFn } from "try-catch-ts";

const main = async () => {
  const [ok, data, error] = await tryFn(() => axios.get("https://pokeapi.co/api/v2/pokemon/ditto"));

  if (!ok) {
    console.error(error);

    return;
  }

  const { name } = data;
};
```

```js
import { tryFn } from "try-catch-ts";

const getPokemon = async () => {
  const [ok, data, error] = await tryFn(() => axios.get("https://pokeapi.co/api/v2/pokemon/ditto"));

  if (ok) {
    return data.name;
  }

  // do something with error
  const { message } = error;
};
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
