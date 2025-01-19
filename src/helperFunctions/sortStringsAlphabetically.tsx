function sortStringsAlphabetically(strings: string[]): string[] {
    return strings.sort((a, b) => a.localeCompare(b));
}

export default sortStringsAlphabetically;
