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

// export function getColors(count) {
//     const baseColors = [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//     ];
//     const colors = [];

//     for (let i = 0; i < count; i++) {
//         colors.push(baseColors[i % baseColors.length]);
//     }

//     return colors;
// }

// export function getColors(n) {
//     const colors = [];
//     for (let i = 0; i < n; i++) {
//         // Evenly distribute hues around the color wheel
//         const hue = i * (360 / n);
//         // Convert HSL to RGB
//         const rgb = hslToRgb(hue, 100, 50); // 100% saturation, 50% lightness
//         // Format RGB color string
//         colors.push(`rgb(${rgb.join(', ')},0.2)`);
//     }
//     return colors;
// }

// function hslToRgb(h, s, l) {
//     // Convert HSL to RGB following the algorithm from https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
//     h /= 360;
//     s /= 100;
//     l /= 100;
//     let r, g, b;

//     if (s === 0) {
//         r = g = b = l; // Achromatic
//     } else {
//         const hue2rgb = (p, q, t) => {
//             if (t < 0) t += 1;
//             if (t > 1) t -= 1;
//             if (t < 1 / 6) return p + (q - p) * 6 * t;
//             if (t < 1 / 2) return q;
//             if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//             return p;
//         }

//         const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//         const p = 2 * l - q;
//         r = hue2rgb(p, q, h + 1 / 3);
//         g = hue2rgb(p, q, h);
//         b = hue2rgb(p, q, h - 1 / 3);
//     }

//     return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
// }



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
