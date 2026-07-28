/**
 * Interview question bank.
 *
 * Pure data module consumed by seed.js — kept separate so the question
 * bank can grow (or be swapped for a DB export / admin-authored set) without
 * touching the seeding script itself.
 *
 * Each question matches the Question schema exactly:
 *   text, category, role, difficulty, modelAnswer, keywords
 *
 * - category: "technical" | "hr" | "behavioral"
 * - role: for technical questions, the topic/track (e.g. "java", "react");
 *   "general" for hr/behavioral, where there is no topic to specialize by.
 * - difficulty: "easy" | "medium" | "hard"
 */

const javaQuestions = [
  {
    text: "What is the difference between JDK, JRE, and JVM?",
    category: "technical",
    role: "java",
    difficulty: "easy",
    modelAnswer:
      "JDK (Java Development Kit) includes tools to develop Java applications, JRE (Java Runtime Environment) provides the libraries and JVM needed to run Java applications, and JVM (Java Virtual Machine) is the engine that executes Java bytecode on a specific platform.",
    keywords: ["JDK", "JRE", "JVM", "bytecode", "compiler"],
  },
  {
    text: "What is the difference between == and .equals() in Java?",
    category: "technical",
    role: "java",
    difficulty: "easy",
    modelAnswer:
      "== compares object references (memory addresses) for objects, or primitive values directly for primitives, while .equals() compares the actual content or logical equality of two objects, and can be overridden by classes like String to compare values.",
    keywords: ["reference", "equals", "overriding", "primitive", "comparison"],
  },
  {
    text: "Explain the concept of exception handling in Java.",
    category: "technical",
    role: "java",
    difficulty: "medium",
    modelAnswer:
      "Java exception handling uses try, catch, finally, and throw/throws keywords to detect and handle runtime errors gracefully. Checked exceptions must be declared or caught at compile time, while unchecked exceptions (RuntimeException subclasses) are not enforced by the compiler, allowing programs to fail gracefully instead of crashing.",
    keywords: ["try", "catch", "checked", "unchecked", "exception", "finally"],
  },
  {
    text: "What is the difference between an abstract class and an interface in Java?",
    category: "technical",
    role: "java",
    difficulty: "medium",
    modelAnswer:
      "An abstract class can have both abstract and concrete methods, constructors, and instance state, and supports single inheritance, while an interface traditionally defines only method signatures (plus default/static methods since Java 8) and allows a class to implement multiple interfaces, enabling multiple inheritance of type.",
    keywords: ["abstract", "interface", "inheritance", "multiple inheritance", "default methods"],
  },
  {
    text: "How does the Java Garbage Collector work and what are generational garbage collection strategies?",
    category: "technical",
    role: "java",
    difficulty: "hard",
    modelAnswer:
      "The JVM garbage collector automatically reclaims memory from objects no longer reachable from GC roots. Generational collectors divide the heap into young (Eden and Survivor spaces) and old generations based on the observation that most objects die young; minor GCs clean the young generation frequently and cheaply, while major/full GCs clean the old generation less often but more expensively, using algorithms like mark-sweep-compact.",
    keywords: ["garbage collection", "heap", "generational", "young generation", "mark-sweep", "memory"],
  },
  {
    text: "Explain how Java's multithreading model handles synchronization and what problems can arise without it.",
    category: "technical",
    role: "java",
    difficulty: "hard",
    modelAnswer:
      "Java threads share process memory, so concurrent access to mutable shared state can cause race conditions; the synchronized keyword and locks (java.util.concurrent) ensure mutual exclusion by allowing only one thread to hold a monitor at a time. Without proper synchronization, issues like race conditions, deadlocks, and visibility problems (due to CPU caching) can occur.",
    keywords: ["synchronization", "race condition", "deadlock", "thread", "monitor", "concurrency"],
  },
  {
    text: "What is the difference between an array and an ArrayList in Java?",
    category: "technical",
    role: "java",
    difficulty: "easy",
    modelAnswer:
      "An array has a fixed size defined at creation and can hold primitives or objects, while an ArrayList is part of the Collections framework, can dynamically resize itself, and only holds objects (primitives are autoboxed), offering more built-in methods for adding, removing, and searching elements.",
    keywords: ["array", "ArrayList", "fixed size", "collections", "dynamic"],
  },
  {
    text: "What is the purpose of the 'static' keyword in Java?",
    category: "technical",
    role: "java",
    difficulty: "easy",
    modelAnswer:
      "The static keyword marks a field, method, or nested class as belonging to the class itself rather than to any particular instance, meaning it can be accessed without creating an object and is shared across all instances of that class.",
    keywords: ["static", "class member", "instance", "shared"],
  },
  {
    text: "What is a constructor in Java?",
    category: "technical",
    role: "java",
    difficulty: "easy",
    modelAnswer:
      "A constructor is a special method with the same name as its class, used to initialize a new object's state when it's created with the 'new' keyword; if no constructor is defined, Java provides a default no-argument constructor automatically.",
    keywords: ["constructor", "initialization", "object creation", "default constructor"],
  },
  {
    text: "What is the difference between checked and unchecked exceptions in Java?",
    category: "technical",
    role: "java",
    difficulty: "easy",
    modelAnswer:
      "Checked exceptions are checked at compile time and must be either caught or declared with throws, typically representing recoverable conditions like file-not-found, while unchecked exceptions (RuntimeException and its subclasses) are not enforced by the compiler and usually represent programming errors like null pointer access.",
    keywords: ["checked exception", "unchecked exception", "compile time", "RuntimeException"],
  },
  {
    text: "What is autoboxing in Java?",
    category: "technical",
    role: "java",
    difficulty: "easy",
    modelAnswer:
      "Autoboxing is the automatic conversion Java performs between primitive types and their corresponding wrapper classes, such as converting an int to an Integer, allowing primitives to be used seamlessly in contexts that require objects, like collections.",
    keywords: ["autoboxing", "wrapper class", "primitive", "unboxing"],
  },
  {
    text: "Explain the concept of Java Collections Framework and the difference between List, Set, and Map.",
    category: "technical",
    role: "java",
    difficulty: "medium",
    modelAnswer:
      "The Collections Framework provides a unified architecture for storing and manipulating groups of objects. A List is an ordered collection that allows duplicates and indexed access, a Set is an unordered collection that disallows duplicate elements, and a Map stores key-value pairs where each key is unique.",
    keywords: ["List", "Set", "Map", "collections framework", "duplicates"],
  },
  {
    text: "What is the difference between String, StringBuilder, and StringBuffer in Java?",
    category: "technical",
    role: "java",
    difficulty: "medium",
    modelAnswer:
      "String objects are immutable, so every modification creates a new object, while StringBuilder and StringBuffer are mutable and allow in-place modification for better performance in loops or heavy string manipulation; StringBuffer is synchronized and thread-safe, whereas StringBuilder is not synchronized and generally faster in single-threaded contexts.",
    keywords: ["String", "StringBuilder", "StringBuffer", "immutable", "thread-safe"],
  },
  {
    text: "What are Java generics and why are they useful?",
    category: "technical",
    role: "java",
    difficulty: "medium",
    modelAnswer:
      "Generics allow classes, interfaces, and methods to operate on typed parameters specified at compile time, providing type safety by catching type mismatches at compile time rather than at runtime, and eliminating the need for explicit casting when retrieving elements from a collection.",
    keywords: ["generics", "type safety", "compile time", "casting"],
  },
  {
    text: "Explain the concept of the 'final' keyword in Java.",
    category: "technical",
    role: "java",
    difficulty: "medium",
    modelAnswer:
      "The final keyword can be applied to variables to make them constants that cannot be reassigned after initialization, to methods to prevent them from being overridden by subclasses, and to classes to prevent them from being extended entirely.",
    keywords: ["final", "constant", "override", "inheritance"],
  },
  {
    text: "What is the difference between fail-fast and fail-safe iterators in Java?",
    category: "technical",
    role: "java",
    difficulty: "medium",
    modelAnswer:
      "Fail-fast iterators (like those on ArrayList) throw a ConcurrentModificationException if the underlying collection is structurally modified while iterating, detecting concurrent changes via a modification count, while fail-safe iterators (like those on CopyOnWriteArrayList) operate on a cloned copy of the collection, allowing modifications during iteration without throwing an exception.",
    keywords: ["fail-fast", "fail-safe", "iterator", "ConcurrentModificationException"],
  },
  {
    text: "Explain the Java memory model and how the 'volatile' keyword affects visibility between threads.",
    category: "technical",
    role: "java",
    difficulty: "hard",
    modelAnswer:
      "The Java Memory Model defines how threads interact through memory, and without proper synchronization, one thread's writes may not be visible to another due to CPU caching and compiler reordering; the volatile keyword ensures that reads and writes to a variable go directly to main memory, guaranteeing visibility across threads, though it does not provide atomicity for compound operations.",
    keywords: ["memory model", "volatile", "visibility", "thread", "caching"],
  },
  {
    text: "How does the Java HashMap work internally, and how does it handle hash collisions?",
    category: "technical",
    role: "java",
    difficulty: "hard",
    modelAnswer:
      "A HashMap stores key-value pairs in an array of buckets, using the key's hashCode() to determine which bucket it belongs to; when two keys hash to the same bucket (a collision), Java handles it by chaining entries in a linked list (or a balanced tree for large buckets since Java 8), and uses the key's equals() method to distinguish between colliding entries.",
    keywords: ["HashMap", "hash collision", "bucket", "hashCode", "linked list"],
  },
  {
    text: "What is the difference between a shallow copy and a deep copy in Java's Cloneable interface?",
    category: "technical",
    role: "java",
    difficulty: "hard",
    modelAnswer:
      "The default Object.clone() implementation performs a shallow copy, copying primitive fields directly but only copying references for object fields, so both the original and clone share the same nested objects; a deep copy requires manually cloning each mutable referenced object as well, so the two copies become fully independent.",
    keywords: ["shallow copy", "deep copy", "Cloneable", "clone", "reference"],
  },
  {
    text: "Explain how the JVM's class loading mechanism works.",
    category: "technical",
    role: "java",
    difficulty: "hard",
    modelAnswer:
      "The JVM loads classes on demand through a hierarchy of class loaders — the Bootstrap loader loads core Java classes, the Extension/Platform loader loads extension libraries, and the Application/System loader loads application classpath classes — following a delegation model where each loader asks its parent to load a class first before attempting to load it itself, which helps prevent duplicate or malicious class definitions.",
    keywords: ["class loader", "JVM", "bootstrap loader", "delegation model"],
  },
];

