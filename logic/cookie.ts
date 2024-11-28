export const COOKIE = {
    get(name:string){
        let cookiestring=RegExp(name+"=[^;]+").exec(document.cookie);
        // Return everything after the equal sign, or an empty string if the cookie name not found
        return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
    },
    delete(name:string) {
        document.cookie=`${name}=; expires=${new Date(0).toUTCString()}; path=/;' + location.host`
    },
    set(name:string,value:string,options?:{expires?:number}) {
        document.cookie = `${name}=${value}; ${Object.entries(options ?? {}).map(entry=>`${entry[0]}=${entry[1]}; `).join('')}`
    }
}