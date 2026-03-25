export interface Question {
  question: string;
  code?: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizCategory {
  id: string;
  label: string;
  questions: Question[];
}

export interface QuizDefinition {
  id: string;
  title: string;
  description: string;
  categories: QuizCategory[];
}

const jsGotchas: Question[] = [
  {
    question: "What does this code output?",
    code: `console.log(typeof null)`,
    options: ['"null"', '"undefined"', '"object"', 'null'],
    correct: 2,
    explanation: 'This is a historical bug in JavaScript. typeof null returns "object" even though null is a primitive. This was never fixed for backward compatibility.'
  },
  {
    question: "What does this code output?",
    code: `console.log(typeof [])`,
    options: ['"array"', '"object"', '"Array"', '"undefined"'],
    correct: 1,
    explanation: 'Arrays are objects in JavaScript. typeof [] returns "object". Use Array.isArray([]) to check for arrays.'
  },
  {
    question: "What does this code output?",
    code: `console.log([] + [])`,
    options: ['[]', '0', '""', 'undefined'],
    correct: 2,
    explanation: 'The + operator converts arrays to primitives via .toString(). Empty arrays become empty strings, so "" + "" equals "".'
  },
  {
    question: "What does this code output?",
    code: `console.log("A")\nsetTimeout(() => console.log("B"), 0)\nconsole.log("C")`,
    options: ['A B C', 'A C B', 'B A C', 'C A B'],
    correct: 1,
    explanation: 'setTimeout callbacks go into the event loop and execute after the current call stack is empty, even with 0ms delay. So: A, C (sync), then B (async).'
  },
  {
    question: "What does this code output?",
    code: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0)\n}`,
    options: ['0 1 2', '3 3 3', '0 0 0', 'undefined undefined undefined'],
    correct: 1,
    explanation: 'var is function-scoped, not block-scoped. When the callbacks run, the loop has finished and i equals 3. Use let instead to fix this.'
  },
  {
    question: "What does this code output?",
    code: `const nums = [1, 2, 3]\nconst result = nums.map(n => { n * 2 })\nconsole.log(result)`,
    options: ['[2, 4, 6]', '[undefined, undefined, undefined]', '[]', 'Error'],
    correct: 1,
    explanation: 'Arrow functions with {} need an explicit return statement. Without return, the function returns undefined. Use n => n * 2 or n => { return n * 2 }.'
  },
  {
    question: "What does this code output?",
    code: `const a = { x: 1 }\nconst b = { x: 1 }\nconsole.log(a === b)`,
    options: ['true', 'false', 'undefined', 'Error'],
    correct: 1,
    explanation: '=== compares by reference for objects, not by value. a and b are different objects in memory, so they\'re not equal.'
  },
  {
    question: "What does this code output?",
    code: `console.log(0.1 + 0.2 === 0.3)`,
    options: ['true', 'false', '0.3', 'Error'],
    correct: 1,
    explanation: 'Floating point arithmetic in JavaScript (and most languages) has precision issues. 0.1 + 0.2 equals 0.30000000000000004, not exactly 0.3.'
  },
  {
    question: "What does this code output?",
    code: `console.log([] == ![])`,
    options: ['true', 'false', 'Error', 'undefined'],
    correct: 0,
    explanation: '![] is false (arrays are truthy, negated = false). [] == false coerces: [] → \'\' → 0, false → 0. 0 == 0 is true. Wild type coercion!'
  },
  {
    question: "What does this code output?",
    code: `console.log('5' - 3)`,
    options: ["'53'", '2', 'NaN', 'Error'],
    correct: 1,
    explanation: "The - operator only works with numbers, so '5' is coerced to 5. 5 - 3 = 2. But + would concatenate: '5' + 3 = '53'."
  },
  {
    question: "What does this code output?",
    code: `const arr = [1, 2, 3]\narr[10] = 11\nconsole.log(arr.length)`,
    options: ['4', '11', '10', 'Error'],
    correct: 1,
    explanation: 'Setting arr[10] creates a sparse array with empty slots. The length becomes 11 (indices 0-10). Slots 3-9 are empty (not undefined).'
  },
  {
    question: "What does this code output?",
    code: `console.log(typeof NaN)`,
    options: ['"NaN"', '"undefined"', '"number"', '"object"'],
    correct: 2,
    explanation: "NaN (Not a Number) is paradoxically of type 'number'. Use Number.isNaN() to check for NaN, not typeof."
  },
  {
    question: "What does this code output?",
    code: `console.log(NaN === NaN)`,
    options: ['true', 'false', 'NaN', 'Error'],
    correct: 1,
    explanation: 'NaN is the only value in JavaScript that is not equal to itself. Use Number.isNaN(x) instead of x === NaN.'
  },
  {
    question: "What does this code output?",
    code: `let x = 1\nlet y = x++\nconsole.log(x, y)`,
    options: ['1 1', '2 1', '2 2', '1 2'],
    correct: 1,
    explanation: 'x++ returns the original value THEN increments. So y gets 1, then x becomes 2. Use ++x for pre-increment.'
  },
  {
    question: "What does this code output?",
    code: `console.log("b" + "a" + +"a" + "a")`,
    options: ['"baaa"', '"baNaNa"', '"ba1a"', 'Error'],
    correct: 1,
    explanation: '+"a" tries to convert \'a\' to a number, resulting in NaN. So: \'b\' + \'a\' + NaN + \'a\' = \'baNaNa\'.'
  },
  {
    question: "What does this code output?",
    code: `const nums = [10, 5, 40, 25, 100]\nconsole.log(nums.sort())`,
    options: ['[5, 10, 25, 40, 100]', '[10, 100, 25, 40, 5]', '[100, 40, 25, 10, 5]', 'Error'],
    correct: 1,
    explanation: "sort() converts elements to strings and sorts lexicographically. '10' < '5' because '1' < '5'. Always use sort((a, b) => a - b) for numbers."
  },
  {
    question: "What does this code output?",
    code: `const user = { name: "Ian" }\nuser.name = "John"\nconsole.log(user.name)`,
    options: ['"Ian"', '"John"', 'Error - const is immutable', 'undefined'],
    correct: 1,
    explanation: "const prevents reassignment, not mutation. You can change object properties. user = {} would throw an error, but user.name = 'John' is fine."
  },
  {
    question: "What does this code output?",
    code: `console.log(x)\nlet x = 5`,
    options: ['undefined', '5', 'ReferenceError', 'null'],
    correct: 2,
    explanation: "let and const have a Temporal Dead Zone. They're hoisted but not initialized, so accessing before declaration throws ReferenceError."
  },
  {
    question: "What does this code output?",
    code: `sayHi()\nvar sayHi = function() {\n  console.log("Hi")\n}`,
    options: ['"Hi"', 'undefined', 'TypeError', 'ReferenceError'],
    correct: 2,
    explanation: 'Function expressions are hoisted as undefined. Calling undefined() throws TypeError. Function declarations would work (fully hoisted).'
  },
  {
    question: "What does this code output?",
    code: `const obj = { a: 1 }\nconsole.log(delete obj.a)\nconsole.log(obj.a)`,
    options: ['true, undefined', 'false, 1', 'true, 1', 'undefined, undefined'],
    correct: 0,
    explanation: 'delete removes object properties and returns true. After deletion, accessing obj.a returns undefined.'
  }
];

const jsConcepts: Question[] = [
  {
    question: "What is a closure in JavaScript?",
    options: [
      'A function that closes the browser',
      'A function that remembers variables from its outer scope',
      'A function without parameters',
      'A function that cannot be called twice'
    ],
    correct: 1,
    explanation: 'A closure is a function that retains access to variables from its surrounding (lexical) scope, even after the outer function has returned.'
  },
  {
    question: "What does this code output?",
    code: `function outer() {\n  let count = 0\n  return function() {\n    count++\n    return count\n  }\n}\nconst fn = outer()\nconsole.log(fn(), fn(), fn())`,
    options: ['1 1 1', '1 2 3', '0 1 2', 'undefined'],
    correct: 1,
    explanation: 'This is a closure. The inner function remembers the count variable from outer(). Each call increments and returns the same count.'
  },
  {
    question: "What runs first: microtasks or macrotasks?",
    options: ['Macrotasks', 'Microtasks', 'They run simultaneously', 'Random order'],
    correct: 1,
    explanation: 'Microtasks (Promises) run before macrotasks (setTimeout) after the current call stack is empty. This is why Promise.then() executes before setTimeout(..., 0).'
  },
  {
    question: "What does call() do?",
    options: [
      'Creates a new function',
      "Invokes a function with a specific 'this' value",
      'Delays function execution',
      'Copies a function'
    ],
    correct: 1,
    explanation: "call() invokes a function immediately with a specified 'this' value and individual arguments. Similar to apply() which takes an array of arguments."
  },
  {
    question: "What is the difference between == and ===?",
    options: [
      'No difference',
      '=== is faster',
      "== coerces types, === doesn't",
      '=== only works with numbers'
    ],
    correct: 2,
    explanation: '== (loose equality) coerces types before comparing (5 == "5" is true). === (strict equality) compares both value AND type without coercion.'
  },
  {
    question: "What does this code output?",
    code: `const user = { name: "Ian", skills: ["JS"] }\nconst copy = { ...user }\ncopy.skills.push("React")\nconsole.log(user.skills)`,
    options: ['["JS"]', '["JS", "React"]', 'undefined', 'Error'],
    correct: 1,
    explanation: 'Spread creates a shallow copy. Nested arrays/objects are still references. Modifying copy.skills affects user.skills because they point to the same array.'
  },
  {
    question: "What does Array.prototype.reduce() do?",
    options: [
      'Removes elements from an array',
      'Reduces array to a single value via accumulator',
      'Makes the array smaller',
      'Sorts the array'
    ],
    correct: 1,
    explanation: 'reduce() iterates through array elements, accumulating a single result. Takes (accumulator, currentValue) => newAccumulator and an initial value.'
  },
  {
    question: "What does this code output?",
    code: `[1, 2, 3].reduce((acc, n) => acc + n, 0)`,
    options: ['[1, 2, 3]', '6', '0', '123'],
    correct: 1,
    explanation: 'reduce starts with 0 (initial value), then: 0+1=1, 1+2=3, 3+3=6. It accumulates all values into a single sum.'
  },
  {
    question: "What does this code output?",
    code: `const arr = [1, 2, 3]\narr.forEach(n => n * 2)\nconsole.log(arr)`,
    options: ['[2, 4, 6]', '[1, 2, 3]', 'undefined', '[]'],
    correct: 1,
    explanation: "forEach doesn't modify the original array or return anything. It just executes a function for each element. Use map() to create a new transformed array."
  },
  {
    question: "What is the difference between map() and forEach()?",
    options: [
      'No difference',
      'map returns a new array, forEach returns undefined',
      'forEach is faster',
      'map only works with numbers'
    ],
    correct: 1,
    explanation: 'map() returns a new array with transformed elements. forEach() returns undefined and is used for side effects only. Use map when you need the result.'
  },
  {
    question: "What does Promise.all() do?",
    options: [
      'Runs promises one by one',
      'Waits for all promises, fails if any fails',
      'Returns the first promise to resolve',
      'Ignores rejected promises'
    ],
    correct: 1,
    explanation: 'Promise.all() waits for all promises to resolve and returns an array of results. If ANY promise rejects, the whole Promise.all() rejects immediately.'
  },
  {
    question: "What does this code output?",
    code: `Promise.resolve(1)\n  .then(x => x + 1)\n  .then(x => x * 2)\n  .then(console.log)`,
    options: ['1', '2', '4', 'undefined'],
    correct: 2,
    explanation: 'Promise chain: 1 → 1+1=2 → 2*2=4 → console.log(4). Each .then() transforms the value and passes it to the next.'
  },
  {
    question: "What does Object.keys() return?",
    code: `Object.keys({ a: 1, b: 2, c: 3 })`,
    options: ['[1, 2, 3]', '["a", "b", "c"]', '{ a: 1, b: 2, c: 3 }', '3'],
    correct: 1,
    explanation: "Object.keys() returns an array of the object's own enumerable property names (keys), not values. Use Object.values() for values."
  },
  {
    question: "What is event delegation?",
    options: [
      'Passing events between components',
      'Attaching one handler to a parent instead of many to children',
      'Creating custom events',
      'Stopping event propagation'
    ],
    correct: 1,
    explanation: 'Event delegation attaches a single event listener to a parent element to handle events from its children. Uses event bubbling. More efficient for many elements.'
  },
  {
    question: "What does this code output?",
    code: `const fn = () => arguments\nfn(1, 2, 3)`,
    options: ['[1, 2, 3]', 'Arguments object', 'Error', 'undefined'],
    correct: 2,
    explanation: "Arrow functions don't have their own 'arguments' object. They inherit from enclosing scope. Use rest parameters (...args) instead."
  }
];

const typescript: Question[] = [
  {
    question: "What does Partial<T> do in TypeScript?",
    options: [
      'Makes all properties required',
      'Makes all properties optional',
      'Removes all properties',
      'Duplicates all properties'
    ],
    correct: 1,
    explanation: 'Partial<T> creates a type with all properties of T set to optional. Useful for update functions where you only modify some fields.'
  },
  {
    question: "What is the difference between 'type' and 'interface'?",
    options: [
      'No difference',
      'type supports unions, interface supports declaration merging',
      'interface is faster',
      'type can only be used for primitives'
    ],
    correct: 1,
    explanation: 'Types support union types (A | B). Interfaces support declaration merging (multiple declarations combine). Both can describe object shapes.'
  },
  {
    question: "What does this do?",
    code: `type Status = "loading" | "success" | "error"`,
    options: [
      'Creates an array type',
      'Creates a union/literal type',
      'Creates an enum',
      'Creates a class'
    ],
    correct: 1,
    explanation: 'This creates a union of string literal types. A variable of type Status can only be one of these three specific strings.'
  },
  {
    question: 'What does Omit<User, "email"> do?',
    options: [
      'Adds email to User',
      'Creates User type without the email property',
      'Makes email required',
      'Makes email optional'
    ],
    correct: 1,
    explanation: 'Omit<Type, Keys> creates a new type by excluding specified properties. Omit<User, "email"> returns User without the email field.'
  },
  {
    question: "What does 'as const' do?",
    code: `const colors = ["red", "green"] as const`,
    options: [
      'Makes the array mutable',
      'Makes values deeply readonly with literal types',
      'Converts to a Set',
      "Nothing, it's invalid syntax"
    ],
    correct: 1,
    explanation: "'as const' makes values deeply readonly and infers literal types. The array becomes readonly [\"red\", \"green\"] instead of string[]."
  },
  {
    question: "What is a type guard?",
    options: [
      'A function that protects types from being changed',
      'A function that narrows types at runtime',
      'A type that guards against null',
      'An interface for security'
    ],
    correct: 1,
    explanation: 'Type guards are functions that narrow types at runtime. They use type predicates (value is Type) to help TypeScript understand the type after the check.'
  },
  {
    question: "What does Required<T> do?",
    options: [
      'Makes all properties optional',
      'Makes all properties required',
      'Removes null from types',
      'Adds validation'
    ],
    correct: 1,
    explanation: 'Required<T> is the opposite of Partial<T>. It makes all properties required, removing optional modifiers (?).'
  },
  {
    question: "What does Pick<User, 'name' | 'email'> do?",
    options: [
      'Removes name and email from User',
      'Creates a type with only name and email from User',
      'Makes name and email optional',
      'Validates name and email'
    ],
    correct: 1,
    explanation: "Pick<Type, Keys> creates a new type by selecting only the specified properties. It's the opposite of Omit."
  },
  {
    question: "What type does this infer?",
    code: `const name = "Ian"  // type is:`,
    options: ['string', '"Ian"', 'any', 'unknown'],
    correct: 1,
    explanation: "With const, TypeScript infers the literal type \"Ian\", not string. This is because const values can't change, so TypeScript uses the narrowest type."
  },
  {
    question: "What does Record<string, number> create?",
    options: [
      'An array of strings and numbers',
      'An object with string keys and number values',
      'A class',
      'A tuple'
    ],
    correct: 1,
    explanation: 'Record<K, V> creates an object type with keys of type K and values of type V. Record<string, number> is { [key: string]: number }.'
  },
  {
    question: "What does the 'unknown' type do?",
    options: [
      "Same as 'any'",
      'Allows any type but requires type checking before use',
      'Represents undefined',
      'Marks unused variables'
    ],
    correct: 1,
    explanation: 'unknown is the type-safe counterpart of any. You can assign anything to it, but must narrow/check its type before using it.'
  },
  {
    question: "What does the '!' operator do in TypeScript?",
    code: `const el = document.getElementById("app")!`,
    options: [
      'Negates the value',
      'Asserts the value is not null/undefined',
      'Makes the value optional',
      'Creates a boolean'
    ],
    correct: 1,
    explanation: "The non-null assertion operator (!) tells TypeScript you're certain the value isn't null/undefined. Use carefully — it bypasses type safety."
  },
  {
    question: "What does keyof do?",
    code: `type UserKeys = keyof { name: string, age: number }`,
    options: ['"name, age"', 'string', '"name" | "age"', 'string[]'],
    correct: 2,
    explanation: 'keyof creates a union type of all property names. keyof { name: string, age: number } gives "name" | "age".'
  }
];

