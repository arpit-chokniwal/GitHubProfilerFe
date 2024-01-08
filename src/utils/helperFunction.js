export const getQueryParams = (locationSearch, query) => {
    return new URLSearchParams(locationSearch).get(query);
};

export const sortData = (data) => {
    const sortedKeys = Object.keys(data).sort((a, b) => {
        // Split the year and the quarter
        const [yearA, quarterA] = a.split('-');
        const [yearB, quarterB] = b.split('-');
        // Compare years first
        if (yearA !== yearB) {
            return yearA.localeCompare(yearB);
        }

        // If years are the same, compare quarters
        return quarterA.localeCompare(quarterB);
    });

    // Create a new object with the sorted keys
    const sortedData = {};
    sortedKeys.forEach(key => {
        sortedData[key] = data[key];
    });

    return sortedData;
}

export function getColors(n, alpha = 1) {
    const colors = [];
    for (let i = 0; i < n; i++) {
        // Evenly distribute hues around the color wheel
        const hue = i * (360 / n);
        const rgb = hslToRgb(hue, 70, 70); // Using 70% saturation and 70% lightness for pastel-like colors
        const rgba = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
        colors.push(rgba);
    }
    return colors;
}

function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;

    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);

    return [Math.floor(f(0) * 255), Math.floor(f(8) * 255), Math.floor(f(4) * 255)];
}