const pythonQuestions = [
  {
    text: "What is the difference between a list and a tuple in Python?",
    category: "technical",
    role: "python",
    difficulty: "easy",
    modelAnswer:
      "Lists are mutable ordered collections that can be modified after creation, while tuples are immutable ordered collections whose contents cannot change once created; tuples are generally faster and can be used as dictionary keys due to their immutability.",
    keywords: ["list", "tuple", "mutable", "immutable", "ordered"],
  },
  {
    text: "What are Python decorators?",
    category: "technical",
    role: "python",
    difficulty: "easy",
    modelAnswer:
      "A decorator is a function that takes another function as an argument and extends or modifies its behavior without permanently changing its source code, commonly used with the @decorator syntax for logging, timing, or access control.",
    keywords: ["decorator", "function", "wrapper", "syntax", "higher-order"],
  },
  {
    text: "Explain the difference between deep copy and shallow copy in Python.",
    category: "technical",
    role: "python",
    difficulty: "medium",
    modelAnswer:
      "A shallow copy creates a new object but inserts references to the same nested objects found in the original, so changes to mutable nested elements affect both copies, while a deep copy recursively copies all nested objects, producing a fully independent clone.",
    keywords: ["shallow copy", "deep copy", "reference", "mutable", "copy module"],
  },
  {
    text: "What is the Global Interpreter Lock (GIL) in Python?",
    category: "technical",
    role: "python",
    difficulty: "medium",
    modelAnswer:
      "The GIL is a mutex in CPython that allows only one thread to execute Python bytecode at a time, even on multi-core systems, which simplifies memory management but limits true parallelism for CPU-bound multithreaded programs; multiprocessing or C extensions are commonly used to work around it.",
    keywords: ["GIL", "thread", "CPython", "mutex", "multiprocessing", "parallelism"],
  },
  {
    text: "How do Python generators work and why are they memory efficient?",
    category: "technical",
    role: "python",
    difficulty: "hard",
    modelAnswer:
      "Generators are functions that use yield to produce a sequence of values lazily, pausing execution and preserving state between calls instead of computing and storing an entire sequence in memory at once, making them memory efficient for large or infinite data streams via the iterator protocol.",
    keywords: ["generator", "yield", "lazy evaluation", "iterator", "memory efficient"],
  },
  {
    text: "Explain how Python's memory management and reference counting work, including how circular references are handled.",
    category: "technical",
    role: "python",
    difficulty: "hard",
    modelAnswer:
      "CPython primarily uses reference counting to track how many references point to an object, deallocating it immediately when the count reaches zero; a supplementary generational garbage collector detects and cleans up circular references that reference counting alone cannot free, since mutually referencing objects never reach a zero count.",
    keywords: ["reference counting", "garbage collector", "circular reference", "memory management", "CPython"],
  },
  {
    text: "What is the difference between Python 2 and Python 3?",
    category: "technical",
    role: "python",
    difficulty: "easy",
    modelAnswer:
      "Python 3 introduced several breaking changes over Python 2, including print becoming a function instead of a statement, integer division returning a float by default, strings being Unicode by default, and improved standard library consistency; Python 2 reached end-of-life in 2020 and is no longer maintained.",
    keywords: ["Python 2", "Python 3", "print function", "Unicode", "division"],
  },
  {
    text: "What are Python's built-in data types?",
    category: "technical",
    role: "python",
    difficulty: "easy",
    modelAnswer:
      "Python's core built-in types include numeric types (int, float, complex), sequence types (str, list, tuple), mapping type (dict), set types (set, frozenset), and the boolean type (bool), each with different mutability and use-case characteristics.",
    keywords: ["data types", "int", "list", "dict", "set", "mutability"],
  },
  {
    text: "What is a Python module and how is it different from a package?",
    category: "technical",
    role: "python",
    difficulty: "easy",
    modelAnswer:
      "A module is a single Python file containing definitions and statements that can be imported and reused, while a package is a directory containing multiple related modules along with an __init__.py file, allowing code to be organized hierarchically into a namespace.",
    keywords: ["module", "package", "import", "__init__.py", "namespace"],
  },
  {
    text: "What is the purpose of the 'self' parameter in Python class methods?",
    category: "technical",
    role: "python",
    difficulty: "easy",
    modelAnswer:
      "self is a reference to the current instance of the class, explicitly passed as the first parameter to instance methods, allowing the method to access and modify that specific instance's attributes and call its other methods.",
    keywords: ["self", "instance", "class method", "attribute"],
  },
  {
    text: "What is list comprehension in Python?",
    category: "technical",
    role: "python",
    difficulty: "easy",
    modelAnswer:
      "List comprehension is a concise syntax for creating a new list by applying an expression to each item in an iterable, optionally filtering with a condition, in a single readable line instead of a multi-line for loop with append calls.",
    keywords: ["list comprehension", "iterable", "syntax", "filtering"],
  },
  {
    text: "Explain the difference between *args and **kwargs in Python function definitions.",
    category: "technical",
    role: "python",
    difficulty: "medium",
    modelAnswer:
      "*args allows a function to accept any number of positional arguments, collecting them into a tuple, while **kwargs allows it to accept any number of keyword arguments, collecting them into a dictionary, giving functions flexible, variable-length argument signatures.",
    keywords: ["args", "kwargs", "positional arguments", "keyword arguments", "tuple"],
  },
  {
    text: "What are Python context managers and the 'with' statement used for?",
    category: "technical",
    role: "python",
    difficulty: "medium",
    modelAnswer:
      "Context managers define setup and teardown logic (via __enter__ and __exit__ methods) that runs automatically around a block of code, and the 'with' statement uses them to guarantee resources like files or network connections are properly closed or released even if an exception occurs inside the block.",
    keywords: ["context manager", "with statement", "__enter__", "__exit__", "resource management"],
  },
  {
    text: "What is the difference between a Python class method, static method, and instance method?",
    category: "technical",
    role: "python",
    difficulty: "medium",
    modelAnswer:
      "An instance method takes self and operates on a specific object's data, a class method takes cls and operates on the class itself (often used for alternative constructors), decorated with @classmethod, and a static method, decorated with @staticmethod, takes neither self nor cls and behaves like a regular function namespaced within the class.",
    keywords: ["instance method", "classmethod", "staticmethod", "self", "cls"],
  },
  {
    text: "How does exception handling work in Python, including the use of else and finally?",
    category: "technical",
    role: "python",
    difficulty: "medium",
    modelAnswer:
      "Python uses try/except blocks to catch and handle exceptions, an optional else block that runs only if no exception was raised, and an optional finally block that always runs regardless of whether an exception occurred, commonly used for cleanup actions like closing files or connections.",
    keywords: ["try", "except", "else", "finally", "exception handling"],
  },
  {
    text: "What is duck typing in Python?",
    category: "technical",
    role: "python",
    difficulty: "medium",
    modelAnswer:
      "Duck typing is a dynamic typing philosophy where an object's suitability for an operation is determined by whether it has the required methods or attributes at runtime, rather than by its explicit type or class — summarized as 'if it walks like a duck and quacks like a duck, it's a duck.'",
    keywords: ["duck typing", "dynamic typing", "runtime", "polymorphism"],
  },
  {
    text: "Explain how Python's asyncio and coroutines enable concurrency without multithreading.",
    category: "technical",
    role: "python",
    difficulty: "hard",
    modelAnswer:
      "asyncio uses a single-threaded event loop to run coroutines (functions defined with async def) cooperatively; when a coroutine hits an 'await' on an I/O-bound operation, it yields control back to the event loop, which runs other ready coroutines, achieving concurrency for I/O-bound work without the overhead or complexity of OS threads, though it does not help with CPU-bound tasks due to the GIL.",
    keywords: ["asyncio", "coroutine", "event loop", "await", "concurrency"],
  },
  {
    text: "What are Python metaclasses and when might you use one?",
    category: "technical",
    role: "python",
    difficulty: "hard",
    modelAnswer:
      "A metaclass is the 'class of a class' — it defines how classes themselves are constructed, typically by subclassing 'type' and overriding __new__ or __init__ to customize class creation; metaclasses are an advanced tool used for cases like enforcing coding standards across subclasses, automatic registration of classes, or building ORM-style frameworks, though they're rarely needed in everyday application code.",
    keywords: ["metaclass", "type", "class creation", "advanced"],
  },
  {
    text: "Explain how Python's descriptor protocol works and where it's used internally.",
    category: "technical",
    role: "python",
    difficulty: "hard",
    modelAnswer:
      "A descriptor is an object that implements __get__, __set__, or __delete__ and is stored as a class attribute to customize attribute access on instances; Python uses descriptors internally to implement properties (the @property decorator), methods (turning functions into bound methods), and static/class methods, making it a foundational mechanism behind much of Python's object model.",
    keywords: ["descriptor", "__get__", "__set__", "property", "object model"],
  },
  {
    text: "How does Python's import system avoid circular import issues, and what causes them?",
    category: "technical",
    role: "python",
    difficulty: "hard",
    modelAnswer:
      "Circular imports occur when two modules import each other, either directly or through a chain, and Python's import system detects this by tracking partially-initialized modules in sys.modules; if a circular import causes a name to be accessed before it's defined in the partially-loaded module, an ImportError or AttributeError results, commonly resolved by restructuring code, using local imports inside functions, or importing modules rather than specific names.",
    keywords: ["circular import", "sys.modules", "ImportError", "module system"],
  },
];

const javascriptQuestions = [
  {
    text: "What is the difference between var, let, and const in JavaScript?",
    category: "technical",
    role: "javascript",
    difficulty: "easy",
    modelAnswer:
      "var is function-scoped and can be redeclared and updated, let is block-scoped and can be updated but not redeclared in the same scope, and const is block-scoped and cannot be reassigned after initialization, though objects/arrays it references can still be mutated.",
    keywords: ["var", "let", "const", "scope", "hoisting"],
  },
  {
    text: "What is the difference between == and === in JavaScript?",
    category: "technical",
    role: "javascript",
    difficulty: "easy",
    modelAnswer:
      "== performs type coercion before comparing values, converting operands to a common type, while === compares both value and type without coercion, making it the safer and more predictable choice in most cases.",
    keywords: ["equality", "type coercion", "strict equality", "comparison"],
  },
  {
    text: "Explain closures in JavaScript with an example use case.",
    category: "technical",
    role: "javascript",
    difficulty: "medium",
    modelAnswer:
      "A closure is formed when a function retains access to variables from its enclosing lexical scope even after that outer function has finished executing, commonly used to create private state, such as a counter function that keeps its own internal count variable inaccessible from outside.",
    keywords: ["closure", "scope", "lexical scope", "private state", "function"],
  },
  {
    text: "What is the event loop in JavaScript and how does it handle asynchronous code?",
    category: "technical",
    role: "javascript",
    difficulty: "medium",
    modelAnswer:
      "JavaScript is single-threaded, so the event loop continuously checks the call stack and, once it's empty, pushes queued callbacks from the task queue (macrotasks) and microtask queue (like resolved Promises) onto the stack, allowing asynchronous operations like timers, I/O, and network calls to run without blocking the main thread.",
    keywords: ["event loop", "call stack", "asynchronous", "promise", "microtask", "callback"],
  },
  {
    text: "Explain how prototypal inheritance works in JavaScript.",
    category: "technical",
    role: "javascript",
    difficulty: "hard",
    modelAnswer:
      "JavaScript objects have an internal [[Prototype]] link to another object, and when a property or method is not found on the object itself, the engine looks up the prototype chain until it finds it or reaches null; this differs from classical inheritance since objects inherit directly from other objects rather than classes, though ES6 class syntax provides syntactic sugar over this mechanism.",
    keywords: ["prototype", "prototype chain", "inheritance", "object", "class"],
  },
  {
    text: "What are Promises and how do async/await simplify working with them?",
    category: "technical",
    role: "javascript",
    difficulty: "hard",
    modelAnswer:
      "A Promise represents the eventual result of an asynchronous operation and can be pending, fulfilled, or rejected, with .then/.catch used to handle outcomes; async/await is syntactic sugar built on Promises that lets asynchronous code be written and read like synchronous code, using try/catch for error handling instead of chained .then/.catch calls.",
    keywords: ["promise", "async", "await", "asynchronous", "error handling"],
  },
  {
    text: "What is the difference between null and undefined in JavaScript?",
    category: "technical",
    role: "javascript",
    difficulty: "easy",
    modelAnswer:
      "undefined means a variable has been declared but not yet assigned a value, and is also the default return value of functions with no return statement, while null is an intentional assignment representing the deliberate absence of any value, explicitly set by a developer.",
    keywords: ["null", "undefined", "declaration", "assignment"],
  },
  {
    text: "What is the difference between a function declaration and a function expression in JavaScript?",
    category: "technical",
    role: "javascript",
    difficulty: "easy",
    modelAnswer:
      "A function declaration (function foo(){}) is hoisted entirely, meaning it can be called before its definition appears in the code, while a function expression (const foo = function(){}) is only hoisted as a variable declaration, so the function itself isn't available until the assignment line executes.",
    keywords: ["function declaration", "function expression", "hoisting"],
  },
  {
    text: "What are template literals in JavaScript?",
    category: "technical",
    role: "javascript",
    difficulty: "easy",
    modelAnswer:
      "Template literals, delimited by backticks, allow embedded expressions using ${} syntax for string interpolation, support multi-line strings without escape characters, and can be used with tagged templates for advanced string processing.",
    keywords: ["template literal", "string interpolation", "backticks", "multi-line"],
  },
  {
    text: "What is the purpose of JSON.stringify() and JSON.parse() in JavaScript?",
    category: "technical",
    role: "javascript",
    difficulty: "easy",
    modelAnswer:
      "JSON.stringify() converts a JavaScript object or value into a JSON-formatted string, commonly used to send data over a network or store it, while JSON.parse() does the reverse, converting a JSON string back into a JavaScript object.",
    keywords: ["JSON", "stringify", "parse", "serialization"],
  },
  {
    text: "What are array destructuring and object destructuring in JavaScript?",
    category: "technical",
    role: "javascript",
    difficulty: "easy",
    modelAnswer:
      "Destructuring is a syntax that lets you unpack values from arrays or properties from objects into distinct variables in a single concise statement, instead of accessing each element or property individually by index or key.",
    keywords: ["destructuring", "array", "object", "unpacking"],
  },
  {
    text: "Explain the difference between synchronous and asynchronous JavaScript, and how callbacks fit in.",
    category: "technical",
    role: "javascript",
    difficulty: "medium",
    modelAnswer:
      "Synchronous code executes line by line, blocking further execution until the current operation finishes, while asynchronous code allows operations like network requests or timers to run in the background without blocking the main thread; callbacks are functions passed as arguments to be executed once an asynchronous operation completes, though heavy nesting of callbacks can lead to hard-to-read 'callback hell,' which Promises and async/await were designed to address.",
    keywords: ["synchronous", "asynchronous", "callback", "callback hell"],
  },
  {
    text: "What is 'this' in JavaScript and how does its value depend on how a function is called?",
    category: "technical",
    role: "javascript",
    difficulty: "medium",
    modelAnswer:
      "The value of 'this' is determined by how a function is invoked rather than where it's defined: as a method call it refers to the object before the dot, as a plain function call it's undefined in strict mode (or the global object otherwise), and arrow functions don't have their own 'this' but inherit it lexically from their enclosing scope.",
    keywords: ["this", "context", "arrow function", "method call", "lexical"],
  },
  {
    text: "What is the difference between shallow copying and deep copying an object in JavaScript?",
    category: "technical",
    role: "javascript",
    difficulty: "medium",
    modelAnswer:
      "A shallow copy (e.g. via spread syntax or Object.assign) copies only the top-level properties, so nested objects are still shared by reference between the original and the copy, while a deep copy recursively duplicates every nested level, producing a fully independent clone, often done with structuredClone() or a recursive utility function.",
    keywords: ["shallow copy", "deep copy", "spread operator", "structuredClone"],
  },
  {
    text: "Explain event bubbling and event capturing in the DOM.",
    category: "technical",
    role: "javascript",
    difficulty: "medium",
    modelAnswer:
      "When an event occurs on a nested DOM element, it can propagate in two phases: capturing, where the event travels from the root down to the target element, and bubbling, where it travels back up from the target to the root; by default, most event listeners respond during the bubbling phase, though addEventListener's third argument can enable capturing.",
    keywords: ["event bubbling", "event capturing", "DOM", "propagation"],
  },
  {
    text: "What are higher-order functions in JavaScript, and how do map, filter, and reduce use them?",
    category: "technical",
    role: "javascript",
    difficulty: "medium",
    modelAnswer:
      "A higher-order function either takes another function as an argument or returns a function; array methods like map, filter, and reduce are higher-order functions that take a callback to transform each element, select elements matching a condition, or accumulate elements into a single value, respectively, enabling a more declarative style than manual loops.",
    keywords: ["higher-order function", "map", "filter", "reduce", "callback"],
  },
  {
    text: "Explain how JavaScript's 'temporal dead zone' works with let and const.",
    category: "technical",
    role: "javascript",
    difficulty: "hard",
    modelAnswer:
      "Variables declared with let and const are hoisted to the top of their block scope but remain uninitialized until their declaration is actually executed; the region between the start of the block and the declaration is the 'temporal dead zone,' where accessing the variable throws a ReferenceError, unlike var, which is initialized to undefined immediately.",
    keywords: ["temporal dead zone", "let", "const", "hoisting", "ReferenceError"],
  },
  {
    text: "What is debouncing and throttling in JavaScript, and when would you use each?",
    category: "technical",
    role: "javascript",
    difficulty: "hard",
    modelAnswer:
      "Debouncing delays executing a function until a specified time has passed since the last time it was invoked, useful for scenarios like search-input handlers where you only want to act after the user stops typing; throttling ensures a function executes at most once within a specified time interval regardless of how many times it's triggered, useful for scenarios like scroll or resize handlers that fire very frequently.",
    keywords: ["debounce", "throttle", "performance", "event handler"],
  },
  {
    text: "Explain how JavaScript's microtask queue differs from the macrotask queue, with examples.",
    category: "technical",
    role: "javascript",
    difficulty: "hard",
    modelAnswer:
      "Macrotasks include things like setTimeout callbacks, I/O, and UI rendering events, while microtasks include Promise callbacks (.then/.catch/.finally) and queueMicrotask; after each macrotask finishes, the JavaScript engine drains the entire microtask queue before moving on to the next macrotask or a render, which is why a resolved Promise's callback runs before a setTimeout(fn, 0) callback even though both are scheduled asynchronously.",
    keywords: ["microtask", "macrotask", "setTimeout", "Promise", "event loop"],
  },
  {
    text: "What is memoization in JavaScript and how would you implement a simple memoized function?",
    category: "technical",
    role: "javascript",
    difficulty: "hard",
    modelAnswer:
      "Memoization is an optimization technique that caches the results of expensive function calls based on their input arguments, returning the cached result instead of recomputing when the same inputs occur again; a simple implementation wraps a function with a closure holding a cache object (often keyed by JSON.stringify(args)), checking the cache before calling the original function and storing new results after.",
    keywords: ["memoization", "caching", "closure", "optimization"],
  },
];

