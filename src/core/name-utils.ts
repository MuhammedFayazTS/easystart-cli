export interface NameVariants {
    name: string;  // user
    Name: string;  // User
}

export function createNameVariants(input: string): NameVariants {
    const cleaned = input.trim();

    const parts = cleaned
        .split(/[-_\s]+/)
        .filter(Boolean);

    if (parts.length === 0) {
        throw new Error("Invalid feature name");
    }

    const lower = parts.map(p => p.toLowerCase());

    const camel = lower
        .map((word, index) =>
            index === 0
                ? word
                : capitalize(word)
        )
        .join("");

    const pascal = lower
        .map(word => capitalize(word))
        .join("");

    return {
        name: camel,
        Name: pascal,
    };
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}