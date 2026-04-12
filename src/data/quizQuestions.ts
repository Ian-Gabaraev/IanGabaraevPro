export interface Question {
  question: string;
  code?: string;
  options?: string[];
  correct?: number;
  type?: "choice" | "code-input";
  answer?: string;
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
    options: ['"null"', '"undefined"', '"object"', "null"],
    correct: 2,
    explanation:
      'This is a historical bug in JavaScript. typeof null returns "object" even though null is a primitive. This was never fixed for backward compatibility.',
  },
  {
    question: "What does this code output?",
    code: `console.log(typeof [])`,
    options: ['"array"', '"object"', '"Array"', '"undefined"'],
    correct: 1,
    explanation:
      'Arrays are objects in JavaScript. typeof [] returns "object". Use Array.isArray([]) to check for arrays.',
  },
  {
    question: "What does this code output?",
    code: `console.log([] + [])`,
    options: ["[]", "0", '""', "undefined"],
    correct: 2,
    explanation:
      'The + operator converts arrays to primitives via .toString(). Empty arrays become empty strings, so "" + "" equals "".',
  },
  {
    question: "What does this code output?",
    code: `console.log("A")\nsetTimeout(() => console.log("B"), 0)\nconsole.log("C")`,
    options: ["A B C", "A C B", "B A C", "C A B"],
    correct: 1,
    explanation:
      "setTimeout callbacks go into the event loop and execute after the current call stack is empty, even with 0ms delay. So: A, C (sync), then B (async).",
  },
  {
    question: "What does this code output?",
    code: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0)\n}`,
    options: ["0 1 2", "3 3 3", "0 0 0", "undefined undefined undefined"],
    correct: 1,
    explanation:
      "var is function-scoped, not block-scoped. When the callbacks run, the loop has finished and i equals 3. Use let instead to fix this.",
  },
  {
    question: "What does this code output?",
    code: `const nums = [1, 2, 3]\nconst result = nums.map(n => { n * 2 })\nconsole.log(result)`,
    options: ["[2, 4, 6]", "[undefined, undefined, undefined]", "[]", "Error"],
    correct: 1,
    explanation:
      "Arrow functions with {} need an explicit return statement. Without return, the function returns undefined. Use n => n * 2 or n => { return n * 2 }.",
  },
  {
    question: "What does this code output?",
    code: `const a = { x: 1 }\nconst b = { x: 1 }\nconsole.log(a === b)`,
    options: ["true", "false", "undefined", "Error"],
    correct: 1,
    explanation:
      "=== compares by reference for objects, not by value. a and b are different objects in memory, so they're not equal.",
  },
  {
    question: "What does this code output?",
    code: `console.log(0.1 + 0.2 === 0.3)`,
    options: ["true", "false", "0.3", "Error"],
    correct: 1,
    explanation:
      "Floating point arithmetic in JavaScript (and most languages) has precision issues. 0.1 + 0.2 equals 0.30000000000000004, not exactly 0.3.",
  },
  {
    question: "What does this code output?",
    code: `console.log([] == ![])`,
    options: ["true", "false", "Error", "undefined"],
    correct: 0,
    explanation:
      "![] is false (arrays are truthy, negated = false). [] == false coerces: [] → '' → 0, false → 0. 0 == 0 is true. Wild type coercion!",
  },
  {
    question: "What does this code output?",
    code: `console.log('5' - 3)`,
    options: ["'53'", "2", "NaN", "Error"],
    correct: 1,
    explanation:
      "The - operator only works with numbers, so '5' is coerced to 5. 5 - 3 = 2. But + would concatenate: '5' + 3 = '53'.",
  },
  {
    question: "What does this code output?",
    code: `const arr = [1, 2, 3]\narr[10] = 11\nconsole.log(arr.length)`,
    options: ["4", "11", "10", "Error"],
    correct: 1,
    explanation:
      "Setting arr[10] creates a sparse array with empty slots. The length becomes 11 (indices 0-10). Slots 3-9 are empty (not undefined).",
  },
  {
    question: "What does this code output?",
    code: `console.log(typeof NaN)`,
    options: ['"NaN"', '"undefined"', '"number"', '"object"'],
    correct: 2,
    explanation:
      "NaN (Not a Number) is paradoxically of type 'number'. Use Number.isNaN() to check for NaN, not typeof.",
  },
  {
    question: "What does this code output?",
    code: `console.log(NaN === NaN)`,
    options: ["true", "false", "NaN", "Error"],
    correct: 1,
    explanation:
      "NaN is the only value in JavaScript that is not equal to itself. Use Number.isNaN(x) instead of x === NaN.",
  },
  {
    question: "What does this code output?",
    code: `let x = 1\nlet y = x++\nconsole.log(x, y)`,
    options: ["1 1", "2 1", "2 2", "1 2"],
    correct: 1,
    explanation:
      "x++ returns the original value THEN increments. So y gets 1, then x becomes 2. Use ++x for pre-increment.",
  },
  {
    question: "What does this code output?",
    code: `console.log("b" + "a" + +"a" + "a")`,
    options: ['"baaa"', '"baNaNa"', '"ba1a"', "Error"],
    correct: 1,
    explanation:
      "+\"a\" tries to convert 'a' to a number, resulting in NaN. So: 'b' + 'a' + NaN + 'a' = 'baNaNa'.",
  },
  {
    question: "What does this code output?",
    code: `const nums = [10, 5, 40, 25, 100]\nconsole.log(nums.sort())`,
    options: [
      "[5, 10, 25, 40, 100]",
      "[10, 100, 25, 40, 5]",
      "[100, 40, 25, 10, 5]",
      "Error",
    ],
    correct: 1,
    explanation:
      "sort() converts elements to strings and sorts lexicographically. '10' < '5' because '1' < '5'. Always use sort((a, b) => a - b) for numbers.",
  },
  {
    question: "What does this code output?",
    code: `const user = { name: "Ian" }\nuser.name = "John"\nconsole.log(user.name)`,
    options: ['"Ian"', '"John"', "Error - const is immutable", "undefined"],
    correct: 1,
    explanation:
      "const prevents reassignment, not mutation. You can change object properties. user = {} would throw an error, but user.name = 'John' is fine.",
  },
  {
    question: "What does this code output?",
    code: `console.log(x)\nlet x = 5`,
    options: ["undefined", "5", "ReferenceError", "null"],
    correct: 2,
    explanation:
      "let and const have a Temporal Dead Zone. They're hoisted but not initialized, so accessing before declaration throws ReferenceError.",
  },
  {
    question: "What does this code output?",
    code: `sayHi()\nvar sayHi = function() {\n  console.log("Hi")\n}`,
    options: ['"Hi"', "undefined", "TypeError", "ReferenceError"],
    correct: 2,
    explanation:
      "Function expressions are hoisted as undefined. Calling undefined() throws TypeError. Function declarations would work (fully hoisted).",
  },
  {
    question: "What does this code output?",
    code: `const obj = { a: 1 }\nconsole.log(delete obj.a)\nconsole.log(obj.a)`,
    options: ["true, undefined", "false, 1", "true, 1", "undefined, undefined"],
    correct: 0,
    explanation:
      "delete removes object properties and returns true. After deletion, accessing obj.a returns undefined.",
  },
  {
    question: "What does this code output?",
    code: `const array = [5, 1, 8, 2, 0, 10]\nconst sorted = array.slice().sort((a, b) => a - b)\nconsole.log(sorted)\nconsole.log(array)`,
    options: [
      "[0,1,2,5,8,10] and [0,1,2,5,8,10]",
      "[0,1,2,5,8,10] and [5,1,8,2,0,10]",
      "[5,1,8,2,0,10] and [0,1,2,5,8,10]",
      "Error — slice is not a function",
    ],
    correct: 1,
    explanation:
      ".slice() with no arguments creates a shallow copy of the array. sort() then mutates the copy, not the original. This is a common pattern to sort without modifying the source array. Modern alternative: array.toSorted((a, b) => a - b).",
  },
  {
    question: "What does this code output?",
    code: `const scores = [10, 5, 20, 1]\nconst top = scores.sort((a, b) => b - a)[0]\nconsole.log(top)\nconsole.log(scores)`,
    options: [
      "20 and [10, 5, 20, 1]",
      "20 and [20, 10, 5, 1]",
      "10 and [10, 5, 20, 1]",
      "1 and [1, 5, 10, 20]",
    ],
    correct: 1,
    explanation:
      "sort() mutates the original array in place and returns it. Grabbing [0] gets the max, but scores is now permanently sorted descending. This is a sneaky side effect — use Math.max(...scores) or scores.toSorted() to avoid it.",
  },
];

const jsConcepts: Question[] = [
  {
    question: "What is a closure in JavaScript?",
    options: [
      "A function that closes the browser",
      "A function that remembers variables from its outer scope",
      "A function without parameters",
      "A function that cannot be called twice",
    ],
    correct: 1,
    explanation:
      "A closure is a function that retains access to variables from its surrounding (lexical) scope, even after the outer function has returned.",
  },
  {
    question: "What does this code output?",
    code: `function outer() {\n  let count = 0\n  return function() {\n    count++\n    return count\n  }\n}\nconst fn = outer()\nconsole.log(fn(), fn(), fn())`,
    options: ["1 1 1", "1 2 3", "0 1 2", "undefined"],
    correct: 1,
    explanation:
      "This is a closure. The inner function remembers the count variable from outer(). Each call increments and returns the same count.",
  },
  {
    question: "What runs first: microtasks or macrotasks?",
    options: [
      "Macrotasks",
      "Microtasks",
      "They run simultaneously",
      "Random order",
    ],
    correct: 1,
    explanation:
      "Microtasks (Promises) run before macrotasks (setTimeout) after the current call stack is empty. This is why Promise.then() executes before setTimeout(..., 0).",
  },
  {
    question: "What does call() do?",
    options: [
      "Creates a new function",
      "Invokes a function with a specific 'this' value",
      "Delays function execution",
      "Copies a function",
    ],
    correct: 1,
    explanation:
      "call() invokes a function immediately with a specified 'this' value and individual arguments. Similar to apply() which takes an array of arguments.",
  },
  {
    question: "What is the difference between == and ===?",
    options: [
      "No difference",
      "=== is faster",
      "== coerces types, === doesn't",
      "=== only works with numbers",
    ],
    correct: 2,
    explanation:
      '== (loose equality) coerces types before comparing (5 == "5" is true). === (strict equality) compares both value AND type without coercion.',
  },
  {
    question: "What does this code output?",
    code: `const user = { name: "Ian", skills: ["JS"] }\nconst copy = { ...user }\ncopy.skills.push("React")\nconsole.log(user.skills)`,
    options: ['["JS"]', '["JS", "React"]', "undefined", "Error"],
    correct: 1,
    explanation:
      "Spread creates a shallow copy. Nested arrays/objects are still references. Modifying copy.skills affects user.skills because they point to the same array.",
  },
  {
    question: "What does Array.prototype.reduce() do?",
    options: [
      "Removes elements from an array",
      "Reduces array to a single value via accumulator",
      "Makes the array smaller",
      "Sorts the array",
    ],
    correct: 1,
    explanation:
      "reduce() iterates through array elements, accumulating a single result. Takes (accumulator, currentValue) => newAccumulator and an initial value.",
  },
  {
    question: "What does this code output?",
    code: `[1, 2, 3].reduce((acc, n) => acc + n, 0)`,
    options: ["[1, 2, 3]", "6", "0", "123"],
    correct: 1,
    explanation:
      "reduce starts with 0 (initial value), then: 0+1=1, 1+2=3, 3+3=6. It accumulates all values into a single sum.",
  },
  {
    question: "What does this code output?",
    code: `const arr = [1, 2, 3]\narr.forEach(n => n * 2)\nconsole.log(arr)`,
    options: ["[2, 4, 6]", "[1, 2, 3]", "undefined", "[]"],
    correct: 1,
    explanation:
      "forEach doesn't modify the original array or return anything. It just executes a function for each element. Use map() to create a new transformed array.",
  },
  {
    question: "What is the difference between map() and forEach()?",
    options: [
      "No difference",
      "map returns a new array, forEach returns undefined",
      "forEach is faster",
      "map only works with numbers",
    ],
    correct: 1,
    explanation:
      "map() returns a new array with transformed elements. forEach() returns undefined and is used for side effects only. Use map when you need the result.",
  },
  {
    question: "What does Promise.all() do?",
    options: [
      "Runs promises one by one",
      "Waits for all promises, fails if any fails",
      "Returns the first promise to resolve",
      "Ignores rejected promises",
    ],
    correct: 1,
    explanation:
      "Promise.all() waits for all promises to resolve and returns an array of results. If ANY promise rejects, the whole Promise.all() rejects immediately.",
  },
  {
    question: "What does this code output?",
    code: `Promise.resolve(1)\n  .then(x => x + 1)\n  .then(x => x * 2)\n  .then(console.log)`,
    options: ["1", "2", "4", "undefined"],
    correct: 2,
    explanation:
      "Promise chain: 1 → 1+1=2 → 2*2=4 → console.log(4). Each .then() transforms the value and passes it to the next.",
  },
  {
    question: "What does Object.keys() return?",
    code: `Object.keys({ a: 1, b: 2, c: 3 })`,
    options: ["[1, 2, 3]", '["a", "b", "c"]', "{ a: 1, b: 2, c: 3 }", "3"],
    correct: 1,
    explanation:
      "Object.keys() returns an array of the object's own enumerable property names (keys), not values. Use Object.values() for values.",
  },
  {
    question: "What is event delegation?",
    options: [
      "Passing events between components",
      "Attaching one handler to a parent instead of many to children",
      "Creating custom events",
      "Stopping event propagation",
    ],
    correct: 1,
    explanation:
      "Event delegation attaches a single event listener to a parent element to handle events from its children. Uses event bubbling. More efficient for many elements.",
  },
  {
    question: "What does this code output?",
    code: `const fn = () => arguments\nfn(1, 2, 3)`,
    options: ["[1, 2, 3]", "Arguments object", "Error", "undefined"],
    correct: 2,
    explanation:
      "Arrow functions don't have their own 'arguments' object. They inherit from enclosing scope. Use rest parameters (...args) instead.",
  },
];

const typescript: Question[] = [
  {
    question: "What does Partial<T> do in TypeScript?",
    options: [
      "Makes all properties required",
      "Makes all properties optional",
      "Removes all properties",
      "Duplicates all properties",
    ],
    correct: 1,
    explanation:
      "Partial<T> creates a type with all properties of T set to optional. Useful for update functions where you only modify some fields.",
  },
  {
    question: "What is the difference between 'type' and 'interface'?",
    options: [
      "No difference",
      "type supports unions, interface supports declaration merging",
      "interface is faster",
      "type can only be used for primitives",
    ],
    correct: 1,
    explanation:
      "Types support union types (A | B). Interfaces support declaration merging (multiple declarations combine). Both can describe object shapes.",
  },
  {
    question: "What does this do?",
    code: `type Status = "loading" | "success" | "error"`,
    options: [
      "Creates an array type",
      "Creates a union/literal type",
      "Creates an enum",
      "Creates a class",
    ],
    correct: 1,
    explanation:
      "This creates a union of string literal types. A variable of type Status can only be one of these three specific strings.",
  },
  {
    question: 'What does Omit<User, "email"> do?',
    options: [
      "Adds email to User",
      "Creates User type without the email property",
      "Makes email required",
      "Makes email optional",
    ],
    correct: 1,
    explanation:
      'Omit<Type, Keys> creates a new type by excluding specified properties. Omit<User, "email"> returns User without the email field.',
  },
  {
    question: "What does 'as const' do?",
    code: `const colors = ["red", "green"] as const`,
    options: [
      "Makes the array mutable",
      "Makes values deeply readonly with literal types",
      "Converts to a Set",
      "Nothing, it's invalid syntax",
    ],
    correct: 1,
    explanation:
      '\'as const\' makes values deeply readonly and infers literal types. The array becomes readonly ["red", "green"] instead of string[].',
  },
  {
    question: "What is a type guard?",
    options: [
      "A function that protects types from being changed",
      "A function that narrows types at runtime",
      "A type that guards against null",
      "An interface for security",
    ],
    correct: 1,
    explanation:
      "Type guards are functions that narrow types at runtime. They use type predicates (value is Type) to help TypeScript understand the type after the check.",
  },
  {
    question: "What does Required<T> do?",
    options: [
      "Makes all properties optional",
      "Makes all properties required",
      "Removes null from types",
      "Adds validation",
    ],
    correct: 1,
    explanation:
      "Required<T> is the opposite of Partial<T>. It makes all properties required, removing optional modifiers (?).",
  },
  {
    question: "What does Pick<User, 'name' | 'email'> do?",
    options: [
      "Removes name and email from User",
      "Creates a type with only name and email from User",
      "Makes name and email optional",
      "Validates name and email",
    ],
    correct: 1,
    explanation:
      "Pick<Type, Keys> creates a new type by selecting only the specified properties. It's the opposite of Omit.",
  },
  {
    question: "What type does this infer?",
    code: `const name = "Ian"  // type is:`,
    options: ["string", '"Ian"', "any", "unknown"],
    correct: 1,
    explanation:
      'With const, TypeScript infers the literal type "Ian", not string. This is because const values can\'t change, so TypeScript uses the narrowest type.',
  },
  {
    question: "What does Record<string, number> create?",
    options: [
      "An array of strings and numbers",
      "An object with string keys and number values",
      "A class",
      "A tuple",
    ],
    correct: 1,
    explanation:
      "Record<K, V> creates an object type with keys of type K and values of type V. Record<string, number> is { [key: string]: number }.",
  },
  {
    question: "What does the 'unknown' type do?",
    options: [
      "Same as 'any'",
      "Allows any type but requires type checking before use",
      "Represents undefined",
      "Marks unused variables",
    ],
    correct: 1,
    explanation:
      "unknown is the type-safe counterpart of any. You can assign anything to it, but must narrow/check its type before using it.",
  },
  {
    question: "What does the '!' operator do in TypeScript?",
    code: `const el = document.getElementById("app")!`,
    options: [
      "Negates the value",
      "Asserts the value is not null/undefined",
      "Makes the value optional",
      "Creates a boolean",
    ],
    correct: 1,
    explanation:
      "The non-null assertion operator (!) tells TypeScript you're certain the value isn't null/undefined. Use carefully — it bypasses type safety.",
  },
  {
    question: "What does keyof do?",
    code: `type UserKeys = keyof { name: string, age: number }`,
    options: ['"name, age"', "string", '"name" | "age"', "string[]"],
    correct: 2,
    explanation:
      'keyof creates a union type of all property names. keyof { name: string, age: number } gives "name" | "age".',
  },
];