const reactQuestions = [
  {
    text: "What is the Virtual DOM in React and why is it used?",
    category: "technical",
    role: "react",
    difficulty: "easy",
    modelAnswer:
      "The Virtual DOM is a lightweight in-memory representation of the real DOM; React compares (diffs) the new virtual tree against the previous one and applies only the minimal necessary changes to the actual DOM, which improves performance compared to directly manipulating the DOM on every update.",
    keywords: ["virtual DOM", "diffing", "reconciliation", "performance", "DOM"],
  },
  {
    text: "What is the difference between props and state in React?",
    category: "technical",
    role: "react",
    difficulty: "easy",
    modelAnswer:
      "Props are read-only data passed from a parent component to a child component to configure it, while state is data managed internally within a component that can change over time and triggers a re-render when updated.",
    keywords: ["props", "state", "component", "re-render", "read-only"],
  },
  {
    text: "Explain the purpose of the useEffect hook and its dependency array.",
    category: "technical",
    role: "react",
    difficulty: "medium",
    modelAnswer:
      "useEffect lets function components perform side effects like data fetching, subscriptions, or DOM manipulation after render; the dependency array controls when the effect re-runs — an empty array runs it once on mount, omitting it runs it after every render, and listing specific values re-runs it only when those values change.",
    keywords: ["useEffect", "hook", "side effect", "dependency array", "lifecycle"],
  },
  {
    text: "What is component reconciliation and how does React's key prop affect it?",
    category: "technical",
    role: "react",
    difficulty: "medium",
    modelAnswer:
      "Reconciliation is the process React uses to compare a new element tree with the previous one to determine what changed; when rendering lists, the key prop gives each element a stable identity across renders so React can correctly match, reorder, add, or remove items instead of re-rendering the entire list unnecessarily.",
    keywords: ["reconciliation", "key prop", "list rendering", "diffing", "identity"],
  },
  {
    text: "How does React's Context API work and when would you choose it over prop drilling or a state management library?",
    category: "technical",
    role: "react",
    difficulty: "hard",
    modelAnswer:
      "Context API lets a Provider supply a value that any nested Consumer or useContext call can read without it being passed explicitly through every intermediate component, avoiding prop drilling; it's well-suited for globally relevant, infrequently changing data like theme or auth state, while a dedicated state library is often better for complex, frequently updated, or performance-sensitive global state due to Context re-rendering all consumers on change.",
    keywords: ["context API", "prop drilling", "provider", "global state", "useContext"],
  },
  {
    text: "Explain how React's rendering behavior differs between class components and function components with hooks, particularly around closures.",
    category: "technical",
    role: "react",
    difficulty: "hard",
    modelAnswer:
      "Function components re-run their entire function body on every render, so hooks like useState and useEffect capture the props and state values from that specific render in a closure, which can lead to 'stale closure' bugs if not handled with dependency arrays or functional state updates, whereas class components maintain state on a persistent instance accessed via this.state, avoiding that particular closure pitfall but requiring more boilerplate.",
    keywords: ["closure", "stale closure", "function component", "class component", "hooks", "render"],
  },
  {
    text: "What is JSX in React?",
    category: "technical",
    role: "react",
    difficulty: "easy",
    modelAnswer:
      "JSX is a syntax extension for JavaScript that lets developers write HTML-like markup directly within JavaScript code; it's compiled (typically by Babel) into React.createElement() calls that produce the actual React elements rendered to the DOM.",
    keywords: ["JSX", "syntax extension", "Babel", "createElement"],
  },
  {
    text: "What is a controlled component in React?",
    category: "technical",
    role: "react",
    difficulty: "easy",
    modelAnswer:
      "A controlled component is a form element (like an input) whose value is driven entirely by React state rather than the DOM's own internal state, with an onChange handler updating that state so the displayed value always reflects the current state, giving React full control over the form data.",
    keywords: ["controlled component", "form", "state", "onChange"],
  },
  {
    text: "What is the purpose of keys when rendering lists in React?",
    category: "technical",
    role: "react",
    difficulty: "easy",
    modelAnswer:
      "Keys give each element in a list a stable identity across renders, helping React efficiently determine which items changed, were added, or were removed instead of re-rendering the entire list; keys should be unique and stable, ideally based on a data ID rather than the array index.",
    keywords: ["key", "list rendering", "identity", "unique"],
  },
  {
    text: "What is the difference between a functional component and a class component in React?",
    category: "technical",
    role: "react",
    difficulty: "easy",
    modelAnswer:
      "A functional component is a plain JavaScript function that returns JSX and, with hooks, can manage state and side effects, while a class component extends React.Component and manages state via this.state and lifecycle methods; functional components with hooks are now the standard, more concise approach in modern React.",
    keywords: ["functional component", "class component", "hooks", "lifecycle"],
  },
  {
    text: "What is the purpose of build tooling like Vite or Create React App when starting a React project?",
    category: "technical",
    role: "react",
    difficulty: "easy",
    modelAnswer:
      "These are pre-configured development environments for React that handle tasks like bundling JavaScript modules, transpiling JSX and modern syntax, running a local dev server with hot reloading, and producing an optimized production build, so developers don't have to configure Webpack or Babel manually.",
    keywords: ["build tooling", "bundler", "dev server", "Vite", "create-react-app"],
  },
  {
    text: "What is prop drilling in React and how can it be avoided?",
    category: "technical",
    role: "react",
    difficulty: "medium",
    modelAnswer:
      "Prop drilling occurs when data needs to be passed down through several layers of intermediate components that don't actually use the data themselves, just to reach a deeply nested child; it can be avoided using the Context API, component composition, or a state management library so intermediate components don't need to know about data they don't use.",
    keywords: ["prop drilling", "component tree", "context API", "composition"],
  },
  {
    text: "Explain the useMemo and useCallback hooks and when you would use them.",
    category: "technical",
    role: "react",
    difficulty: "medium",
    modelAnswer:
      "useMemo memoizes the result of an expensive computation, recalculating it only when its dependencies change, while useCallback memoizes a function reference itself so it doesn't get recreated on every render; both are primarily used to avoid unnecessary re-renders of child components or expensive recalculations, and should be applied selectively since they add their own overhead.",
    keywords: ["useMemo", "useCallback", "memoization", "performance", "re-render"],
  },
  {
    text: "What are custom hooks in React and why are they useful?",
    category: "technical",
    role: "react",
    difficulty: "medium",
    modelAnswer:
      "A custom hook is a JavaScript function whose name starts with 'use' and that can call other hooks internally, allowing reusable stateful logic (like data fetching or form handling) to be extracted out of components and shared across multiple components without duplicating code or resorting to older patterns like higher-order components.",
    keywords: ["custom hook", "reusable logic", "use prefix", "stateful logic"],
  },
  {
    text: "What is the difference between client-side rendering and server-side rendering in the context of React apps?",
    category: "technical",
    role: "react",
    difficulty: "medium",
    modelAnswer:
      "In client-side rendering, the browser downloads a minimal HTML shell and JavaScript bundle, then renders the UI in the browser, which can mean a blank page until JS loads; in server-side rendering, the server generates the full HTML for a page on each request (or ahead of time), sending a ready-to-display page to the browser, improving initial load performance and SEO at the cost of additional server work.",
    keywords: ["client-side rendering", "server-side rendering", "SEO", "hydration"],
  },
  {
    text: "How does React Router enable client-side navigation in a single-page application?",
    category: "technical",
    role: "react",
    difficulty: "medium",
    modelAnswer:
      "React Router intercepts navigation (like clicking a Link) and updates the browser's URL and history using the History API without triggering a full page reload, then renders the component matching the new route, giving users the experience of navigating between pages while staying within a single loaded application.",
    keywords: ["React Router", "client-side navigation", "single-page application", "History API"],
  },
  {
    text: "Explain how React's Fiber architecture improved rendering compared to the old stack reconciler.",
    category: "technical",
    role: "react",
    difficulty: "hard",
    modelAnswer:
      "The old stack reconciler processed the entire component tree synchronously and couldn't be paused, which could block the main thread on large updates; Fiber restructured reconciliation into an incremental, interruptible unit of work model, allowing React to pause, prioritize, and resume rendering work, enabling features like concurrent rendering and better responsiveness for high-priority updates like user input.",
    keywords: ["Fiber", "reconciliation", "concurrent rendering", "interruptible"],
  },
  {
    text: "What are React error boundaries and what limitations do they have?",
    category: "technical",
    role: "react",
    difficulty: "hard",
    modelAnswer:
      "Error boundaries are class components that implement componentDidCatch or static getDerivedStateFromError to catch JavaScript errors thrown by their child component tree during rendering, display a fallback UI, and log the error, preventing the whole app from crashing; however, they don't catch errors in event handlers, asynchronous code, server-side rendering, or errors thrown in the boundary itself.",
    keywords: ["error boundary", "componentDidCatch", "fallback UI", "limitations"],
  },
  {
    text: "How would you optimize a React application that re-renders too frequently?",
    category: "technical",
    role: "react",
    difficulty: "hard",
    modelAnswer:
      "Common strategies include wrapping components in React.memo to skip re-rendering when props haven't changed, using useMemo/useCallback to stabilize computed values and function references passed as props, splitting large components into smaller ones so state changes affect a narrower render scope, and using the React DevTools profiler to identify which components are actually re-rendering unnecessarily before optimizing.",
    keywords: ["React.memo", "performance optimization", "re-render", "profiler"],
  },
  {
    text: "Explain how React Suspense works for data fetching and code splitting.",
    category: "technical",
    role: "react",
    difficulty: "hard",
    modelAnswer:
      "Suspense lets a component 'wait' for something (like a lazily-loaded component via React.lazy, or a data source that supports Suspense) before rendering, showing a fallback UI in the meantime; for code splitting, React.lazy combined with Suspense allows a component's code to be loaded only when it's actually needed, reducing the initial JavaScript bundle size and improving load performance.",
    keywords: ["Suspense", "React.lazy", "code splitting", "data fetching"],
  },
];

