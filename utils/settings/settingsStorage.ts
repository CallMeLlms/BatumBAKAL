import * as SecureStore from "expo-secure-store";

const SETTINGS_KEY = "settingsPreferences";

export type SettingsPreferences = {
    units: "kg" | "lb";
    remindersEnabled: boolean;
    theme: "dark";
};

export const DEFAULT_SETTINGS_PREFERENCES: SettingsPreferences = {
    units: "kg",
    remindersEnabled: false,
    theme: "dark",
};

export const getSettingsPreferences = async (): Promise<SettingsPreferences> => {
    try {
        const storedPreferences = await SecureStore.getItemAsync(SETTINGS_KEY);

        if (!storedPreferences) {
            return DEFAULT_SETTINGS_PREFERENCES;
        }

        return {
            ...DEFAULT_SETTINGS_PREFERENCES,
            ...JSON.parse(storedPreferences),
            theme: "dark",
        };
    } catch (error) {
        console.error("Error retrieving settings preferences", error);
        return DEFAULT_SETTINGS_PREFERENCES;
    }
}

export const storeSettingsPreferences = async (
    preferences: SettingsPreferences,
): Promise<void> => {
    try {
        await SecureStore.setItemAsync(SETTINGS_KEY, JSON.stringify(preferences));
    } catch (error) {
        console.error("Error storing settings preferences", error);
    }
}
