const skillsList = [
    'AWS',
    'Angular',
    'C#',
    'C',
    'C++',
    'Dart',
    'Java',
    'JavaScript',
    'Node.js',
    'CoffeeScript',
    'React',
    'Flutter',
    'Vue',
    'Go',
    'Google Cloud',
    'Azure',
    'Python',
    'Machine Learning',
    'Kotlin',
    'Deno',
];


export const options =  skillsList.sort().map(s => {
    return { label: s.trim(), value: s.trim() };
});