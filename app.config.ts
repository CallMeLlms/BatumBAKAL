import "dotenv/config";

export default {
   
    expo: {
        scheme: "gymApp",
        extra: {
            apiUrl: process.env.DEV_PHYSICAL_DEVICE_IP,
        },
    },
};