function getImageURL(name: string){
    return new URL(`../../dist/${name}`, import.meta.url).href
}

export { getImageURL }