

export default function getLangId(lang){
    const language = {
        'c++':56,
        'java':63,
        'javascript':64
    }

    return language[lang.tolowerCase()]
}