import { useState } from "react"

interface ControlsProps {
    initialCount?: number
    step?: number
    onCountChange?: (count: number) => void
}

export function Controls({ initialCount = 0, step = 7, onCountChange }: Readonly<ControlsProps>) {
    const [count, setCount] = useState<number>(initialCount)

    const increase = () => {
        setCount(prev => {
            const next = prev + step
            onCountChange?.(next)
            return next
        })
    }

    const decrease = () => {
        setCount(prev => {
            const next = Math.max(0, prev - step)
            onCountChange?.(next)
            return next
        })
    }

    const reset = () => {
        setCount(initialCount)
        onCountChange?.(initialCount)
    }

    return (
        <>
            <div className="count" id="count">{count}</div>
            <div className="controls">
                <button type="button" id="decrement" onClick={decrease}>−</button>
                <button type="button" id="increment" className="primary" onClick={increase}>+</button>
            </div>
            <button type="button" id="reset" className="reset" onClick={reset}>Reset</button>
        </>
    )
}