const react: Question[] = [
  {
    question: "What is the Virtual DOM?",
    options: [
      'A copy of the real DOM in memory for efficient updates',
      'A new browser API',
      'A database for React',
      'A testing library'
    ],
    correct: 0,
    explanation: 'The Virtual DOM is a lightweight copy of the real DOM. React diffs the new virtual DOM with the previous one and only updates changed elements in the real DOM.'
  },
  {
    question: "When does useEffect with an empty dependency array run?",
    options: [
      'On every render',
      'Only on mount (once)',
      'Never',
      'Only on unmount'
    ],
    correct: 1,
    explanation: "useEffect(() => {}, []) runs only once when the component mounts. It's similar to componentDidMount in class components."
  },
  {
    question: "What causes a React component to re-render?",
    options: [
      'Only state changes',
      'Only prop changes',
      'State change, prop change, or parent re-render',
      'Only context changes'
    ],
    correct: 2,
    explanation: 'Components re-render when: their state changes, their props change, their parent re-renders, or a context they consume changes.'
  },
  {
    question: "What's wrong with using array index as a key?",
    options: [
      "It's slower",
      'It can cause bugs when items are reordered/removed',
      "React doesn't allow it",
      "Nothing, it's fine"
    ],
    correct: 1,
    explanation: 'Using index as key can cause bugs when items are reordered, added, or removed. React may reuse wrong component instances, causing state to get mixed up.'
  },
  {
    question: "What's the difference between useRef and useState?",
    options: [
      'No difference',
      "useRef doesn't cause re-renders when changed",
      'useState is faster',
      'useRef can only store DOM elements'
    ],
    correct: 1,
    explanation: 'useRef creates a mutable reference that persists across renders WITHOUT causing re-renders. useState triggers a re-render whenever the state changes.'
  },
  {
    question: "What is prop drilling?",
    options: [
      'A React performance optimization',
      'Passing props through many component levels',
      'A way to create components',
      'A testing technique'
    ],
    correct: 1,
    explanation: 'Prop drilling is passing props through multiple intermediate components just to reach a deeply nested component. Solutions include Context API or state management libraries.'
  },
  {
    question: "What does React.memo do?",
    options: [
      'Memoizes expensive calculations',
      "Prevents re-renders if props haven't changed",
      'Creates a memo pad component',
      'Stores data in memory'
    ],
    correct: 1,
    explanation: "React.memo is a HOC that prevents re-renders if props haven't changed (shallow comparison). It's for performance optimization of expensive components."
  },
  {
    question: "What's a controlled component?",
    options: [
      'A component with restricted access',
      'A component where React controls form input state',
      "A component that can't have children",
      'A component with no props'
    ],
    correct: 1,
    explanation: "In a controlled component, React state is the 'single source of truth' for form inputs. The input value is controlled by state and updated via onChange."
  },
  {
    question: "What does this code output?",
    code: `const [count, setCount] = useState(0)\n\nfunction handleClick() {\n  setCount(count + 1)\n  setCount(count + 1)\n  setCount(count + 1)\n}\n// After clicking once, count is:`,
    options: ['3', '1', '0', 'undefined'],
    correct: 1,
    explanation: "All three setCount calls use the same stale 'count' value (0). So it's setCount(0+1) three times, resulting in 1. Use functional updates setCount(c => c + 1) to get 3."
  },
  {
    question: "How many times does React re-render here?",
    code: `function handleClick() {\n  setA(1)\n  setB(2)\n  setC(3)\n}`,
    options: ['3 times', '1 time (batched)', '0 times', 'Depends on values'],
    correct: 1,
    explanation: 'React batches multiple setState calls into a single re-render for performance. All three updates happen, then one re-render occurs.'
  },
  {
    question: "What's wrong with this code?",
    code: `function Child({ user }) {\n  user.name = 'Modified'\n  return <div>{user.name}</div>\n}`,
    options: [
      'Nothing wrong',
      'Directly mutating props (props are read-only)',
      'Missing return type',
      'Should use useState'
    ],
    correct: 1,
    explanation: 'Props are immutable! Never mutate props directly. This can cause bugs and unexpected behavior. Instead, lift state up or use callbacks to modify data in the parent.'
  },
  {
    question: "When does a child component re-render?",
    options: [
      'Only when its own state changes',
      'Only when its props change',
      'When parent re-renders, props change, or its state changes',
      'Never automatically'
    ],
    correct: 2,
    explanation: "By default, when a parent re-renders, ALL its children re-render too (even if props didn't change). Use React.memo to prevent this."
  },
  {
    question: "Why does this cause unnecessary re-renders?",
    code: `<Child style={{ color: 'red' }} />`,
    options: [
      "It doesn't cause issues",
      'Inline object creates new reference every render',
      "Objects can't be passed as props",
      'style prop is reserved'
    ],
    correct: 1,
    explanation: "Inline objects create a new reference every render. Even if values are the same, React sees a 'new' prop, triggering child re-render. Use useMemo for stable references."
  },
  {
    question: "What is 'derived state'?",
    options: [
      'State from a database',
      "Values computed from existing state/props (shouldn't be stored in state)",
      'State shared between components',
      'Initial state values'
    ],
    correct: 1,
    explanation: "Derived state is a value that can be calculated from existing state or props. Don't store it in state — calculate it during render to avoid sync issues."
  },
  {
    question: "What does 'UI = f(state)' mean in React?",
    options: [
      'UI is a function stored in state',
      'The UI is determined by (is a function of) the current state',
      'State should be a function',
      'Functions create UI elements'
    ],
    correct: 1,
    explanation: "This is React's core philosophy: your UI is a pure function of your state. When state changes, React automatically re-renders to reflect the new state in the UI."
  },
  {
    question: "How does data flow in React?",
    options: [
      'Two-way binding (like Angular)',
      'Unidirectional: parent → child via props',
      'Child → parent via props',
      'Random, depends on component'
    ],
    correct: 1,
    explanation: 'React uses unidirectional data flow. Data flows DOWN via props (parent to child). Events/callbacks flow UP (child notifies parent). This makes data flow predictable.'
  },
  {
    question: "What happens when you call setState?",
    code: `setCount(5)\nconsole.log(count) // What's logged?`,
    options: [
      '5 (new value)',
      'The old value (state updates are async)',
      'undefined',
      'Error'
    ],
    correct: 1,
    explanation: "State updates are asynchronous! The new value isn't available immediately after setState. Use useEffect to react to state changes, or functional updates for the next value."
  },
  {
    question: "Why use functional updates with setState?",
    code: `// Option A: setCount(count + 1)\n// Option B: setCount(c => c + 1)`,
    options: [
      'No difference',
      'Option B guarantees latest state value',
      'Option A is faster',
      'Option B is required'
    ],
    correct: 1,
    explanation: 'Functional updates (c => c + 1) always use the latest state value. This avoids stale closure issues, especially when multiple updates happen or in event handlers.'
  },
  {
    question: "What's the correct way to update an object in state?",
    code: `const [user, setUser] = useState({ name: 'Ian', age: 30 })`,
    options: [
      "user.name = 'New'; setUser(user)",
      "setUser({ ...user, name: 'New' })",
      "setUser(user.name = 'New')",
      "user = { name: 'New' }"
    ],
    correct: 1,
    explanation: "Never mutate state directly! Create a new object with spread: setUser({ ...user, name: 'New' }). React needs a new reference to detect changes and re-render."
  },
  {
    question: "What does useMemo do?",
    options: [
      'Memoizes a component',
      'Memoizes a computed value to avoid recalculation',
      'Stores data in memory forever',
      'Creates a ref'
    ],
    correct: 1,
    explanation: 'useMemo caches a computed value and only recalculates when dependencies change. Use for expensive calculations to avoid recomputing on every render.'
  },
  {
    question: "What does useCallback do?",
    options: [
      'Creates a callback function',
      'Memoizes a function to keep stable reference',
      'Delays function execution',
      'Calls a function automatically'
    ],
    correct: 1,
    explanation: 'useCallback returns a memoized function that only changes when dependencies change. Useful for passing stable callbacks to memoized children.'
  },
  {
    question: "When would you use useLayoutEffect instead of useEffect?",
    options: [
      'For async operations',
      'When you need to read/modify DOM before browser paints',
      'For simpler code',
      "Never, they're the same"
    ],
    correct: 1,
    explanation: 'useLayoutEffect runs synchronously after DOM mutations but before paint. Use for DOM measurements or changes that must happen before the user sees the update.'
  },
  {
    question: "What is the purpose of React Fragments?",
    code: `<>\n  <Child1 />\n  <Child2 />\n</>`,
    options: [
      'Adds extra DOM elements',
      'Groups elements without adding extra DOM nodes',
      'Makes components faster',
      'Enables lazy loading'
    ],
    correct: 1,
    explanation: 'Fragments (<>...</> or <Fragment>) let you group children without adding extra DOM nodes. Useful when a component needs to return multiple elements.'
  },
  {
    question: "What's wrong with this code?",
    code: `function Counter() {\n  const [count, setCount] = useState(0)\n  if (count > 5) {\n    const [extra] = useState('hi')\n  }\n  return <div>{count}</div>\n}`,
    options: [
      'Nothing wrong',
      'Hooks called conditionally (breaks rules of hooks)',
      'Missing key prop',
      'Wrong syntax'
    ],
    correct: 1,
    explanation: 'Hooks must be called at the top level, in the same order every render. Conditional hooks break this rule and cause bugs. Move hooks outside conditions.'
  },
  {
    question: "What does useContext do?",
    options: [
      'Creates a new context',
      'Reads a value from a context without prop drilling',
      'Updates context automatically',
      'Replaces Redux'
    ],
    correct: 1,
    explanation: "useContext reads current value from a Context. Avoids prop drilling - any component can access the context value without passing props through intermediate components."
  },
  {
    question: "What's the difference between controlled and uncontrolled components?",
    options: [
      'No difference',
      'Controlled uses React state, uncontrolled uses DOM refs',
      'Uncontrolled is faster',
      'Controlled requires Redux'
    ],
    correct: 1,
    explanation: 'Controlled: React state is the source of truth (value + onChange). Uncontrolled: DOM manages state, you read values with refs. Prefer controlled for most cases.'
  },
  {
    question: "What does React.lazy do?",
    options: [
      'Makes components render slower',
      'Enables code-splitting by loading components lazily',
      'Delays state updates',
      'Creates lazy animations'
    ],
    correct: 1,
    explanation: 'React.lazy enables code-splitting. The component is loaded only when rendered. Wrap with Suspense to show fallback while loading. Great for large apps.'
  },
  {
    question: "What's the difference between useEffect with [] vs no array?",
    options: [
      'No difference',
      '[] runs once on mount, no array runs every render',
      'No array runs once, [] runs every render',
      'Both run on mount only'
    ],
    correct: 1,
    explanation: 'useEffect(() => {}, []) runs only on mount. useEffect(() => {}) with no dependency array runs after EVERY render. This is a common mistake!'
  },
  {
    question: "When does the useEffect cleanup function run?",
    options: [
      'Only when component mounts',
      'On unmount and before each effect re-run',
      'Only on unmount',
      'It never runs automatically'
    ],
    correct: 1,
    explanation: 'Cleanup runs on unmount AND before the next effect runs (if dependencies changed). This prevents memory leaks and stale subscriptions.'
  },
  {
    question: "Why can't useEffect be async directly?",
    code: `useEffect(async () => {\n  await fetchData()\n}, [])`,
    options: [
      'It works fine',
      'async functions return Promises, useEffect expects void or cleanup',
      'async is not allowed in React',
      'It would be too slow'
    ],
    correct: 1,
    explanation: 'useEffect expects the callback to return nothing or a cleanup function. async returns a Promise. Define an async function inside useEffect instead.'
  },
  {
    question: "What causes stale closures in useEffect?",
    code: `const [count, setCount] = useState(0)\nuseEffect(() => {\n  setInterval(() => console.log(count), 1000)\n}, [])`,
    options: [
      'Using setInterval',
      'Empty dependency array captures initial count value forever',
      'Nothing is wrong',
      'useState is broken'
    ],
    correct: 1,
    explanation: "The empty [] means the effect never re-runs, so 'count' inside the callback is always 0 (the initial value). Add [count] to get current value."
  },
  {
    question: "How do you handle async errors in useEffect?",
    options: [
      'useEffect catches errors automatically',
      'Use try/catch inside an async function defined in useEffect',
      'Use a separate error hook',
      'Errors cannot occur in useEffect'
    ],
    correct: 1,
    explanation: 'Define an async function inside useEffect, wrap logic in try/catch, and call that function. Store errors in state to display to users.'
  }
];

