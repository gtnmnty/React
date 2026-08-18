# Interactive Counter — Project 2

## What is this?

A reusable React 19 + TypeScript counter (`Controls`): increment, decrement,
reset. Configurable via props instead of hardcoded values.

## Project Structure

```
src/
└── counter/
    ├── components/
    │   ├── Card.tsx
    │   └── Controls.tsx
    ├── Counter.tsx
    └── README.md
```

- `Controls.tsx` — the counter logic covered in this README (state,
  handlers, buttons).
- `Card.tsx` — presentational wrapper/layout component.
- `Counter.tsx` — top-level component that composes `Card` + `Controls`.

## Props

| Prop            | Type                        | Default | Purpose                          |
|------------------|-----------------------------|---------|------------------------------------|
| `initialCount`   | `number`                    | `0`     | Starting value / Reset target      |
| `step`           | `number`                    | `1`     | Amount per click                   |
| `onCountChange`  | `(count: number) => void`   | —       | Notifies parent of new count       |

## Flow

```
Parent ──props──▶ Controls (owns state: useState<number>)
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   [ − ] decrease  {count}   [ + ] increase
        │                         │
        └────────► onCountChange?.(next) ────► Parent notified
                     ▲
              [ Reset ] → setCount(initialCount)
```

## Build it from scratch

1. **Scaffold state**
   ```tsx
   function Controls() {
       const [count, setCount] = useState<number>(0)
       return <div>{count}</div>
   }
   ```
2. **Add the buttons + handlers** — start with the naive version:
   ```tsx
   const increase = () => setCount(count + 1)
   const decrease = () => setCount(count > 0 ? count - 1 : count)
   ```
3. **Fix the stale-state bug** — switch both handlers to the functional
   updater so rapid clicks can't read a stale `count`:
   ```tsx
   const increase = () => setCount(prev => prev + 1)
   const decrease = () => setCount(prev => Math.max(0, prev - 1))
   ```
4. **Wire up Reset**
   ```tsx
   <button onClick={() => setCount(0)}>Reset</button>
   ```
5. **Make it reusable — add typed props:**
   ```tsx
   interface ControlsProps {
       initialCount?: number
       step?: number
       onCountChange?: (count: number) => void
   }

   function Controls({ initialCount = 0, step = 1, onCountChange }: ControlsProps) {
       const [count, setCount] = useState<number>(initialCount)

       const increase = () => setCount(prev => {
           const next = prev + step
           onCountChange?.(next)
           return next
       })

       const decrease = () => setCount(prev => {
           const next = Math.max(0, prev - step)
           onCountChange?.(next)
           return next
       })

       const reset = () => {
           setCount(initialCount)
           onCountChange?.(initialCount)
       }

       return (
           <>
               <div>{count}</div>
               <button onClick={decrease}>−</button>
               <button onClick={increase}>+</button>
               <button onClick={reset}>Reset</button>
           </>
       )
   }
   ```
6. **Verify:** rapid-click both buttons (no dropped updates), confirm it
   never goes below 0, confirm Reset returns to `initialCount` (not
   always `0`).

## Key takeaways

- Functional updates (`setCount(prev => ...)`) avoid stale-closure bugs
  on rapid clicks.
- `Math.max(0, prev - step)` clamps cleaner than a repeated ternary.
- Props are one object; optional fields (`?`) get defaults via
  destructuring; a prop can be typed as a function (`(x: T) => void`).