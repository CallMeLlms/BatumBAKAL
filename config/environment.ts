import Constants from "expo-constants";

const ENV = {
    dev: {
        API_URL: Constants.expoConfig?.extra?.apiUrl,
    },
}

const getEnvVars = () => {
    
    console.log("======= DEVELOPMENT URL RUNNING =======");
    return ENV.dev
    
}

export default getEnvVars;