const node: Question[] = [
  {
    question: "What is Node.js?",
    options: [
      'A JavaScript framework',
      'A JavaScript runtime built on V8 engine',
      'A database',
      'A frontend library'
    ],
    correct: 1,
    explanation: "Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets you run JavaScript outside the browser (servers, CLI tools, etc.)."
  },
  {
    question: "What's the difference between dependencies and devDependencies?",
    options: [
      'No difference',
      'dependencies are for runtime, devDependencies are for development only',
      'devDependencies are faster',
      "dependencies can't be updated"
    ],
    correct: 1,
    explanation: 'dependencies are needed at runtime (React, Express). devDependencies are only needed during development/build (TypeScript, Jest). Production installs skip devDependencies.'
  },
  {
    question: "What does package-lock.json do?",
    options: [
      'Locks the package.json from editing',
      'Locks exact versions of all dependencies',
      'Encrypts packages',
      'Nothing important'
    ],
    correct: 1,
    explanation: 'package-lock.json locks exact versions of all dependencies (including nested ones). This ensures everyone gets the same versions for reproducible builds.'
  },
  {
    question: "What does npx do?",
    options: [
      'Installs packages globally',
      'Runs packages without installing globally',
      'Updates npm',
      'Creates a new project'
    ],
    correct: 1,
    explanation: 'npx executes packages without installing them globally. It\'s useful for one-off commands like npx create-react-app without polluting global installs.'
  },
  {
    question: 'What does ^ mean in "^4.18.0"?',
    options: [
      'Exactly this version',
      'Any version starting with 4',
      'Compatible version (4.18.0 to <5.0.0)',
      'Latest version'
    ],
    correct: 2,
    explanation: 'The caret (^) means compatible version - allows minor and patch updates but not major. ^4.18.0 matches 4.18.0 to <5.0.0.'
  },
  {
    question: "What's the main difference between CommonJS and ES Modules?",
    options: [
      'No difference',
      'CommonJS uses require(), ESM uses import/export',
      'ESM is older',
      'CommonJS only works in browsers'
    ],
    correct: 1,
    explanation: 'CommonJS uses require()/module.exports (synchronous, Node default). ES Modules use import/export (async, tree-shakeable, modern standard).'
  },
  {
    question: 'What does ~ mean in "~4.18.0"?',
    options: [
      'Same as ^',
      'Patch updates only (4.18.x)',
      'Major updates only',
      'Latest version'
    ],
    correct: 1,
    explanation: 'The tilde (~) is more restrictive than caret. ~4.18.0 matches 4.18.x only (patch updates). ^4.18.0 allows 4.x.x (minor + patch).'
  },
  {
    question: "What is npm ci used for?",
    options: [
      'Same as npm install',
      'Clean install for CI/CD - uses lockfile exactly',
      'Checking for vulnerabilities',
      'Creating package.json'
    ],
    correct: 1,
    explanation: "npm ci does a clean install using package-lock.json exactly. It's faster and more reliable for CI/CD - deletes node_modules first and doesn't modify lockfile."
  },
  {
    question: "What does npm audit do?",
    options: [
      'Audits your code quality',
      'Checks for security vulnerabilities in dependencies',
      'Monitors package usage',
      'Logs package downloads'
    ],
    correct: 1,
    explanation: "npm audit scans your dependencies for known security vulnerabilities. Use 'npm audit fix' to automatically install patched versions where available."
  },
  {
    question: "What is tree-shaking?",
    options: [
      'A testing technique',
      'Removing unused code during bundling',
      'Organizing folder structure',
      'A type of caching'
    ],
    correct: 1,
    explanation: 'Tree-shaking is dead code elimination - bundlers (Webpack, Rollup) remove unused exports. ES Modules enable this with static import/export analysis.'
  },
  {
    question: "What is the event loop?",
    options: [
      'A loop that handles events in browsers only',
      'A mechanism that handles async operations in Node/JS',
      'A type of for loop',
      "React's rendering cycle"
    ],
    correct: 1,
    explanation: 'The event loop continuously checks call stack and callback queues. When the call stack is empty, it moves callbacks from the queue to execute. Enables async JS.'
  }
];