const nodeQuestions = [
  {
    text: "What is Node.js and why is it commonly used for building web servers?",
    category: "technical",
    role: "node",
    difficulty: "easy",
    modelAnswer:
      "Node.js is a JavaScript runtime built on Chrome's V8 engine that executes JavaScript outside the browser; its non-blocking, event-driven I/O model makes it efficient for building scalable network applications like web servers that handle many concurrent connections without spawning a thread per request.",
    keywords: ["Node.js", "runtime", "V8", "non-blocking", "event-driven"],
  },
  {
    text: "What is npm and what is the purpose of package.json?",
    category: "technical",
    role: "node",
    difficulty: "easy",
    modelAnswer:
      "npm (Node Package Manager) is the default package manager for Node.js used to install, share, and manage project dependencies; package.json describes the project, lists its dependencies and versions, and defines scripts for common tasks like starting or testing the application.",
    keywords: ["npm", "package.json", "dependencies", "package manager"],
  },
  {
    text: "Explain the difference between synchronous and asynchronous file operations in Node.js.",
    category: "technical",
    role: "node",
    difficulty: "medium",
    modelAnswer:
      "Synchronous methods like fs.readFileSync block the event loop until the operation completes, which can freeze the entire server for other requests, while asynchronous methods like fs.readFile use callbacks, promises, or async/await to perform I/O in the background and let the event loop keep processing other work, making them the preferred choice for scalable servers.",
    keywords: ["synchronous", "asynchronous", "event loop", "fs module", "blocking"],
  },
  {
    text: "What is middleware in the context of an Express.js application?",
    category: "technical",
    role: "node",
    difficulty: "medium",
    modelAnswer:
      "Middleware functions are functions that have access to the request, response, and next objects in the request-response cycle, and can execute code, modify req/res, end the cycle, or call next() to pass control to the next middleware, commonly used for logging, authentication, parsing request bodies, and error handling.",
    keywords: ["middleware", "Express", "request", "response", "next"],
  },
  {
    text: "How does Node.js handle CPU-intensive tasks given its single-threaded event loop, and what are the common solutions?",
    category: "technical",
    role: "node",
    difficulty: "hard",
    modelAnswer:
      "Since Node.js runs JavaScript on a single main thread, CPU-intensive synchronous work blocks the event loop and delays all other requests; common solutions include offloading work to worker threads (the worker_threads module), spawning child processes, or using a message queue with separate worker services, keeping the main thread free to handle I/O-bound requests.",
    keywords: ["event loop", "worker threads", "child process", "CPU-intensive", "blocking", "single-threaded"],
  },
  {
    text: "Explain how streams work in Node.js and why they're useful for handling large files.",
    category: "technical",
    role: "node",
    difficulty: "hard",
    modelAnswer:
      "Streams process data in chunks rather than loading an entire resource into memory at once, using readable, writable, duplex, and transform stream types connected via .pipe(); this makes them memory-efficient for handling large files or network data, since data can be processed and forwarded incrementally as it arrives instead of waiting for the whole payload.",
    keywords: ["streams", "pipe", "readable", "writable", "memory efficient", "chunks"],
  },
  {
    text: "What is the purpose of the 'require' function in Node.js, and how does it differ from ES module 'import'?",
    category: "technical",
    role: "node",
    difficulty: "easy",
    modelAnswer:
      "require() is Node's CommonJS mechanism for synchronously loading modules at runtime and was the original module system in Node.js, while import is the ES Module syntax that's statically analyzed and can be loaded asynchronously; modern Node.js supports both, though a project typically commits to one via its package.json 'type' field.",
    keywords: ["require", "import", "CommonJS", "ES modules", "module system"],
  },
  {
    text: "What is the purpose of the process object in Node.js?",
    category: "technical",
    role: "node",
    difficulty: "easy",
    modelAnswer:
      "The process object is a global that provides information about, and control over, the currently running Node.js process, including access to environment variables (process.env), command-line arguments (process.argv), the ability to exit the process (process.exit), and event hooks for things like uncaught exceptions.",
    keywords: ["process object", "environment variables", "global", "process.exit"],
  },
  {
    text: "What is the difference between dependencies and devDependencies in package.json?",
    category: "technical",
    role: "node",
    difficulty: "easy",
    modelAnswer:
      "dependencies are packages required for the application to run in production, while devDependencies are packages only needed during development or testing, like test runners or linters, and are typically excluded when installing with --production or --omit=dev.",
    keywords: ["dependencies", "devDependencies", "package.json", "production"],
  },
  {
    text: "What is an environment variable and why are they commonly used in Node.js applications?",
    category: "technical",
    role: "node",
    difficulty: "easy",
    modelAnswer:
      "Environment variables are key-value pairs available to a running process from its operating environment, commonly used in Node.js applications (often loaded via a library like dotenv) to store configuration like database URLs or secrets outside of source code, keeping sensitive values out of version control and allowing different configuration per environment.",
    keywords: ["environment variable", "configuration", "dotenv", "secrets"],
  },
  {
    text: "What does the Express.js 'app.use()' method do?",
    category: "technical",
    role: "node",
    difficulty: "easy",
    modelAnswer:
      "app.use() registers middleware functions that run for every incoming request (or requests matching a specified path prefix), executing in the order they were registered, commonly used to apply logging, body parsing, authentication, or routing logic across many routes at once.",
    keywords: ["app.use", "middleware", "Express", "request pipeline"],
  },
  {
    text: "Explain how error-handling middleware works in Express.js.",
    category: "technical",
    role: "node",
    difficulty: "medium",
    modelAnswer:
      "Error-handling middleware in Express is defined with four parameters (err, req, res, next) instead of the usual three, and Express recognizes this signature to route errors passed via next(err) directly to it, skipping regular middleware; it should be registered last, after all other routes and middleware, to catch errors from anywhere in the request pipeline.",
    keywords: ["error-handling middleware", "Express", "next", "four parameters"],
  },
  {
    text: "What is the purpose of environment-specific configuration in a Node.js/Express application, and how is it typically implemented?",
    category: "technical",
    role: "node",
    difficulty: "medium",
    modelAnswer:
      "Environment-specific configuration lets an application behave differently across development, testing, and production — for example using different database URLs, log verbosity, or CORS origins — typically implemented by reading values from process.env (often populated by a .env file locally and real environment variables in production) rather than hardcoding values in source code.",
    keywords: ["environment configuration", "process.env", "development", "production"],
  },
  {
    text: "What is connection pooling and why is it important when connecting Node.js to a database?",
    category: "technical",
    role: "node",
    difficulty: "medium",
    modelAnswer:
      "Connection pooling maintains a reusable set of open database connections rather than opening and closing a new connection for every query, which is expensive; database drivers and ORMs like Mongoose typically manage a connection pool internally, significantly improving performance and preventing the database from being overwhelmed by excessive simultaneous connections under load.",
    keywords: ["connection pooling", "database", "performance", "Mongoose"],
  },
  {
    text: "How does clustering work in Node.js and why would you use it?",
    category: "technical",
    role: "node",
    difficulty: "medium",
    modelAnswer:
      "Node.js's cluster module allows an application to spawn multiple worker processes, each running its own instance of the event loop on a separate CPU core, with the primary process load-balancing incoming connections across them; this lets a Node.js application take advantage of multi-core systems, since a single Node process only uses one core by default.",
    keywords: ["cluster module", "worker process", "multi-core", "load balancing"],
  },
  {
    text: "What is the purpose of a .env file and how does the dotenv package use it in Node.js?",
    category: "technical",
    role: "node",
    difficulty: "medium",
    modelAnswer:
      "A .env file stores key-value configuration and secrets in a simple text format outside of source code; the dotenv package reads this file at application startup and loads its values into process.env, letting developers keep sensitive values like database credentials and API keys out of version control while still being easily accessible in code.",
    keywords: ["dotenv", ".env file", "configuration", "secrets", "process.env"],
  },
  {
    text: "How would you handle graceful shutdown in a Node.js/Express server?",
    category: "technical",
    role: "node",
    difficulty: "hard",
    modelAnswer:
      "Graceful shutdown involves listening for termination signals (like SIGTERM or SIGINT), stopping the server from accepting new connections via server.close(), waiting for in-flight requests to finish, closing database connections and other resources cleanly, and then exiting the process, which prevents dropped requests and data corruption during deployments or restarts.",
    keywords: ["graceful shutdown", "SIGTERM", "server.close", "in-flight requests"],
  },
  {
    text: "Explain how Node.js's libuv library enables asynchronous I/O despite JavaScript being single-threaded.",
    category: "technical",
    role: "node",
    difficulty: "hard",
    modelAnswer:
      "libuv is a C library that provides Node.js with an event loop and a thread pool; while the JavaScript code itself runs on a single thread, I/O operations like file system access or DNS lookups are offloaded to libuv's thread pool (or OS-level async mechanisms for networking), and their results are delivered back to the JavaScript event loop via callbacks once complete, keeping the main thread free.",
    keywords: ["libuv", "event loop", "thread pool", "asynchronous I/O"],
  },
  {
    text: "What security best practices should be followed when building a REST API with Express.js?",
    category: "technical",
    role: "node",
    difficulty: "hard",
    modelAnswer:
      "Key practices include using HTTPS in production, setting security headers with a library like helmet, validating and sanitizing all user input to prevent injection attacks, hashing passwords with bcrypt, rate-limiting sensitive endpoints like login, keeping secrets in environment variables rather than source code, and returning generic error messages that don't leak internal implementation details.",
    keywords: ["security", "helmet", "input validation", "rate limiting", "REST API"],
  },
  {
    text: "How does Node.js handle memory leaks, and what are common causes in a long-running server process?",
    category: "technical",
    role: "node",
    difficulty: "hard",
    modelAnswer:
      "Node.js doesn't automatically prevent memory leaks; common causes include global variables that grow unbounded, event listeners that are added repeatedly without being removed, closures unintentionally retaining large objects, and unresolved Promises accumulating; leaks are typically diagnosed using heap snapshots and profiling tools (like Chrome DevTools or clinic.js) to identify objects that keep growing across garbage collection cycles.",
    keywords: ["memory leak", "event listener", "closure", "heap snapshot", "profiling"],
  },
];

const databaseQuestions = [
  {
    text: "What is the difference between SQL and NoSQL databases?",
    category: "technical",
    role: "database",
    difficulty: "easy",
    modelAnswer:
      "SQL databases are relational, use structured schemas with tables, and enforce ACID compliance, while NoSQL databases are non-relational, offer flexible schemas, and are designed for horizontal scalability with large unstructured or semi-structured data.",
    keywords: ["relational", "schema", "scalability", "ACID", "structured"],
  },
  {
    text: "What is a primary key and how does it differ from a foreign key?",
    category: "technical",
    role: "database",
    difficulty: "easy",
    modelAnswer:
      "A primary key uniquely identifies each record in a table and cannot contain null values, while a foreign key is a column (or set of columns) in one table that references the primary key of another table, establishing and enforcing a relationship between the two tables.",
    keywords: ["primary key", "foreign key", "unique", "relationship", "constraint"],
  },
  {
    text: "What is database normalization and why is it important?",
    category: "technical",
    role: "database",
    difficulty: "medium",
    modelAnswer:
      "Normalization is the process of organizing a relational database's tables and columns to reduce data redundancy and improve data integrity, typically by progressing through normal forms (1NF, 2NF, 3NF) that eliminate repeating groups, partial dependencies, and transitive dependencies respectively.",
    keywords: ["normalization", "normal form", "redundancy", "data integrity", "dependency"],
  },
  {
    text: "Explain the difference between an INNER JOIN and a LEFT JOIN in SQL.",
    category: "technical",
    role: "database",
    difficulty: "medium",
    modelAnswer:
      "An INNER JOIN returns only the rows that have matching values in both joined tables, while a LEFT JOIN returns all rows from the left table plus matching rows from the right table, filling in NULLs for right-table columns when there is no match.",
    keywords: ["JOIN", "INNER JOIN", "LEFT JOIN", "SQL", "NULL"],
  },
  {
    text: "Explain ACID properties and how a database ensures them during concurrent transactions.",
    category: "technical",
    role: "database",
    difficulty: "hard",
    modelAnswer:
      "ACID stands for Atomicity (a transaction fully completes or fully rolls back), Consistency (a transaction moves the database from one valid state to another), Isolation (concurrent transactions don't interfere with each other's intermediate results), and Durability (committed changes survive crashes); databases enforce these using mechanisms like write-ahead logging, locking, and isolation levels (e.g. read committed, serializable) to manage concurrent access safely.",
    keywords: ["ACID", "atomicity", "consistency", "isolation", "durability", "transaction"],
  },
  {
    text: "How does indexing improve database query performance, and what are the tradeoffs of adding too many indexes?",
    category: "technical",
    role: "database",
    difficulty: "hard",
    modelAnswer:
      "An index creates an ordered data structure (commonly a B-tree) on one or more columns that lets the database locate matching rows without scanning the entire table, drastically speeding up reads and lookups; however, every index adds storage overhead and slows down writes (inserts, updates, deletes) since each index must also be updated, so indexes should be added deliberately based on actual query patterns rather than indiscriminately.",
    keywords: ["index", "B-tree", "query performance", "write overhead", "storage"],
  },
  {
    text: "What is a schema in the context of a database?",
    category: "technical",
    role: "database",
    difficulty: "easy",
    modelAnswer:
      "A schema defines the structure of a database — the tables (or collections), the fields/columns each contains, their data types, and the relationships between them — acting as a blueprint that describes how data is organized, whether strictly enforced (as in SQL databases) or more flexible (as in many NoSQL databases).",
    keywords: ["schema", "structure", "tables", "data types"],
  },
  {
    text: "What is the purpose of a database transaction?",
    category: "technical",
    role: "database",
    difficulty: "easy",
    modelAnswer:
      "A transaction groups a sequence of database operations into a single logical unit of work that either fully succeeds (commit) or fully fails and rolls back, ensuring the database never ends up in a partially-updated, inconsistent state even if an error occurs partway through.",
    keywords: ["transaction", "commit", "rollback", "consistency"],
  },
  {
    text: "What is the difference between DELETE and TRUNCATE in SQL?",
    category: "technical",
    role: "database",
    difficulty: "easy",
    modelAnswer:
      "DELETE removes rows one at a time, can be filtered with a WHERE clause, and can be rolled back within a transaction, while TRUNCATE removes all rows from a table at once, generally cannot be filtered, and is typically faster since it doesn't log individual row deletions, though it also resets auto-increment counters.",
    keywords: ["DELETE", "TRUNCATE", "SQL", "rollback"],
  },
  {
    text: "What is a NoSQL document database, and how does MongoDB store data?",
    category: "technical",
    role: "database",
    difficulty: "easy",
    modelAnswer:
      "A document database stores data as flexible, JSON-like documents (BSON in MongoDB's case) grouped into collections rather than rows in rigid tables, allowing each document in a collection to have a different structure if needed, which suits applications with evolving or nested data models.",
    keywords: ["document database", "MongoDB", "BSON", "collection", "flexible schema"],
  },
  {
    text: "What is the purpose of a GROUP BY clause in SQL?",
    category: "technical",
    role: "database",
    difficulty: "easy",
    modelAnswer:
      "GROUP BY groups rows that share the same values in specified columns into summary rows, commonly used with aggregate functions like COUNT, SUM, or AVG to compute statistics per group, such as the total number of orders per customer.",
    keywords: ["GROUP BY", "aggregate function", "SQL", "COUNT", "SUM"],
  },
  {
    text: "What is database replication and why is it used?",
    category: "technical",
    role: "database",
    difficulty: "medium",
    modelAnswer:
      "Replication maintains copies of the same data across multiple database servers, keeping them synchronized so that if the primary server fails, a replica can take over (improving availability), and read traffic can be distributed across replicas to improve performance, at the cost of added complexity in keeping replicas consistent.",
    keywords: ["replication", "availability", "primary", "replica", "consistency"],
  },
  {
    text: "What is database sharding and how does it help with scalability?",
    category: "technical",
    role: "database",
    difficulty: "medium",
    modelAnswer:
      "Sharding horizontally partitions a large dataset across multiple database servers (shards), with each shard holding a subset of the data based on a shard key, allowing the system to scale beyond what a single server could handle by distributing storage and query load across many machines.",
    keywords: ["sharding", "horizontal partitioning", "shard key", "scalability"],
  },
  {
    text: "Explain the difference between optimistic and pessimistic locking in database concurrency control.",
    category: "technical",
    role: "database",
    difficulty: "medium",
    modelAnswer:
      "Pessimistic locking prevents conflicts by locking a record as soon as it's read for update, blocking other transactions from modifying it until the lock is released, while optimistic locking allows concurrent reads and only checks for conflicts (often via a version number) at write time, rolling back if the record changed since it was read — better suited to low-contention scenarios.",
    keywords: ["optimistic locking", "pessimistic locking", "concurrency control", "version number"],
  },
  {
    text: "What is a composite index and when would you use one?",
    category: "technical",
    role: "database",
    difficulty: "medium",
    modelAnswer:
      "A composite index is built on two or more columns together rather than a single column, useful when queries frequently filter or sort by that specific combination of fields; column order in the index matters, since it can efficiently support queries filtering on a prefix of the indexed columns but not necessarily the reverse.",
    keywords: ["composite index", "multi-column index", "query optimization", "column order"],
  },
  {
    text: "What is denormalization and when might it be a reasonable tradeoff?",
    category: "technical",
    role: "database",
    difficulty: "medium",
    modelAnswer:
      "Denormalization intentionally introduces redundancy into a database design — for example duplicating a field across tables — to reduce the number of joins needed for common read queries, trading some data integrity risk and storage overhead for read performance, which can be a reasonable tradeoff in read-heavy systems where join costs are a proven bottleneck.",
    keywords: ["denormalization", "redundancy", "read performance", "joins"],
  },
  {
    text: "Explain the CAP theorem and its implications for distributed database design.",
    category: "technical",
    role: "database",
    difficulty: "hard",
    modelAnswer:
      "The CAP theorem states that a distributed data store can only guarantee two of three properties at the same time during a network partition: Consistency (every read receives the most recent write), Availability (every request receives a response), and Partition tolerance (the system continues operating despite network failures); since partitions are unavoidable in real distributed systems, designers must choose to prioritize consistency (CP) or availability (AP) when a partition occurs.",
    keywords: ["CAP theorem", "consistency", "availability", "partition tolerance", "distributed system"],
  },
  {
    text: "How do database isolation levels affect concurrency issues like dirty reads and phantom reads?",
    category: "technical",
    role: "database",
    difficulty: "hard",
    modelAnswer:
      "Isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) control how much one transaction is shielded from the effects of concurrent transactions; lower levels like Read Uncommitted allow anomalies such as dirty reads (seeing uncommitted changes) and phantom reads (seeing new rows appear in repeated queries), while Serializable, the strictest level, prevents these at the cost of reduced concurrency due to more extensive locking.",
    keywords: ["isolation level", "dirty read", "phantom read", "serializable", "concurrency"],
  },
  {
    text: "Explain how a write-ahead log (WAL) contributes to database durability and crash recovery.",
    category: "technical",
    role: "database",
    difficulty: "hard",
    modelAnswer:
      "A write-ahead log records every change as a log entry before it's applied to the actual data files, ensuring that if the database crashes mid-operation, it can replay the log on restart to redo committed transactions that hadn't yet been flushed to disk, or roll back uncommitted ones — providing durability guarantees without requiring every single change to be immediately and expensively written to the main data files.",
    keywords: ["write-ahead log", "WAL", "durability", "crash recovery", "transaction log"],
  },
  {
    text: "How would you design a MongoDB schema differently from a normalized SQL schema for the same domain, and why?",
    category: "technical",
    role: "database",
    difficulty: "hard",
    modelAnswer:
      "Where a normalized SQL schema spreads related data across many linked tables to avoid duplication, a MongoDB schema often embeds related data directly within a document when it's frequently accessed together and doesn't change independently, trading some duplication for fewer joins and faster reads; references (similar to foreign keys) are still used for data that's large, shared across many documents, or updated independently, so the right design depends on the application's actual read/write patterns rather than blindly normalizing.",
    keywords: ["MongoDB schema design", "embedding", "referencing", "denormalization", "document model"],
  },
];