const react: Question[] = [
  {
    question: "What is the Virtual DOM?",
    options: [
      "A copy of the real DOM in memory for efficient updates",
      "A new browser API",
      "A database for React",
      "A testing library",
    ],
    correct: 0,
    explanation:
      "The Virtual DOM is a lightweight copy of the real DOM. React diffs the new virtual DOM with the previous one and only updates changed elements in the real DOM.",
  },
  {
    question: "When does useEffect with an empty dependency array run?",
    options: [
      "On every render",
      "Only on mount (once)",
      "Never",
      "Only on unmount",
    ],
    correct: 1,
    explanation:
      "useEffect(() => {}, []) runs only once when the component mounts. It's similar to componentDidMount in class components.",
  },
  {
    question:
      "How many times will cacheLocation execute on a single page load, and what will it cache the first few times?",
    code: `export function useGetLocation({ longitude, latitude }: GeoLocation): EssentialLocation {\nconst [country, setCountry] = useState("");\nconst [city, setCity] = useState("");\nconst [district, setDistrict] = useState("");\nconst [countryCode, setCountryCode] = useState("");\n\nuseEffect(() => {\n// ... fetches location data from API or cache\n// ... calls setCountry(), setCity(), setDistrict(), setCountryCode()\n\n}, [latitude, longitude]);\ncacheLocation({ city, country, district, countryCode });\n\nreturn { city, country, district, countryCode };\n}`,
    options: [
      "Once, with the resolved location data.",
      "Twice — once with empty strings, once with the real data.",
      "Many times — first with empty strings, then again with real data — once for every re-render of the component caused by any state change in any hook.",
      "It won't execute at all because it's outside the useEffect.",
    ],
    correct: 2,
    explanation:
      "cacheLocation is in the render body of the hook, not inside useEffect. The render body runs on every render, not just once. Every setState call — from this hook or any sibling hook in the same component — triggers a re-render, and each re-render executes cacheLocation again.",
  },
  {
    question: "What causes a React component to re-render?",
    options: [
      "Only state changes",
      "Only prop changes",
      "State change, prop change, or parent re-render",
      "Only context changes",
    ],
    correct: 2,
    explanation:
      "Components re-render when: their state changes, their props change, their parent re-renders, or a context they consume changes.",
  },
  {
    question: "What's wrong with using array index as a key?",
    options: [
      "It's slower",
      "It can cause bugs when items are reordered/removed",
      "React doesn't allow it",
      "Nothing, it's fine",
    ],
    correct: 1,
    explanation:
      "Using index as key can cause bugs when items are reordered, added, or removed. React may reuse wrong component instances, causing state to get mixed up.",
  },
  {
    question: "What's the difference between useRef and useState?",
    options: [
      "No difference",
      "useRef doesn't cause re-renders when changed",
      "useState is faster",
      "useRef can only store DOM elements",
    ],
    correct: 1,
    explanation:
      "useRef creates a mutable reference that persists across renders WITHOUT causing re-renders. useState triggers a re-render whenever the state changes.",
  },
  {
    question: "What is prop drilling?",
    options: [
      "A React performance optimization",
      "Passing props through many component levels",
      "A way to create components",
      "A testing technique",
    ],
    correct: 1,
    explanation:
      "Prop drilling is passing props through multiple intermediate components just to reach a deeply nested component. Solutions include Context API or state management libraries.",
  },
  {
    question: "What does React.memo do?",
    options: [
      "Memoizes expensive calculations",
      "Prevents re-renders if props haven't changed",
      "Creates a memo pad component",
      "Stores data in memory",
    ],
    correct: 1,
    explanation:
      "React.memo is a HOC that prevents re-renders if props haven't changed (shallow comparison). It's for performance optimization of expensive components.",
  },
  {
    question: "What's a controlled component?",
    options: [
      "A component with restricted access",
      "A component where React controls form input state",
      "A component that can't have children",
      "A component with no props",
    ],
    correct: 1,
    explanation:
      "In a controlled component, React state is the 'single source of truth' for form inputs. The input value is controlled by state and updated via onChange.",
  },
  {
    question: "What does this code output?",
    code: `const [count, setCount] = useState(0)\n\nfunction handleClick() {\n  setCount(count + 1)\n  setCount(count + 1)\n  setCount(count + 1)\n}\n// After clicking once, count is:`,
    options: ["3", "1", "0", "undefined"],
    correct: 1,
    explanation:
      "All three setCount calls use the same stale 'count' value (0). So it's setCount(0+1) three times, resulting in 1. Use functional updates setCount(c => c + 1) to get 3.",
  },
  {
    question: "How many times does React re-render here?",
    code: `function handleClick() {\n  setA(1)\n  setB(2)\n  setC(3)\n}`,
    options: ["3 times", "1 time (batched)", "0 times", "Depends on values"],
    correct: 1,
    explanation:
      "React batches multiple setState calls into a single re-render for performance. All three updates happen, then one re-render occurs.",
  },
  {
    question: "What's wrong with this code?",
    code: `function Child({ user }) {\n  user.name = 'Modified'\n  return <div>{user.name}</div>\n}`,
    options: [
      "Nothing wrong",
      "Directly mutating props (props are read-only)",
      "Missing return type",
      "Should use useState",
    ],
    correct: 1,
    explanation:
      "Props are immutable! Never mutate props directly. This can cause bugs and unexpected behavior. Instead, lift state up or use callbacks to modify data in the parent.",
  },
  {
    question: "When does a child component re-render?",
    options: [
      "Only when its own state changes",
      "Only when its props change",
      "When parent re-renders, props change, or its state changes",
      "Never automatically",
    ],
    correct: 2,
    explanation:
      "By default, when a parent re-renders, ALL its children re-render too (even if props didn't change). Use React.memo to prevent this.",
  },
  {
    question: "Why does this cause unnecessary re-renders?",
    code: `<Child style={{ color: 'red' }} />`,
    options: [
      "It doesn't cause issues",
      "Inline object creates new reference every render",
      "Objects can't be passed as props",
      "style prop is reserved",
    ],
    correct: 1,
    explanation:
      "Inline objects create a new reference every render. Even if values are the same, React sees a 'new' prop, triggering child re-render. Use useMemo for stable references.",
  },
  {
    question: "What is 'derived state'?",
    options: [
      "State from a database",
      "Values computed from existing state/props (shouldn't be stored in state)",
      "State shared between components",
      "Initial state values",
    ],
    correct: 1,
    explanation:
      "Derived state is a value that can be calculated from existing state or props. Don't store it in state — calculate it during render to avoid sync issues.",
  },
  {
    question: "What does 'UI = f(state)' mean in React?",
    options: [
      "UI is a function stored in state",
      "The UI is determined by (is a function of) the current state",
      "State should be a function",
      "Functions create UI elements",
    ],
    correct: 1,
    explanation:
      "This is React's core philosophy: your UI is a pure function of your state. When state changes, React automatically re-renders to reflect the new state in the UI.",
  },
  {
    question: "How does data flow in React?",
    options: [
      "Two-way binding (like Angular)",
      "Unidirectional: parent → child via props",
      "Child → parent via props",
      "Random, depends on component",
    ],
    correct: 1,
    explanation:
      "React uses unidirectional data flow. Data flows DOWN via props (parent to child). Events/callbacks flow UP (child notifies parent). This makes data flow predictable.",
  },
  {
    question: "What happens when you call setState?",
    code: `setCount(5)\nconsole.log(count) // What's logged?`,
    options: [
      "5 (new value)",
      "The old value (state updates are async)",
      "undefined",
      "Error",
    ],
    correct: 1,
    explanation:
      "State updates are asynchronous! The new value isn't available immediately after setState. Use useEffect to react to state changes, or functional updates for the next value.",
  },
  {
    question: "Why use functional updates with setState?",
    code: `// Option A: setCount(count + 1)\n// Option B: setCount(c => c + 1)`,
    options: [
      "No difference",
      "Option B guarantees latest state value",
      "Option A is faster",
      "Option B is required",
    ],
    correct: 1,
    explanation:
      "Functional updates (c => c + 1) always use the latest state value. This avoids stale closure issues, especially when multiple updates happen or in event handlers.",
  },
  {
    question: "What's the correct way to update an object in state?",
    code: `const [user, setUser] = useState({ name: 'Ian', age: 30 })`,
    options: [
      "user.name = 'New'; setUser(user)",
      "setUser({ ...user, name: 'New' })",
      "setUser(user.name = 'New')",
      "user = { name: 'New' }",
    ],
    correct: 1,
    explanation:
      "Never mutate state directly! Create a new object with spread: setUser({ ...user, name: 'New' }). React needs a new reference to detect changes and re-render.",
  },
  {
    question: "What does useMemo do?",
    options: [
      "Memoizes a component",
      "Memoizes a computed value to avoid recalculation",
      "Stores data in memory forever",
      "Creates a ref",
    ],
    correct: 1,
    explanation:
      "useMemo caches a computed value and only recalculates when dependencies change. Use for expensive calculations to avoid recomputing on every render.",
  },
  {
    question: "What does useCallback do?",
    options: [
      "Creates a callback function",
      "Memoizes a function to keep stable reference",
      "Delays function execution",
      "Calls a function automatically",
    ],
    correct: 1,
    explanation:
      "useCallback returns a memoized function that only changes when dependencies change. Useful for passing stable callbacks to memoized children.",
  },
  {
    question: "When would you use useLayoutEffect instead of useEffect?",
    options: [
      "For async operations",
      "When you need to read/modify DOM before browser paints",
      "For simpler code",
      "Never, they're the same",
    ],
    correct: 1,
    explanation:
      "useLayoutEffect runs synchronously after DOM mutations but before paint. Use for DOM measurements or changes that must happen before the user sees the update.",
  },
  {
    question: "What is the purpose of React Fragments?",
    code: `<>\n  <Child1 />\n  <Child2 />\n</>`,
    options: [
      "Adds extra DOM elements",
      "Groups elements without adding extra DOM nodes",
      "Makes components faster",
      "Enables lazy loading",
    ],
    correct: 1,
    explanation:
      "Fragments (<>...</> or <Fragment>) let you group children without adding extra DOM nodes. Useful when a component needs to return multiple elements.",
  },
  {
    question: "What's wrong with this code?",
    code: `function Counter() {\n  const [count, setCount] = useState(0)\n  if (count > 5) {\n    const [extra] = useState('hi')\n  }\n  return <div>{count}</div>\n}`,
    options: [
      "Nothing wrong",
      "Hooks called conditionally (breaks rules of hooks)",
      "Missing key prop",
      "Wrong syntax",
    ],
    correct: 1,
    explanation:
      "Hooks must be called at the top level, in the same order every render. Conditional hooks break this rule and cause bugs. Move hooks outside conditions.",
  },
  {
    question: "What does useContext do?",
    options: [
      "Creates a new context",
      "Reads a value from a context without prop drilling",
      "Updates context automatically",
      "Replaces Redux",
    ],
    correct: 1,
    explanation:
      "useContext reads current value from a Context. Avoids prop drilling - any component can access the context value without passing props through intermediate components.",
  },
  {
    question:
      "What's the difference between controlled and uncontrolled components?",
    options: [
      "No difference",
      "Controlled uses React state, uncontrolled uses DOM refs",
      "Uncontrolled is faster",
      "Controlled requires Redux",
    ],
    correct: 1,
    explanation:
      "Controlled: React state is the source of truth (value + onChange). Uncontrolled: DOM manages state, you read values with refs. Prefer controlled for most cases.",
  },
  {
    question: "What does React.lazy do?",
    options: [
      "Makes components render slower",
      "Enables code-splitting by loading components lazily",
      "Delays state updates",
      "Creates lazy animations",
    ],
    correct: 1,
    explanation:
      "React.lazy enables code-splitting. The component is loaded only when rendered. Wrap with Suspense to show fallback while loading. Great for large apps.",
  },
  {
    question: "What's the difference between useEffect with [] vs no array?",
    options: [
      "No difference",
      "[] runs once on mount, no array runs every render",
      "No array runs once, [] runs every render",
      "Both run on mount only",
    ],
    correct: 1,
    explanation:
      "useEffect(() => {}, []) runs only on mount. useEffect(() => {}) with no dependency array runs after EVERY render. This is a common mistake!",
  },
  {
    question: "When does the useEffect cleanup function run?",
    options: [
      "Only when component mounts",
      "On unmount and before each effect re-run",
      "Only on unmount",
      "It never runs automatically",
    ],
    correct: 1,
    explanation:
      "Cleanup runs on unmount AND before the next effect runs (if dependencies changed). This prevents memory leaks and stale subscriptions.",
  },
  {
    question: "Why can't useEffect be async directly?",
    code: `useEffect(async () => {\n  await fetchData()\n}, [])`,
    options: [
      "It works fine",
      "async functions return Promises, useEffect expects void or cleanup",
      "async is not allowed in React",
      "It would be too slow",
    ],
    correct: 1,
    explanation:
      "useEffect expects the callback to return nothing or a cleanup function. async returns a Promise. Define an async function inside useEffect instead.",
  },
  {
    question: "What causes stale closures in useEffect?",
    code: `const [count, setCount] = useState(0)\nuseEffect(() => {\n  setInterval(() => console.log(count), 1000)\n}, [])`,
    options: [
      "Using setInterval",
      "Empty dependency array captures initial count value forever",
      "Nothing is wrong",
      "useState is broken",
    ],
    correct: 1,
    explanation:
      "The empty [] means the effect never re-runs, so 'count' inside the callback is always 0 (the initial value). Add [count] to get current value.",
  },
  {
    question: "How do you handle async errors in useEffect?",
    options: [
      "useEffect catches errors automatically",
      "Use try/catch inside an async function defined in useEffect",
      "Use a separate error hook",
      "Errors cannot occur in useEffect",
    ],
    correct: 1,
    explanation:
      "Define an async function inside useEffect, wrap logic in try/catch, and call that function. Store errors in state to display to users.",
  },
];

const node: Question[] = [
  {
    question: "What is Node.js?",
    options: [
      "A JavaScript framework",
      "A JavaScript runtime built on V8 engine",
      "A database",
      "A frontend library",
    ],
    correct: 1,
    explanation:
      "Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets you run JavaScript outside the browser (servers, CLI tools, etc.).",
  },
  {
    question: "What's the difference between dependencies and devDependencies?",
    options: [
      "No difference",
      "dependencies are for runtime, devDependencies are for development only",
      "devDependencies are faster",
      "dependencies can't be updated",
    ],
    correct: 1,
    explanation:
      "dependencies are needed at runtime (React, Express). devDependencies are only needed during development/build (TypeScript, Jest). Production installs skip devDependencies.",
  },
  {
    question: "What does package-lock.json do?",
    options: [
      "Locks the package.json from editing",
      "Locks exact versions of all dependencies",
      "Encrypts packages",
      "Nothing important",
    ],
    correct: 1,
    explanation:
      "package-lock.json locks exact versions of all dependencies (including nested ones). This ensures everyone gets the same versions for reproducible builds.",
  },
  {
    question: "What does npx do?",
    options: [
      "Installs packages globally",
      "Runs packages without installing globally",
      "Updates npm",
      "Creates a new project",
    ],
    correct: 1,
    explanation:
      "npx executes packages without installing them globally. It's useful for one-off commands like npx create-react-app without polluting global installs.",
  },
  {
    question: 'What does ^ mean in "^4.18.0"?',
    options: [
      "Exactly this version",
      "Any version starting with 4",
      "Compatible version (4.18.0 to <5.0.0)",
      "Latest version",
    ],
    correct: 2,
    explanation:
      "The caret (^) means compatible version - allows minor and patch updates but not major. ^4.18.0 matches 4.18.0 to <5.0.0.",
  },
  {
    question: "What's the main difference between CommonJS and ES Modules?",
    options: [
      "No difference",
      "CommonJS uses require(), ESM uses import/export",
      "ESM is older",
      "CommonJS only works in browsers",
    ],
    correct: 1,
    explanation:
      "CommonJS uses require()/module.exports (synchronous, Node default). ES Modules use import/export (async, tree-shakeable, modern standard).",
  },
  {
    question: 'What does ~ mean in "~4.18.0"?',
    options: [
      "Same as ^",
      "Patch updates only (4.18.x)",
      "Major updates only",
      "Latest version",
    ],
    correct: 1,
    explanation:
      "The tilde (~) is more restrictive than caret. ~4.18.0 matches 4.18.x only (patch updates). ^4.18.0 allows 4.x.x (minor + patch).",
  },
  {
    question: "What is npm ci used for?",
    options: [
      "Same as npm install",
      "Clean install for CI/CD - uses lockfile exactly",
      "Checking for vulnerabilities",
      "Creating package.json",
    ],
    correct: 1,
    explanation:
      "npm ci does a clean install using package-lock.json exactly. It's faster and more reliable for CI/CD - deletes node_modules first and doesn't modify lockfile.",
  },
  {
    question: "What does npm audit do?",
    options: [
      "Audits your code quality",
      "Checks for security vulnerabilities in dependencies",
      "Monitors package usage",
      "Logs package downloads",
    ],
    correct: 1,
    explanation:
      "npm audit scans your dependencies for known security vulnerabilities. Use 'npm audit fix' to automatically install patched versions where available.",
  },
  {
    question: "What is tree-shaking?",
    options: [
      "A testing technique",
      "Removing unused code during bundling",
      "Organizing folder structure",
      "A type of caching",
    ],
    correct: 1,
    explanation:
      "Tree-shaking is dead code elimination - bundlers (Webpack, Rollup) remove unused exports. ES Modules enable this with static import/export analysis.",
  },
  {
    question: "What is the event loop?",
    options: [
      "A loop that handles events in browsers only",
      "A mechanism that handles async operations in Node/JS",
      "A type of for loop",
      "React's rendering cycle",
    ],
    correct: 1,
    explanation:
      "The event loop continuously checks call stack and callback queues. When the call stack is empty, it moves callbacks from the queue to execute. Enables async JS.",
  },
];

