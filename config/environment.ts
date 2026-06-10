import Constants from "expo-constants";

const ENV = {
    dev: {
        API_URL: Constants.expoConfig?.extra?.apiUrl,
    },
}


const getEnvVars = () => {
    
    console.log("======= DEVELOPMENT URL RUNNING =======");
    console.log("API_URL:", Constants.expoConfig?.extra?.apiUrl);
    return ENV.dev
    
}

export default getEnvVars;