const networkingQuestions = [
  {
    text: "What is the difference between TCP and UDP?",
    category: "technical",
    role: "networking",
    difficulty: "easy",
    modelAnswer:
      "TCP is a connection-oriented protocol that guarantees reliable, ordered delivery of data through acknowledgments and retransmission, while UDP is a connectionless protocol that sends data without guarantees of delivery or order, making it faster and suitable for use cases like video streaming or gaming where speed matters more than perfect reliability.",
    keywords: ["TCP", "UDP", "connection-oriented", "reliable", "connectionless"],
  },
  {
    text: "What is the purpose of DNS?",
    category: "technical",
    role: "networking",
    difficulty: "easy",
    modelAnswer:
      "DNS (Domain Name System) translates human-readable domain names like example.com into IP addresses that computers use to identify each other on a network, acting like a distributed phonebook for the internet.",
    keywords: ["DNS", "domain name", "IP address", "resolution"],
  },
  {
    text: "Explain the difference between the OSI model and the TCP/IP model.",
    category: "technical",
    role: "networking",
    difficulty: "medium",
    modelAnswer:
      "The OSI model is a conceptual 7-layer framework (Physical, Data Link, Network, Transport, Session, Presentation, Application) describing network communication in detail, while the TCP/IP model is a more practical, widely implemented 4-layer model (Network Interface, Internet, Transport, Application) that combines some OSI layers; both describe how data moves from an application on one device to an application on another.",
    keywords: ["OSI model", "TCP/IP model", "layers", "protocol", "network"],
  },
  {
    text: "What happens during a TCP three-way handshake?",
    category: "technical",
    role: "networking",
    difficulty: "medium",
    modelAnswer:
      "The client sends a SYN packet to initiate a connection, the server responds with a SYN-ACK acknowledging the request and proposing its own sequence number, and the client replies with an ACK confirming the connection; after this handshake completes, both sides can reliably exchange data over the established TCP connection.",
    keywords: ["three-way handshake", "SYN", "ACK", "TCP", "connection"],
  },
  {
    text: "Explain how HTTPS ensures secure communication and what role certificates play.",
    category: "technical",
    role: "networking",
    difficulty: "hard",
    modelAnswer:
      "HTTPS wraps HTTP traffic in TLS, which encrypts data in transit to prevent eavesdropping and tampering; during the TLS handshake, the server presents a certificate signed by a trusted Certificate Authority to prove its identity, the two sides negotiate a cipher suite and exchange keys (often via asymmetric cryptography) to derive a shared symmetric session key, which is then used to encrypt the actual data efficiently for the rest of the session.",
    keywords: ["HTTPS", "TLS", "certificate", "encryption", "handshake", "Certificate Authority"],
  },
  {
    text: "What is the difference between a forward proxy and a reverse proxy, and what problems does each solve?",
    category: "technical",
    role: "networking",
    difficulty: "hard",
    modelAnswer:
      "A forward proxy sits in front of clients and forwards their requests to the internet, often used for anonymity, content filtering, or caching from the client's perspective, while a reverse proxy sits in front of servers and forwards client requests to one of several backend servers, commonly used for load balancing, SSL termination, caching, and hiding backend infrastructure details from clients.",
    keywords: ["forward proxy", "reverse proxy", "load balancing", "SSL termination", "caching"],
  },
  {
    text: "What is an IP address and what is the difference between IPv4 and IPv6?",
    category: "technical",
    role: "networking",
    difficulty: "easy",
    modelAnswer:
      "An IP address is a unique numerical identifier assigned to a device on a network so it can send and receive data; IPv4 uses a 32-bit address space (about 4.3 billion addresses, written like 192.168.1.1), while IPv6 uses a much larger 128-bit address space to accommodate the growing number of internet-connected devices.",
    keywords: ["IP address", "IPv4", "IPv6", "address space"],
  },
  {
    text: "What is a port number and why is it needed alongside an IP address?",
    category: "technical",
    role: "networking",
    difficulty: "easy",
    modelAnswer:
      "A port number identifies a specific process or service running on a device, allowing multiple network applications (like a web server and an email server) to run simultaneously on the same machine and IP address, with incoming traffic routed to the correct application based on which port it targets.",
    keywords: ["port number", "IP address", "process", "service"],
  },
  {
    text: "What is the difference between HTTP and HTTPS?",
    category: "technical",
    role: "networking",
    difficulty: "easy",
    modelAnswer:
      "HTTP transmits data between a client and server in plain text, making it vulnerable to eavesdropping and tampering, while HTTPS adds a layer of TLS encryption on top of HTTP, securing the data in transit and verifying the server's identity via a certificate.",
    keywords: ["HTTP", "HTTPS", "TLS", "encryption"],
  },
  {
    text: "What is a router and how does it differ from a switch?",
    category: "technical",
    role: "networking",
    difficulty: "easy",
    modelAnswer:
      "A switch connects devices within the same local network and forwards data based on MAC addresses, while a router connects different networks together (like a home network to the internet) and forwards data based on IP addresses, making routing decisions about the best path for traffic to reach its destination.",
    keywords: ["router", "switch", "MAC address", "IP address", "local network"],
  },
  {
    text: "What is a firewall and what purpose does it serve in a network?",
    category: "technical",
    role: "networking",
    difficulty: "easy",
    modelAnswer:
      "A firewall monitors and controls incoming and outgoing network traffic based on predefined security rules, acting as a barrier between a trusted internal network and untrusted external networks to block unauthorized access while allowing legitimate traffic through.",
    keywords: ["firewall", "network security", "traffic filtering", "rules"],
  },
  {
    text: "What is NAT (Network Address Translation) and why is it used?",
    category: "technical",
    role: "networking",
    difficulty: "medium",
    modelAnswer:
      "NAT allows multiple devices on a private network to share a single public IP address when communicating with the internet, translating private internal addresses to the shared public address (and back for responses); it helps conserve the limited pool of public IPv4 addresses and adds a layer of obscurity for devices behind it.",
    keywords: ["NAT", "private IP", "public IP", "address translation"],
  },
  {
    text: "Explain the difference between a stateless and stateful firewall.",
    category: "technical",
    role: "networking",
    difficulty: "medium",
    modelAnswer:
      "A stateless firewall examines each packet in isolation against a fixed set of rules without any awareness of ongoing connections, while a stateful firewall tracks the state of active connections and can make smarter decisions, such as automatically allowing return traffic for a connection that was initiated from inside the network.",
    keywords: ["stateless firewall", "stateful firewall", "connection tracking", "packet filtering"],
  },
  {
    text: "What is the purpose of load balancing in a networked application, and name a few common strategies.",
    category: "technical",
    role: "networking",
    difficulty: "medium",
    modelAnswer:
      "Load balancing distributes incoming network traffic across multiple backend servers to prevent any single server from becoming a bottleneck, improving availability and performance; common strategies include round robin (cycling through servers evenly), least connections (routing to the server with the fewest active connections), and IP hash (routing based on the client's IP for session consistency).",
    keywords: ["load balancing", "round robin", "least connections", "availability"],
  },
  {
    text: "What is a CDN (Content Delivery Network) and how does it improve website performance?",
    category: "technical",
    role: "networking",
    difficulty: "medium",
    modelAnswer:
      "A CDN is a geographically distributed network of servers that cache and serve static content (like images, CSS, and JavaScript) from a location physically closer to the requesting user, reducing latency and load times compared to fetching everything from a single origin server, while also absorbing traffic spikes and reducing load on the origin.",
    keywords: ["CDN", "caching", "latency", "edge server"],
  },
  {
    text: "What is the difference between symmetric and asymmetric encryption, and where does each fit into HTTPS?",
    category: "technical",
    role: "networking",
    difficulty: "medium",
    modelAnswer:
      "Symmetric encryption uses a single shared key for both encryption and decryption, which is fast but requires securely exchanging the key beforehand, while asymmetric encryption uses a public/private key pair, where anyone can encrypt with the public key but only the private key holder can decrypt; HTTPS uses asymmetric encryption during the initial TLS handshake to securely exchange a symmetric session key, then switches to fast symmetric encryption for the actual data transfer.",
    keywords: ["symmetric encryption", "asymmetric encryption", "TLS handshake", "session key"],
  },
  {
    text: "Explain how BGP (Border Gateway Protocol) enables routing between different networks on the internet.",
    category: "technical",
    role: "networking",
    difficulty: "hard",
    modelAnswer:
      "BGP is the protocol that autonomous systems (large networks like ISPs) use to exchange routing information with each other, advertising which IP address ranges they can reach and via what path; it's a path-vector protocol that makes routing decisions based on policies and path attributes rather than just shortest distance, effectively acting as the internet's mechanism for determining how traffic flows between independently operated networks.",
    keywords: ["BGP", "autonomous system", "routing protocol", "path-vector"],
  },
  {
    text: "What is a man-in-the-middle attack, and how does TLS/HTTPS help prevent it?",
    category: "technical",
    role: "networking",
    difficulty: "hard",
    modelAnswer:
      "A man-in-the-middle attack occurs when an attacker secretly intercepts and potentially alters communication between two parties who believe they're communicating directly with each other; TLS helps prevent this by using certificates signed by trusted Certificate Authorities to verify the server's identity during the handshake, and by encrypting the session so any intercepted traffic is unreadable without the negotiated keys.",
    keywords: ["man-in-the-middle", "TLS", "certificate authority", "encryption"],
  },
  {
    text: "Explain how WebSockets differ from traditional HTTP requests, and when you'd choose them.",
    category: "technical",
    role: "networking",
    difficulty: "hard",
    modelAnswer:
      "Traditional HTTP follows a request-response model where the client must initiate every exchange, while WebSockets establish a single persistent, full-duplex connection after an initial HTTP handshake, allowing the server to push data to the client at any time without the client needing to repeatedly poll; they're well-suited for real-time applications like chat, live notifications, or collaborative editing where low-latency, bidirectional communication matters.",
    keywords: ["WebSocket", "full-duplex", "real-time", "HTTP handshake"],
  },
  {
    text: "What is DNS caching and DNS propagation, and why can DNS changes take time to take effect globally?",
    category: "technical",
    role: "networking",
    difficulty: "hard",
    modelAnswer:
      "DNS records include a TTL (time-to-live) value that tells resolvers and browsers how long they can cache a lookup result before checking again; when a DNS record changes, resolvers around the world that already cached the old value continue serving it until their cached TTL expires, which is why DNS changes appear to 'propagate' gradually rather than taking effect everywhere instantly.",
    keywords: ["DNS caching", "TTL", "propagation", "resolver"],
  },
];