const tsAdvanced: Question[] = [
  {
    question: "What does this generic function signature mean?",
    code: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]`,
    options: [
      "K can be any string",
      "K is constrained to keys of T, return type is the value type at that key",
      "T must extend K",
      "Returns a union of all values in T",
    ],
    correct: 1,
    explanation:
      "K extends keyof T constrains K to only valid keys of T. T[K] is an indexed access type — the return type matches the property type at key K.",
  },
  {
    question: "What does ReturnType<T> do?",
    code: `function greet() { return "hello" }\ntype R = ReturnType<typeof greet>`,
    options: ["R is void", 'R is "hello"', "R is string", "R is Function"],
    correct: 1,
    explanation:
      'ReturnType<T> extracts the return type of a function type. Since greet returns a string literal with const inference from typeof, R is "hello" — the literal type.',
  },
  {
    question: "What does Parameters<T> extract?",
    code: `function add(a: number, b: string): void {}\ntype P = Parameters<typeof add>`,
    options: [
      "[number, string]",
      "{a: number, b: string}",
      "number | string",
      "void",
    ],
    correct: 0,
    explanation:
      "Parameters<T> extracts the parameter types of a function as a tuple. Parameters<typeof add> gives [number, string].",
  },
  {
    question: "What is a conditional type?",
    code: `type IsString<T> = T extends string ? "yes" : "no"`,
    options: [
      "A type that changes at runtime",
      "A type that resolves differently based on the type argument",
      "An if-else statement for variables",
      "A type guard",
    ],
    correct: 1,
    explanation:
      "Conditional types use T extends U ? X : Y syntax. The type resolves to X or Y depending on whether T satisfies the condition at compile time.",
  },
  {
    question: "What does 'infer' do in conditional types?",
    code: `type UnwrapPromise<T> = T extends Promise<infer U> ? U : T`,
    options: [
      "It creates a new variable at runtime",
      "It extracts/infers a type from a pattern match",
      "It validates the type is correct",
      "It makes the type optional",
    ],
    correct: 1,
    explanation:
      "infer introduces a type variable U that TypeScript infers from the pattern. UnwrapPromise<Promise<string>> extracts string. UnwrapPromise<number> stays number.",
  },
  {
    question: "What is a discriminated union?",
    code: `type Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; side: number }`,
    options: [
      "A union of unrelated types",
      "A union where a common literal property enables type narrowing",
      "A union that discriminates against undefined",
      "An enum alternative",
    ],
    correct: 1,
    explanation:
      'Discriminated unions use a common literal property (here "kind") as a tag. TypeScript can narrow the union in switch/if blocks based on that tag.',
  },
  {
    question: "What does the 'satisfies' operator do?",
    code: `const config = {\n  width: 100,\n  color: "red"\n} satisfies Record<string, string | number>`,
    options: [
      'Same as "as" — it casts the type',
      "Validates the type while preserving the narrower inferred type",
      "Makes the object readonly",
      "Creates a runtime check",
    ],
    correct: 1,
    explanation:
      'satisfies checks that a value matches a type WITHOUT widening it. config.color stays "red" (not string | number). "as" would lose the narrow type.',
  },
  {
    question: "What is the 'never' type used for?",
    options: [
      "Variables that are undefined",
      "Represents values that never occur — exhaustiveness checks, impossible states",
      "Same as void",
      "Variables that are null",
    ],
    correct: 1,
    explanation:
      "never represents the type of values that never occur. Use it for exhaustive switch cases (default: const _: never = value), functions that always throw, or impossible states.",
  },
  {
    question: "What does Extract<T, U> do?",
    code: `type T = Extract<"a" | "b" | "c", "a" | "c" | "d">`,
    options: ['"a" | "b" | "c" | "d"', '"a" | "c"', '"b"', '"d"'],
    correct: 1,
    explanation:
      'Extract<T, U> pulls out members of T that are assignable to U. Here it extracts "a" | "c" — the members common to both unions.',
  },
  {
    question: "What does Exclude<T, U> do?",
    code: `type T = Exclude<"a" | "b" | "c", "a">`,
    options: ['"a"', '"b" | "c"', '"a" | "b" | "c"', "never"],
    correct: 1,
    explanation:
      'Exclude<T, U> removes from T all members assignable to U. Exclude<"a" | "b" | "c", "a"> gives "b" | "c".',
  },
  {
    question: "What does NonNullable<T> do?",
    code: `type T = NonNullable<string | null | undefined>`,
    options: [
      "string | null | undefined",
      "string",
      "null | undefined",
      "never",
    ],
    correct: 1,
    explanation:
      "NonNullable<T> removes null and undefined from a union type. It is equivalent to Exclude<T, null | undefined>.",
  },
  {
    question: "What does Awaited<T> do?",
    code: `type A = Awaited<Promise<Promise<string>>>`,
    options: [
      "Promise<string>",
      "Promise<Promise<string>>",
      "string",
      "unknown",
    ],
    correct: 2,
    explanation:
      "Awaited<T> recursively unwraps Promise types, just like await does at runtime. It unwraps nested promises down to the final resolved value type.",
  },
  {
    question: "What is a mapped type?",
    code: `type Optional<T> = { [K in keyof T]?: T[K] }`,
    options: [
      "A type that maps arrays",
      "A type that transforms each property of another type",
      "A runtime map function for types",
      "Same as Record<K, V>",
    ],
    correct: 1,
    explanation:
      "Mapped types iterate over keys of a type with [K in keyof T] and transform each property. This is how Partial, Required, and Readonly are implemented.",
  },
  {
    question: "What is a template literal type?",
    code: `type EventName = \`on\${\"Click\" | \"Hover\"}\``,
    options: [
      '"onClick" | "onHover"',
      '"on" | "Click" | "Hover"',
      "string",
      "Error — template literals cannot be used in types",
    ],
    correct: 0,
    explanation:
      'Template literal types combine string literals using template syntax. TypeScript distributes unions, producing all combinations: "onClick" | "onHover".',
  },
  {
    question: "What are function overloads in TypeScript?",
    code: `function parse(input: string): number\nfunction parse(input: number): string\nfunction parse(input: string | number) {\n  return typeof input === "string" ? Number(input) : String(input)\n}`,
    options: [
      "Multiple implementations of the same function",
      "Multiple type signatures with one implementation — callers see the overloads",
      "A way to make functions generic",
      "Deprecated in favor of generics",
    ],
    correct: 1,
    explanation:
      "Overloads declare multiple call signatures. The implementation signature is hidden from callers. TypeScript resolves which overload matches at the call site.",
  },
  {
    question: "What does 'readonly' do on a tuple?",
    code: `function process(items: readonly [string, number]) {}`,
    options: [
      "Items can be reassigned but not mutated",
      "The tuple cannot be mutated — no push, pop, or index assignment",
      "Only the first element is readonly",
      "Same as const",
    ],
    correct: 1,
    explanation:
      "readonly on a tuple (or array) prevents mutations: no push, pop, splice, or indexed assignment. The structure and values are fixed.",
  },
];

const reactAdvanced: Question[] = [
  {
    question: "When should you use useReducer instead of useState?",
    options: [
      "Always — useReducer replaces useState",
      "When state logic is complex, involves multiple sub-values, or next state depends on previous",
      "Only for global state",
      "Only with context",
    ],
    correct: 1,
    explanation:
      "useReducer shines with complex state logic (multiple related values, state machines). It centralizes update logic and makes state transitions explicit and testable.",
  },
  {
    question: "What does useTransition do?",
    code: `const [isPending, startTransition] = useTransition()`,
    options: [
      "Animates components",
      "Marks state updates as non-urgent so urgent updates (typing) stay responsive",
      "Transitions between routes",
      "Delays rendering until data is loaded",
    ],
    correct: 1,
    explanation:
      "useTransition marks updates as transitions (low priority). React keeps the UI responsive for urgent updates (input) while the transition renders in the background.",
  },
  {
    question: "What does useDeferredValue do?",
    code: `const deferredQuery = useDeferredValue(query)`,
    options: [
      "Debounces the value",
      "Returns a deferred copy of the value that lags behind during urgent updates",
      "Caches the previous value",
      "Delays the value by a fixed time",
    ],
    correct: 1,
    explanation:
      'useDeferredValue returns a copy that "lags behind" the current value during urgent updates. It is similar to useTransition but for values you cannot wrap in startTransition.',
  },
  {
    question: "What does useId return?",
    code: `const id = useId()`,
    options: [
      "A random UUID",
      "A unique, stable ID safe for SSR hydration",
      "The component's key prop",
      "A sequential counter",
    ],
    correct: 1,
    explanation:
      "useId generates a unique ID that is stable across server and client renders, avoiding hydration mismatches. Use for accessibility attributes (htmlFor, aria-describedby).",
  },
  {
    question: "What is a custom hook?",
    options: [
      "A hook that requires a library",
      'A function starting with "use" that composes other hooks to extract reusable logic',
      "A class method",
      "A hook defined in node_modules",
    ],
    correct: 1,
    explanation:
      'Custom hooks are functions prefixed with "use" that call other hooks. They extract reusable stateful logic from components without changing the component hierarchy.',
  },
  {
    question: "What is an Error Boundary?",
    options: [
      "A try/catch block in JSX",
      "A class component that catches JS errors in its child tree and shows a fallback UI",
      "A hook for error handling",
      "A browser API for React errors",
    ],
    correct: 1,
    explanation:
      "Error Boundaries are class components using componentDidCatch / getDerivedStateFromError. They catch rendering, lifecycle, and constructor errors in children. They do NOT catch event handler or async errors.",
  },
  {
    question: "What are React Portals?",
    code: `createPortal(<Modal />, document.getElementById("modal-root"))`,
    options: [
      "A way to render components lazily",
      "A way to render children into a DOM node outside the parent hierarchy",
      "A routing mechanism",
      "A way to share state between components",
    ],
    correct: 1,
    explanation:
      "Portals render children into a different DOM node while keeping them in the React tree (events still bubble through React parents). Common for modals, tooltips, toasts.",
  },
  {
    question: "What does forwardRef do?",
    code: `const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (\n  <input ref={ref} {...props} />\n))`,
    options: [
      "Passes props to children automatically",
      "Allows parent components to pass a ref to a child's DOM element",
      "Forwards events from child to parent",
      "Creates a higher-order component",
    ],
    correct: 1,
    explanation:
      "forwardRef lets a component expose a DOM node (or imperative handle) to its parent via ref. Without it, ref on a custom component does nothing.",
  },
  {
    question: "What is useImperativeHandle used for?",
    code: `useImperativeHandle(ref, () => ({\n  focus: () => inputRef.current?.focus(),\n  clear: () => { inputRef.current!.value = '' }\n}))`,
    options: [
      "Replacing useState",
      "Customizing the instance value exposed to parent via ref",
      "Handling imperative DOM mutations",
      "Creating event handlers",
    ],
    correct: 1,
    explanation:
      "useImperativeHandle customizes what the parent sees through ref. Instead of the raw DOM node, you expose a limited API. Always pair with forwardRef.",
  },
  {
    question: "What is hydration in React?",
    options: [
      "Fetching data for components",
      "Attaching event listeners and state to server-rendered HTML to make it interactive",
      "Caching components in memory",
      "Converting JSX to HTML",
    ],
    correct: 1,
    explanation:
      "Hydration is the process where React attaches to server-rendered HTML, adding event listeners and making it interactive without re-rendering the DOM from scratch.",
  },
  {
    question: "What causes a hydration mismatch?",
    options: [
      "Slow network",
      "Server-rendered HTML differs from what client-side React would render",
      "Missing keys",
      "Using useEffect",
    ],
    correct: 1,
    explanation:
      "Hydration mismatches occur when server HTML differs from client render (e.g., using Date.now(), window checks, or browser-only APIs during render). React warns and re-renders.",
  },
  {
    question: "What is the difference between SSR, CSR, and RSC?",
    options: [
      "They are all the same",
      "CSR renders in browser; SSR renders HTML on server then hydrates; RSC runs components on server without sending their JS to client",
      "SSR is faster than CSR always",
      "RSC replaces SSR entirely",
    ],
    correct: 1,
    explanation:
      "CSR: all rendering in browser. SSR: HTML rendered on server, hydrated on client (still ships JS). RSC (React Server Components): components run on server, zero client JS, can be mixed with client components.",
  },
  {
    question: "What does Suspense do beyond React.lazy?",
    code: `<Suspense fallback={<Spinner />}>\n  <AsyncComponent />\n</Suspense>`,
    options: [
      "Nothing — it only works with React.lazy",
      "Shows fallback while children suspend (data fetching, lazy loading, or any thrown promise)",
      "Adds error handling",
      "Makes children render faster",
    ],
    correct: 1,
    explanation:
      'Suspense shows a fallback while any child "suspends" — this includes lazy components, data fetching (with Suspense-enabled libraries like React Query, Relay), and use() hook.',
  },
  {
    question: "What are synthetic events in React?",
    options: [
      "Custom events created by the developer",
      "Wrapper objects around native browser events that provide a consistent cross-browser API",
      "Events that only work in development mode",
      "Events dispatched by React Router",
    ],
    correct: 1,
    explanation:
      "React wraps native browser events in SyntheticEvent objects for cross-browser consistency. They have the same interface as native events but are pooled (historically) and normalized.",
  },
  {
    question: "What is the render props pattern?",
    code: `<Mouse render={mouse => (\n  <Cat position={mouse} />\n)} />`,
    options: [
      "Passing JSX as a prop instead of children",
      "A component shares its internal state via a function prop that returns JSX",
      "A way to override render method",
      "Deprecated and removed",
    ],
    correct: 1,
    explanation:
      'Render props is a pattern where a component calls a function prop (often "render" or "children") to share state. Largely replaced by custom hooks, but still valid and asked about.',
  },
  {
    question: "What is React.Children.map used for?",
    code: `React.Children.map(children, child => \n  React.cloneElement(child, { className: "styled" })\n)`,
    options: [
      "Iterating over an array",
      "Safely iterating over children prop, handling single child, array, or fragments",
      "Creating child components",
      "Filtering DOM nodes",
    ],
    correct: 1,
    explanation:
      "React.Children utilities safely iterate over the children prop regardless of its shape (single element, array, or fragment). Regular array methods would break on a single child.",
  },
];

const css: Question[] = [
  {
    question: "What is CSS specificity order from lowest to highest?",
    options: [
      "class → element → id → inline",
      "element → class → id → inline → !important",
      "id → class → element → inline",
      "inline → id → class → element",
    ],
    correct: 1,
    explanation:
      "Specificity: element/pseudo-element (0,0,1) < class/attribute/pseudo-class (0,1,0) < id (1,0,0) < inline style < !important. More specific selectors win.",
  },
  {
    question: "What is the CSS box model?",
    options: [
      "margin → padding → border → content",
      "content → padding → border → margin (inside out)",
      "border → margin → padding → content",
      "content → margin → padding → border",
    ],
    correct: 1,
    explanation:
      "From inside out: content → padding → border → margin. box-sizing: border-box includes padding and border in the width/height.",
  },
  {
    question: "What does box-sizing: border-box do?",
    options: [
      "Adds a box around the border",
      "Width and height include content + padding + border (not just content)",
      "Removes the margin",
      "Makes the element inline",
    ],
    correct: 1,
    explanation:
      "border-box makes width/height include padding and border. Without it (content-box), a 200px wide element with 20px padding is actually 240px wide.",
  },
  {
    question: "When does z-index NOT work?",
    options: [
      "On elements with display: block",
      "On elements without a position value other than static (or without a stacking context)",
      "On flex children",
      "On elements with overflow: hidden",
    ],
    correct: 1,
    explanation:
      "z-index only works on positioned elements (relative, absolute, fixed, sticky) or flex/grid children. On static elements, z-index is ignored. Also, z-index only competes within the same stacking context.",
  },
  {
    question: "What creates a new stacking context?",
    options: [
      "Any element with z-index",
      "position + z-index, opacity < 1, transform, filter, will-change, and more",
      "Only position: fixed",
      "Only the root element",
    ],
    correct: 1,
    explanation:
      "Stacking contexts are created by: position + z-index (not auto), opacity < 1, transform, filter, will-change, isolation: isolate, and more. Children cannot escape their parent stacking context.",
  },
  {
    question: "What is the main axis in flexbox by default?",
    options: [
      "Vertical (top to bottom)",
      "Horizontal (left to right)",
      "Depends on the browser",
      "Diagonal",
    ],
    correct: 1,
    explanation:
      "By default, flex-direction: row makes the main axis horizontal. justify-content works on the main axis, align-items works on the cross axis.",
  },
  {
    question: "What is the difference between justify-content and align-items?",
    options: [
      "No difference",
      "justify-content: main axis; align-items: cross axis",
      "justify-content: vertical; align-items: horizontal",
      "They both work on the main axis",
    ],
    correct: 1,
    explanation:
      "justify-content distributes space along the main axis (row = horizontal). align-items positions items along the cross axis (row = vertical).",
  },
  {
    question: "When would you use CSS Grid over Flexbox?",
    options: [
      "Never — Flexbox handles everything",
      "For two-dimensional layouts (rows AND columns simultaneously)",
      "Only for tables",
      "Grid is slower and should be avoided",
    ],
    correct: 1,
    explanation:
      "Flexbox is one-dimensional (row OR column). Grid is two-dimensional (rows AND columns). Use Grid for page layouts, card grids, complex arrangements. Use Flex for linear layouts.",
  },
  {
    question: "What does position: sticky do?",
    options: [
      "Same as position: fixed",
      "Toggles between relative and fixed based on scroll position",
      "Sticks the element to the bottom",
      "Makes the element unmovable",
    ],
    correct: 1,
    explanation:
      "sticky acts as relative until the element reaches a scroll threshold, then acts as fixed. Requires top/bottom/left/right to define the threshold. Parent must be scrollable.",
  },
  {
    question: "What is the difference between em and rem?",
    options: [
      "No difference",
      "em is relative to parent font-size; rem is relative to root (html) font-size",
      "rem is relative to parent; em is relative to root",
      "em is absolute; rem is relative",
    ],
    correct: 1,
    explanation:
      "em compounds — 1.5em inside 1.5em = 2.25× root size. rem always references the root html font-size. Prefer rem for consistent sizing, em for component-relative scaling.",
  },
  {
    question: "What are CSS custom properties (variables)?",
    code: `:root { --primary: #3b82f6; }\n.btn { color: var(--primary); }`,
    options: [
      "Sass variables compiled to CSS",
      "Native CSS variables scoped to the cascade, readable by JS",
      "Constants that cannot change",
      "A PostCSS feature",
    ],
    correct: 1,
    explanation:
      "CSS custom properties are native variables that cascade and inherit. Unlike Sass vars, they are live, can be scoped to selectors, updated from JS, and used in media queries.",
  },
  {
    question: "What does 'display: none' vs 'visibility: hidden' do?",
    options: [
      "Same thing",
      "display:none removes from layout entirely; visibility:hidden hides but keeps space",
      "visibility:hidden removes from layout; display:none keeps space",
      "Both remove the element from the DOM",
    ],
    correct: 1,
    explanation:
      "display:none removes the element from the layout flow (takes no space). visibility:hidden hides it visually but the element still occupies space. Neither removes from DOM.",
  },
  {
    question: "How do CSS Modules prevent style conflicts?",
    options: [
      "They use Shadow DOM",
      "They scope class names by generating unique hashes at build time",
      "They use !important on everything",
      "They inline all styles",
    ],
    correct: 1,
    explanation:
      "CSS Modules generate unique class names (e.g., .button_a3x2k) at build time, scoping styles to the importing component. Eliminates global name collisions without runtime cost.",
  },
];

