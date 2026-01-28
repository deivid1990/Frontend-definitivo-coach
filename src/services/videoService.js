/**
 * Normaliza una cadena de texto eliminando acentos y diacríticos.
 */
const normalizeText = (text) => {
    return text ? text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() : "";
};

const VIDEO_DATABASE = {
    // --- PECHO (Tutoriales en Español) ---
    "press de banca plano": "K3idX0vU9hE", // Powerexplosive
    "press banca": "K3idX0vU9hE",
    "bench press": "K3idX0vU9hE",
    "press inclinado mancuernas": "Zp6N2-s0XjE",
    "press inclinado barra": "8iPToX_L894",
    "aperturas mancuernas": "eozdVMTp8ck",
    "fondos en paralelas": "Yh_2M04D-Uo",
    "flexiones de pecho": "mm_Azz86v_E",
    "pecho en polea": "6-w7y_WjWwU",

    // --- ESPALDA (Tutoriales en Español) ---
    "dominadas": "eGo4IYlbE5g",
    "pull ups": "eGo4IYlbE5g",
    "remo con barra": "9efgcAjQW70",
    "jalon al pecho": "CAwf7n6Luuc",
    "peso muerto convencional": "ytGaGIn3SjE",
    "deadlift": "ytGaGIn3SjE",
    "remo girona": "GZbfZ033f74",
    "remo con mancuerna": "g7SstRCDqG8",
    "pull over polea": "6sH1Q5Y-K_M",

    // --- PIERNAS (Tutoriales en Español) ---
    "sentadillas libre": "gcNh17Ckjgg",
    "squats": "gcNh17Ckjgg",
    "prensa de piernas": "IZxyjW7nvOM",
    "extension de piernas": "YyvSfVAlP90",
    "curl femoral": "OidA2YV9_8E",
    "zancadas caminando": "QOVaHwmZ9rc",
    "estocadas": "QOVaHwmZ9rc",
    "hiptrust": "LM8LG_fNRY4",
    "peso muerto rumano": "2N-G41mLoXY",
    "elevacion de talones": "EclWsc6979A",
    "sentadilla bulgara": "6_XfO_9eI-U",

    // --- HOMBROS (Tutoriales en Español) ---
    "press militar barra": "2yjwxt_fshw",
    "press hombros mancuernas": "u-2hT65_8K4",
    "elevaciones laterales": "3VQV6vI6zD8",
    "face pulls": "0M9f0Yh8L8I",
    "press arnold": "6mv-K02YdfE",
    "pajaros": "XfX-G7_1H5g",

    // --- BRAZOS (Tutoriales en Español) ---
    "curl de biceps barra": "pkWC1X_fshw",
    "curl biceps mancuernas": "o3XAt9Y0S5E",
    "martillo": "7j8_v_8RzLg",
    "press frances": "d_K_U0mQy_c",
    "extension triceps polea": "6FzKu2nZf0U",
    "fondos triceps": "6kALZikzcOk",
    "copa triceps": "L7H9K-P6G24",

    // --- CORE (Tutoriales en Español) ---
    "plancha abdominal": "ASDvB9v_L_o",
    "plank": "ASDvB9v_L_o",
    "crunch": "Xyd_fa5zoEU",
    "elevacion de piernas": "l41eoVBE_94",
    "rueda abdominal": "7K6yA-K-7nQ",
    "leñador polea": "P4S_s_8R-Uo"
};

/**
 * Obtiene el ID de video de YouTube para un ejercicio dado.
 * Usa normalización para evitar fallos por acentos o mayúsculas.
 */
export const getExerciseVideoId = (exerciseName) => {
    if (!exerciseName) return null;

    const searchName = normalizeText(exerciseName);

    // 1. Coincidencia Exacta (Normalizada)
    const keys = Object.keys(VIDEO_DATABASE);
    for (const key of keys) {
        if (normalizeText(key) === searchName) return VIDEO_DATABASE[key];
    }

    // 2. Coincidencia Parcial (Keywords)
    // Priorizamos las keywords más largas primero para mayor precisión
    const sortedKeywords = keys.sort((a, b) => b.length - a.length);
    for (const kw of sortedKeywords) {
        if (searchName.includes(normalizeText(kw))) return VIDEO_DATABASE[kw];
    }

    return null;
};

/**
 * Busca múltiples coincidencias en la base de datos global.
 */
export const searchGlobalExercises = (query) => {
    if (!query || query.length < 2) return [];

    const searchName = normalizeText(query);
    const results = [];

    Object.keys(VIDEO_DATABASE).forEach(key => {
        if (normalizeText(key).includes(searchName)) {
            results.push({
                name: key,
                videoId: VIDEO_DATABASE[key]
            });
        }
    });

    return results;
};

/**
 * Construye la URL de YouTube desde un ID
 */
export const getYoutubeUrl = (videoId) => {
    if (!videoId) return "";
    return `https://www.youtube.com/watch?v=${videoId}`;
};

/**
 * Genera un link de búsqueda en YouTube como fallback
 */
export const getFallbackSearchUrl = (exerciseName) => {
    return `https://www.youtube.com/results?search_query=tecnica+ejercicio+${encodeURIComponent(exerciseName)}+español`;
};
