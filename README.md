# X-STATE-MANAGER

A lightweight state manager built on top of SWR for efficient state management with caching, optimistic updates, and modular architecture. It allows easy global and local state management and supports TypeScript for enhanced type-safety.

## Installation

NPM

```bash
npm i x-state-manager
```

YARN

```bash
yarn add x-state-manager
```

## Usage example

store/counterStoreData.ts

```typescript
// store key for managing counter state
export const COUNTER_STORE_DATA_KEY = 'COUNTER_STORE_DATA_KEY';

export type CounterState = number;

// fetch counter from local storage. Here can be any API call
export const fetchCounter = async (): Promise<CounterState> => {
  const value = localStorage.getItem('counter');
  return value ? Number(value) : 0;
};
```

store/useCounter.ts

```typescript
import { createSWRState } from 'x-state-manager';
import { COUNTER_STORE_DATA_KEY, fetchCounter } from './counterStoreData';

// create and return counter state
export const useCounter = () => {
  // COUNTER_STORE_DATA_KEY is the key for managing counter state (it should be unique for each state)

  // fetchCounter is the function for fetching counter from local storage or API (here can be any API call or null)

  // Third argument is the options (it is optional) for SWR (https://swr.vercel.app/docs/api#options)
  // {
  //   fallbackData: 0, --> default state value
  // }

  return createSWRState<number>(COUNTER_STORE_DATA_KEY, fetchCounter, {
    fallbackData: 0,
  });
};
```

```typescript
'use client';

import { useCounter } from '../store/useCounter';

const Counter: React.FC = () => {
  const { data: count, mutate, isLoading } = useCounter();

  const increment = () => {
    // first argument can be new value or function with previous value that will be return new value.
    // second argument is boolean to determine if should revalidate the data
    mutate((prevData) => (prevData ?? 0) + 1, false);
  };

  return (
    <div className='flex flex-col gap-8 '>
      <h1>Count: {isLoading ? 'Loading...' : count}</h1>

      <button onClick={increment} className='rounded bg-blue-500 px-4 py-2'>
        Increment
      </button>
    </div>
  );
};

export default Counter;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
