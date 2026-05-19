export interface NameVariants {
    name: string;  // user
    Name: string;  // User
    camelCase: string;   // userProfile
    PascalCase: string;  // UserProfile
    kebabCase: string;   // user-profile
    snakeCase: string;   // user_profile
    constantCase: string; // USER_PROFILE
}

export function createNameVariants(input: string): NameVariants {
    const cleaned = input.trim();

    const parts = cleaned
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .split(/[-_\s]+/)
        .filter(Boolean);

    if (parts.length === 0) {
        throw new Error("Invalid feature name");
    }

    const lower = parts.map(p => p.toLowerCase());

    const camelCase = lower
        .map((word, index) =>
            index === 0
                ? word
                : capitalize(word)
        )
        .join("");

    const PascalCase = lower
        .map((word) => capitalize(word))
        .join("");

    const kebabCase = lower.join("-");

    const snakeCase = lower.join("_");

    const constantCase = snakeCase.toUpperCase();

    return {
        name: camelCase,
        Name: PascalCase,

        camelCase,
        PascalCase,

        kebabCase,
        snakeCase,

        constantCase,
    };
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}