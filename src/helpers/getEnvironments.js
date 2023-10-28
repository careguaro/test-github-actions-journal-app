
export const getEnvironments = () => {
    // import.meta.env;

    if(import.meta.env.VITE_APIKEY) {
        return {
            // ...import.meta.env
            VITE_APIKEY: import.meta.env.VITE_APIKEY,
            VITE_AUTHDOMAIN: import.meta.env.VITE_AUTHDOMAIN,
            VITE_PROJECTID: import.meta.env.VITE_PROJECTID,
            VITE_STORAGEBUCKET: import.meta.env.VITE_STORAGEBUCKET,
            VITE_MESSAGINGSENDERID: import.meta.env.VITE_MESSAGINGSENDERID,
            VITE_APPID: import.meta.env.VITE_APPID,
        }
    } else {
        return {
            // ...import.meta.env
            VITE_APIKEY: import.meta.env.test.VITE_APIKEY,
            VITE_AUTHDOMAIN: import.meta.env.test.VITE_AUTHDOMAIN,
            VITE_PROJECTID: import.meta.env.test.VITE_PROJECTID,
            VITE_STORAGEBUCKET: import.meta.env.test.VITE_STORAGEBUCKET,
            VITE_MESSAGINGSENDERID: import.meta.env.test.VITE_MESSAGINGSENDERID,
            VITE_APPID: import.meta.env.test.VITE_APPID,
        }
    }
}