const oopQuestions = [
  {
    text: "What are the four main principles of Object-Oriented Programming?",
    category: "technical",
    role: "oop",
    difficulty: "easy",
    modelAnswer:
      "The four main principles are encapsulation (bundling data and methods together while restricting direct access to internal state), abstraction (exposing only essential features while hiding implementation details), inheritance (allowing a class to acquire properties and behavior from another class), and polymorphism (allowing objects of different types to be treated through a common interface).",
    keywords: ["encapsulation", "abstraction", "inheritance", "polymorphism"],
  },
  {
    text: "What is the difference between a class and an object?",
    category: "technical",
    role: "oop",
    difficulty: "easy",
    modelAnswer:
      "A class is a blueprint or template that defines the properties and behaviors an object of that type will have, while an object is a concrete instance created from that class, occupying its own memory and holding its own state.",
    keywords: ["class", "object", "instance", "blueprint", "state"],
  },
  {
    text: "Explain the difference between method overloading and method overriding.",
    category: "technical",
    role: "oop",
    difficulty: "medium",
    modelAnswer:
      "Method overloading occurs when multiple methods in the same class share a name but differ in parameter type or count, resolved at compile time (static polymorphism), while method overriding occurs when a subclass provides its own implementation of a method already defined in its parent class with the same signature, resolved at runtime (dynamic polymorphism).",
    keywords: ["overloading", "overriding", "polymorphism", "compile time", "runtime"],
  },
  {
    text: "What is the difference between composition and inheritance, and when would you prefer one over the other?",
    category: "technical",
    role: "oop",
    difficulty: "medium",
    modelAnswer:
      "Inheritance models an 'is-a' relationship where a subclass extends a parent class's behavior, while composition models a 'has-a' relationship where a class contains instances of other classes to reuse their behavior; composition is often preferred because it's more flexible and avoids the tight coupling and fragile hierarchies that deep inheritance chains can create.",
    keywords: ["composition", "inheritance", "is-a", "has-a", "coupling"],
  },
  {
    text: "Explain polymorphism in OOP and how dynamic dispatch is implemented under the hood.",
    category: "technical",
    role: "oop",
    difficulty: "hard",
    modelAnswer:
      "Polymorphism allows objects of different classes to be accessed through a common interface, with the correct method implementation selected at runtime based on the object's actual type; this is typically implemented via a virtual method table (vtable) — each class with overridable methods has a table of function pointers, and calling a method on an object looks up the correct implementation through the object's vtable pointer rather than being resolved statically at compile time.",
    keywords: ["polymorphism", "dynamic dispatch", "vtable", "runtime", "virtual method"],
  },
  {
    text: "What is the SOLID principle set in OOP design, and briefly explain the Single Responsibility and Open/Closed principles?",
    category: "technical",
    role: "oop",
    difficulty: "hard",
    modelAnswer:
      "SOLID is a set of five design principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) aimed at producing maintainable, extensible object-oriented code. Single Responsibility states a class should have only one reason to change, while Open/Closed states classes should be open for extension but closed for modification, typically achieved through abstraction and polymorphism rather than editing existing tested code.",
    keywords: ["SOLID", "single responsibility", "open closed", "design principle", "maintainability"],
  },
  {
    text: "What is encapsulation in OOP and why is it useful?",
    category: "technical",
    role: "oop",
    difficulty: "easy",
    modelAnswer:
      "Encapsulation bundles an object's data and the methods that operate on it together, while restricting direct access to internal state through access modifiers like private or protected, exposing only a controlled public interface; this protects an object's internal consistency and lets its implementation change without breaking code that depends on it.",
    keywords: ["encapsulation", "access modifier", "private", "public interface"],
  },
  {
    text: "What is a constructor, and what is its purpose in OOP?",
    category: "technical",
    role: "oop",
    difficulty: "easy",
    modelAnswer:
      "A constructor is a special method automatically called when an object is instantiated, responsible for initializing that object's fields to a valid starting state, often accepting parameters that let the caller configure the new object at creation time.",
    keywords: ["constructor", "instantiation", "initialization", "object"],
  },
  {
    text: "What is method overriding and why is it a core part of polymorphism?",
    category: "technical",
    role: "oop",
    difficulty: "easy",
    modelAnswer:
      "Method overriding lets a subclass provide its own specific implementation of a method already defined in its parent class, using the same method signature; it's central to polymorphism because calling that method on a variable of the parent type will execute the subclass's version at runtime, based on the object's actual type.",
    keywords: ["overriding", "polymorphism", "subclass", "runtime"],
  },
  {
    text: "What is an interface in OOP, and why would you use one?",
    category: "technical",
    role: "oop",
    difficulty: "easy",
    modelAnswer:
      "An interface defines a contract of method signatures that implementing classes must provide, without specifying how those methods work internally; it lets unrelated classes be treated interchangeably wherever that interface is expected, enabling flexible, decoupled designs where code depends on behavior rather than a specific concrete class.",
    keywords: ["interface", "contract", "decoupling", "implementation"],
  },
  {
    text: "What does 'has-a' relationship mean in OOP, and how is it typically implemented?",
    category: "technical",
    role: "oop",
    difficulty: "easy",
    modelAnswer:
      "A 'has-a' relationship describes composition, where one class contains an instance of another class as a field to reuse its functionality, rather than inheriting from it; for example, a Car class might 'have' an Engine object rather than a Car being a type of Engine, modeling how real-world objects are actually built from parts.",
    keywords: ["has-a", "composition", "aggregation", "object"],
  },
  {
    text: "What is the difference between aggregation and composition in OOP?",
    category: "technical",
    role: "oop",
    difficulty: "medium",
    modelAnswer:
      "Both describe a 'has-a' relationship between objects, but in composition the contained object's lifecycle is tightly bound to its owner (it's created and destroyed with the parent, like a Room existing only as part of a House), while in aggregation the contained object can exist independently of its owner (like a Student belonging to a University but able to exist without it).",
    keywords: ["aggregation", "composition", "lifecycle", "has-a"],
  },
  {
    text: "What is the Liskov Substitution Principle and why does violating it cause problems?",
    category: "technical",
    role: "oop",
    difficulty: "medium",
    modelAnswer:
      "The Liskov Substitution Principle states that objects of a subclass should be substitutable for objects of their superclass without breaking the correctness of the program; violating it — for example, by having a subclass throw an exception or change behavior in a way callers of the parent type don't expect — makes code that relies on polymorphism unpredictable and fragile.",
    keywords: ["Liskov Substitution", "subclass", "polymorphism", "SOLID"],
  },
  {
    text: "What is an abstract method, and how does it differ from a regular method?",
    category: "technical",
    role: "oop",
    difficulty: "medium",
    modelAnswer:
      "An abstract method is declared with a signature but no implementation in an abstract class or interface, forcing any concrete subclass to provide its own implementation before it can be instantiated, unlike a regular (concrete) method which already has a working implementation that subclasses can use as-is or choose to override.",
    keywords: ["abstract method", "abstract class", "implementation", "subclass"],
  },
  {
    text: "What is coupling and cohesion in OOP design, and why is low coupling with high cohesion desirable?",
    category: "technical",
    role: "oop",
    difficulty: "medium",
    modelAnswer:
      "Coupling refers to how dependent classes are on each other's internal details, while cohesion refers to how closely related and focused the responsibilities within a single class are; low coupling makes classes easier to change independently without breaking others, and high cohesion makes each class easier to understand and maintain, since it has one clear, focused purpose.",
    keywords: ["coupling", "cohesion", "design quality", "maintainability"],
  },
  {
    text: "What is the Dependency Inversion Principle in OOP?",
    category: "technical",
    role: "oop",
    difficulty: "medium",
    modelAnswer:
      "The Dependency Inversion Principle states that high-level modules should not depend on low-level modules directly; both should depend on abstractions (interfaces), and low-level implementation details should depend on those abstractions too, rather than the other way around — this decouples business logic from specific implementations, making it easier to swap dependencies like a database or external service.",
    keywords: ["dependency inversion", "abstraction", "SOLID", "decoupling"],
  },
  {
    text: "Explain the Interface Segregation Principle and how violating it leads to bloated interfaces.",
    category: "technical",
    role: "oop",
    difficulty: "hard",
    modelAnswer:
      "The Interface Segregation Principle states that clients should not be forced to depend on methods they don't use; a single large interface covering many unrelated responsibilities forces every implementing class to provide (or stub out) methods irrelevant to it, so this principle favors splitting large interfaces into smaller, more specific ones that classes can implement only the parts they actually need.",
    keywords: ["Interface Segregation", "SOLID", "bloated interface", "cohesion"],
  },
  {
    text: "What is the difference between static (early) binding and dynamic (late) binding in OOP?",
    category: "technical",
    role: "oop",
    difficulty: "hard",
    modelAnswer:
      "Static binding resolves which method implementation to call at compile time, typically used for overloaded methods and non-virtual calls, while dynamic binding resolves the correct implementation at runtime based on the object's actual type, typically used for overridden virtual methods, which is what makes runtime polymorphism possible.",
    keywords: ["static binding", "dynamic binding", "compile time", "runtime", "polymorphism"],
  },
  {
    text: "How does the Diamond Problem arise in multiple inheritance, and how do languages like Java and C++ address it differently?",
    category: "technical",
    role: "oop",
    difficulty: "hard",
    modelAnswer:
      "The Diamond Problem occurs when a class inherits from two classes that both inherit from a common base class, creating ambiguity about which inherited version of a method or field should be used; C++ allows multiple inheritance directly and requires virtual inheritance or explicit scope resolution to resolve the ambiguity, while Java avoids the problem entirely by disallowing multiple inheritance of classes, only permitting multiple interface implementation, where default method conflicts must be explicitly resolved by the implementing class.",
    keywords: ["diamond problem", "multiple inheritance", "Java", "C++", "ambiguity"],
  },
  {
    text: "What is design by contract in OOP, and how do preconditions and postconditions relate to it?",
    category: "technical",
    role: "oop",
    difficulty: "hard",
    modelAnswer:
      "Design by contract treats the relationship between a method and its caller as a formal agreement: preconditions specify what must be true before a method is called (the caller's obligation), and postconditions specify what the method guarantees to be true after it completes (the method's obligation), along with invariants that must hold before and after; this makes assumptions explicit and helps catch bugs at the boundary between components.",
    keywords: ["design by contract", "precondition", "postcondition", "invariant"],
  },
];

const operatingSystemQuestions = [
  {
    text: "What is the difference between a process and a thread?",
    category: "technical",
    role: "operating-system",
    difficulty: "easy",
    modelAnswer:
      "A process is an independent program in execution with its own memory space, while a thread is a lightweight unit of execution within a process that shares the same memory space with other threads of that process, making thread creation and context switching cheaper than for processes.",
    keywords: ["process", "thread", "memory space", "context switch"],
  },
  {
    text: "What is virtual memory and why is it used?",
    category: "technical",
    role: "operating-system",
    difficulty: "easy",
    modelAnswer:
      "Virtual memory is an abstraction that gives each process the illusion of having its own large, contiguous address space, mapped by the OS to physical memory (and disk when needed); it enables memory isolation between processes, allows running programs larger than available RAM, and simplifies memory management for applications.",
    keywords: ["virtual memory", "address space", "paging", "physical memory", "isolation"],
  },
  {
    text: "Explain the difference between a deadlock and a race condition.",
    category: "technical",
    role: "operating-system",
    difficulty: "medium",
    modelAnswer:
      "A deadlock occurs when two or more processes/threads are each waiting on a resource held by the other, so none can proceed, typically requiring conditions like mutual exclusion and circular wait; a race condition occurs when the outcome of a program depends on the unpredictable timing or interleaving of concurrent operations on shared data, often due to missing synchronization.",
    keywords: ["deadlock", "race condition", "synchronization", "concurrency", "mutual exclusion"],
  },
  {
    text: "What is the difference between paging and segmentation in memory management?",
    category: "technical",
    role: "operating-system",
    difficulty: "medium",
    modelAnswer:
      "Paging divides memory into fixed-size blocks called pages, which simplifies allocation and avoids external fragmentation but can cause internal fragmentation, while segmentation divides memory into variable-sized logical segments (like code, stack, heap) that align with a program's logical structure, but is more prone to external fragmentation.",
    keywords: ["paging", "segmentation", "fragmentation", "memory management", "fixed-size"],
  },
  {
    text: "Explain the four necessary conditions for deadlock and one strategy to prevent it.",
    category: "technical",
    role: "operating-system",
    difficulty: "hard",
    modelAnswer:
      "Deadlock requires four conditions to hold simultaneously: mutual exclusion (resources can't be shared), hold and wait (a process holds resources while waiting for more), no preemption (resources can't be forcibly taken away), and circular wait (a cycle of processes each waiting on the next); one common prevention strategy is to eliminate circular wait by imposing a strict global ordering on resource acquisition, so processes must request resources in a consistent sequence.",
    keywords: ["deadlock", "mutual exclusion", "circular wait", "hold and wait", "prevention"],
  },
  {
    text: "Compare preemptive and non-preemptive CPU scheduling, and give an example algorithm of each.",
    category: "technical",
    role: "operating-system",
    difficulty: "hard",
    modelAnswer:
      "In preemptive scheduling, the OS can interrupt a running process to give the CPU to another, higher-priority or newly ready process (e.g. Round Robin, Preemptive Priority Scheduling), improving responsiveness for interactive systems; in non-preemptive scheduling, once a process starts executing it runs to completion or until it voluntarily yields (e.g. First-Come-First-Served, Non-preemptive Shortest Job First), which is simpler to implement but can cause long wait times for other processes.",
    keywords: ["preemptive", "non-preemptive", "scheduling", "round robin", "CPU scheduling"],
  },
  {
    text: "What is the role of an operating system's kernel?",
    category: "technical",
    role: "operating-system",
    difficulty: "easy",
    modelAnswer:
      "The kernel is the core component of an operating system that manages hardware resources — CPU, memory, and I/O devices — and provides essential services like process scheduling, memory management, and system calls that let applications interact with hardware safely without accessing it directly.",
    keywords: ["kernel", "hardware", "system calls", "resource management"],
  },
  {
    text: "What is the difference between multitasking and multiprocessing?",
    category: "technical",
    role: "operating-system",
    difficulty: "easy",
    modelAnswer:
      "Multitasking is the ability of an operating system to run multiple processes on a single CPU by rapidly switching between them, giving the illusion of simultaneous execution, while multiprocessing involves using two or more physical CPUs (or cores) to genuinely execute multiple processes at the same time.",
    keywords: ["multitasking", "multiprocessing", "CPU", "concurrency"],
  },
  {
    text: "What is a system call, and why do user programs need to make them?",
    category: "technical",
    role: "operating-system",
    difficulty: "easy",
    modelAnswer:
      "A system call is the mechanism by which a user-space program requests a service from the operating system kernel — such as reading a file, allocating memory, or creating a process — since user programs run with restricted privileges and cannot directly access hardware or critical system resources for safety and stability.",
    keywords: ["system call", "kernel", "user space", "privilege"],
  },
  {
    text: "What is the purpose of a file system in an operating system?",
    category: "technical",
    role: "operating-system",
    difficulty: "easy",
    modelAnswer:
      "A file system organizes and manages how data is stored, named, and retrieved on a storage device, providing structures like directories and files, tracking free and used space, and enforcing permissions, so applications can read and write persistent data without dealing with raw disk sectors directly.",
    keywords: ["file system", "storage", "directories", "permissions"],
  },
  {
    text: "What is the difference between a foreground process and a background process?",
    category: "technical",
    role: "operating-system",
    difficulty: "easy",
    modelAnswer:
      "A foreground process runs interactively and typically has control of the terminal or is the currently active window, receiving direct user input, while a background process runs independently without requiring active user interaction, commonly used for long-running tasks like a web server or scheduled job.",
    keywords: ["foreground process", "background process", "terminal", "interactive"],
  },
  {
    text: "What is thrashing in the context of virtual memory, and what causes it?",
    category: "technical",
    role: "operating-system",
    difficulty: "medium",
    modelAnswer:
      "Thrashing occurs when a system spends most of its time swapping pages between memory and disk rather than doing useful work, typically caused by too many processes competing for too little physical memory, forcing constant page faults and evictions; it can be mitigated by reducing the degree of multiprogramming or adding more RAM.",
    keywords: ["thrashing", "virtual memory", "page fault", "swapping"],
  },
  {
    text: "Explain the producer-consumer problem and how it's typically solved.",
    category: "technical",
    role: "operating-system",
    difficulty: "medium",
    modelAnswer:
      "The producer-consumer problem involves one or more producer threads generating data into a shared buffer and one or more consumer threads removing it, requiring synchronization to prevent producers from overfilling a full buffer or consumers from reading an empty one; it's typically solved using semaphores or condition variables alongside a mutex to coordinate safe access to the shared buffer.",
    keywords: ["producer-consumer", "semaphore", "mutex", "synchronization"],
  },
  {
    text: "What is the difference between a mutex and a semaphore?",
    category: "technical",
    role: "operating-system",
    difficulty: "medium",
    modelAnswer:
      "A mutex is a locking mechanism that allows only one thread to access a critical section at a time and is owned by whichever thread locked it, while a semaphore maintains a count and can allow a specified number of threads to access a resource simultaneously, and can be signaled by a different thread than the one that waited on it.",
    keywords: ["mutex", "semaphore", "critical section", "synchronization"],
  },
  {
    text: "What is the difference between internal and external fragmentation?",
    category: "technical",
    role: "operating-system",
    difficulty: "medium",
    modelAnswer:
      "Internal fragmentation occurs when allocated memory is slightly larger than what's actually needed, wasting the unused space within an allocated block (common with fixed-size allocation like paging), while external fragmentation occurs when free memory is scattered in small, non-contiguous chunks throughout the system, making it hard to satisfy larger allocation requests even though enough total free memory exists.",
    keywords: ["internal fragmentation", "external fragmentation", "memory allocation", "paging"],
  },
  {
    text: "What is a context switch, and why does it have a performance cost?",
    category: "technical",
    role: "operating-system",
    difficulty: "medium",
    modelAnswer:
      "A context switch is the process of saving the state (registers, program counter, memory mappings) of a currently running process or thread and restoring the state of another one so it can run on the CPU; it has a real performance cost because the CPU does no useful application work during the switch itself, and it can also invalidate CPU cache contents, adding indirect overhead afterward.",
    keywords: ["context switch", "process state", "CPU cache", "overhead"],
  },
  {
    text: "Explain the Banker's Algorithm and how it's used for deadlock avoidance.",
    category: "technical",
    role: "operating-system",
    difficulty: "hard",
    modelAnswer:
      "The Banker's Algorithm is a deadlock-avoidance strategy that simulates resource allocation before actually granting a request, only approving it if the resulting system state remains 'safe' — meaning there still exists some order in which all processes could finish without deadlocking; it requires processes to declare their maximum resource needs in advance, which limits its practicality but makes it a foundational concept for reasoning about safe resource allocation.",
    keywords: ["Banker's Algorithm", "deadlock avoidance", "safe state", "resource allocation"],
  },
  {
    text: "Compare page replacement algorithms like FIFO, LRU, and Optimal, and explain Belady's Anomaly.",
    category: "technical",
    role: "operating-system",
    difficulty: "hard",
    modelAnswer:
      "FIFO replaces the oldest-loaded page regardless of usage, LRU (Least Recently Used) replaces the page that hasn't been accessed for the longest time, approximating future behavior based on the past, and Optimal replaces the page that won't be needed for the longest time in the future (theoretical, since it requires future knowledge); Belady's Anomaly is the counterintuitive phenomenon where, for some algorithms like FIFO, increasing the number of available page frames can actually increase the number of page faults instead of decreasing them.",
    keywords: ["page replacement", "LRU", "FIFO", "Belady's Anomaly", "optimal"],
  },
  {
    text: "What is priority inversion, and how do techniques like priority inheritance address it?",
    category: "technical",
    role: "operating-system",
    difficulty: "hard",
    modelAnswer:
      "Priority inversion occurs when a high-priority task is blocked waiting for a resource held by a low-priority task, while an unrelated medium-priority task preempts the low-priority one and indirectly delays the high-priority task further; priority inheritance addresses this by temporarily boosting the low-priority task holding the resource to the priority of the highest-priority task waiting on it, so it can finish and release the resource sooner.",
    keywords: ["priority inversion", "priority inheritance", "scheduling", "real-time systems"],
  },
  {
    text: "Explain the difference between monolithic kernels and microkernels.",
    category: "technical",
    role: "operating-system",
    difficulty: "hard",
    modelAnswer:
      "A monolithic kernel runs most operating system services — device drivers, file systems, networking — in a single privileged address space, which is efficient due to low-overhead internal communication but means a bug in any component can crash the entire kernel; a microkernel keeps only the most essential functions (like basic IPC and scheduling) in privileged mode, running other services as separate user-space processes, improving fault isolation and modularity at the cost of more expensive inter-process communication overhead.",
    keywords: ["monolithic kernel", "microkernel", "device driver", "fault isolation"],
  },
];