export const categories: QuizCategory[] = [
  { id: 'all', label: 'All Topics', questions: [] },
  { id: 'js-gotchas', label: 'JS Gotchas', questions: jsGotchas },
  { id: 'js-concepts', label: 'JS Concepts', questions: jsConcepts },
  { id: 'typescript', label: 'TypeScript', questions: typescript },
  { id: 'react', label: 'React', questions: react },
  { id: 'node', label: 'Node.js', questions: node },
];

// AWS DVA-C02 Quiz Questions
const awsInfrastructure: Question[] = [
  {
    question: 'Is IAM a global or regional service?',
    options: ['Regional', 'Global', 'AZ-specific', 'Edge Location specific'],
    correct: 1,
    explanation: 'IAM is a Global service. Users, groups, roles, and policies are not region-specific.'
  },
  {
    question: 'How many Availability Zones does a Region typically have?',
    options: ['1-2', '2-6', '5-10', '10-15'],
    correct: 1,
    explanation: 'Each Region has 2-6 AZs. Each AZ consists of one or more data centers with independent power, networking, and connectivity.'
  },
  {
    question: 'Which of the following is a global AWS service?',
    options: ['EC2', 'RDS', 'CloudFront', 'EBS'],
    correct: 2,
    explanation: 'CloudFront is a global service. IAM, Route 53, CloudFront, and WAF are global services, while EC2, RDS, and EBS are regional.'
  }
];

