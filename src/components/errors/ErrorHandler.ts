/* eslint-disable */

export const ExtractMessages = ({data, errors}: any) => {
    let messages = [];

    if (data) {
        if (typeof data === "string") {
            messages.push(data);
        }
        if (typeof data === "object") {
            for (const [key, value] of Object.entries(data)) {
                messages.push(value);
            }
        }
        if (typeof data === "object" && Array.isArray(data)) {

        }
    }

    if (errors) {
        if (typeof errors === "object") {
            for (const [key, value] of Object.entries(errors)) {
                if (Array.isArray(value)) messages.push(value[0]);
                else messages.push(value);
            }
        }
        if (typeof errors === "object" && Array.isArray(errors)) {
            messages.push(errors[0]);
        }
    }

    return messages;
}