const hrQuestions = [
  {
    text: "Why do you want to work at this company?",
    category: "hr",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A good answer connects the candidate's skills and values to the company's mission and products, and shows genuine research into the company rather than a generic response.",
    keywords: ["mission", "values", "research", "growth"],
  },
  {
    text: "Tell me about yourself.",
    category: "hr",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer gives a brief, focused summary of relevant background, key skills, and career goals, connecting past experience to why the candidate is a good fit for this specific role, rather than reciting an unfocused life history.",
    keywords: ["background", "skills", "career goals", "summary", "relevant"],
  },
  {
    text: "Where do you see yourself in five years?",
    category: "hr",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A good answer shows realistic ambition and career growth aligned with the role and company, demonstrating that the candidate has thought about their professional development while remaining flexible and genuinely interested in growing with the organization.",
    keywords: ["career growth", "ambition", "goals", "development", "alignment"],
  },
  {
    text: "What are your greatest strengths and weaknesses?",
    category: "hr",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer names a genuine strength relevant to the role with a concrete example, and a real weakness paired with specific, honest steps being taken to improve it, avoiding cliché non-answers like calling a strength a disguised weakness.",
    keywords: ["strengths", "weaknesses", "self-awareness", "improvement", "example"],
  },
  {
    text: "Why should we hire you over other candidates?",
    category: "hr",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A good answer highlights specific skills and experiences that directly match the role's requirements, backed by concrete examples of impact, and explains what unique value the candidate brings rather than making vague, unsupported claims of being 'hardworking' or 'a team player.'",
    keywords: ["unique value", "skills match", "impact", "evidence", "differentiation"],
  },
  {
    text: "How do you handle stress and pressure at work?",
    category: "hr",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes specific, practical strategies for managing pressure — such as prioritization, breaking tasks down, or clear communication with a team — supported by a real example of successfully delivering under a tight deadline or high-pressure situation.",
    keywords: ["stress management", "prioritization", "pressure", "coping strategy", "example"],
  },
  {
    text: "Tell me about a time you disagreed with your manager. How did you handle it?",
    category: "hr",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes a specific disagreement, explains how the candidate raised their concern respectfully and with supporting reasoning, listened to the manager's perspective, and reached a constructive resolution or professionally accepted the final decision, showing maturity rather than avoidance or confrontation.",
    keywords: ["disagreement", "communication", "respect", "resolution", "professionalism"],
  },
  {
    text: "How would you handle being asked to do something you believe is unethical?",
    category: "hr",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer shows the candidate would raise their concerns clearly and respectfully with the relevant person, explain the ethical or compliance issue at stake, seek clarification or escalate through appropriate channels if needed, and ultimately decline participation in something clearly unethical while remaining professional throughout.",
    keywords: ["ethics", "integrity", "escalation", "professionalism", "decision-making"],
  },
  {
    text: "Describe a situation where you had to make an unpopular decision. How did you manage it?",
    category: "hr",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the context and reasoning behind the decision, how the candidate communicated it transparently to those affected, addressed concerns or pushback constructively, and followed through while taking accountability for the outcome.",
    keywords: ["decision-making", "accountability", "communication", "leadership", "transparency"],
  },
  {
    text: "What motivates you to do your best work?",
    category: "hr",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A good answer identifies genuine, specific motivators — such as solving challenging problems, seeing tangible impact, or collaborating with a strong team — supported by a real example of when that motivation drove strong performance, rather than a generic or clichéd response.",
    keywords: ["motivation", "performance", "example", "self-awareness"],
  },
  {
    text: "How would your previous manager or colleagues describe you?",
    category: "hr",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer gives specific, believable traits that others would genuinely recognize, ideally supported by a brief example or context, striking a balance between confidence and humility rather than reciting a list of buzzwords.",
    keywords: ["self-perception", "feedback", "traits", "credibility"],
  },
  {
    text: "What type of work environment do you thrive in?",
    category: "hr",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A good answer describes genuine preferences around collaboration style, pace, and structure, while showing flexibility and alignment with what the company can realistically offer, rather than listing rigid demands.",
    keywords: ["work environment", "preferences", "collaboration", "flexibility"],
  },
  {
    text: "Why are you leaving your current job (or why did you leave your last job)?",
    category: "hr",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A good answer stays positive and forward-looking, focusing on what the candidate is seeking next (growth, new challenges, better alignment with goals) rather than criticizing a previous employer or colleagues.",
    keywords: ["career transition", "positivity", "growth", "professionalism"],
  },
  {
    text: "What are you passionate about outside of work?",
    category: "hr",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A genuine, specific answer that reveals personality and, ideally, transferable qualities like discipline, creativity, or teamwork is stronger than a vague or overly rehearsed response, since this question is mainly used to gauge cultural fit and authenticity.",
    keywords: ["personality", "cultural fit", "authenticity", "transferable skills"],
  },
  {
    text: "How do you prioritize your work when you have multiple tasks due at the same time?",
    category: "hr",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer describes a concrete method — like ranking tasks by urgency and impact, breaking large tasks into smaller steps, or communicating early with stakeholders about tradeoffs — supported by how it's actually been applied in practice.",
    keywords: ["prioritization", "time management", "method", "communication"],
  },
  {
    text: "What do you know about our company and this role?",
    category: "hr",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer demonstrates genuine research into the company's products, mission, and recent developments, and connects that understanding to why the specific role is a good fit for the candidate's skills and interests.",
    keywords: ["research", "company knowledge", "role fit", "preparation"],
  },
  {
    text: "Describe your ideal manager.",
    category: "hr",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A good answer describes qualities like clear communication, constructive feedback, and trust/autonomy in a balanced, realistic way, avoiding a description that sounds like a complaint about a past manager.",
    keywords: ["management style", "feedback", "communication", "autonomy"],
  },
  {
    text: "What salary range are you expecting for this role?",
    category: "hr",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer gives a well-researched range based on market data for the role and location, shows flexibility, and reframes the conversation toward overall fit and value where appropriate, rather than an unresearched guess or immediate refusal to answer.",
    keywords: ["salary expectations", "market research", "negotiation", "flexibility"],
  },
  {
    text: "Tell me about a time you received critical feedback. How did you respond?",
    category: "hr",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes the specific feedback received, shows the candidate listened without becoming defensive, explains the concrete changes made in response, and describes the positive outcome that resulted from acting on it.",
    keywords: ["feedback", "growth mindset", "self-improvement", "response"],
  },
  {
    text: "How do you approach working with people from different backgrounds or perspectives than your own?",
    category: "hr",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer emphasizes active listening, genuine curiosity about different viewpoints, and adapting communication style as needed, ideally supported by a specific example of successfully collaborating across differences to reach a shared goal.",
    keywords: ["diversity", "collaboration", "communication", "inclusivity"],
  },
  {
    text: "Describe a time you had to persuade someone to see things your way.",
    category: "hr",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes the specific situation and the other person's initial position, the reasoning or evidence used to make the case, how the candidate remained respectful of differing views, and the outcome, whether full agreement or a productive compromise.",
    keywords: ["persuasion", "communication", "influence", "compromise"],
  },
  {
    text: "How do you stay current with developments in your field?",
    category: "hr",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer names specific, credible habits — such as following relevant publications, taking courses, contributing to open-source or personal projects, or engaging with a professional community — showing genuine ongoing investment in growth rather than a vague claim of 'keeping up.'",
    keywords: ["continuous learning", "professional development", "specific habits"],
  },
  {
    text: "What would you do in your first 90 days if hired for this role?",
    category: "hr",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes a realistic plan focused on learning the team, systems, and priorities first, building relationships, and identifying early opportunities to contribute meaningfully, showing both humility about ramping up and initiative to add value quickly.",
    keywords: ["onboarding plan", "initiative", "learning", "early contribution"],
  },
  {
    text: "Tell me about a time you had to give difficult feedback to someone else.",
    category: "hr",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes the specific situation, how the candidate delivered the feedback constructively and respectfully with a focus on behavior rather than character, and the outcome, showing emotional intelligence and care for the other person's growth.",
    keywords: ["feedback delivery", "emotional intelligence", "constructive criticism"],
  },
  {
    text: "How do you handle a situation where you don't know the answer to something at work?",
    category: "hr",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer shows comfort with acknowledging uncertainty honestly, a clear plan for finding the answer (research, asking the right person, testing), and a commitment to following up, rather than guessing or pretending to know.",
    keywords: ["uncertainty", "problem-solving", "resourcefulness", "honesty"],
  },
  {
    text: "Describe a time you took initiative without being asked.",
    category: "hr",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes a specific opportunity the candidate noticed on their own, the action taken without waiting for direction, and the positive impact or outcome, demonstrating proactivity and ownership.",
    keywords: ["initiative", "proactivity", "ownership", "impact"],
  },
  {
    text: "How would you handle a situation where you strongly disagree with a company policy?",
    category: "hr",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer shows the candidate would seek to understand the reasoning behind the policy first, raise their concerns through appropriate channels constructively, and ultimately respect the final decision professionally even if it doesn't change, rather than ignoring or undermining it.",
    keywords: ["policy disagreement", "professionalism", "escalation", "respect"],
  },
  {
    text: "Tell me about a time you had to deliver bad news to a client, manager, or team.",
    category: "hr",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the context, how the candidate prepared and communicated the news clearly, honestly, and with empathy, how they handled the other party's reaction, and any steps taken afterward to address the underlying issue or rebuild trust.",
    keywords: ["difficult conversation", "communication", "empathy", "trust"],
  },
  {
    text: "Describe a situation where you had to work with incomplete or ambiguous information to make a decision.",
    category: "hr",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the specific ambiguity faced, how the candidate gathered what information was available, made reasonable assumptions explicit, moved forward with a decision, and adjusted course as more information became available.",
    keywords: ["ambiguity", "decision-making", "assumptions", "adaptability"],
  },
  {
    text: "Tell me about a time your team missed a major deadline. What happened and what did you learn?",
    category: "hr",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer honestly describes the root causes of the missed deadline without excessive blame, the immediate actions taken to manage the fallout and communicate with stakeholders, and specific process changes implemented afterward to prevent recurrence.",
    keywords: ["deadline", "root cause", "accountability", "process improvement"],
  },
  {
    text: "How do you handle it when you're asked to take on significantly more responsibility than your current role or compensation reflects?",
    category: "hr",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer shows the candidate would first evaluate whether the added responsibility aligns with their growth goals, communicate expectations and any compensation concerns directly and professionally, and negotiate a clear path forward rather than silently accepting or refusing outright.",
    keywords: ["scope creep", "negotiation", "communication", "career growth"],
  },
  {
    text: "Describe a time you had to rebuild trust with a colleague or team after a setback.",
    category: "hr",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes what damaged the trust, the specific and consistent actions taken to demonstrate reliability afterward, and the patience required, showing genuine accountability rather than expecting trust to return immediately.",
    keywords: ["trust", "accountability", "relationship repair", "consistency"],
  },
  {
    text: "Tell me about a time you had to manage up — that is, influence or manage the expectations of someone senior to you.",
    category: "hr",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the specific situation, how the candidate communicated clearly and proactively with the senior stakeholder, set realistic expectations backed by reasoning or data, and maintained the relationship professionally throughout.",
    keywords: ["managing up", "stakeholder management", "communication", "expectations"],
  },
  {
    text: "How would you handle discovering that a close colleague was not performing their responsibilities, affecting the team?",
    category: "hr",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer shows the candidate would address the concern directly and privately with the colleague first where appropriate, focus on specific impact rather than personal criticism, and escalate through proper channels if the issue persisted, balancing loyalty with responsibility to the team.",
    keywords: ["performance issue", "peer accountability", "escalation", "professionalism"],
  },
  {
    text: "Describe a time you had to say no to a request from a stakeholder or manager, and how you handled it.",
    category: "hr",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the specific request, the reasoning behind declining or pushing back (capacity, priorities, or risk), how it was communicated respectfully with alternatives offered where possible, and the resulting outcome or relationship impact.",
    keywords: ["saying no", "boundaries", "communication", "prioritization"],
  },
];