const awsIAM: Question[] = [
  {
    question: 'Can an IAM group contain another group?',
    options: ['Yes, unlimited nesting', 'Yes, up to 3 levels', 'No, groups can only contain users', 'Yes, but only within the same account'],
    correct: 2,
    explanation: 'IAM groups can only contain users, not other groups. You cannot nest groups.'
  },
  {
    question: 'What are IAM Roles primarily used for?',
    options: ['Human users only', 'AWS services and applications', 'Groups of users', 'Password policies'],
    correct: 1,
    explanation: 'IAM Roles grant permissions to AWS services (e.g., EC2, Lambda) to perform actions on your behalf.'
  },
  {
    question: 'Which IAM security tool provides a CSV report of all users and their credential status?',
    options: ['Access Advisor', 'Credentials Report', 'IAM Dashboard', 'Policy Simulator'],
    correct: 1,
    explanation: 'The Credentials Report is a CSV of all users and their credential status. Access Advisor shows service access history per user.'
  }
];

const awsEC2: Question[] = [
  {
    question: "You're trying to SSH into your EC2 and getting a timeout. What's the most likely issue?",
    options: ['Instance not running', 'Security Group', 'Wrong key pair', 'Instance type'],
    correct: 1,
    explanation: "Timeout = Security Group issue. If you get a timeout (not connection refused), it's almost always a security group issue. Check inbound rules for port 22."
  },
  {
    question: 'Which EC2 purchasing option offers up to 90% discount but can be interrupted?',
    options: ['Reserved Instances', 'On-Demand', 'Spot Instances', 'Dedicated Hosts'],
    correct: 2,
    explanation: 'Spot Instances offer up to 90% discount but AWS can reclaim them when the spot price exceeds your bid. Never use for critical workloads.'
  },
  {
    question: 'What is the difference between Dedicated Host and Dedicated Instance?',
    options: ['No difference', "Dedicated Host gives full server control; Dedicated Instance doesn't", 'Dedicated Instance is cheaper', "Dedicated Host doesn't support Windows"],
    correct: 1,
    explanation: 'Dedicated Host gives full server control, see sockets/cores (for BYOL licensing). Dedicated Instance provides dedicated hardware but no host visibility.'
  },
  {
    question: 'Which EC2 instance type prefix is best for compute-intensive workloads like batch processing?',
    options: ['t3', 'r5', 'c5', 'm5'],
    correct: 2,
    explanation: 'C5 (compute-optimized) is best for batch processing, high-performance computing. R5 is memory-optimized, T3/M5 are general purpose.'
  }
];

const awsStorage: Question[] = [
  {
    question: 'What happens to Instance Store data when you stop an EC2 instance?',
    options: ['Data is preserved', 'Data is backed up to S3', 'Data is lost', 'Data is encrypted'],
    correct: 2,
    explanation: 'Instance Store is ephemeral. Data is lost on stop, terminate, or hardware failure. You are responsible for backups/replication.'
  },
  {
    question: 'Which EBS volume types can be used as boot volumes?',
    options: ['All types', 'SSD types only (gp2, gp3, io1, io2)', 'HDD types only (st1, sc1)', 'Only gp2'],
    correct: 1,
    explanation: 'Only SSD types (gp2, gp3, io1, io2) can be boot volumes. HDD types (st1, sc1) cannot be boot volumes.'
  },
  {
    question: 'What is the maximum IOPS for gp3 volumes?',
    options: ['3,000', '16,000', '64,000', '256,000'],
    correct: 1,
    explanation: 'gp3 can provision up to 16,000 IOPS independently of volume size. io2 Block Express can go up to 256,000 IOPS.'
  },
  {
    question: 'Can you attach an EBS volume to multiple EC2 instances?',
    options: ['Yes, all types', 'No, never', 'Only io1/io2 with Multi-Attach', 'Only gp3'],
    correct: 2,
    explanation: 'Only io1/io2 volumes support Multi-Attach, allowing up to 16 instances in the same AZ.'
  },
  {
    question: 'EFS is compatible with which operating systems?',
    options: ['Windows and Linux', 'Linux only', 'Windows only', 'MacOS only'],
    correct: 1,
    explanation: 'EFS is POSIX-compliant and compatible with Linux only, not Windows.'
  },
  {
    question: 'Is EBS regional or AZ-specific?',
    options: ['Global', 'Regional', 'AZ-specific', 'Edge Location'],
    correct: 2,
    explanation: 'EBS volumes are bound to a single Availability Zone. To use in another AZ, create a snapshot and restore.'
  }
];

const awsAMI: Question[] = [
  {
    question: 'Are AMIs region-specific or global?',
    options: ['Global', 'Region-specific', 'AZ-specific', 'Account-specific'],
    correct: 1,
    explanation: 'AMIs are region-specific. You must copy an AMI to use it in another region.'
  }
];

const awsELBASG: Question[] = [
  {
    question: 'What does ELB stand for and is it a load balancer type?',
    options: ['Elastic Load Balancer - yes, it\'s a LB type', 'Elastic Load Balancing - it\'s the service name, not a LB type', 'Enhanced Load Balancer - legacy LB type', 'Enterprise Load Balancing - premium service'],
    correct: 1,
    explanation: 'ELB = Elastic Load Balancing, the service name. Actual LB types are ALB, NLB, GLB, CLB (Classic).'
  },
  {
    question: 'Which load balancer provides a static IP address?',
    options: ['ALB', 'NLB', 'CLB', 'GLB'],
    correct: 1,
    explanation: 'NLB provides one static IP per AZ and supports Elastic IPs. ALB only provides a static DNS hostname.'
  },
  {
    question: 'NLB operates at which OSI layer?',
    options: ['Layer 3', 'Layer 4', 'Layer 7', 'Layer 2'],
    correct: 1,
    explanation: 'NLB operates at Layer 4 (Transport: TCP, UDP). ALB operates at Layer 7 (Application: HTTP, HTTPS).'
  },
  {
    question: 'Will ELB terminate an unhealthy target?',
    options: ['Yes, immediately', 'Yes, after cooldown', 'No, it only stops routing traffic', 'Yes, after 3 failed checks'],
    correct: 2,
    explanation: 'ELB only stops routing traffic to unhealthy targets. ASG with ELB health checks enabled will terminate/replace unhealthy instances.'
  },
  {
    question: 'Is Cross-Zone Load Balancing enabled by default for ALB?',
    options: ['No', 'Yes, and it\'s free', 'Yes, but it costs extra', 'Only in certain regions'],
    correct: 1,
    explanation: 'Cross-Zone Load Balancing is enabled by default for ALB and is free. NLB has it disabled by default and charges if enabled.'
  },
  {
    question: 'What is the default ASG cooldown period?',
    options: ['60 seconds', '180 seconds', '300 seconds', '600 seconds'],
    correct: 2,
    explanation: 'Default cooldown is 300 seconds (5 minutes). It prevents rapid successive scaling actions.'
  },
  {
    question: 'What scaling policy uses ML to predict load patterns?',
    options: ['Target Tracking', 'Step Scaling', 'Predictive Scaling', 'Scheduled Scaling'],
    correct: 2,
    explanation: 'Predictive Scaling uses ML to analyze historical load patterns and pre-provision capacity ahead of predicted spikes.'
  }
];