const testing: Question[] = [
  {
    question: "What is the core philosophy of React Testing Library?",
    options: [
      "Test implementation details",
      "Test the way users interact with your UI — find by role, text, label",
      "Test every component in isolation",
      "Maximize code coverage",
    ],
    correct: 1,
    explanation:
      "RTL philosophy: test behavior, not implementation. Query by role/text/label (how users see it), not by class name or test ID. If you refactor without changing behavior, tests should still pass.",
  },
  {
    question: "Which query should you prefer in React Testing Library?",
    options: [
      "getByTestId",
      "getByRole or getByLabelText",
      "querySelector",
      "getByClassName",
    ],
    correct: 1,
    explanation:
      "Prefer accessible queries: getByRole > getByLabelText > getByPlaceholderText > getByText > getByTestId. This ensures your UI is accessible by design.",
  },
  {
    question: "What does 'act()' do in React tests?",
    options: [
      "Mocks a component",
      "Wraps code that triggers state updates so React processes them before assertions",
      "Simulates user actions",
      "Asserts component output",
    ],
    correct: 1,
    explanation:
      "act() ensures all state updates, effects, and re-renders are processed before you make assertions. RTL's render, fireEvent, and userEvent wrap act() automatically.",
  },
  {
    question: "What is the difference between fireEvent and userEvent?",
    options: [
      "No difference",
      "userEvent simulates real user interactions (typing, clicking); fireEvent dispatches raw DOM events",
      "fireEvent is more accurate",
      "userEvent is deprecated",
    ],
    correct: 1,
    explanation:
      "userEvent simulates full interaction sequences (focus → keyDown → input → keyUp → change). fireEvent dispatches single raw events. Prefer userEvent for realistic tests.",
  },
  {
    question: "How do you test a custom hook?",
    options: [
      "Call it directly in the test",
      "Use renderHook() from @testing-library/react",
      "Mount a dummy component",
      "Hooks cannot be unit tested",
    ],
    correct: 1,
    explanation:
      "renderHook() wraps your hook in a test component automatically. It returns { result, rerender } so you can inspect result.current and trigger re-renders.",
  },
  {
    question: "What should you mock in component tests?",
    options: [
      "Everything — all dependencies and children",
      "External boundaries: API calls, timers, browser APIs — NOT internal components",
      "Nothing — use real implementations only",
      "All hooks",
    ],
    correct: 1,
    explanation:
      "Mock at the boundary: HTTP calls (msw or jest.mock fetch), timers (jest.useFakeTimers), localStorage. Keep internal components real. Over-mocking makes tests brittle and meaningless.",
  },
  {
    question: "What does jest.fn() do?",
    options: [
      "Creates a new function",
      "Creates a mock function that tracks calls, arguments, and return values",
      "Runs a function in jest",
      "Fixes a flaky function",
    ],
    correct: 1,
    explanation:
      "jest.fn() creates a mock that records calls. Check with: expect(fn).toHaveBeenCalledWith(args), .toHaveBeenCalledTimes(n), fn.mock.calls, fn.mock.results.",
  },
  {
    question: "What is a snapshot test?",
    options: [
      "A screenshot comparison test",
      "Serializes component output and compares to saved snapshot file — breaks on any change",
      "A test that runs once",
      "A performance benchmark",
    ],
    correct: 1,
    explanation:
      "Snapshot tests serialize rendered output to a file. Any change (even whitespace) fails the test until you update the snapshot. Useful but fragile — prefer specific assertions.",
  },
  {
    question: "How do you test async behavior?",
    code: `const button = screen.getByRole("button")\nawait userEvent.click(button)\nconst message = await screen.findByText("Success")`,
    options: [
      "Use setTimeout in the test",
      "Use findBy queries (which wait with retry) or waitFor()",
      "Wrap everything in await",
      "Async testing is not possible in jest",
    ],
    correct: 1,
    explanation:
      "findBy* queries retry until the element appears (default 1s timeout). waitFor() retries an assertion. Both handle async state updates, API calls, and loading states.",
  },
  {
    question: "What is MSW (Mock Service Worker)?",
    options: [
      "A testing framework",
      "A library that intercepts HTTP requests at the network level for realistic API mocking",
      "A browser extension",
      "A Jest plugin",
    ],
    correct: 1,
    explanation:
      "MSW intercepts fetch/XHR requests at the service worker level. Tests use real fetch calls, only the network is mocked. Works in both tests and browser dev environments.",
  },
];

const webAPIs: Question[] = [
  {
    question: "What is CORS and why does it exist?",
    options: [
      "A CSS framework",
      "Cross-Origin Resource Sharing — browser security that blocks requests to different origins unless the server allows it",
      "A React optimization",
      "A Node.js package",
    ],
    correct: 1,
    explanation:
      "CORS prevents malicious sites from making requests to other origins on your behalf. The server must include Access-Control-Allow-Origin headers to permit cross-origin requests.",
  },
  {
    question: "What triggers a CORS preflight request?",
    options: [
      "Every cross-origin request",
      "Custom headers, methods other than GET/HEAD/POST, or non-simple Content-Types trigger an OPTIONS preflight",
      "Only POST requests",
      "Only when cookies are sent",
    ],
    correct: 1,
    explanation:
      "Simple requests (GET/POST/HEAD with standard headers and certain Content-Types) go directly. Everything else triggers an OPTIONS preflight to check server permissions first.",
  },
  {
    question:
      "What is the difference between localStorage, sessionStorage, and cookies?",
    options: [
      "No difference",
      "localStorage persists forever; sessionStorage clears on tab close; cookies can be sent with requests and have expiration",
      "Cookies are larger than localStorage",
      "sessionStorage persists between sessions",
    ],
    correct: 1,
    explanation:
      "localStorage: ~5MB, persists until cleared. sessionStorage: ~5MB, tab-scoped, cleared on tab close. Cookies: ~4KB, sent with every HTTP request, have expiration, can be HttpOnly/Secure.",
  },
  {
    question: "What is the Intersection Observer API?",
    options: [
      "A way to observe DOM mutations",
      "An API that asynchronously observes when elements enter/exit the viewport",
      "A way to detect click intersections",
      "A React hook",
    ],
    correct: 1,
    explanation:
      "IntersectionObserver efficiently detects when elements enter or leave the viewport (or a parent). Use for lazy loading images, infinite scroll, and triggering animations on scroll.",
  },
  {
    question: "What does AbortController do?",
    code: `const controller = new AbortController()\nfetch(url, { signal: controller.signal })\ncontroller.abort()`,
    options: [
      "Aborts the JavaScript runtime",
      "Cancels in-flight fetch requests and other async operations",
      "Stops event propagation",
      "Clears timeouts",
    ],
    correct: 1,
    explanation:
      "AbortController provides a signal to cancel fetch requests, event listeners, or any API that accepts an AbortSignal. Essential for cleanup in React useEffect.",
  },
  {
    question: "What is the History API used for in SPAs?",
    code: `history.pushState({}, "", "/about")`,
    options: [
      "Tracking user analytics",
      "Updating the URL bar without triggering a full page reload — enables client-side routing",
      "Storing browser history in localStorage",
      "Going back in time",
    ],
    correct: 1,
    explanation:
      "pushState/replaceState change the URL without reloading. React Router and other SPA routers use this API to sync URL with component state.",
  },
  {
    question: "What does requestAnimationFrame do?",
    options: [
      "Requests the next animation from CSS",
      "Schedules a callback before the next browser repaint (~60fps), optimal for visual updates",
      "Pauses animations",
      "Creates a CSS animation",
    ],
    correct: 1,
    explanation:
      "requestAnimationFrame calls your function before the next repaint. Use it for smooth animations, scroll-based effects, and batching DOM reads/writes. More efficient than setInterval.",
  },
  {
    question: "What is a Service Worker?",
    options: [
      "A web server written in JavaScript",
      "A script that runs in the background, enabling offline support, caching, and push notifications",
      "A React background thread",
      "A database API",
    ],
    correct: 1,
    explanation:
      "Service Workers are background scripts that intercept network requests, enable offline caching (PWA), and handle push notifications. They run separate from the main thread.",
  },
  {
    question: "What does structuredClone do?",
    code: `const copy = structuredClone(original)`,
    options: [
      "Same as spread operator",
      "Creates a deep copy of an object including nested structures, Maps, Sets, Dates",
      "Creates a shallow copy",
      "Clones DOM elements",
    ],
    correct: 1,
    explanation:
      "structuredClone does a deep copy handling nested objects, arrays, Maps, Sets, Dates, RegExp, and more. Unlike JSON.parse(JSON.stringify()), it handles circular references.",
  },
  {
    question:
      "What is the difference between querySelector and getElementById?",
    options: [
      "No difference",
      "getElementById is faster for ID lookups; querySelector accepts any CSS selector but is slightly slower",
      "querySelector only works in React",
      "getElementById is deprecated",
    ],
    correct: 1,
    explanation:
      "getElementById looks up by ID only (fastest). querySelector accepts any CSS selector (flexible but slower). querySelectorAll returns all matches. In React, prefer refs over direct DOM access.",
  },
];

const asyncPatterns: Question[] = [
  {
    question:
      "What is the difference between Promise.all, Promise.allSettled, Promise.race, and Promise.any?",
    options: [
      "They all do the same thing",
      "all: all must resolve (or one rejects); allSettled: waits for all regardless; race: first to settle; any: first to resolve",
      "race is fastest, all is slowest",
      "any and all are identical",
    ],
    correct: 1,
    explanation:
      "Promise.all rejects on first rejection. allSettled waits for all (returns status per promise). race settles with first result (resolve or reject). any resolves with first success (ignores rejections until all fail).",
  },
  {
    question: "What is the difference between debounce and throttle?",
    options: [
      "No difference",
      "Debounce waits for inactivity then fires; throttle fires at regular intervals during activity",
      "Throttle waits for inactivity; debounce fires at intervals",
      "Both delay events by a fixed time",
    ],
    correct: 1,
    explanation:
      "Debounce: waits until user stops (e.g., search input — wait 300ms after last keystroke). Throttle: fires at most once per interval (e.g., scroll handler — at most once per 100ms).",
  },
  {
    question: "What is a race condition in React?",
    code: `useEffect(() => {\n  fetch(\`/api/\${id}\`).then(r => r.json()).then(setData)\n}, [id])`,
    options: [
      "A performance issue",
      "When a slow response for a previous request overwrites data from a newer, faster request",
      "Two components rendering at the same time",
      "A memory leak",
    ],
    correct: 1,
    explanation:
      "If id changes quickly, old fetch responses may arrive after newer ones and overwrite the correct data. Fix with AbortController cleanup in useEffect or a stale request flag.",
  },
  {
    question: "How do you fix the race condition above?",
    code: `useEffect(() => {\n  const controller = new AbortController()\n  fetch(\`/api/\${id}\`, { signal: controller.signal })\n    .then(r => r.json()).then(setData)\n    .catch(e => { if (e.name !== "AbortError") throw e })\n  return () => controller.abort()\n}, [id])`,
    options: [
      "Use setTimeout to delay requests",
      "AbortController cancels the previous fetch when id changes, preventing stale data",
      "Use Promise.race",
      "This code has a bug",
    ],
    correct: 1,
    explanation:
      "The cleanup function aborts the previous fetch when id changes. The new effect starts a fresh fetch. AbortError is caught and ignored since it is expected behavior.",
  },
  {
    question: "What does the 'for await...of' syntax do?",
    code: `for await (const chunk of readableStream) {\n  process(chunk)\n}`,
    options: [
      "Same as for...of",
      "Iterates over async iterables, awaiting each value in sequence",
      "Runs all iterations in parallel",
      "Only works with arrays",
    ],
    correct: 1,
    explanation:
      "for await...of iterates async iterables (async generators, ReadableStreams), awaiting each yielded promise. Each iteration starts after the previous completes.",
  },
  {
    question: "What is Promise.withResolvers()?",
    code: `const { promise, resolve, reject } = Promise.withResolvers()`,
    options: [
      "Creates three separate promises",
      "Creates a promise with externally accessible resolve/reject functions",
      "A polyfill for Promise.all",
      "Deprecated API",
    ],
    correct: 1,
    explanation:
      "Promise.withResolvers() (ES2024) returns a promise and its resolve/reject functions. Eliminates the common pattern of extracting them from the constructor callback.",
  },
];

const security: Question[] = [
  {
    question: "What is XSS (Cross-Site Scripting)?",
    options: [
      "A CSS framework vulnerability",
      "An attack where malicious scripts are injected into trusted websites and executed in users' browsers",
      "A server-side attack",
      "A network protocol vulnerability",
    ],
    correct: 1,
    explanation:
      "XSS injects malicious JavaScript that runs in other users' browsers. Can steal cookies, tokens, or perform actions as the user. Three types: stored, reflected, DOM-based.",
  },
  {
    question: "How does React protect against XSS by default?",
    options: [
      "It does not protect against XSS",
      "JSX automatically escapes embedded values before rendering them as text",
      "It uses a Web Application Firewall",
      "It sanitizes all HTTP responses",
    ],
    correct: 1,
    explanation:
      "React auto-escapes values in JSX: {userInput} renders as text, not HTML. The major exception is dangerouslySetInnerHTML, which bypasses escaping — never use with untrusted data.",
  },
  {
    question: "What is dangerouslySetInnerHTML and when is it dangerous?",
    code: `<div dangerouslySetInnerHTML={{ __html: userContent }} />`,
    options: [
      "It is always safe in React",
      "It renders raw HTML — dangerous with untrusted input because it bypasses React's XSS protection",
      "It is deprecated",
      "It only works with sanitized content",
    ],
    correct: 1,
    explanation:
      "dangerouslySetInnerHTML renders raw HTML, bypassing React's escaping. With untrusted data, it enables XSS. Always sanitize with DOMPurify or similar before using it.",
  },
  {
    question: "What is CSRF (Cross-Site Request Forgery)?",
    options: [
      "A type of XSS",
      "An attack that tricks a logged-in user's browser into making unwanted requests to a trusted site",
      "Forging SSL certificates",
      "A DNS attack",
    ],
    correct: 1,
    explanation:
      "CSRF tricks your browser into making authenticated requests (because cookies are sent automatically). Mitigated with CSRF tokens, SameSite cookies, and checking Origin/Referer headers.",
  },
  {
    question: "What does the Content-Security-Policy header do?",
    options: [
      "Encrypts page content",
      "Restricts which sources can load scripts, styles, images, etc. — mitigates XSS",
      "Blocks all JavaScript",
      "Validates HTML",
    ],
    correct: 1,
    explanation:
      "CSP whitelists trusted sources for scripts, styles, images, etc. script-src 'self' only allows scripts from your domain. A strong CSP significantly reduces XSS impact.",
  },
  {
    question:
      "What is the difference between HttpOnly, Secure, and SameSite cookie flags?",
    options: [
      "They all do the same thing",
      "HttpOnly: no JS access; Secure: HTTPS only; SameSite: controls cross-origin sending",
      "They are deprecated",
      "Only HttpOnly matters",
    ],
    correct: 1,
    explanation:
      "HttpOnly prevents document.cookie access (mitigates XSS token theft). Secure ensures HTTPS-only transmission. SameSite (Strict/Lax/None) controls if cookies are sent cross-origin (mitigates CSRF).",
  },
  {
    question: "Why should you never store JWTs in localStorage?",
    options: [
      "localStorage is too slow",
      "XSS can read localStorage — any injected script can steal the token",
      "localStorage has a size limit",
      "JWTs are too large",
    ],
    correct: 1,
    explanation:
      "localStorage is accessible to any JS on the page. A single XSS vulnerability exposes the token. Prefer HttpOnly cookies (not accessible from JS) for sensitive tokens.",
  },
  {
    question: "What is input sanitization vs validation?",
    options: [
      "Same thing",
      "Validation checks if input is correct format; sanitization cleans/strips dangerous content",
      "Sanitization is server-only",
      "Validation is client-only",
    ],
    correct: 1,
    explanation:
      'Validation: "Is this a valid email?" (reject bad input). Sanitization: "Strip script tags from this HTML" (clean dangerous content). Do both — validation first, sanitization as defense-in-depth.',
  },
];

