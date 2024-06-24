function getImageURL(name: string){
    if(import.meta.env.NODE_ENV == 'production'){
        return new URL(`../dist/${name}`, import.meta.url).href
    }
    else
    {
        return new URL(`../../dist/${name}`, import.meta.url).href

    }
}

export { getImageURL }