const awsRDS: Question[] = [
  {
    question: 'Read Replicas use sync or async replication?',
    options: ['Synchronous', 'Asynchronous', 'Both', 'Depends on region'],
    correct: 1,
    explanation: 'Read Replicas use ASYNC replication. Data is eventually consistent across read replicas.'
  },
  {
    question: 'Multi-AZ uses sync or async replication?',
    options: ['Synchronous', 'Asynchronous', 'Both', 'Depends on database engine'],
    correct: 0,
    explanation: 'Multi-AZ uses SYNC replication. Changes are immediately replicated to standby for disaster recovery.'
  },
  {
    question: 'Can you read from a Multi-AZ standby database?',
    options: ['Yes', 'No, standby is only for failover', 'Only during maintenance', 'Only with specific engines'],
    correct: 1,
    explanation: 'You cannot read from Multi-AZ standby. It\'s only for failover. Use Read Replicas for read scaling.'
  },
  {
    question: "What's the failover time for Aurora?",
    options: ['Less than 30 seconds', '1-2 minutes', '5 minutes', '10 minutes'],
    correct: 0,
    explanation: 'Aurora failover is less than 30 seconds. Aurora maintains 6 copies across 3 AZs.'
  },
  {
    question: 'How do you encrypt an existing unencrypted RDS database?',
    options: ['Enable encryption in console', 'Snapshot → Copy with encryption → Restore', 'Use AWS CLI to enable', 'Cannot be done'],
    correct: 1,
    explanation: 'To encrypt an unencrypted DB: take a snapshot, copy it with encryption enabled, then restore from the encrypted snapshot.'
  },
  {
    question: 'Is RDS Proxy publicly accessible?',
    options: ['Yes', 'No, VPC only', 'Only with specific configuration', 'Only for Aurora'],
    correct: 1,
    explanation: 'RDS Proxy lives inside your VPC only and is never publicly accessible. Great for Lambda connections.'
  }
];

const awsLambda: Question[] = [
  {
    question: 'What is the maximum Lambda execution timeout?',
    options: ['5 minutes', '10 minutes', '15 minutes', '30 minutes'],
    correct: 2,
    explanation: 'Maximum Lambda timeout is 15 minutes (900 seconds).'
  },
  {
    question: 'What is the maximum Lambda memory allocation?',
    options: ['3,008 MB', '5,120 MB', '10,240 MB', '16,384 MB'],
    correct: 2,
    explanation: 'Maximum Lambda memory is 10,240 MB (10 GB). CPU scales proportionally with memory.'
  },
  {
    question: 'What is the /tmp directory size limit in Lambda?',
    options: ['512 MB', '1 GB', '5 GB', '10 GB'],
    correct: 3,
    explanation: '/tmp storage can be configured from 512 MB up to 10,240 MB (10 GB) for temporary file processing.'
  },
  {
    question: 'How many retries does Lambda do for async invocations?',
    options: ['0', '1', '2', '3'],
    correct: 2,
    explanation: 'Lambda retries async invocations 2 times (3 total attempts). Failed events can go to DLQ or on-failure destination.'
  },
  {
    question: 'How many Lambda Layers can you attach to a function?',
    options: ['2', '5', '10', 'Unlimited'],
    correct: 1,
    explanation: 'You can attach up to 5 layers per function. Total unzipped size must be < 250 MB.'
  },
  {
    question: 'What happens to Lambda when configured in VPC without NAT Gateway?',
    options: ['Works normally', 'Has no internet access', 'Fails to deploy', 'Can only access S3'],
    correct: 1,
    explanation: 'Lambda in VPC has no internet unless you have NAT Gateway. By default, Lambda runs in AWS-managed VPC with internet.'
  }
];

const awsAPIGateway: Question[] = [
  {
    question: 'What are the three API Gateway endpoint types?',
    options: ['Public, Private, Internal', 'Edge-optimized, Regional, Private', 'Standard, Premium, Enterprise', 'HTTP, REST, WebSocket'],
    correct: 1,
    explanation: 'The three endpoint types are: Edge-optimized (uses CloudFront), Regional, and Private (VPC only via endpoint).'
  },
  {
    question: 'What is the API Gateway default timeout?',
    options: ['15 seconds', '29 seconds', '60 seconds', '300 seconds'],
    correct: 1,
    explanation: 'API Gateway timeout is 29 seconds maximum. Cannot exceed this even if Lambda timeout is higher.'
  },
  {
    question: 'Which API type is cheaper and simpler for basic Lambda integrations?',
    options: ['REST API', 'HTTP API', 'WebSocket API', 'Private API'],
    correct: 1,
    explanation: 'HTTP API is ~70% cheaper than REST API, simpler, and faster. REST API has more features (caching, request validation, usage plans).'
  },
  {
    question: 'What HTTP status code is returned when API Gateway throttles requests?',
    options: ['400', '403', '429', '503'],
    correct: 2,
    explanation: '429 Too Many Requests is returned when throttled. Client should retry with exponential backoff.'
  }
];

const awsDynamoDB: Question[] = [
  {
    question: 'What are the two capacity modes in DynamoDB?',
    options: ['Standard and Premium', 'Provisioned and On-Demand', 'Reserved and Spot', 'Basic and Advanced'],
    correct: 1,
    explanation: 'Provisioned (set RCU/WCU) and On-Demand (pay per request) are the two capacity modes.'
  },
  {
    question: 'What is the maximum item size in DynamoDB?',
    options: ['64 KB', '256 KB', '400 KB', '1 MB'],
    correct: 2,
    explanation: 'Maximum item size is 400 KB per item.'
  },
  {
    question: "What's the difference between Query and Scan?",
    options: ['No difference', 'Query uses partition key efficiently; Scan reads entire table', 'Scan is faster', "Query doesn't use indexes"],
    correct: 1,
    explanation: 'Query efficiently uses partition key (and optionally sort key). Scan reads entire table and is expensive - avoid in production.'
  },
  {
    question: 'When can a Local Secondary Index (LSI) be created?',
    options: ['Anytime', 'Only at table creation', 'Only after table has data', 'Only when table is empty'],
    correct: 1,
    explanation: 'LSI must be created at table creation. GSI can be added anytime. LSI shares table throughput; GSI has separate throughput.'
  },
  {
    question: 'What is DAX (DynamoDB Accelerator)?',
    options: ['Backup service', 'In-memory cache for DynamoDB', 'Analytics tool', 'Migration service'],
    correct: 1,
    explanation: 'DAX is an in-memory cache providing microsecond latency (vs milliseconds). It\'s a drop-in replacement with the same API.'
  },
  {
    question: 'How many RCU are needed for 1 strongly consistent read per second of a 4 KB item?',
    options: ['0.5', '1', '2', '4'],
    correct: 1,
    explanation: '1 RCU = 1 strongly consistent read/sec for items up to 4 KB. Eventually consistent reads use 0.5 RCU.'
  }
];

const awsS3: Question[] = [
  {
    question: 'What is the maximum object size in S3?',
    options: ['100 GB', '1 TB', '5 TB', 'Unlimited'],
    correct: 2,
    explanation: 'Maximum object size is 5 TB. Use multipart upload for objects > 100 MB (required > 5 GB).'
  },
  {
    question: 'What is S3 Transfer Acceleration?',
    options: ['Faster deletion of objects', 'Uses CloudFront edge locations to speed up uploads', 'Compresses objects automatically', 'Replicates to multiple regions'],
    correct: 1,
    explanation: 'S3 Transfer Acceleration uses CloudFront edge locations to speed up uploads over long distances.'
  },
  {
    question: "What's the difference between S3 Standard-IA and S3 One Zone-IA?",
    options: ['No difference', 'Standard-IA is Multi-AZ; One Zone-IA is single AZ', 'One Zone-IA is more durable', "Standard-IA doesn't support versioning"],
    correct: 1,
    explanation: 'Standard-IA stores data across multiple AZs. One Zone-IA is single AZ, cheaper, but data is lost if AZ fails.'
  },
  {
    question: 'Which S3 encryption type provides audit trail in CloudTrail?',
    options: ['SSE-S3', 'SSE-KMS', 'SSE-C', 'Client-side'],
    correct: 1,
    explanation: 'SSE-KMS provides audit trail because each encryption/decryption is a KMS API call logged in CloudTrail.'
  },
  {
    question: 'What is S3 Object Lock?',
    options: ['Password protection', 'WORM model preventing deletion/modification', 'Access control list', 'Cross-region lock'],
    correct: 1,
    explanation: 'S3 Object Lock implements WORM (Write Once Read Many), preventing object deletion/modification for a retention period.'
  }
];