const a11y: Question[] = [
  {
    question: "What are ARIA attributes?",
    options: [
      "A CSS framework",
      "Accessible Rich Internet Applications — attributes that provide semantic meaning to assistive technologies",
      "A React testing library",
      "Animation properties",
    ],
    correct: 1,
    explanation:
      "ARIA attributes (role, aria-label, aria-hidden, etc.) communicate widget roles and states to screen readers. First rule: use semantic HTML before reaching for ARIA.",
  },
  {
    question: "What is the first rule of ARIA?",
    options: [
      "Always use ARIA on every element",
      "Don't use ARIA if a native HTML element or attribute already does the job",
      "ARIA must be used on all interactive elements",
      'Use role="button" on every clickable element',
    ],
    correct: 1,
    explanation:
      '<button> is better than <div role="button" tabindex="0">. Native elements have built-in keyboard handling, focus management, and screen reader support. ARIA is a last resort.',
  },
  {
    question: "What is semantic HTML and why does it matter?",
    options: [
      "Using divs for everything with descriptive class names",
      "Using elements that describe their meaning — nav, main, article, header — for accessibility and SEO",
      "HTML written by language experts",
      "HTML with comments explaining each element",
    ],
    correct: 1,
    explanation:
      'Semantic elements (nav, main, article, section, header, footer, aside) convey meaning to screen readers, search engines, and developers. A <nav> is immediately understood; a <div class="nav"> is not.',
  },
  {
    question: "How should you handle focus management in a modal?",
    options: [
      "No special handling needed",
      "Trap focus inside the modal, return focus to the trigger element on close",
      "Remove all focus styles",
      "Use autofocus on every element",
    ],
    correct: 1,
    explanation:
      "Modal focus management: 1) Move focus into modal on open. 2) Trap Tab/Shift+Tab within the modal. 3) Close on Escape. 4) Return focus to the trigger element. This keeps keyboard users from getting lost.",
  },
  {
    question: "What does tabindex do?",
    code: `<div tabindex="0">Focusable</div>\n<div tabindex="-1">Programmatically focusable only</div>`,
    options: [
      "Sets the tab width",
      "0: element is focusable via Tab; -1: focusable via JS only (not in Tab order)",
      "Negative values make elements unfocusable",
      "Higher numbers get focus first",
    ],
    correct: 1,
    explanation:
      'tabindex="0" adds to natural tab order. tabindex="-1" allows focus via JS (.focus()) but not Tab. Avoid tabindex > 0 — it overrides natural order and causes confusion.',
  },
  {
    question: "Why should you never remove focus outlines without replacement?",
    code: `*:focus { outline: none } /* BAD */`,
    options: [
      "It breaks animations",
      "Keyboard users lose their only visual indicator of where focus is on the page",
      "It slows down the page",
      "It causes layout shifts",
    ],
    correct: 1,
    explanation:
      "Focus outlines are essential for keyboard users. If you remove them for aesthetics, ALWAYS add a custom focus style (:focus-visible is preferred — only shows for keyboard navigation).",
  },
  {
    question: "What does aria-live do?",
    code: `<div aria-live="polite">Status: Loading...</div>`,
    options: [
      "Makes content animated",
      "Announces dynamic content changes to screen readers without focus change",
      "Keeps the element always visible",
      "Updates the page title",
    ],
    correct: 1,
    explanation:
      'aria-live regions announce content changes to screen readers. "polite" waits for the user to be idle, "assertive" interrupts immediately. Essential for toast messages, loading states, form errors.',
  },
  {
    question: "What is the purpose of alt text on images?",
    options: [
      "SEO only",
      "Provides text alternative for screen readers and when images fail to load",
      "Captions displayed below images",
      "Tooltip on hover",
    ],
    correct: 1,
    explanation:
      'alt text describes an image for screen readers and broken images. Decorative images should have empty alt="" to be skipped. Informative images need descriptive alt text.',
  },
];

const performance: Question[] = [
  {
    question: "What are Core Web Vitals?",
    options: [
      "A React performance library",
      "Google metrics: LCP (loading), INP (interactivity), CLS (visual stability)",
      "Browser memory limits",
      "JavaScript execution benchmarks",
    ],
    correct: 1,
    explanation:
      "LCP (Largest Contentful Paint): < 2.5s. INP (Interaction to Next Paint): < 200ms. CLS (Cumulative Layout Shift): < 0.1. These are Google ranking signals and UX benchmarks.",
  },
  {
    question: "What is virtualization (windowing)?",
    options: [
      "Running React in a virtual machine",
      "Rendering only visible items in a long list, replacing DOM nodes as user scrolls",
      "Using the Virtual DOM more efficiently",
      "Server-side rendering",
    ],
    correct: 1,
    explanation:
      "Virtualization renders only visible rows (e.g., 20 of 10,000). As the user scrolls, off-screen items are removed and new ones are added. Libraries: react-window, react-virtuoso, TanStack Virtual.",
  },
  {
    question: "What is code splitting?",
    options: [
      "Writing code in multiple files",
      "Breaking the bundle into smaller chunks loaded on demand to reduce initial load time",
      "Splitting components into smaller components",
      "Using Git branches",
    ],
    correct: 1,
    explanation:
      "Code splitting uses dynamic import() to create separate bundle chunks. React.lazy + Suspense, route-based splitting, and lazy loading large libraries all reduce initial load.",
  },
  {
    question: "What is the difference between eager and lazy loading?",
    options: [
      "No difference",
      "Eager loads everything upfront; lazy defers loading until needed (on demand)",
      "Lazy is always better",
      "Eager is asynchronous",
    ],
    correct: 1,
    explanation:
      "Eager loading fetches resources immediately. Lazy loading defers until needed (e.g., images below fold, route components not yet visited). Lazy loading reduces initial page weight.",
  },
  {
    question: "What does the loading='lazy' attribute do on images?",
    code: `<img src="photo.jpg" loading="lazy" alt="Photo" />`,
    options: [
      "Makes the image load slower",
      "Defers loading until the image is near the viewport — native browser lazy loading",
      "Compresses the image",
      "Adds a placeholder",
    ],
    correct: 1,
    explanation:
      "Native lazy loading defers fetching off-screen images until the user scrolls near them. No JavaScript needed. Do NOT lazy-load above-the-fold images (LCP images).",
  },
  {
    question: "Why should you avoid layout thrashing?",
    options: [
      "It is a security risk",
      "Alternating reads and writes to DOM forces the browser to recalculate layout repeatedly, causing jank",
      "It breaks CSS animations",
      "It uses too much memory",
    ],
    correct: 1,
    explanation:
      "Reading layout properties (offsetHeight) then writing (style.height) in a loop forces synchronous reflows each iteration. Batch reads, then batch writes, or use requestAnimationFrame.",
  },
  {
    question: "What does React.memo NOT protect against?",
    options: [
      "Prop changes",
      "Internal state changes and context changes — the component still re-renders for these",
      "Parent re-renders",
      "Nothing — it prevents all re-renders",
    ],
    correct: 1,
    explanation:
      "React.memo only skips re-renders from parent when props are the same. If the component's own state changes or a consumed context changes, it still re-renders.",
  },
  {
    question: "What is the purpose of a web worker?",
    options: [
      "A service worker alternative",
      "Runs JavaScript in a background thread to avoid blocking the main thread",
      "A build tool",
      "A testing framework",
    ],
    correct: 1,
    explanation:
      "Web Workers run CPU-intensive JS in a background thread (parsing, image processing, etc.). They communicate with the main thread via postMessage and cannot access the DOM.",
  },
];

const jsAdvanced: Question[] = [
  {
    question: "What is a Proxy in JavaScript?",
    code: `const handler = {\n  get(target, prop) {\n    return prop in target ? target[prop] : "default"\n  }\n}\nconst obj = new Proxy({}, handler)`,
    options: [
      "A network proxy",
      "A wrapper that intercepts and customizes operations on objects (get, set, delete, etc.)",
      "A copy of an object",
      "A pattern for async operations",
    ],
    correct: 1,
    explanation:
      "Proxy intercepts fundamental operations (get, set, has, delete, etc.) on an object. Used for validation, logging, reactive systems (Vue 3 uses Proxy for reactivity).",
  },
  {
    question: "What is the difference between WeakMap and Map?",
    options: [
      "WeakMap is slower",
      "WeakMap keys must be objects and are weakly held — garbage collected when no other reference exists",
      "Map cannot store objects",
      "No practical difference",
    ],
    correct: 1,
    explanation:
      "WeakMap keys are weakly referenced — if no other reference to the key exists, the entry is garbage collected. Keys must be objects. Not iterable. Used for private data and caching without memory leaks.",
  },
  {
    question: "What does Object.freeze do vs Object.seal?",
    options: [
      "Same thing",
      "freeze: no add/delete/modify; seal: no add/delete but CAN modify existing properties",
      "seal is deeper than freeze",
      "freeze is recursive",
    ],
    correct: 1,
    explanation:
      "Object.freeze: cannot add, remove, or change properties (shallow). Object.seal: cannot add or remove but CAN change existing values. Neither is deep — nested objects are not affected.",
  },
  {
    question: "What is a Symbol used for?",
    code: `const id = Symbol("id")\nconst user = { [id]: 123, name: "Ian" }`,
    options: [
      "A special number type",
      "A unique, immutable primitive used for private-like properties and avoiding name collisions",
      "A way to create constants",
      "A string alternative",
    ],
    correct: 1,
    explanation:
      'Every Symbol() is unique. Properties keyed by Symbols are not enumerable in for...in or Object.keys(). Used for "hidden" properties, well-known protocols (Symbol.iterator), and avoiding collisions.',
  },
  {
    question: "What makes an object iterable?",
    code: `const range = {\n  [Symbol.iterator]() {\n    let i = 0\n    return { next: () => ({ value: i++, done: i > 3 }) }\n  }\n}`,
    options: [
      "Having a length property",
      "Implementing the Symbol.iterator protocol — returning an object with a next() method",
      "Being an array",
      "Having a forEach method",
    ],
    correct: 1,
    explanation:
      "Any object with a [Symbol.iterator] method is iterable. The method returns an iterator with next() → { value, done }. This enables for...of, spread, destructuring, and Array.from().",
  },
  {
    question: "What causes memory leaks in JavaScript?",
    options: [
      "Using too many variables",
      "Forgotten timers/listeners, closures holding references, detached DOM nodes, global variables",
      "Not using garbage collection",
      "Using const instead of let",
    ],
    correct: 1,
    explanation:
      "Common leaks: setInterval never cleared, event listeners never removed, closures capturing large objects, detached DOM nodes still referenced, accidental globals. Use DevTools heap profiling to find them.",
  },
  {
    question: "What is the difference between for...in and for...of?",
    options: [
      "No difference",
      "for...in iterates over enumerable property KEYS (strings); for...of iterates over iterable VALUES",
      "for...of works on objects; for...in works on arrays",
      "for...in is faster",
    ],
    correct: 1,
    explanation:
      "for...in: iterates string keys (including inherited enumerable props) — use for objects. for...of: iterates values of iterables (arrays, strings, Maps, Sets) — never use on plain objects.",
  },
  {
    question: "What is optional chaining and nullish coalescing?",
    code: `const city = user?.address?.city ?? "Unknown"`,
    options: [
      "Same as && and ||",
      "?. safely accesses nested props (returns undefined if null/undefined); ?? provides fallback only for null/undefined (not falsy)",
      "?. throws on undefined; ?? catches errors",
      "New React syntax",
    ],
    correct: 1,
    explanation:
      '?. short-circuits to undefined on null/undefined access (no TypeError). ?? differs from || because it only falls back on null/undefined — 0 ?? "default" gives 0, but 0 || "default" gives "default".',
  },
  {
    question: "What does structuredClone NOT handle?",
    options: [
      "Nested objects",
      "Functions, DOM nodes, and objects with prototype chains",
      "Arrays",
      "Dates",
    ],
    correct: 1,
    explanation:
      "structuredClone cannot clone functions, DOM nodes, Error objects, or objects with class prototypes (they lose their prototype). It handles plain objects, arrays, Maps, Sets, Dates, RegExp, Blobs.",
  },
];

const codeInput: Question[] = [
  {
    type: "code-input",
    question:
      "Write an arrow function that takes two numbers and returns their sum.",
    answer: `const sum = (a: number, b: number): number => a + b`,
    explanation:
      "Arrow function with implicit return: const sum = (a: number, b: number): number => a + b. No curly braces means the expression is returned automatically.",
  },
  {
    type: "code-input",
    question: "Write a generic identity function in TypeScript.",
    answer: `function identity<T>(value: T): T { return value }`,
    explanation:
      "A generic identity function: function identity<T>(value: T): T { return value }. The type parameter T is inferred from the argument.",
  },
  {
    type: "code-input",
    question: "Write a type that extracts the resolved type from a Promise.",
    answer: `type Unwrap<T> = T extends Promise<infer U> ? U : T`,
    explanation:
      "Use conditional types with infer: type Unwrap<T> = T extends Promise<infer U> ? U : T. Unwrap<Promise<string>> gives string.",
  },
  {
    type: "code-input",
    question: "Write a custom hook that tracks window width.",
    answer: `function useWindowWidth() {\n  const [width, setWidth] = useState(window.innerWidth)\n  useEffect(() => {\n    const handler = () => setWidth(window.innerWidth)\n    window.addEventListener("resize", handler)\n    return () => window.removeEventListener("resize", handler)\n  }, [])\n  return width\n}`,
    explanation:
      "A custom hook combining useState + useEffect with proper cleanup. The event listener is added on mount and removed on unmount via the cleanup function.",
  },
  {
    type: "code-input",
    question: "Write a debounce function in TypeScript.",
    answer: `function debounce<T extends (...args: any[]) => void>(fn: T, ms: number) {\n  let timer: ReturnType<typeof setTimeout>\n  return (...args: Parameters<T>) => {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn(...args), ms)\n  }\n}`,
    explanation:
      "Debounce clears the previous timer on each call, only firing after ms of inactivity. Uses generics for type safety, ReturnType for the timer, and Parameters to preserve the original argument types.",
  },
  {
    type: "code-input",
    question: "Fetch data in a useEffect with proper AbortController cleanup.",
    answer: `useEffect(() => {\n  const controller = new AbortController()\n  fetch(url, { signal: controller.signal })\n    .then(r => r.json())\n    .then(setData)\n    .catch(e => { if (e.name !== \"AbortError\") setError(e) })\n  return () => controller.abort()\n}, [url])`,
    explanation:
      "Create AbortController, pass signal to fetch, abort in the cleanup function. Catch AbortError separately — it is expected when the effect re-runs or the component unmounts.",
  },
  {
    type: "code-input",
    question:
      "Write a TypeScript discriminated union for an API response (loading, success, error).",
    answer: `type ApiState<T> =\n  | { status: \"loading\" }\n  | { status: \"success\"; data: T }\n  | { status: \"error\"; error: string }`,
    explanation:
      'A discriminated union with "status" as the tag. TypeScript narrows the type in switch/if blocks — if status === "success", you can access data. If "error", you can access error.',
  },
  {
    type: "code-input",
    question: "Write a type-safe event handler for an input onChange in React.",
    answer: `const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n  setValue(e.target.value)\n}`,
    explanation:
      "React.ChangeEvent<HTMLInputElement> provides type-safe access to e.target.value. Each HTML element has its own event type. For forms: React.FormEvent<HTMLFormElement>.",
  },
  {
    type: "code-input",
    question:
      "Write a generic React component that renders a list of items with a render prop.",
    answer: `function List<T>({ items, renderItem }: {\n  items: T[]\n  renderItem: (item: T) => React.ReactNode\n}) {\n  return <>{items.map((item, i) => <div key={i}>{renderItem(item)}</div>)}</>\n}`,
    explanation:
      "Generic component with a render prop. T is inferred from the items array. The caller decides how each item is rendered while the List handles iteration.",
  },
  {
    type: "code-input",
    question: "Write a throttle function in TypeScript.",
    answer: `function throttle<T extends (...args: any[]) => void>(fn: T, ms: number) {\n  let last = 0\n  return (...args: Parameters<T>) => {\n    const now = Date.now()\n    if (now - last >= ms) {\n      last = now\n      fn(...args)\n    }\n  }\n}`,
    explanation:
      "Throttle tracks the last invocation time and only fires if enough time has passed. Unlike debounce, it fires immediately on first call and at regular intervals during sustained activity.",
  },
  {
    type: "code-input",
    question:
      "Write a type that makes specific properties of T required while keeping the rest optional.",
    answer: `type RequireKeys<T, K extends keyof T> = Omit<Partial<T>, K> & Required<Pick<T, K>>`,
    explanation:
      "Combine utility types: make everything Partial, Omit the required keys from that, then intersect with Required<Pick<T, K>> to force those specific keys to be required.",
  },
  {
    type: "code-input",
    question:
      "Write a React component with forwardRef that exposes a focus() method via useImperativeHandle.",
    answer: `const FancyInput = forwardRef<{ focus: () => void }, Props>((props, ref) => {\n  const inputRef = useRef<HTMLInputElement>(null)\n  useImperativeHandle(ref, () => ({\n    focus: () => inputRef.current?.focus()\n  }))\n  return <input ref={inputRef} {...props} />\n})`,
    explanation:
      "forwardRef passes the ref from parent. useImperativeHandle customizes what the parent sees — here only a focus() method, not the raw DOM node. This is a clean API boundary.",
  },
];

export const categories: QuizCategory[] = [
  { id: "all", label: "All Topics", questions: [] },
  { id: "js-gotchas", label: "JS Gotchas", questions: jsGotchas },
  { id: "js-concepts", label: "JS Concepts", questions: jsConcepts },
  { id: "js-advanced", label: "JS Advanced", questions: jsAdvanced },
  { id: "async", label: "Async Patterns", questions: asyncPatterns },
  { id: "typescript", label: "TypeScript", questions: typescript },
  { id: "ts-advanced", label: "TS Advanced", questions: tsAdvanced },
  { id: "react", label: "React", questions: react },
  { id: "react-advanced", label: "React Advanced", questions: reactAdvanced },
  { id: "css", label: "CSS & Styling", questions: css },
  { id: "testing", label: "Testing", questions: testing },
  { id: "web-apis", label: "Web APIs & Browser", questions: webAPIs },
  { id: "security", label: "Security", questions: security },
  { id: "a11y", label: "Accessibility", questions: a11y },
  { id: "performance", label: "Performance", questions: performance },
  { id: "code-input", label: "Write Code", questions: codeInput },
  { id: "node", label: "Node.js", questions: node },
];

// AWS DVA-C02 Quiz Questions
const awsInfrastructure: Question[] = [
  {
    question: "Is IAM a global or regional service?",
    options: ["Regional", "Global", "AZ-specific", "Edge Location specific"],
    correct: 1,
    explanation:
      "IAM is a Global service. Users, groups, roles, and policies are not region-specific.",
  },
  {
    question: "How many Availability Zones does a Region typically have?",
    options: ["1-2", "2-6", "5-10", "10-15"],
    correct: 1,
    explanation:
      "Each Region has 2-6 AZs. Each AZ consists of one or more data centers with independent power, networking, and connectivity.",
  },
  {
    question: "Which of the following is a global AWS service?",
    options: ["EC2", "RDS", "CloudFront", "EBS"],
    correct: 2,
    explanation:
      "CloudFront is a global service. IAM, Route 53, CloudFront, and WAF are global services, while EC2, RDS, and EBS are regional.",
  },
];

const awsIAM: Question[] = [
  {
    question: "Can an IAM group contain another group?",
    options: [
      "Yes, unlimited nesting",
      "Yes, up to 3 levels",
      "No, groups can only contain users",
      "Yes, but only within the same account",
    ],
    correct: 2,
    explanation:
      "IAM groups can only contain users, not other groups. You cannot nest groups.",
  },
  {
    question: "What are IAM Roles primarily used for?",
    options: [
      "Human users only",
      "AWS services and applications",
      "Groups of users",
      "Password policies",
    ],
    correct: 1,
    explanation:
      "IAM Roles grant permissions to AWS services (e.g., EC2, Lambda) to perform actions on your behalf.",
  },
  {
    question:
      "Which IAM security tool provides a CSV report of all users and their credential status?",
    options: [
      "Access Advisor",
      "Credentials Report",
      "IAM Dashboard",
      "Policy Simulator",
    ],
    correct: 1,
    explanation:
      "The Credentials Report is a CSV of all users and their credential status. Access Advisor shows service access history per user.",
  },
];

