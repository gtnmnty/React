import { useState } from "react";
import NumberInput from "./NumberInput";
import "./TemperatureConverter.css";

type FieldKey = "celsius" | "fahrenheit" | "kelvin";

const ABSOLUTE_ZERO_C = -273.15;

// --- Pure conversion helpers (Celsius is the canonical unit) ---
const celsiusToFahrenheit = (c: number) => (c * 9) / 5 + 32;
const celsiusToKelvin = (c: number) => c + 273.15;
const fahrenheitToCelsius = (f: number) => ((f - 32) * 5) / 9;
const kelvinToCelsius = (k: number) => k - 273.15;

// Round for display without introducing binary-float noise like 36.999999999
const roundForDisplay = (n: number) => Math.round(n * 100) / 100;

export default function TemperatureConverter() {
    // The ONLY state we store is which field the user last typed in, and
    // what they typed. Everything else is derived from this on every render.
    // This guarantees the three fields can never drift out of sync with
    // each other, which would happen if we stored celsius/fahrenheit/kelvin
    // as three independent useState values.
    const [activeField, setActiveField] = useState<FieldKey>("celsius");
    const [rawValue, setRawValue] = useState<string>("");

    // Parse the single source of truth into a canonical Celsius number.
    // null represents "empty input" / "not a valid number yet".
    const parsed = rawValue === "" || rawValue === "-" ? null : Number(rawValue);
    let celsius: number | null = null;

    if (parsed !== null && !Number.isNaN(parsed)) {
        switch (activeField) {
            case "celsius":
                celsius = parsed;
                break;
            case "fahrenheit":
                celsius = fahrenheitToCelsius(parsed);
                break;
            default:
                celsius = kelvinToCelsius(parsed);
                break;
        }
    }


    // Derive the display string for a given field: if it's the field the
    // user is actively editing, echo back exactly what they typed (so "98."
    // or a trailing "-" isn't clobbered mid-keystroke). Otherwise, compute
    // it fresh from the canonical Celsius value.
    const displayFor = (field: FieldKey): string => {
        if (field === activeField) return rawValue;
        if (celsius === null) return "";

        // --- 2. Second block refactored (Lines 46-51) ---
        let value: number;

        switch (field) {
            case "celsius":
                value = celsius;
                break;
            case "fahrenheit":
                value = celsiusToFahrenheit(celsius);
                break;
            default:
                value = celsiusToKelvin(celsius);
                break;
        }

        return String(roundForDisplay(value));
    };

    const handleChange = (field: FieldKey) => (next: string) => {
        setActiveField(field);
        setRawValue(next);
    };

    const handleReset = () => {
        setRawValue("");
    };

    return (
        <div className="converter">
            <header className="converter__header">
                <h1 className="converter__title">Temperature Converter</h1>
                <p className="converter__subtitle">
                    Type a value in any field — the others update instantly.
                </p>
            </header>

            <div className="converter__fields">
                <NumberInput
                    id="celsius"
                    label="Celsius"
                    unitSymbol="°C"
                    accent="cold"
                    min={ABSOLUTE_ZERO_C}
                    value={displayFor("celsius")}
                    onChange={handleChange("celsius")}
                />
                <NumberInput
                    id="fahrenheit"
                    label="Fahrenheit"
                    unitSymbol="°F"
                    accent="heat"
                    min={celsiusToFahrenheit(ABSOLUTE_ZERO_C)}
                    value={displayFor("fahrenheit")}
                    onChange={handleChange("fahrenheit")}
                />
                <NumberInput
                    id="kelvin"
                    label="Kelvin"
                    unitSymbol="K"
                    accent="neutral"
                    min={0}
                    value={displayFor("kelvin")}
                    onChange={handleChange("kelvin")}
                />
            </div>

            <button
                type="button"
                className="converter__reset"
                onClick={handleReset}
                disabled={rawValue === ""}
            >
                Clear
            </button>
        </div>
    );
}