const behavioralQuestions = [
  {
    text: "Tell me about a time you faced a conflict in a team project and how you resolved it.",
    category: "behavioral",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer describes a specific situation, the task at hand, the action taken to communicate and resolve the disagreement constructively, and the positive result achieved for the team.",
    keywords: ["communication", "team", "resolution", "outcome"],
  },
  {
    text: "Describe a time you had to learn a new skill or technology quickly.",
    category: "behavioral",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A good answer uses the STAR framework to describe the specific situation requiring the new skill, the approach taken to learn it efficiently (documentation, mentorship, practice), and the successful outcome or result it enabled.",
    keywords: ["STAR", "learning", "adaptability", "situation", "outcome"],
  },
  {
    text: "Tell me about a goal you set and how you achieved it.",
    category: "behavioral",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer clearly states the specific goal, the concrete steps and plan used to work toward it, any obstacles overcome along the way, and the measurable result achieved.",
    keywords: ["goal setting", "planning", "obstacles", "result", "achievement"],
  },
  {
    text: "Describe a time you made a mistake at work. How did you handle it?",
    category: "behavioral",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer honestly describes the specific mistake, takes clear ownership without excessive blame-shifting, explains the immediate corrective action taken, and describes what was learned or changed to prevent it from happening again.",
    keywords: ["ownership", "mistake", "accountability", "corrective action", "lessons learned"],
  },
  {
    text: "Tell me about a time you had to work with a difficult team member.",
    category: "behavioral",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A good answer describes the specific interpersonal challenge, the steps taken to understand the other person's perspective and communicate constructively, and how the situation was resolved or improved, emphasizing collaboration over blame.",
    keywords: ["teamwork", "communication", "conflict resolution", "collaboration", "perspective"],
  },
  {
    text: "Describe a project where you had to manage multiple priorities under a tight deadline.",
    category: "behavioral",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer explains how tasks were prioritized based on impact and urgency, what tools or techniques were used to stay organized, how stakeholders were kept informed, and the successful outcome despite the time pressure.",
    keywords: ["prioritization", "time management", "deadline", "organization", "stakeholders"],
  },
  {
    text: "Tell me about a time you led a team through a significant challenge or failure.",
    category: "behavioral",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the specific challenge or failure, the candidate's role in leading the response, how they kept the team motivated and focused, the concrete actions taken to recover, and the ultimate outcome along with lessons learned about leadership under pressure.",
    keywords: ["leadership", "failure", "recovery", "motivation", "lessons learned"],
  },
  {
    text: "Describe a situation where you had to influence others without having direct authority over them.",
    category: "behavioral",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the specific situation, how the candidate built credibility and trust, used data or clear reasoning to make their case, and collaborated to align stakeholders toward a shared outcome despite lacking formal authority.",
    keywords: ["influence", "persuasion", "stakeholders", "credibility", "collaboration"],
  },
  {
    text: "Tell me about a time you had to balance competing stakeholder interests on a project.",
    category: "behavioral",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the conflicting needs of different stakeholders, how the candidate gathered input and identified underlying priorities, the tradeoffs or compromises negotiated, and the outcome that balanced the project's constraints with stakeholder satisfaction.",
    keywords: ["stakeholders", "tradeoffs", "negotiation", "prioritization", "compromise"],
  },
  {
    text: "Tell me about a project you're particularly proud of.",
    category: "behavioral",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer describes the specific project, the candidate's role and contributions, the challenges overcome, and the concrete outcome or impact, conveying genuine enthusiasm and ownership.",
    keywords: ["achievement", "ownership", "impact", "project"],
  },
  {
    text: "Describe a time you worked effectively as part of a team.",
    category: "behavioral",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer describes the team's shared goal, the candidate's specific role and contributions, how the team collaborated and communicated, and the successful outcome achieved together.",
    keywords: ["teamwork", "collaboration", "communication", "outcome"],
  },
  {
    text: "Tell me about a time you helped someone else solve a problem.",
    category: "behavioral",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer describes the specific problem the other person faced, the approach taken to understand and help address it, and the positive outcome, showing empathy and collaborative problem-solving.",
    keywords: ["helping others", "problem-solving", "empathy", "collaboration"],
  },
  {
    text: "Describe a time you had to adapt to a significant change at school or work.",
    category: "behavioral",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer describes the specific change, the candidate's initial reaction, the concrete steps taken to adjust and stay productive, and the positive outcome or lesson learned about adaptability.",
    keywords: ["adaptability", "change management", "resilience", "outcome"],
  },
  {
    text: "Tell me about a time you used data or research to make a decision.",
    category: "behavioral",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer describes the specific decision, what data or research was gathered, how it informed the final choice, and the resulting outcome, demonstrating analytical, evidence-based thinking.",
    keywords: ["data-driven", "research", "decision-making", "analysis"],
  },
  {
    text: "Describe a time you went above and beyond what was expected of you.",
    category: "behavioral",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer describes the specific situation, the extra effort or initiative taken beyond the baseline expectation, and the resulting impact, conveyed with genuine detail rather than vague self-praise.",
    keywords: ["going above and beyond", "initiative", "impact", "effort"],
  },
  {
    text: "Tell me about a time you had to give a presentation or explain something complex to others.",
    category: "behavioral",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer describes the audience and complexity involved, how the candidate simplified or structured the information for clarity, and how it was received, demonstrating strong communication skills.",
    keywords: ["communication", "presentation", "clarity", "explanation"],
  },
  {
    text: "Describe a time you received recognition for your work.",
    category: "behavioral",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer briefly describes the accomplishment that led to the recognition and what it meant, while staying humble and connecting it to the team's or company's broader success rather than pure self-promotion.",
    keywords: ["recognition", "achievement", "humility", "impact"],
  },
  {
    text: "Tell me about a time you had to quickly recover from a setback.",
    category: "behavioral",
    role: "general",
    difficulty: "easy",
    modelAnswer:
      "A strong answer describes the specific setback, the immediate steps taken to assess and respond, and how the candidate maintained composure and momentum to move forward productively, showing resilience.",
    keywords: ["resilience", "setback", "recovery", "composure"],
  },
  {
    text: "Describe a time you had to give constructive criticism to a peer.",
    category: "behavioral",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes the specific situation, how the candidate framed the feedback constructively and respectfully with a focus on specific behavior, and the outcome, showing care for the relationship alongside honesty.",
    keywords: ["constructive criticism", "feedback", "peer relationship", "communication"],
  },
  {
    text: "Tell me about a time you had to balance quality with a tight deadline.",
    category: "behavioral",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes the specific tradeoffs considered, how the candidate communicated any necessary compromises to stakeholders, and the final outcome, showing sound judgment under pressure.",
    keywords: ["quality vs speed", "tradeoffs", "deadline", "judgment"],
  },
  {
    text: "Describe a situation where you had to work independently with minimal supervision.",
    category: "behavioral",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes the specific project or task, how the candidate stayed organized and motivated without close oversight, and the successful outcome, demonstrating self-direction and accountability.",
    keywords: ["independence", "self-direction", "accountability", "outcome"],
  },
  {
    text: "Tell me about a time you identified and fixed an inefficient process.",
    category: "behavioral",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes the specific inefficiency noticed, the analysis or reasoning behind the proposed improvement, how it was implemented (including getting buy-in if needed), and the measurable impact of the change.",
    keywords: ["process improvement", "efficiency", "analysis", "impact"],
  },
  {
    text: "Describe a time you had to collaborate with someone in a different department or role.",
    category: "behavioral",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes the shared goal despite differing priorities or expertise, how the candidate bridged communication gaps, and the successful outcome achieved through cross-functional collaboration.",
    keywords: ["cross-functional", "collaboration", "communication", "outcome"],
  },
  {
    text: "Tell me about a time you had to learn from a failure.",
    category: "behavioral",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer honestly describes the specific failure, takes clear ownership without excessive self-blame, and explains the concrete lessons learned and changes made that led to improved outcomes afterward.",
    keywords: ["failure", "lessons learned", "ownership", "growth"],
  },
  {
    text: "Describe a time you had to manage conflicting priorities from two different stakeholders.",
    category: "behavioral",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes the conflicting needs, how the candidate gathered context to understand each stakeholder's underlying priority, and how they negotiated or sequenced the work to satisfy both reasonably, showing strong prioritization and communication skills.",
    keywords: ["conflicting priorities", "stakeholders", "negotiation", "prioritization"],
  },
  {
    text: "Tell me about a time you had to advocate for an idea that others initially disagreed with.",
    category: "behavioral",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes the idea, the initial pushback faced, how the candidate built their case with evidence or reasoning while remaining open to feedback, and the eventual outcome, whether the idea was adopted or a valuable compromise was reached.",
    keywords: ["advocacy", "persuasion", "evidence", "compromise"],
  },
  {
    text: "Describe a time you had to onboard or mentor someone new.",
    category: "behavioral",
    role: "general",
    difficulty: "medium",
    modelAnswer:
      "A strong answer describes the specific approach taken to help the new person get up to speed, how the candidate adapted their teaching style to the individual's needs, and the outcome, showing patience and leadership.",
    keywords: ["mentoring", "onboarding", "leadership", "patience"],
  },
  {
    text: "Tell me about the most difficult decision you've had to make professionally.",
    category: "behavioral",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the specific decision, the competing considerations weighed, the reasoning process used to reach a conclusion under uncertainty or pressure, and the outcome along with any lessons learned about decision-making.",
    keywords: ["difficult decision", "reasoning", "uncertainty", "outcome"],
  },
  {
    text: "Describe a time you had to lead a project with limited resources or budget.",
    category: "behavioral",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the specific constraints faced, the creative or disciplined prioritization used to make the most of limited resources, how the candidate communicated tradeoffs to stakeholders, and the final outcome achieved despite the limitations.",
    keywords: ["resource constraints", "prioritization", "leadership", "outcome"],
  },
  {
    text: "Tell me about a time you had to change your approach or plan significantly midway through a project.",
    category: "behavioral",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the original plan, what specifically triggered the need to pivot, how the candidate reassessed and communicated the change to stakeholders, and the resulting outcome, showing flexibility and sound judgment.",
    keywords: ["pivot", "adaptability", "judgment", "stakeholder communication"],
  },
  {
    text: "Describe a time you had to hold someone accountable who didn't report to you.",
    category: "behavioral",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the specific situation, how the candidate raised the concern respectfully without formal authority, used influence and clear reasoning rather than escalation as a first resort, and the resulting outcome.",
    keywords: ["accountability", "influence", "peer leadership", "communication"],
  },
  {
    text: "Tell me about a time you had to make a decision that you knew would be unpopular with your team.",
    category: "behavioral",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the reasoning behind the necessary decision, how the candidate communicated it transparently and empathetically to the team, addressed concerns honestly, and followed through while maintaining team trust despite the disagreement.",
    keywords: ["unpopular decision", "leadership", "transparency", "trust"],
  },
  {
    text: "Describe a time you significantly changed your mind about something important based on new information.",
    category: "behavioral",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the original position, the specific new information or perspective that prompted reconsideration, and how the candidate updated their approach or decision as a result, showing intellectual honesty and openness rather than stubbornness.",
    keywords: ["open-mindedness", "critical thinking", "adaptability", "decision-making"],
  },
  {
    text: "Tell me about a time you had to deliver results despite significant obstacles outside your control.",
    category: "behavioral",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the specific external obstacles faced, the resourcefulness and persistence used to work around them, how the candidate kept stakeholders informed realistically, and the final outcome achieved despite the challenges.",
    keywords: ["obstacles", "resourcefulness", "persistence", "outcome"],
  },
  {
    text: "Describe a time you had to balance being a good team player with pushing back on an idea you believed was wrong.",
    category: "behavioral",
    role: "general",
    difficulty: "hard",
    modelAnswer:
      "A strong answer describes the specific disagreement, how the candidate raised their concerns constructively and with supporting reasoning while remaining respectful of team dynamics, and how the situation was resolved, showing both integrity and collaborative maturity.",
    keywords: ["dissent", "team dynamics", "integrity", "collaboration"],
  },
];

const questions = [
  ...javaQuestions,
  ...pythonQuestions,
  ...javascriptQuestions,
  ...reactQuestions,
  ...nodeQuestions,
  ...databaseQuestions,
  ...networkingQuestions,
  ...oopQuestions,
  ...operatingSystemQuestions,
  ...hrQuestions,
  ...behavioralQuestions,
];

module.exports = questions;
