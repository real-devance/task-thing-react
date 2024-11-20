import Dexie from 'dexie';


export function dexieErrorToObject(error: any) {
    if (error instanceof Dexie.DexieError) {
        return {
            name: error.name,
            message: error.message,
        };
    } else if (error instanceof Error) {
        // For other non-Dexie errors, convert them too if needed
        return {
            name: error.name,
            message: error.message,
            stack: error.stack,
        };
    }
    return { message: String(error) }; // Handle non-error types as strings
}