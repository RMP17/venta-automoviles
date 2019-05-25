export default function (value) {
    if (!value) return '';
    value = value.toString();
    return value.substring(0, 1);
}