const awsEC2: Question[] = [
  {
    question:
      "You're trying to SSH into your EC2 and getting a timeout. What's the most likely issue?",
    options: [
      "Instance not running",
      "Security Group",
      "Wrong key pair",
      "Instance type",
    ],
    correct: 1,
    explanation:
      "Timeout = Security Group issue. If you get a timeout (not connection refused), it's almost always a security group issue. Check inbound rules for port 22.",
  },
  {
    question:
      "Which EC2 purchasing option offers up to 90% discount but can be interrupted?",
    options: [
      "Reserved Instances",
      "On-Demand",
      "Spot Instances",
      "Dedicated Hosts",
    ],
    correct: 2,
    explanation:
      "Spot Instances offer up to 90% discount but AWS can reclaim them when the spot price exceeds your bid. Never use for critical workloads.",
  },
  {
    question:
      "What is the difference between Dedicated Host and Dedicated Instance?",
    options: [
      "No difference",
      "Dedicated Host gives full server control; Dedicated Instance doesn't",
      "Dedicated Instance is cheaper",
      "Dedicated Host doesn't support Windows",
    ],
    correct: 1,
    explanation:
      "Dedicated Host gives full server control, see sockets/cores (for BYOL licensing). Dedicated Instance provides dedicated hardware but no host visibility.",
  },
  {
    question:
      "Which EC2 instance type prefix is best for compute-intensive workloads like batch processing?",
    options: ["t3", "r5", "c5", "m5"],
    correct: 2,
    explanation:
      "C5 (compute-optimized) is best for batch processing, high-performance computing. R5 is memory-optimized, T3/M5 are general purpose.",
  },
];

const awsStorage: Question[] = [
  {
    question:
      "What happens to Instance Store data when you stop an EC2 instance?",
    options: [
      "Data is preserved",
      "Data is backed up to S3",
      "Data is lost",
      "Data is encrypted",
    ],
    correct: 2,
    explanation:
      "Instance Store is ephemeral. Data is lost on stop, terminate, or hardware failure. You are responsible for backups/replication.",
  },
  {
    question: "Which EBS volume types can be used as boot volumes?",
    options: [
      "All types",
      "SSD types only (gp2, gp3, io1, io2)",
      "HDD types only (st1, sc1)",
      "Only gp2",
    ],
    correct: 1,
    explanation:
      "Only SSD types (gp2, gp3, io1, io2) can be boot volumes. HDD types (st1, sc1) cannot be boot volumes.",
  },
  {
    question: "What is the maximum IOPS for gp3 volumes?",
    options: ["3,000", "16,000", "64,000", "256,000"],
    correct: 1,
    explanation:
      "gp3 can provision up to 16,000 IOPS independently of volume size. io2 Block Express can go up to 256,000 IOPS.",
  },
  {
    question: "Can you attach an EBS volume to multiple EC2 instances?",
    options: [
      "Yes, all types",
      "No, never",
      "Only io1/io2 with Multi-Attach",
      "Only gp3",
    ],
    correct: 2,
    explanation:
      "Only io1/io2 volumes support Multi-Attach, allowing up to 16 instances in the same AZ.",
  },
  {
    question: "EFS is compatible with which operating systems?",
    options: ["Windows and Linux", "Linux only", "Windows only", "MacOS only"],
    correct: 1,
    explanation:
      "EFS is POSIX-compliant and compatible with Linux only, not Windows.",
  },
  {
    question: "Is EBS regional or AZ-specific?",
    options: ["Global", "Regional", "AZ-specific", "Edge Location"],
    correct: 2,
    explanation:
      "EBS volumes are bound to a single Availability Zone. To use in another AZ, create a snapshot and restore.",
  },
];

const awsAMI: Question[] = [
  {
    question: "Are AMIs region-specific or global?",
    options: ["Global", "Region-specific", "AZ-specific", "Account-specific"],
    correct: 1,
    explanation:
      "AMIs are region-specific. You must copy an AMI to use it in another region.",
  },
];

const awsELBASG: Question[] = [
  {
    question: "What does ELB stand for and is it a load balancer type?",
    options: [
      "Elastic Load Balancer - yes, it's a LB type",
      "Elastic Load Balancing - it's the service name, not a LB type",
      "Enhanced Load Balancer - legacy LB type",
      "Enterprise Load Balancing - premium service",
    ],
    correct: 1,
    explanation:
      "ELB = Elastic Load Balancing, the service name. Actual LB types are ALB, NLB, GLB, CLB (Classic).",
  },
  {
    question: "Which load balancer provides a static IP address?",
    options: ["ALB", "NLB", "CLB", "GLB"],
    correct: 1,
    explanation:
      "NLB provides one static IP per AZ and supports Elastic IPs. ALB only provides a static DNS hostname.",
  },
  {
    question: "NLB operates at which OSI layer?",
    options: ["Layer 3", "Layer 4", "Layer 7", "Layer 2"],
    correct: 1,
    explanation:
      "NLB operates at Layer 4 (Transport: TCP, UDP). ALB operates at Layer 7 (Application: HTTP, HTTPS).",
  },
  {
    question: "Will ELB terminate an unhealthy target?",
    options: [
      "Yes, immediately",
      "Yes, after cooldown",
      "No, it only stops routing traffic",
      "Yes, after 3 failed checks",
    ],
    correct: 2,
    explanation:
      "ELB only stops routing traffic to unhealthy targets. ASG with ELB health checks enabled will terminate/replace unhealthy instances.",
  },
  {
    question: "Is Cross-Zone Load Balancing enabled by default for ALB?",
    options: [
      "No",
      "Yes, and it's free",
      "Yes, but it costs extra",
      "Only in certain regions",
    ],
    correct: 1,
    explanation:
      "Cross-Zone Load Balancing is enabled by default for ALB and is free. NLB has it disabled by default and charges if enabled.",
  },
  {
    question: "What is the default ASG cooldown period?",
    options: ["60 seconds", "180 seconds", "300 seconds", "600 seconds"],
    correct: 2,
    explanation:
      "Default cooldown is 300 seconds (5 minutes). It prevents rapid successive scaling actions.",
  },
  {
    question: "What scaling policy uses ML to predict load patterns?",
    options: [
      "Target Tracking",
      "Step Scaling",
      "Predictive Scaling",
      "Scheduled Scaling",
    ],
    correct: 2,
    explanation:
      "Predictive Scaling uses ML to analyze historical load patterns and pre-provision capacity ahead of predicted spikes.",
  },
];

const awsRDS: Question[] = [
  {
    question: "Read Replicas use sync or async replication?",
    options: ["Synchronous", "Asynchronous", "Both", "Depends on region"],
    correct: 1,
    explanation:
      "Read Replicas use ASYNC replication. Data is eventually consistent across read replicas.",
  },
  {
    question: "Multi-AZ uses sync or async replication?",
    options: [
      "Synchronous",
      "Asynchronous",
      "Both",
      "Depends on database engine",
    ],
    correct: 0,
    explanation:
      "Multi-AZ uses SYNC replication. Changes are immediately replicated to standby for disaster recovery.",
  },
  {
    question: "Can you read from a Multi-AZ standby database?",
    options: [
      "Yes",
      "No, standby is only for failover",
      "Only during maintenance",
      "Only with specific engines",
    ],
    correct: 1,
    explanation:
      "You cannot read from Multi-AZ standby. It's only for failover. Use Read Replicas for read scaling.",
  },
  {
    question: "What's the failover time for Aurora?",
    options: ["Less than 30 seconds", "1-2 minutes", "5 minutes", "10 minutes"],
    correct: 0,
    explanation:
      "Aurora failover is less than 30 seconds. Aurora maintains 6 copies across 3 AZs.",
  },
  {
    question: "How do you encrypt an existing unencrypted RDS database?",
    options: [
      "Enable encryption in console",
      "Snapshot → Copy with encryption → Restore",
      "Use AWS CLI to enable",
      "Cannot be done",
    ],
    correct: 1,
    explanation:
      "To encrypt an unencrypted DB: take a snapshot, copy it with encryption enabled, then restore from the encrypted snapshot.",
  },
  {
    question: "Is RDS Proxy publicly accessible?",
    options: [
      "Yes",
      "No, VPC only",
      "Only with specific configuration",
      "Only for Aurora",
    ],
    correct: 1,
    explanation:
      "RDS Proxy lives inside your VPC only and is never publicly accessible. Great for Lambda connections.",
  },
];

const awsLambda: Question[] = [
  {
    question: "What is the maximum Lambda execution timeout?",
    options: ["5 minutes", "10 minutes", "15 minutes", "30 minutes"],
    correct: 2,
    explanation: "Maximum Lambda timeout is 15 minutes (900 seconds).",
  },
  {
    question: "What is the maximum Lambda memory allocation?",
    options: ["3,008 MB", "5,120 MB", "10,240 MB", "16,384 MB"],
    correct: 2,
    explanation:
      "Maximum Lambda memory is 10,240 MB (10 GB). CPU scales proportionally with memory.",
  },
  {
    question: "What is the /tmp directory size limit in Lambda?",
    options: ["512 MB", "1 GB", "5 GB", "10 GB"],
    correct: 3,
    explanation:
      "/tmp storage can be configured from 512 MB up to 10,240 MB (10 GB) for temporary file processing.",
  },
  {
    question: "How many retries does Lambda do for async invocations?",
    options: ["0", "1", "2", "3"],
    correct: 2,
    explanation:
      "Lambda retries async invocations 2 times (3 total attempts). Failed events can go to DLQ or on-failure destination.",
  },
  {
    question: "How many Lambda Layers can you attach to a function?",
    options: ["2", "5", "10", "Unlimited"],
    correct: 1,
    explanation:
      "You can attach up to 5 layers per function. Total unzipped size must be < 250 MB.",
  },
  {
    question:
      "What happens to Lambda when configured in VPC without NAT Gateway?",
    options: [
      "Works normally",
      "Has no internet access",
      "Fails to deploy",
      "Can only access S3",
    ],
    correct: 1,
    explanation:
      "Lambda in VPC has no internet unless you have NAT Gateway. By default, Lambda runs in AWS-managed VPC with internet.",
  },
];

const awsAPIGateway: Question[] = [
  {
    question: "What are the three API Gateway endpoint types?",
    options: [
      "Public, Private, Internal",
      "Edge-optimized, Regional, Private",
      "Standard, Premium, Enterprise",
      "HTTP, REST, WebSocket",
    ],
    correct: 1,
    explanation:
      "The three endpoint types are: Edge-optimized (uses CloudFront), Regional, and Private (VPC only via endpoint).",
  },
  {
    question: "What is the API Gateway default timeout?",
    options: ["15 seconds", "29 seconds", "60 seconds", "300 seconds"],
    correct: 1,
    explanation:
      "API Gateway timeout is 29 seconds maximum. Cannot exceed this even if Lambda timeout is higher.",
  },
  {
    question:
      "Which API type is cheaper and simpler for basic Lambda integrations?",
    options: ["REST API", "HTTP API", "WebSocket API", "Private API"],
    correct: 1,
    explanation:
      "HTTP API is ~70% cheaper than REST API, simpler, and faster. REST API has more features (caching, request validation, usage plans).",
  },
  {
    question:
      "What HTTP status code is returned when API Gateway throttles requests?",
    options: ["400", "403", "429", "503"],
    correct: 2,
    explanation:
      "429 Too Many Requests is returned when throttled. Client should retry with exponential backoff.",
  },
];

const awsDynamoDB: Question[] = [
  {
    question: "What are the two capacity modes in DynamoDB?",
    options: [
      "Standard and Premium",
      "Provisioned and On-Demand",
      "Reserved and Spot",
      "Basic and Advanced",
    ],
    correct: 1,
    explanation:
      "Provisioned (set RCU/WCU) and On-Demand (pay per request) are the two capacity modes.",
  },
  {
    question: "What is the maximum item size in DynamoDB?",
    options: ["64 KB", "256 KB", "400 KB", "1 MB"],
    correct: 2,
    explanation: "Maximum item size is 400 KB per item.",
  },
  {
    question: "What's the difference between Query and Scan?",
    options: [
      "No difference",
      "Query uses partition key efficiently; Scan reads entire table",
      "Scan is faster",
      "Query doesn't use indexes",
    ],
    correct: 1,
    explanation:
      "Query efficiently uses partition key (and optionally sort key). Scan reads entire table and is expensive - avoid in production.",
  },
  {
    question: "When can a Local Secondary Index (LSI) be created?",
    options: [
      "Anytime",
      "Only at table creation",
      "Only after table has data",
      "Only when table is empty",
    ],
    correct: 1,
    explanation:
      "LSI must be created at table creation. GSI can be added anytime. LSI shares table throughput; GSI has separate throughput.",
  },
  {
    question: "What is DAX (DynamoDB Accelerator)?",
    options: [
      "Backup service",
      "In-memory cache for DynamoDB",
      "Analytics tool",
      "Migration service",
    ],
    correct: 1,
    explanation:
      "DAX is an in-memory cache providing microsecond latency (vs milliseconds). It's a drop-in replacement with the same API.",
  },
  {
    question:
      "How many RCU are needed for 1 strongly consistent read per second of a 4 KB item?",
    options: ["0.5", "1", "2", "4"],
    correct: 1,
    explanation:
      "1 RCU = 1 strongly consistent read/sec for items up to 4 KB. Eventually consistent reads use 0.5 RCU.",
  },
];

const awsS3: Question[] = [
  {
    question: "What is the maximum object size in S3?",
    options: ["100 GB", "1 TB", "5 TB", "Unlimited"],
    correct: 2,
    explanation:
      "Maximum object size is 5 TB. Use multipart upload for objects > 100 MB (required > 5 GB).",
  },
  {
    question: "What is S3 Transfer Acceleration?",
    options: [
      "Faster deletion of objects",
      "Uses CloudFront edge locations to speed up uploads",
      "Compresses objects automatically",
      "Replicates to multiple regions",
    ],
    correct: 1,
    explanation:
      "S3 Transfer Acceleration uses CloudFront edge locations to speed up uploads over long distances.",
  },
  {
    question:
      "What's the difference between S3 Standard-IA and S3 One Zone-IA?",
    options: [
      "No difference",
      "Standard-IA is Multi-AZ; One Zone-IA is single AZ",
      "One Zone-IA is more durable",
      "Standard-IA doesn't support versioning",
    ],
    correct: 1,
    explanation:
      "Standard-IA stores data across multiple AZs. One Zone-IA is single AZ, cheaper, but data is lost if AZ fails.",
  },
  {
    question: "Which S3 encryption type provides audit trail in CloudTrail?",
    options: ["SSE-S3", "SSE-KMS", "SSE-C", "Client-side"],
    correct: 1,
    explanation:
      "SSE-KMS provides audit trail because each encryption/decryption is a KMS API call logged in CloudTrail.",
  },
  {
    question: "What is S3 Object Lock?",
    options: [
      "Password protection",
      "WORM model preventing deletion/modification",
      "Access control list",
      "Cross-region lock",
    ],
    correct: 1,
    explanation:
      "S3 Object Lock implements WORM (Write Once Read Many), preventing object deletion/modification for a retention period.",
  },
];

const awsSQSSNS: Question[] = [
  {
    question: "What is the default visibility timeout for SQS?",
    options: ["15 seconds", "30 seconds", "60 seconds", "5 minutes"],
    correct: 1,
    explanation:
      "Default visibility timeout is 30 seconds. This is the time a message is hidden after being read.",
  },
  {
    question: "What is the maximum retention period for SQS messages?",
    options: ["1 day", "7 days", "14 days", "30 days"],
    correct: 2,
    explanation: "Maximum retention is 14 days. Default is 4 days.",
  },
  {
    question: "What's the difference between Standard and FIFO SQS queues?",
    options: [
      "No difference",
      "Standard: unlimited throughput, at-least-once; FIFO: 300 msg/s, exactly-once, strict ordering",
      "FIFO has better throughput",
      "Standard guarantees ordering",
    ],
    correct: 1,
    explanation:
      "Standard has unlimited throughput with best-effort ordering. FIFO guarantees order and exactly-once delivery at 300 msg/s (3000 with batching).",
  },
  {
    question: "What is the SNS + SQS fan-out pattern?",
    options: [
      "SNS topic receives from multiple SQS queues",
      "SNS topic pushes to multiple SQS queues for parallel processing",
      "SQS queues send to SNS",
      "SNS replaces SQS",
    ],
    correct: 1,
    explanation:
      "Fan-out: SNS topic pushes to multiple SQS queues. Enables parallel processing with different consumption rates.",
  },
  {
    question: "What is a Dead Letter Queue (DLQ)?",
    options: [
      "Queue for deleted messages",
      "Queue for messages that failed processing after max retries",
      "Backup queue",
      "Priority queue",
    ],
    correct: 1,
    explanation:
      "DLQ stores messages that failed processing after maxReceiveCount attempts. Helps debug failures.",
  },
];

const awsCICD: Question[] = [
  {
    question: "What is the buildspec.yml file?",
    options: [
      "CodeDeploy configuration",
      "CodeBuild configuration defining build phases and artifacts",
      "CodePipeline configuration",
      "CloudFormation template",
    ],
    correct: 1,
    explanation:
      "buildspec.yml is CodeBuild configuration. It defines build phases (install, pre_build, build, post_build) and artifacts.",
  },
  {
    question: "What is the appspec.yml file used for?",
    options: [
      "CodeBuild",
      "CodeDeploy lifecycle hooks and file mappings",
      "CodePipeline",
      "CodeCommit",
    ],
    correct: 1,
    explanation:
      "appspec.yml is CodeDeploy configuration. It defines deployment lifecycle hooks and file mappings.",
  },
  {
    question: "What deployment types does CodeDeploy support for Lambda?",
    options: [
      "In-place and Blue/Green",
      "AllAtOnce, Canary, Linear",
      "Rolling only",
      "Immutable only",
    ],
    correct: 1,
    explanation:
      "Lambda deployments: AllAtOnce (immediate), Canary (x% then 100%), Linear (x% every n minutes).",
  },
  {
    question: "What deployment types does CodeDeploy support for EC2?",
    options: [
      "AllAtOnce only",
      "In-place and Blue/Green",
      "Canary and Linear",
      "Rolling only",
    ],
    correct: 1,
    explanation:
      "EC2/On-premises: In-place (rolling update) and Blue/Green (traffic shift to new instances via ASG swap).",
  },
];

