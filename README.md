# Try catch ts

With try-catch-ts you can wrap any function with a try...catch statement functionally.
If function runs without errors, it will return the data, otherwise the error will be returned.

## Installation

```bash
npm i try-catch-ts
```

## Usage

```js
import { tryFn, isErroneous } from "try-catch-ts";

const main = async () => {
    const result = await tryFn(() => axios.get("https://pokeapi.co/api/v2/pokemon/ditto"));
    
    if (isErroneous(result)) {
        console.error(result.error);
        
        return;
    }
    
    const { data } = result;
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)