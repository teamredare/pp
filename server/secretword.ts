import fs from 'fs'

let words = fs.readFileSync('./secretwords.txt').toString().split('\n').map(w=>w.trim().toLocaleLowerCase())

export function getSecretWord() {
    let index = Date.now()/1000/60/60/24
    index = Math.round(index)
    return words[index%words.length]
}