const awsCloudFormation: Question[] = [
  {
    question:
      "What is the intrinsic function to reference another resource in CloudFormation?",
    options: ["!GetAtt", "!Ref", "!Sub", "!Import"],
    correct: 1,
    explanation:
      "!Ref (or Ref:) returns the physical ID of the resource or parameter value.",
  },
  {
    question: "What does !GetAtt do in CloudFormation?",
    options: [
      "References a parameter",
      "Gets an attribute from a resource",
      "Imports from another stack",
      "Joins strings",
    ],
    correct: 1,
    explanation:
      "!GetAtt gets an attribute from a resource, e.g., !GetAtt MyBucket.Arn returns the bucket's ARN.",
  },
  {
    question: "What is AWS SAM?",
    options: [
      "Security management service",
      "Simplified CloudFormation for serverless",
      "Server application model",
      "Storage access management",
    ],
    correct: 1,
    explanation:
      "SAM = Serverless Application Model. It's simplified CloudFormation for Lambda, API Gateway, DynamoDB.",
  },
  {
    question: "What command packages and deploys a SAM application?",
    options: [
      "sam create && sam run",
      "sam build && sam deploy",
      "sam package && sam install",
      "sam init && sam start",
    ],
    correct: 1,
    explanation:
      "sam build compiles/packages, then sam deploy (or sam deploy --guided for interactive) deploys to AWS.",
  },
];

const awsCloudWatch: Question[] = [
  {
    question: "What is the minimum resolution for CloudWatch custom metrics?",
    options: ["1 second", "10 seconds", "30 seconds", "1 minute"],
    correct: 0,
    explanation:
      "High-resolution metrics support 1 second resolution. Standard resolution is 1 minute.",
  },
  {
    question: "How long are CloudWatch Logs retained by default?",
    options: ["7 days", "30 days", "90 days", "Forever"],
    correct: 3,
    explanation:
      "CloudWatch Logs never expire by default. You must configure a retention policy (1 day to 10 years) to auto-delete.",
  },
  {
    question:
      "Which EC2 metric is NOT included by default and requires CloudWatch Agent?",
    options: [
      "CPU Utilization",
      "Network In/Out",
      "Memory Utilization",
      "Disk Read/Write Operations",
    ],
    correct: 2,
    explanation:
      "Memory and disk space usage require CloudWatch Agent. Default metrics include CPU, network, and disk operations.",
  },
];

const awsXRay: Question[] = [
  {
    question: "What is X-Ray used for?",
    options: [
      "Log aggregation",
      "Distributed tracing and performance analysis",
      "Security scanning",
      "Cost optimization",
    ],
    correct: 1,
    explanation:
      "X-Ray provides distributed tracing to visualize requests through your application and debug latency issues.",
  },
  {
    question: "What are X-Ray annotations vs metadata?",
    options: [
      "No difference",
      "Annotations are indexed/searchable; metadata is not",
      "Metadata is searchable; annotations are not",
      "Annotations are for errors only",
    ],
    correct: 1,
    explanation:
      "Annotations are indexed key-value pairs that are searchable. Metadata is non-indexed additional data.",
  },
];

const awsCognito: Question[] = [
  {
    question:
      "What's the difference between Cognito User Pools and Identity Pools?",
    options: [
      "No difference",
      "User Pools: authentication (JWT tokens); Identity Pools: authorization (AWS credentials)",
      "Identity Pools: authentication; User Pools: authorization",
      "User Pools for mobile only",
    ],
    correct: 1,
    explanation:
      "User Pools handle authentication (sign-up, sign-in, JWT tokens). Identity Pools handle authorization (exchange tokens for temporary AWS credentials).",
  },
  {
    question: "How do you authenticate API Gateway with Cognito?",
    options: [
      "IAM roles",
      "Cognito User Pool Authorizer",
      "API keys",
      "Lambda authorizer only",
    ],
    correct: 1,
    explanation:
      "Use Cognito User Pool Authorizer to validate JWT tokens from User Pool. API Gateway also supports Lambda and IAM authorizers.",
  },
];

const awsKMS: Question[] = [
  {
    question: "What are the two types of KMS keys?",
    options: [
      "Public and Private",
      "AWS managed and Customer managed",
      "Symmetric and Asymmetric",
      "Standard and Premium",
    ],
    correct: 1,
    explanation:
      "AWS managed keys (aws/service-name, free, auto-rotation) and Customer managed keys (you control rotation, policies, cost per key).",
  },
  {
    question: "What is envelope encryption?",
    options: [
      "Encrypting email attachments",
      "Data encrypted with data key, data key encrypted with KMS key",
      "Double encryption with two KMS keys",
      "Encryption at rest and in transit",
    ],
    correct: 1,
    explanation:
      "Envelope encryption: Data is encrypted with a Data Encryption Key (DEK), and the DEK is encrypted with a KMS key. Used for data > 4 KB.",
  },
  {
    question: "What does the GenerateDataKey API return?",
    options: [
      "Only encrypted data key",
      "Plaintext data key and encrypted copy",
      "KMS key ID",
      "Random bytes",
    ],
    correct: 1,
    explanation:
      "GenerateDataKey returns both plaintext DEK and encrypted DEK. Use plaintext to encrypt data, store encrypted key with data.",
  },
];

const awsEventBridge: Question[] = [
  {
    question: "What is EventBridge (formerly CloudWatch Events)?",
    options: [
      "Log aggregation service",
      "Serverless event bus routing events to targets",
      "Message queue",
      "Notification service",
    ],
    correct: 1,
    explanation:
      "EventBridge is a serverless event bus. Route events from AWS services, SaaS apps, custom apps to targets (Lambda, SQS, etc.).",
  },
  {
    question: "What are the two types of EventBridge rules?",
    options: [
      "Standard and FIFO",
      "Event Pattern and Schedule",
      "Push and Pull",
      "Sync and Async",
    ],
    correct: 1,
    explanation:
      "Event Pattern rules match events by pattern (source, detail-type, etc.). Schedule rules use cron or rate expressions.",
  },
];

const awsStepFunctions: Question[] = [
  {
    question: "What is the maximum duration for Standard Step Functions?",
    options: ["5 minutes", "15 minutes", "1 hour", "1 year"],
    correct: 3,
    explanation:
      "Standard workflows can run up to 1 year. Express workflows are limited to 5 minutes but handle high-volume events.",
  },
  {
    question:
      "Which Step Functions state type allows branching based on conditions?",
    options: ["Task", "Choice", "Parallel", "Map"],
    correct: 1,
    explanation:
      "Choice state enables branching based on conditions. Task executes work, Parallel runs branches simultaneously, Map iterates over arrays.",
  },
];

const awsKinesis: Question[] = [
  {
    question:
      "What's the difference between Kinesis Data Streams and Firehose?",
    options: [
      "No difference",
      "Streams: real-time, provision shards; Firehose: near real-time, auto-scaling",
      "Firehose is faster",
      "Streams doesn't retain data",
    ],
    correct: 1,
    explanation:
      "Data Streams: ~200ms latency, provision shards, custom consumers, 1-365 day retention. Firehose: 60-900s buffer, auto-scales, built-in destinations.",
  },
  {
    question: "What is the write capacity per Kinesis shard?",
    options: ["500 KB/s", "1 MB/s", "2 MB/s", "5 MB/s"],
    correct: 1,
    explanation:
      "Each shard supports 1 MB/s (or 1,000 records/s) write and 2 MB/s read.",
  },
];

const awsContainers: Question[] = [
  {
    question: "What's the difference between ECS EC2 and Fargate launch types?",
    options: [
      "No difference",
      "EC2: you manage instances; Fargate: serverless",
      "Fargate is cheaper",
      "EC2 doesn't support Docker",
    ],
    correct: 1,
    explanation:
      "EC2 launch type: you manage EC2 instances. Fargate: serverless, AWS manages infrastructure, pay per vCPU + memory.",
  },
  {
    question:
      "What's the difference between ECS Task Role and Task Execution Role?",
    options: [
      "No difference",
      "Task Role: app permissions; Execution Role: ECS agent permissions",
      "Execution Role: app permissions; Task Role: ECS agent permissions",
      "Task Role is for EC2 only",
    ],
    correct: 1,
    explanation:
      "Task Role = what the container application can do (S3, DynamoDB access). Execution Role = what ECS agent can do (pull images, send logs).",
  },
];

const awsElastiCache: Question[] = [
  {
    question:
      "What's the difference between Redis and Memcached in ElastiCache?",
    options: [
      "No difference",
      "Redis: Multi-AZ, persistence, complex data; Memcached: simple, multi-threaded",
      "Memcached supports replication",
      "Redis doesn't support clustering",
    ],
    correct: 1,
    explanation:
      "Redis: Multi-AZ, auto failover, replication, persistence, complex data structures. Memcached: simple key-value, multi-threaded, horizontal scaling.",
  },
  {
    question: "What is Lazy Loading (Cache-Aside) pattern?",
    options: [
      "Write to cache on every DB write",
      "Check cache first, fetch from DB on miss, store in cache",
      "Pre-load all data into cache",
      "Write to cache only",
    ],
    correct: 1,
    explanation:
      "Lazy Loading: App checks cache → on miss, fetches from DB → stores in cache → returns. Only requested data is cached.",
  },
  {
    question: "What is the main drawback of Lazy Loading?",
    options: [
      "Cache is always stale",
      "Cache miss requires 3 network calls",
      "Cannot handle large data",
      "Requires more memory",
    ],
    correct: 1,
    explanation:
      "Cache miss = 3 network calls (check cache, query DB, write to cache). Also, data can become stale without TTL.",
  },
];

const awsBeanstalk: Question[] = [
  {
    question:
      "Which Elastic Beanstalk deployment policy has zero downtime and creates a new ASG?",
    options: [
      "All at once",
      "Rolling",
      "Rolling with additional batch",
      "Immutable",
    ],
    correct: 3,
    explanation:
      "Immutable: creates new ASG with new instances, swaps when healthy. No downtime, easy rollback. Blue/Green uses separate environments.",
  },
  {
    question:
      "What file extension is used for Elastic Beanstalk configuration?",
    options: [".yml", ".json", ".config", ".xml"],
    correct: 2,
    explanation:
      ".ebextensions/*.config files customize environment with option_settings, packages, container_commands, etc.",
  },
];

export const awsCategories: QuizCategory[] = [
  { id: "all", label: "All Topics", questions: [] },
  {
    id: "infrastructure",
    label: "Infrastructure",
    questions: awsInfrastructure,
  },
  { id: "iam", label: "IAM", questions: awsIAM },
  { id: "ec2", label: "EC2", questions: awsEC2 },
  { id: "storage", label: "Storage", questions: awsStorage },
  { id: "ami", label: "AMI", questions: awsAMI },
  { id: "elb-asg", label: "ELB & ASG", questions: awsELBASG },
  { id: "rds", label: "RDS & Aurora", questions: awsRDS },
  { id: "lambda", label: "Lambda", questions: awsLambda },
  { id: "api-gateway", label: "API Gateway", questions: awsAPIGateway },
  { id: "dynamodb", label: "DynamoDB", questions: awsDynamoDB },
  { id: "s3", label: "S3", questions: awsS3 },
  { id: "sqs-sns", label: "SQS & SNS", questions: awsSQSSNS },
  { id: "cicd", label: "CI/CD", questions: awsCICD },
  {
    id: "cloudformation",
    label: "CloudFormation & SAM",
    questions: awsCloudFormation,
  },
  { id: "cloudwatch", label: "CloudWatch", questions: awsCloudWatch },
  { id: "xray", label: "X-Ray", questions: awsXRay },
  { id: "cognito", label: "Cognito", questions: awsCognito },
  { id: "kms", label: "KMS", questions: awsKMS },
  { id: "eventbridge", label: "EventBridge", questions: awsEventBridge },
  {
    id: "step-functions",
    label: "Step Functions",
    questions: awsStepFunctions,
  },
  { id: "kinesis", label: "Kinesis", questions: awsKinesis },
  { id: "containers", label: "Containers", questions: awsContainers },
  { id: "elasticache", label: "ElastiCache", questions: awsElastiCache },
  { id: "beanstalk", label: "Elastic Beanstalk", questions: awsBeanstalk },
];

// Git Quiz Questions

const gitBasics: Question[] = [
  {
    question: "What does `git init` do?",
    options: [
      "Clones a remote repository",
      "Creates a new empty Git repository in the current directory",
      "Initializes a remote server",
      "Installs Git on the system",
    ],
    correct: 1,
    explanation:
      "git init creates a new .git directory in the current folder, turning it into a Git repository. It doesn't create any commits or connect to a remote.",
  },
  {
    question: "What are the three main areas in Git?",
    options: [
      "Local, Remote, Cloud",
      "Working directory, Staging area (index), Repository (.git)",
      "Branch, Tag, Commit",
      "HEAD, Main, Origin",
    ],
    correct: 1,
    explanation:
      "Git has three areas: Working directory (your files), Staging area/index (what will go into the next commit), and the Repository (.git directory where commits live).",
  },
  {
    question: "What does `git add .` do?",
    options: [
      "Commits all files",
      "Stages all changed and new files in the current directory",
      "Pushes all changes to remote",
      "Creates a new branch",
    ],
    correct: 1,
    explanation:
      "git add . stages all modified and untracked files in the current directory and subdirectories. The files are added to the staging area, ready for commit.",
  },
  {
    question: "What is HEAD in Git?",
    options: [
      "The first commit ever made",
      "A pointer to the currently checked out commit/branch",
      "The remote repository",
      "The main branch",
    ],
    correct: 1,
    explanation:
      "HEAD is a pointer to the current commit you're working on. Usually it points to a branch name, which in turn points to a commit. Detached HEAD means it points directly to a commit.",
  },
  {
    question: "What does `git clone` do compared to `git init`?",
    options: [
      "They do the same thing",
      "clone copies an existing repo including all history; init creates a new empty repo",
      "init copies a repo; clone creates a new one",
      "clone only copies the latest commit",
    ],
    correct: 1,
    explanation:
      "git clone downloads an entire repository including all branches and history from a remote. git init creates a brand new empty repository locally.",
  },
  {
    question: "What does `git status` show?",
    options: [
      "Commit history",
      "Current branch, staged changes, unstaged changes, and untracked files",
      "Remote repository info",
      "Diff of all files",
    ],
    correct: 1,
    explanation:
      "git status gives an overview of the working directory: which branch you're on, what's staged, what's modified but not staged, and what files are untracked.",
  },
  {
    question: "What's the difference between `git rm` and just deleting a file?",
    options: [
      "No difference",
      "git rm stages the deletion; manually deleting leaves it unstaged",
      "git rm deletes from remote only",
      "git rm is irreversible",
    ],
    correct: 1,
    explanation:
      "git rm removes the file AND stages the removal in one step. If you just delete a file with rm, you still need to git add the deletion to stage it.",
  },
  {
    question: "What does a commit hash represent?",
    options: [
      "A random ID",
      "A SHA-1 hash of the commit content, parent, author, and message",
      "The line count of changes",
      "The branch name encoded as a number",
    ],
    correct: 1,
    explanation:
      "A commit hash is a SHA-1 (or SHA-256) hash computed from the tree (snapshot), parent commit(s), author info, timestamp, and commit message. It uniquely identifies a commit.",
  },
  {
    question: "What does `git diff` show by default?",
    options: [
      "Staged changes",
      "Unstaged changes in the working directory",
      "Differences between branches",
      "All changes since the last push",
    ],
    correct: 1,
    explanation:
      "Plain git diff shows changes in the working directory that are NOT yet staged. Use git diff --staged (or --cached) to see what's staged for commit.",
  },
  {
    question: "What does the `.gitignore` file do?",
    options: [
      "Deletes ignored files",
      "Tells Git which files/patterns to exclude from tracking",
      "Hides files from the filesystem",
      "Prevents files from being modified",
    ],
    correct: 1,
    explanation:
      ".gitignore lists file patterns that Git should not track. Common entries include node_modules/, .env, build/, and *.log. Already tracked files must be untracked separately.",
  },
];

const gitBranching: Question[] = [
  {
    question: "What is a branch in Git, internally?",
    options: [
      "A copy of the entire repository",
      "A lightweight movable pointer to a commit",
      "A separate folder on disk",
      "A remote-only concept",
    ],
    correct: 1,
    explanation:
      "A branch is just a pointer (40-byte reference) to a commit. Creating a branch is nearly instantaneous because Git only creates a new pointer, not a copy of files.",
  },
  {
    question: "What does `git checkout -b feature` do?",
    options: [
      "Deletes the feature branch",
      "Creates a new branch called 'feature' and switches to it",
      "Merges feature into the current branch",
      "Fetches the feature branch from remote",
    ],
    correct: 1,
    explanation:
      "git checkout -b is shorthand for git branch feature + git checkout feature. The modern equivalent is git switch -c feature.",
  },
  {
    question: "What is a fast-forward merge?",
    options: [
      "A merge that always creates a merge commit",
      "A merge where the target branch pointer simply moves forward (no divergence)",
      "A merge that skips conflict resolution",
      "A merge that deletes the source branch",
    ],
    correct: 1,
    explanation:
      "A fast-forward merge happens when the target branch has no new commits since the source branched off. Git just moves the pointer forward — no merge commit needed.",
  },
  {
    question: "What happens during a three-way merge?",
    options: [
      "Git copies files three times",
      "Git compares the common ancestor, source tip, and target tip to create a merge commit",
      "Three developers must approve the merge",
      "Git merges three branches at once",
    ],
    correct: 1,
    explanation:
      "When branches have diverged, Git finds the common ancestor, then compares both branch tips against it to determine what changed on each side. The result is a merge commit with two parents.",
  },
  {
    question: "What does `git branch -d feature` do?",
    options: [
      "Force-deletes the branch even if unmerged",
      "Deletes the branch only if it has been fully merged",
      "Deletes the branch from remote",
      "Renames the branch",
    ],
    correct: 1,
    explanation:
      "-d (lowercase) is the safe delete — it refuses if the branch has unmerged changes. Use -D (uppercase) to force delete an unmerged branch.",
  },
  {
    question: "What does `git merge --no-ff feature` do?",
    options: [
      "Merges without creating any commits",
      "Always creates a merge commit even if fast-forward is possible",
      "Merges and deletes the feature branch",
      "Prevents the merge from happening",
    ],
    correct: 1,
    explanation:
      "--no-ff forces a merge commit even when fast-forward is possible. This preserves branch history and makes it clear where a feature branch was merged.",
  },
  {
    question: "How do you list all branches including remote-tracking branches?",
    options: [
      "git branch",
      "git branch -a",
      "git branch --remote-only",
      "git log --branches",
    ],
    correct: 1,
    explanation:
      "git branch -a lists all local and remote-tracking branches. git branch alone shows only local branches. git branch -r shows only remote-tracking ones.",
  },
  {
    question: "What is a merge conflict?",
    options: [
      "When Git can't connect to the remote",
      "When two branches modify the same lines and Git can't auto-resolve",
      "When a branch is deleted during merge",
      "When you merge into the wrong branch",
    ],
    correct: 1,
    explanation:
      "A merge conflict occurs when both branches changed the same lines in the same file. Git marks the conflict in the file and pauses the merge for you to resolve manually.",
  },
];

