// Länderzuordnungen zu Kontinenten für die SimpleMaps SVG-Weltkarte
const KONTINENT_LAENDER = {
    "Afrika": ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"],
    "Europa": ["AL", "AD", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "XK", "LV", "LI", "LT", "LU", "MK", "MT", "MD", "MC", "ME", "NL", "NO", "PL", "PT", "RO", "SM", "RS", "SK", "SI", "ES", "SE", "CH", "UA", "GB", "VA"],
    "Asien": ["AF", "AM", "AZ", "BH", "BD", "BT", "BN", "KH", "CN", "CY", "GE", "IN", "ID", "IR", "IQ", "IL", "JP", "JO", "KZ", "KW", "KG", "LA", "LB", "MY", "MV", "MN", "MM", "NP", "KP", "KR", "OM", "PK", "PS", "PH", "QA", "RU", "SA", "SG", "LK", "SY", "TW", "TJ", "TH", "TL", "TR", "TM", "AE", "UZ", "VN", "YE"],
    "Nordamerika": ["AG", "BS", "BB", "BZ", "CA", "CR", "CU", "DM", "DO", "SV", "GD", "GT", "HT", "HN", "JM", "MX", "NI", "PA", "KN", "LC", "VC", "TT", "US"],
    "Südamerika": ["AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PY", "PE", "SR", "UY", "VE"],
    "Australien": ["AU", "FJ", "KI", "MH", "FM", "NR", "NZ", "PW", "PG", "WS", "SB", "TO", "TV", "VU"],
    "Antarktis": ["AQ"]
};

// Farben für die Kontinente
const KONTINENT_FARBEN = {
    "Afrika": { fill: "#FFB347", hover: "#FF8C00" },      // Orange
    "Europa": { fill: "#87CEEB", hover: "#4682B4" },      // Hellblau
    "Asien": { fill: "#90EE90", hover: "#32CD32" },       // Hellgrün
    "Nordamerika": { fill: "#DDA0DD", hover: "#BA55D3" }, // Flieder
    "Südamerika": { fill: "#F0E68C", hover: "#DAA520" },  // Khaki/Gelb
    "Australien": { fill: "#FFB6C1", hover: "#FF69B4" },  // Rosa
    "Antarktis": { fill: "#E0E0E0", hover: "#B0B0B0" }    // Grau
};

// Funktion zum Finden des Kontinents für ein Land
function findeKontinent(landCode) {
    for (const [kontinent, laender] of Object.entries(KONTINENT_LAENDER)) {
        if (laender.includes(landCode)) {
            return kontinent;
        }
    }
    return null;
}

// Initialisiert die SimpleMaps SVG-Weltkarte
function initSimplemapsWeltkarte() {
    const svg = document.getElementById('world-map');
    if (!svg) return;

    // Alle Pfade im SVG durchgehen
    const paths = svg.querySelectorAll('path');

    paths.forEach(path => {
        const landCode = path.id;
        const kontinent = findeKontinent(landCode);

        if (kontinent && KONTINENT_FARBEN[kontinent]) {
            const farben = KONTINENT_FARBEN[kontinent];

            // Styling
            path.style.fill = farben.fill;
            path.style.transition = 'all 0.3s ease';
            path.style.cursor = 'pointer';
            path.setAttribute('data-kontinent', kontinent.toLowerCase().replace('ü', 'ue'));

            // Hover-Effekte
            path.addEventListener('mouseenter', () => {
                path.style.fill = farben.hover;
                path.style.transform = 'scale(1.02)';
            });

            path.addEventListener('mouseleave', () => {
                path.style.fill = farben.fill;
                path.style.transform = 'scale(1)';
            });

            // Klick-Handler für Navigation
            path.addEventListener('click', () => {
                const kontId = kontinent.toLowerCase()
                    .replace('ü', 'ue')
                    .replace('ö', 'oe')
                    .replace('ä', 'ae');
                window.location.href = `kontinent.html?id=${kontId}`;
            });
        }
    });
}

// Export für Browser
if (typeof window !== 'undefined') {
    window.KONTINENT_LAENDER = KONTINENT_LAENDER;
    window.KONTINENT_FARBEN = KONTINENT_FARBEN;
    window.findeKontinent = findeKontinent;
    window.initSimplemapsWeltkarte = initSimplemapsWeltkarte;
}
