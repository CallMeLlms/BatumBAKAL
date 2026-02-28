import "dotenv/config";

export default {
    expo: {
        extra: {
            apiUrl: process.env.DEV_PHYSICAL_DEVICE_IP,
        },
    },
};