const awsSQSSNS: Question[] = [
  {
    question: 'What is the default visibility timeout for SQS?',
    options: ['15 seconds', '30 seconds', '60 seconds', '5 minutes'],
    correct: 1,
    explanation: 'Default visibility timeout is 30 seconds. This is the time a message is hidden after being read.'
  },
  {
    question: 'What is the maximum retention period for SQS messages?',
    options: ['1 day', '7 days', '14 days', '30 days'],
    correct: 2,
    explanation: 'Maximum retention is 14 days. Default is 4 days.'
  },
  {
    question: "What's the difference between Standard and FIFO SQS queues?",
    options: ['No difference', 'Standard: unlimited throughput, at-least-once; FIFO: 300 msg/s, exactly-once, strict ordering', 'FIFO has better throughput', 'Standard guarantees ordering'],
    correct: 1,
    explanation: 'Standard has unlimited throughput with best-effort ordering. FIFO guarantees order and exactly-once delivery at 300 msg/s (3000 with batching).'
  },
  {
    question: 'What is the SNS + SQS fan-out pattern?',
    options: ['SNS topic receives from multiple SQS queues', 'SNS topic pushes to multiple SQS queues for parallel processing', 'SQS queues send to SNS', 'SNS replaces SQS'],
    correct: 1,
    explanation: 'Fan-out: SNS topic pushes to multiple SQS queues. Enables parallel processing with different consumption rates.'
  },
  {
    question: 'What is a Dead Letter Queue (DLQ)?',
    options: ['Queue for deleted messages', 'Queue for messages that failed processing after max retries', 'Backup queue', 'Priority queue'],
    correct: 1,
    explanation: 'DLQ stores messages that failed processing after maxReceiveCount attempts. Helps debug failures.'
  }
];

const awsCICD: Question[] = [
  {
    question: 'What is the buildspec.yml file?',
    options: ['CodeDeploy configuration', 'CodeBuild configuration defining build phases and artifacts', 'CodePipeline configuration', 'CloudFormation template'],
    correct: 1,
    explanation: 'buildspec.yml is CodeBuild configuration. It defines build phases (install, pre_build, build, post_build) and artifacts.'
  },
  {
    question: 'What is the appspec.yml file used for?',
    options: ['CodeBuild', 'CodeDeploy lifecycle hooks and file mappings', 'CodePipeline', 'CodeCommit'],
    correct: 1,
    explanation: 'appspec.yml is CodeDeploy configuration. It defines deployment lifecycle hooks and file mappings.'
  },
  {
    question: 'What deployment types does CodeDeploy support for Lambda?',
    options: ['In-place and Blue/Green', 'AllAtOnce, Canary, Linear', 'Rolling only', 'Immutable only'],
    correct: 1,
    explanation: 'Lambda deployments: AllAtOnce (immediate), Canary (x% then 100%), Linear (x% every n minutes).'
  },
  {
    question: 'What deployment types does CodeDeploy support for EC2?',
    options: ['AllAtOnce only', 'In-place and Blue/Green', 'Canary and Linear', 'Rolling only'],
    correct: 1,
    explanation: 'EC2/On-premises: In-place (rolling update) and Blue/Green (traffic shift to new instances via ASG swap).'
  }
];

const awsCloudFormation: Question[] = [
  {
    question: 'What is the intrinsic function to reference another resource in CloudFormation?',
    options: ['!GetAtt', '!Ref', '!Sub', '!Import'],
    correct: 1,
    explanation: '!Ref (or Ref:) returns the physical ID of the resource or parameter value.'
  },
  {
    question: 'What does !GetAtt do in CloudFormation?',
    options: ['References a parameter', 'Gets an attribute from a resource', 'Imports from another stack', 'Joins strings'],
    correct: 1,
    explanation: '!GetAtt gets an attribute from a resource, e.g., !GetAtt MyBucket.Arn returns the bucket\'s ARN.'
  },
  {
    question: 'What is AWS SAM?',
    options: ['Security management service', 'Simplified CloudFormation for serverless', 'Server application model', 'Storage access management'],
    correct: 1,
    explanation: 'SAM = Serverless Application Model. It\'s simplified CloudFormation for Lambda, API Gateway, DynamoDB.'
  },
  {
    question: 'What command packages and deploys a SAM application?',
    options: ['sam create && sam run', 'sam build && sam deploy', 'sam package && sam install', 'sam init && sam start'],
    correct: 1,
    explanation: 'sam build compiles/packages, then sam deploy (or sam deploy --guided for interactive) deploys to AWS.'
  }
];

const awsCloudWatch: Question[] = [
  {
    question: 'What is the minimum resolution for CloudWatch custom metrics?',
    options: ['1 second', '10 seconds', '30 seconds', '1 minute'],
    correct: 0,
    explanation: 'High-resolution metrics support 1 second resolution. Standard resolution is 1 minute.'
  },
  {
    question: 'How long are CloudWatch Logs retained by default?',
    options: ['7 days', '30 days', '90 days', 'Forever'],
    correct: 3,
    explanation: 'CloudWatch Logs never expire by default. You must configure a retention policy (1 day to 10 years) to auto-delete.'
  },
  {
    question: 'Which EC2 metric is NOT included by default and requires CloudWatch Agent?',
    options: ['CPU Utilization', 'Network In/Out', 'Memory Utilization', 'Disk Read/Write Operations'],
    correct: 2,
    explanation: 'Memory and disk space usage require CloudWatch Agent. Default metrics include CPU, network, and disk operations.'
  }
];

const awsXRay: Question[] = [
  {
    question: 'What is X-Ray used for?',
    options: ['Log aggregation', 'Distributed tracing and performance analysis', 'Security scanning', 'Cost optimization'],
    correct: 1,
    explanation: 'X-Ray provides distributed tracing to visualize requests through your application and debug latency issues.'
  },
  {
    question: 'What are X-Ray annotations vs metadata?',
    options: ['No difference', 'Annotations are indexed/searchable; metadata is not', 'Metadata is searchable; annotations are not', 'Annotations are for errors only'],
    correct: 1,
    explanation: 'Annotations are indexed key-value pairs that are searchable. Metadata is non-indexed additional data.'
  }
];

const awsCognito: Question[] = [
  {
    question: "What's the difference between Cognito User Pools and Identity Pools?",
    options: ['No difference', 'User Pools: authentication (JWT tokens); Identity Pools: authorization (AWS credentials)', 'Identity Pools: authentication; User Pools: authorization', 'User Pools for mobile only'],
    correct: 1,
    explanation: 'User Pools handle authentication (sign-up, sign-in, JWT tokens). Identity Pools handle authorization (exchange tokens for temporary AWS credentials).'
  },
  {
    question: 'How do you authenticate API Gateway with Cognito?',
    options: ['IAM roles', 'Cognito User Pool Authorizer', 'API keys', 'Lambda authorizer only'],
    correct: 1,
    explanation: 'Use Cognito User Pool Authorizer to validate JWT tokens from User Pool. API Gateway also supports Lambda and IAM authorizers.'
  }
];

const awsKMS: Question[] = [
  {
    question: 'What are the two types of KMS keys?',
    options: ['Public and Private', 'AWS managed and Customer managed', 'Symmetric and Asymmetric', 'Standard and Premium'],
    correct: 1,
    explanation: 'AWS managed keys (aws/service-name, free, auto-rotation) and Customer managed keys (you control rotation, policies, cost per key).'
  },
  {
    question: 'What is envelope encryption?',
    options: ['Encrypting email attachments', 'Data encrypted with data key, data key encrypted with KMS key', 'Double encryption with two KMS keys', 'Encryption at rest and in transit'],
    correct: 1,
    explanation: 'Envelope encryption: Data is encrypted with a Data Encryption Key (DEK), and the DEK is encrypted with a KMS key. Used for data > 4 KB.'
  },
  {
    question: 'What does the GenerateDataKey API return?',
    options: ['Only encrypted data key', 'Plaintext data key and encrypted copy', 'KMS key ID', 'Random bytes'],
    correct: 1,
    explanation: 'GenerateDataKey returns both plaintext DEK and encrypted DEK. Use plaintext to encrypt data, store encrypted key with data.'
  }
];

