import React from "react";

interface NumberInputProps {
    id: string;
    label: string;
    unitSymbol: string;
    value: string;
    onChange: (rawValue: string) => void;
    accent: "heat" | "cold" | "neutral";
    min?: number;
}

export default function NumberInput({
    id,
    label,
    unitSymbol,
    value,
    onChange,
    accent,
    min,
}: Readonly<NumberInputProps>) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        // Allow: empty, "-", digits, a single decimal point, "-3", "3.14", etc.
        if (/^-?(?:\d+(?:\.\d*)?|\.\d*)?$/.test(raw)) {
            onChange(raw);
        }
    };

    const belowMin = min !== undefined && value !== "" && Number(value) < min;

    return (
        <div className={`field field--${accent}`}>
            <label htmlFor={id} className="field__label">
                {label}
            </label>
            <div className="field__control">
                <input
                    id={id}
                    className="field__input"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="0"
                    value={value}
                    onChange={handleChange}
                    aria-describedby={belowMin ? `${id}-warning` : undefined}
                />
                <span className="field__unit" aria-hidden="true">
          {unitSymbol}
        </span>
            </div>
            {belowMin && (
                <p id={`${id}-warning`} className="field__warning">
                    Below absolute zero — reading is not physically possible.
                </p>
            )}
        </div>
    );
}