const gitStashAndUndo: Question[] = [
  {
    question: "What does `git stash` do?",
    options: [
      "Deletes all uncommitted changes",
      "Saves uncommitted changes to a stack and cleans the working directory",
      "Creates a new branch with the changes",
      "Pushes changes to remote",
    ],
    correct: 1,
    explanation:
      "git stash saves your staged and unstaged changes onto a stack, then reverts the working directory to the last commit. Use git stash pop to re-apply them.",
  },
  {
    question: "What's the difference between `git stash pop` and `git stash apply`?",
    options: [
      "No difference",
      "pop applies and removes the stash; apply keeps it on the stack",
      "apply is faster",
      "pop only works on the oldest stash",
    ],
    correct: 1,
    explanation:
      "git stash pop applies the most recent stash and removes it from the stack. git stash apply re-applies it but keeps it stored, so you can apply it again elsewhere.",
  },
  {
    question: "What does `git stash --include-untracked` do?",
    options: [
      "Stashes only untracked files",
      "Stashes tracked changes AND new untracked files",
      "Deletes untracked files",
      "Ignores untracked files",
    ],
    correct: 1,
    explanation:
      "By default, git stash only saves tracked changes. --include-untracked (or -u) also stashes new files that haven't been added to Git yet.",
  },
  {
    question: "What does `git reset --soft HEAD~1` do?",
    options: [
      "Deletes the last commit and all changes permanently",
      "Undoes the last commit but keeps changes staged",
      "Undoes the last commit and unstages changes",
      "Moves to the previous branch",
    ],
    correct: 1,
    explanation:
      "--soft moves HEAD back one commit but keeps all changes in the staging area. It's like un-committing: your files are exactly as they were, just staged again.",
  },
  {
    question: "What does `git reset --hard HEAD~1` do?",
    options: [
      "Undoes the last commit but keeps files",
      "Undoes the last commit, unstages, AND discards all changes",
      "Only resets the staging area",
      "Deletes the branch",
    ],
    correct: 1,
    explanation:
      "--hard is destructive: it moves HEAD back, resets the staging area, AND reverts the working directory. All changes from that commit are gone (unless reflog saves you).",
  },
  {
    question: "What does `git revert` do compared to `git reset`?",
    options: [
      "They do the same thing",
      "revert creates a NEW commit that undoes changes; reset moves the branch pointer backward",
      "revert is faster",
      "reset is safer for shared branches",
    ],
    correct: 1,
    explanation:
      "git revert creates a new commit that undoes a previous commit's changes — it's safe for shared branches. git reset rewrites history by moving the branch pointer, which can break others' work.",
  },
  {
    question: "What is the reflog used for?",
    options: [
      "Logging errors in Git",
      "Recording all HEAD movements — a safety net to recover lost commits",
      "Tracking remote changes",
      "Logging merge conflicts",
    ],
    correct: 1,
    explanation:
      "The reflog records every time HEAD moves (commits, resets, rebases, checkouts). Even after a hard reset, you can find the lost commit hash in the reflog to recover it.",
  },
  {
    question: "What does `git checkout -- file.txt` do?",
    options: [
      "Switches to a branch called file.txt",
      "Discards unstaged changes in file.txt (restores from last commit/index)",
      "Stages file.txt",
      "Deletes file.txt",
    ],
    correct: 1,
    explanation:
      "git checkout -- <file> discards working directory changes for that file, restoring it from the index (or HEAD). The modern equivalent is git restore file.txt.",
  },
  {
    question: "What does `git clean -fd` do?",
    options: [
      "Removes staged files",
      "Removes untracked files and directories",
      "Cleans the commit history",
      "Removes remote branches",
    ],
    correct: 1,
    explanation:
      "git clean -fd force-removes untracked files (-f) and directories (-d). It's useful for cleaning build artifacts, but destructive — those files are not recoverable by Git.",
  },
  {
    question: "How do you unstage a file without losing changes?",
    options: [
      "git rm file.txt",
      "git reset HEAD file.txt (or git restore --staged file.txt)",
      "git checkout file.txt",
      "git stash file.txt",
    ],
    correct: 1,
    explanation:
      "git reset HEAD <file> moves a file from staged back to unstaged without changing the file contents. The modern equivalent is git restore --staged <file>.",
  },
];

const gitRebase: Question[] = [
  {
    question: "What does `git rebase main` do when on a feature branch?",
    options: [
      "Merges main into feature",
      "Replays feature branch commits on top of the latest main",
      "Deletes the feature branch",
      "Pushes feature to main",
    ],
    correct: 1,
    explanation:
      "Rebase takes your feature branch commits, temporarily removes them, updates your branch to the tip of main, then re-applies your commits one by one on top. Results in a linear history.",
  },
  {
    question: "When should you NOT rebase?",
    options: [
      "On local feature branches",
      "On public/shared branches that others are working on",
      "Before opening a pull request",
      "When you want clean history",
    ],
    correct: 1,
    explanation:
      "Never rebase commits that have been pushed and are used by others. Rebase rewrites commit hashes, which causes conflicts for anyone who based work on the original commits.",
  },
  {
    question: "What does `git rebase -i HEAD~3` do?",
    options: [
      "Deletes the last 3 commits",
      "Opens an interactive editor to reorder, edit, squash, or drop the last 3 commits",
      "Creates 3 new branches",
      "Merges the last 3 commits into one automatically",
    ],
    correct: 1,
    explanation:
      "Interactive rebase lets you manipulate recent commits: pick (keep), reword (change message), squash (combine), edit (amend), or drop (remove). Powerful for cleaning up history.",
  },
  {
    question: "What does squashing commits mean?",
    options: [
      "Deleting commits",
      "Combining multiple commits into a single commit",
      "Splitting one commit into many",
      "Reverting commits",
    ],
    correct: 1,
    explanation:
      "Squashing combines multiple commits into one. Commonly done via interactive rebase (squash or fixup) to clean up a feature branch before merging into main.",
  },
  {
    question: "What's the difference between merge and rebase?",
    options: [
      "No difference in result",
      "Merge preserves branch history with a merge commit; rebase creates linear history by replaying commits",
      "Rebase is always safer",
      "Merge rewrites commit hashes",
    ],
    correct: 1,
    explanation:
      "Merge joins branches with a merge commit (preserves parallel history). Rebase replays commits to create a linear history (cleaner log, but rewrites hashes). Both integrate changes.",
  },
  {
    question: "What does `git cherry-pick <hash>` do?",
    options: [
      "Deletes a specific commit",
      "Applies a specific commit from another branch onto the current branch",
      "Reverts a commit",
      "Moves a commit between repos",
    ],
    correct: 1,
    explanation:
      "Cherry-pick copies a single commit and applies it to your current branch as a new commit. Useful for grabbing a specific bug fix without merging an entire branch.",
  },
];

const gitRemote: Question[] = [
  {
    question: "What does `git fetch` do?",
    options: [
      "Downloads remote changes and merges them",
      "Downloads remote changes without merging into local branches",
      "Pushes local changes to remote",
      "Deletes remote branches",
    ],
    correct: 1,
    explanation:
      "git fetch downloads new data from the remote (commits, branches, tags) but does NOT modify your working directory or merge anything. It updates remote-tracking branches (origin/main, etc.).",
  },
  {
    question: "What's the difference between `git fetch` and `git pull`?",
    options: [
      "No difference",
      "pull = fetch + merge (or rebase); fetch only downloads",
      "fetch is faster",
      "pull only works with GitHub",
    ],
    correct: 1,
    explanation:
      "git pull is a shortcut for git fetch followed by git merge (or git rebase with --rebase). git fetch is safer because it lets you review changes before integrating.",
  },
  {
    question: "What does `git push --force-with-lease` do?",
    options: [
      "Same as git push --force",
      "Force-pushes only if no one else has pushed since your last fetch",
      "Pushes without authentication",
      "Creates a lease on the remote",
    ],
    correct: 1,
    explanation:
      "--force-with-lease is a safer alternative to --force. It rejects the push if the remote branch has new commits you haven't fetched. Prevents accidentally overwriting someone else's work.",
  },
  {
    question: "What is `origin` in Git?",
    options: [
      "The main branch",
      "The default name for the remote repository you cloned from",
      "The first commit",
      "A Git command",
    ],
    correct: 1,
    explanation:
      "'origin' is just the conventional default name for the remote repository when you git clone. You can rename it or add multiple remotes (e.g., upstream for forks).",
  },
  {
    question: "What does `git remote -v` show?",
    options: [
      "Remote branch list",
      "Remote names and their fetch/push URLs",
      "Commit log from remote",
      "Remote server status",
    ],
    correct: 1,
    explanation:
      "git remote -v lists all configured remotes with their URLs for both fetch and push. Useful for verifying your remote configuration and debugging push/pull issues.",
  },
  {
    question: "How do you delete a remote branch?",
    options: [
      "git branch -d origin/feature",
      "git push origin --delete feature",
      "git remote remove feature",
      "git fetch --prune",
    ],
    correct: 1,
    explanation:
      "git push origin --delete feature removes the branch from the remote. git fetch --prune removes stale remote-tracking references but doesn't delete the actual remote branch.",
  },
  {
    question: "What does `git pull --rebase` do?",
    options: [
      "Pulls and creates a merge commit",
      "Fetches remote changes and replays your local commits on top",
      "Deletes local commits",
      "Only works with GitHub",
    ],
    correct: 1,
    explanation:
      "git pull --rebase fetches remote changes and rebases your local commits on top instead of creating a merge commit. Results in cleaner linear history.",
  },
  {
    question: "What is an upstream branch?",
    options: [
      "The main branch of the repo",
      "The remote branch that a local branch is configured to track",
      "A branch created by the repo owner",
      "A branch that's ahead of others",
    ],
    correct: 1,
    explanation:
      "An upstream (tracking) branch is the remote branch associated with your local branch. Set with git push -u origin feature. Enables git pull/push without specifying the remote and branch.",
  },
];

const gitInternals: Question[] = [
  {
    question: "How does Git store data internally?",
    options: [
      "As diffs/patches between versions",
      "As snapshots of the entire project at each commit",
      "As a list of changed files",
      "As a database table",
    ],
    correct: 1,
    explanation:
      "Git stores full snapshots (trees of blobs), not diffs. If a file hasn't changed, Git stores a pointer to the previous identical blob. Packfiles later compress with deltas for efficiency.",
  },
  {
    question: "What are the four types of Git objects?",
    options: [
      "File, Folder, Branch, Tag",
      "Blob, Tree, Commit, Tag",
      "Add, Commit, Push, Pull",
      "HEAD, Index, Working, Remote",
    ],
    correct: 1,
    explanation:
      "Blob (file content), Tree (directory listing), Commit (snapshot + metadata + parent), and Tag (annotated pointer to a commit). Everything in .git/objects is one of these.",
  },
  {
    question: "What is stored in a commit object?",
    options: [
      "Only the changed files",
      "Tree hash, parent hash(es), author, committer, timestamp, and message",
      "Just the commit message",
      "A diff of all changes",
    ],
    correct: 1,
    explanation:
      "A commit stores: a pointer to a tree (snapshot), parent commit(s), author info, committer info, timestamps, and the commit message. This is what gets SHA-1 hashed.",
  },
  {
    question: "Where does Git store branches?",
    options: [
      "In the staging area",
      "As simple files in .git/refs/heads/ containing a commit hash",
      "In a database",
      "In the working directory",
    ],
    correct: 1,
    explanation:
      "A branch is just a 41-byte file in .git/refs/heads/ containing the commit hash it points to. That's why creating branches is instant — Git only writes one tiny file.",
  },
  {
    question: "What does `git gc` do?",
    options: [
      "Deletes all branches",
      "Compresses objects into packfiles and cleans up unreachable objects",
      "Clears the staging area",
      "Resets the repository",
    ],
    correct: 1,
    explanation:
      "git gc (garbage collect) compresses loose objects into packfiles, removes unreachable objects, and optimizes the repository. Git runs it automatically, but you can trigger it manually.",
  },
  {
    question: "What is the index (staging area) technically?",
    options: [
      "A copy of the working directory",
      "A binary file (.git/index) listing tracked files with their hashes and metadata",
      "A branch pointer",
      "A commit object",
    ],
    correct: 1,
    explanation:
      "The index is a binary file at .git/index. It stores file paths, modes, and blob hashes for everything that will go into the next commit. git add updates this file.",
  },
];

const gitWorkflow: Question[] = [
  {
    question: "What is the purpose of a pull request (PR)?",
    options: [
      "To pull code from remote",
      "A code review mechanism to propose merging one branch into another",
      "To request access to a repo",
      "To sync forks",
    ],
    correct: 1,
    explanation:
      "A pull request is a collaboration feature (GitHub/GitLab/etc.) that lets you propose changes, get code review, run CI checks, and discuss before merging into the target branch.",
  },
  {
    question: "What does `git bisect` do?",
    options: [
      "Splits a branch in two",
      "Uses binary search through commit history to find the commit that introduced a bug",
      "Merges two branches",
      "Creates a backup",
    ],
    correct: 1,
    explanation:
      "git bisect performs a binary search through commits. You mark commits as good/bad and Git narrows down the exact commit that introduced the bug. Very efficient for large histories.",
  },
  {
    question: "What does `git tag v1.0.0` create?",
    options: [
      "A new branch named v1.0.0",
      "A lightweight tag pointing to the current commit",
      "A commit with message v1.0.0",
      "A remote release",
    ],
    correct: 1,
    explanation:
      "A lightweight tag is a simple pointer to a commit (like a branch that doesn't move). Use git tag -a v1.0.0 -m 'msg' for an annotated tag with metadata.",
  },
  {
    question: "What does `git log --oneline --graph` show?",
    options: [
      "Full commit details",
      "A compact, visual representation of the commit history with branch structure",
      "Only merge commits",
      "Remote commit history",
    ],
    correct: 1,
    explanation:
      "--oneline shows each commit on one line (short hash + message). --graph draws ASCII art showing branch and merge structure. Great for understanding project history.",
  },
  {
    question: "What is a Git hook?",
    options: [
      "A way to connect to remote servers",
      "A script that runs automatically at certain Git events (commit, push, etc.)",
      "A merging strategy",
      "A type of branch",
    ],
    correct: 1,
    explanation:
      "Git hooks are scripts in .git/hooks/ that fire at events like pre-commit, pre-push, post-merge, etc. Commonly used for linting, testing, and enforcing commit message formats.",
  },
  {
    question: "What does `git blame file.txt` show?",
    options: [
      "Errors in the file",
      "Who last modified each line, when, and in which commit",
      "A list of commits that deleted lines",
      "File permissions",
    ],
    correct: 1,
    explanation:
      "git blame shows line-by-line annotation: the commit hash, author, and date of the last modification for each line. Useful for understanding why code was changed and by whom.",
  },
  {
    question: "What is a `.gitkeep` file?",
    options: [
      "A Git configuration file",
      "A convention to track empty directories (Git doesn't track empty dirs)",
      "A lock file for branches",
      "A backup file",
    ],
    correct: 1,
    explanation:
      "Git doesn't track empty directories. .gitkeep is a convention — an empty placeholder file you add so the directory is included in the repository. It's not a Git feature, just a convention.",
  },
  {
    question: "What does `git worktree add ../feature feature-branch` do?",
    options: [
      "Creates a new repository",
      "Creates a separate working directory linked to the same repo for a different branch",
      "Copies the branch",
      "Moves the feature branch",
    ],
    correct: 1,
    explanation:
      "git worktree lets you check out multiple branches simultaneously in separate directories, all linked to the same repository. Great for working on a fix while keeping your feature branch untouched.",
  },
];

export const gitCategories: QuizCategory[] = [
  { id: "all", label: "All Topics", questions: [] },
  { id: "basics", label: "Git Basics", questions: gitBasics },
  { id: "branching", label: "Branching & Merging", questions: gitBranching },
  { id: "stash-undo", label: "Stash & Undo", questions: gitStashAndUndo },
  { id: "rebase", label: "Rebase & Cherry-pick", questions: gitRebase },
  { id: "remote", label: "Remotes & Collaboration", questions: gitRemote },
  { id: "internals", label: "Git Internals", questions: gitInternals },
  { id: "workflow", label: "Workflow & Tools", questions: gitWorkflow },
];

export const quizzes: QuizDefinition[] = [
  {
    id: "frontend",
    title: "Frontend Interview",
    description: "JavaScript, TypeScript, React & Node.js",
    categories: categories,
  },
  {
    id: "aws-dva",
    title: "AWS DVA-C02",
    description: "AWS Developer Associate Certification",
    categories: awsCategories,
  },
  {
    id: "git",
    title: "Git",
    description: "Git fundamentals, branching, rebasing & internals",
    categories: gitCategories,
  },
];

export function getQuizById(quizId: string): QuizDefinition | undefined {
  return quizzes.find((q) => q.id === quizId);
}

export function getAllQuestionsForQuiz(quizId: string): Question[] {
  const quiz = getQuizById(quizId);
  if (!quiz) return [];
  return quiz.categories.slice(1).flatMap((c) => c.questions);
}

export function getAllQuestions(): Question[] {
  return categories.slice(1).flatMap((c) => c.questions);
}

export function getQuestionsByCategory(
  quizId: string,
  categoryId: string,
): Question[] {
  const quiz = getQuizById(quizId);
  if (!quiz) return [];
  if (categoryId === "all") return getAllQuestionsForQuiz(quizId);
  const category = quiz.categories.find((c) => c.id === categoryId);
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