const awsEventBridge: Question[] = [
  {
    question: 'What is EventBridge (formerly CloudWatch Events)?',
    options: ['Log aggregation service', 'Serverless event bus routing events to targets', 'Message queue', 'Notification service'],
    correct: 1,
    explanation: 'EventBridge is a serverless event bus. Route events from AWS services, SaaS apps, custom apps to targets (Lambda, SQS, etc.).'
  },
  {
    question: 'What are the two types of EventBridge rules?',
    options: ['Standard and FIFO', 'Event Pattern and Schedule', 'Push and Pull', 'Sync and Async'],
    correct: 1,
    explanation: 'Event Pattern rules match events by pattern (source, detail-type, etc.). Schedule rules use cron or rate expressions.'
  }
];

const awsStepFunctions: Question[] = [
  {
    question: 'What is the maximum duration for Standard Step Functions?',
    options: ['5 minutes', '15 minutes', '1 hour', '1 year'],
    correct: 3,
    explanation: 'Standard workflows can run up to 1 year. Express workflows are limited to 5 minutes but handle high-volume events.'
  },
  {
    question: 'Which Step Functions state type allows branching based on conditions?',
    options: ['Task', 'Choice', 'Parallel', 'Map'],
    correct: 1,
    explanation: 'Choice state enables branching based on conditions. Task executes work, Parallel runs branches simultaneously, Map iterates over arrays.'
  }
];

const awsKinesis: Question[] = [
  {
    question: "What's the difference between Kinesis Data Streams and Firehose?",
    options: ['No difference', 'Streams: real-time, provision shards; Firehose: near real-time, auto-scaling', 'Firehose is faster', "Streams doesn't retain data"],
    correct: 1,
    explanation: 'Data Streams: ~200ms latency, provision shards, custom consumers, 1-365 day retention. Firehose: 60-900s buffer, auto-scales, built-in destinations.'
  },
  {
    question: 'What is the write capacity per Kinesis shard?',
    options: ['500 KB/s', '1 MB/s', '2 MB/s', '5 MB/s'],
    correct: 1,
    explanation: 'Each shard supports 1 MB/s (or 1,000 records/s) write and 2 MB/s read.'
  }
];

const awsContainers: Question[] = [
  {
    question: "What's the difference between ECS EC2 and Fargate launch types?",
    options: ['No difference', 'EC2: you manage instances; Fargate: serverless', 'Fargate is cheaper', "EC2 doesn't support Docker"],
    correct: 1,
    explanation: 'EC2 launch type: you manage EC2 instances. Fargate: serverless, AWS manages infrastructure, pay per vCPU + memory.'
  },
  {
    question: "What's the difference between ECS Task Role and Task Execution Role?",
    options: ['No difference', 'Task Role: app permissions; Execution Role: ECS agent permissions', 'Execution Role: app permissions; Task Role: ECS agent permissions', 'Task Role is for EC2 only'],
    correct: 1,
    explanation: 'Task Role = what the container application can do (S3, DynamoDB access). Execution Role = what ECS agent can do (pull images, send logs).'
  }
];

const awsElastiCache: Question[] = [
  {
    question: "What's the difference between Redis and Memcached in ElastiCache?",
    options: ['No difference', 'Redis: Multi-AZ, persistence, complex data; Memcached: simple, multi-threaded', 'Memcached supports replication', "Redis doesn't support clustering"],
    correct: 1,
    explanation: 'Redis: Multi-AZ, auto failover, replication, persistence, complex data structures. Memcached: simple key-value, multi-threaded, horizontal scaling.'
  },
  {
    question: 'What is Lazy Loading (Cache-Aside) pattern?',
    options: ['Write to cache on every DB write', 'Check cache first, fetch from DB on miss, store in cache', 'Pre-load all data into cache', 'Write to cache only'],
    correct: 1,
    explanation: 'Lazy Loading: App checks cache → on miss, fetches from DB → stores in cache → returns. Only requested data is cached.'
  },
  {
    question: 'What is the main drawback of Lazy Loading?',
    options: ['Cache is always stale', 'Cache miss requires 3 network calls', 'Cannot handle large data', 'Requires more memory'],
    correct: 1,
    explanation: 'Cache miss = 3 network calls (check cache, query DB, write to cache). Also, data can become stale without TTL.'
  }
];

const awsBeanstalk: Question[] = [
  {
    question: 'Which Elastic Beanstalk deployment policy has zero downtime and creates a new ASG?',
    options: ['All at once', 'Rolling', 'Rolling with additional batch', 'Immutable'],
    correct: 3,
    explanation: 'Immutable: creates new ASG with new instances, swaps when healthy. No downtime, easy rollback. Blue/Green uses separate environments.'
  },
  {
    question: 'What file extension is used for Elastic Beanstalk configuration?',
    options: ['.yml', '.json', '.config', '.xml'],
    correct: 2,
    explanation: '.ebextensions/*.config files customize environment with option_settings, packages, container_commands, etc.'
  }
];

export const awsCategories: QuizCategory[] = [
  { id: 'all', label: 'All Topics', questions: [] },
  { id: 'infrastructure', label: 'Infrastructure', questions: awsInfrastructure },
  { id: 'iam', label: 'IAM', questions: awsIAM },
  { id: 'ec2', label: 'EC2', questions: awsEC2 },
  { id: 'storage', label: 'Storage', questions: awsStorage },
  { id: 'ami', label: 'AMI', questions: awsAMI },
  { id: 'elb-asg', label: 'ELB & ASG', questions: awsELBASG },
  { id: 'rds', label: 'RDS & Aurora', questions: awsRDS },
  { id: 'lambda', label: 'Lambda', questions: awsLambda },
  { id: 'api-gateway', label: 'API Gateway', questions: awsAPIGateway },
  { id: 'dynamodb', label: 'DynamoDB', questions: awsDynamoDB },
  { id: 's3', label: 'S3', questions: awsS3 },
  { id: 'sqs-sns', label: 'SQS & SNS', questions: awsSQSSNS },
  { id: 'cicd', label: 'CI/CD', questions: awsCICD },
  { id: 'cloudformation', label: 'CloudFormation & SAM', questions: awsCloudFormation },
  { id: 'cloudwatch', label: 'CloudWatch', questions: awsCloudWatch },
  { id: 'xray', label: 'X-Ray', questions: awsXRay },
  { id: 'cognito', label: 'Cognito', questions: awsCognito },
  { id: 'kms', label: 'KMS', questions: awsKMS },
  { id: 'eventbridge', label: 'EventBridge', questions: awsEventBridge },
  { id: 'step-functions', label: 'Step Functions', questions: awsStepFunctions },
  { id: 'kinesis', label: 'Kinesis', questions: awsKinesis },
  { id: 'containers', label: 'Containers', questions: awsContainers },
  { id: 'elasticache', label: 'ElastiCache', questions: awsElastiCache },
  { id: 'beanstalk', label: 'Elastic Beanstalk', questions: awsBeanstalk },
];

export const quizzes: QuizDefinition[] = [
  {
    id: 'frontend',
    title: 'Frontend Interview',
    description: 'JavaScript, TypeScript, React & Node.js',
    categories: categories,
  },
  {
    id: 'aws-dva',
    title: 'AWS DVA-C02',
    description: 'AWS Developer Associate Certification',
    categories: awsCategories,
  },
];

export function getQuizById(quizId: string): QuizDefinition | undefined {
  return quizzes.find(q => q.id === quizId);
}

export function getAllQuestionsForQuiz(quizId: string): Question[] {
  const quiz = getQuizById(quizId);
  if (!quiz) return [];
  return quiz.categories.slice(1).flatMap(c => c.questions);
}

export function getAllQuestions(): Question[] {
  return categories.slice(1).flatMap(c => c.questions);
}

export function getQuestionsByCategory(quizId: string, categoryId: string): Question[] {
  const quiz = getQuizById(quizId);
  if (!quiz) return [];
  if (categoryId === 'all') return getAllQuestionsForQuiz(quizId);
  const category = quiz.categories.find(c => c.id === categoryId);
  return category?.questions || [];
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
