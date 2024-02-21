export default function toIndex(str) {
    const formattedString = str.replace(/\s+/g, '-').toLowerCase();
    return formattedString;
}