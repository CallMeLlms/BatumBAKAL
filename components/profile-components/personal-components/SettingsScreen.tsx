import { useEffect, useMemo, useState, type ComponentProps } from "react";
import {
    ActivityIndicator,
    Alert,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MAIN_COLORS } from "@/constants/MainColors";
import {
    getProfileData,
    logoutUser,
    updateProfileUsername,
    type SettingsProfile,
} from "@/api/services/settingServices";
import { useAuthStore } from "@/stores/authStore";
import { delete_auth_tokens, get_refresh_tokens } from "@/utils/auth/authStorage";
import {
    DEFAULT_SETTINGS_PREFERENCES,
    getSettingsPreferences,
    storeSettingsPreferences,
    type SettingsPreferences,
} from "@/utils/settings/settingsStorage";

type FontAwesomeName = ComponentProps<typeof FontAwesome5>["name"];

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <View className="mb-6">
            <Text
                className="text-[12px] font-semibold uppercase tracking-wider font-sans mb-3"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                {title}
            </Text>
            <View className="rounded-xl overflow-hidden border border-[#2A2A2A] bg-[#1A1A1A]">
                {children}
            </View>
        </View>
    );
}

function SettingsRow({
    icon,
    title,
    detail,
    children,
}: {
    icon: FontAwesomeName;
    title: string;
    detail?: string;
    children?: React.ReactNode;
}) {
    return (
        <View className="flex-row items-center px-4 py-4 border-b border-[#2A2A2A]">
            <View
                className="w-9 h-9 rounded-lg items-center justify-center mr-3"
                style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
            >
                <FontAwesome5 name={icon} size={13} color={MAIN_COLORS.primary} />
            </View>
            <View className="flex-1 mr-3">
                <Text className="text-white text-[14px] font-bold font-sans" numberOfLines={1}>
                    {title}
                </Text>
                {detail ? (
                    <Text
                        className="text-[12px] mt-0.5 font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                        numberOfLines={1}
                    >
                        {detail}
                    </Text>
                ) : null}
            </View>
            {children}
        </View>
    );
}

export default function SettingsScreen() {
    const router = useRouter();
    const signOut = useAuthStore((state) => state.signOut);
    const [profile, setProfile] = useState<SettingsProfile | null>(null);
    const [preferences, setPreferences] = useState<SettingsPreferences>(
        DEFAULT_SETTINGS_PREFERENCES,
    );
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const hasUsernameChanges = useMemo(
        () => username.trim() !== (profile?.username ?? ""),
        [profile?.username, username],
    );

    useEffect(() => {
        const loadSettings = async () => {
            try {
                setLoading(true);
                setErrorMessage("");

                const [profileResponse, storedPreferences] = await Promise.all([
                    getProfileData(),
                    getSettingsPreferences(),
                ]);

                if (profileResponse?.userData) {
                    setProfile(profileResponse.userData);
                    setUsername(profileResponse.userData.username ?? "");
                }

                setPreferences(storedPreferences);
            } catch (error: any) {
                setErrorMessage(error.message || "Unable to load settings");
            } finally {
                setLoading(false);
            }
        };

        loadSettings();
    }, []);


    const handleSubmit = () => {
        
    }

    const updatePreferences = async (nextPreferences: SettingsPreferences) => {
        setPreferences(nextPreferences);
        await storeSettingsPreferences(nextPreferences);
    };

    const handleSaveUsername = async () => {
        const trimmedUsername = username.trim();

        if (!trimmedUsername) {
            Alert.alert("Username required", "Please enter a username before saving.");
            return;
        }

        try {
            setSaving(true);
            const response = await updateProfileUsername(trimmedUsername);

            if (response?.userData) {
                setProfile(response.userData);
                setUsername(response.userData.username ?? "");
            }
        } catch (error: any) {
            Alert.alert("Update failed", error.message || "Unable to update username.");
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        Alert.alert("Log out", "End this session on your device?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Log out",
                style: "destructive",
                onPress: async () => {
                    try {
                        setLoggingOut(true);
                        const refreshToken = await get_refresh_tokens();
                        await logoutUser(refreshToken);
                    } catch (error) {
                        console.log("Logout revoke failed", error);
                    } finally {
                        await delete_auth_tokens();
                        signOut();
                        setLoggingOut(false);
                    }
                },
            },
        ]);
    };

    return (
        <View className="flex-1">
            <View className="flex-row items-center justify-between mb-6">
                <View>
                    <Text className="text-white font-bold text-[28px] font-sans tracking-tight">
                        Settings
                    </Text>
                    <Text
                        className="text-[13px] mt-1 font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        Account, preferences, and session
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-lg items-center justify-center"
                    style={{ backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#2A2A2A" }}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                >
                    <FontAwesome5 name="chevron-left" size={13} color={MAIN_COLORS.mediumGrey} />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View className="items-center justify-center py-12">
                    <ActivityIndicator color={MAIN_COLORS.primary} />
                </View>
            ) : (
                <>
                    {errorMessage ? (
                        <View className="rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] px-4 py-3 mb-5">
                            <Text
                                className="text-[13px] font-sans"
                                style={{ color: MAIN_COLORS.secondary }}
                            >
                                {errorMessage}
                            </Text>
                        </View>
                    ) : null}

                    <SettingsSection title="Account">
                        <View className="px-4 py-4 border-b border-[#2A2A2A]">
                            <View className="flex-row items-center mb-3">
                                <FontAwesome5
                                    name="user-alt"
                                    size={12}
                                    color={MAIN_COLORS.primary}
                                />
                                <Text className="text-white text-[14px] font-bold font-sans ml-2">
                                    Username
                                </Text>
                            </View>

                            <View className="flex-row gap-3">
                                <TextInput
                                    value={username}
                                    onChangeText={setUsername}
                                    placeholder="Username"
                                    placeholderTextColor={MAIN_COLORS.mediumGrey}
                                    className="flex-1 h-11 rounded-lg px-3 text-white font-sans bg-[#111111] border border-[#2A2A2A]"
                                    autoCapitalize="none"
                                    editable={!saving}
                                />
                                <TouchableOpacity
                                    onPress={handleSaveUsername}
                                    disabled={!hasUsernameChanges || saving}
                                    className="w-11 h-11 rounded-lg items-center justify-center"
                                    style={{
                                        backgroundColor:
                                            hasUsernameChanges && !saving
                                                ? MAIN_COLORS.primary
                                                : "#2A2A2A",
                                    }}
                                    activeOpacity={0.8}
                                    accessibilityRole="button"
                                    accessibilityLabel="Save username"
                                >
                                    {saving ? (
                                        <ActivityIndicator color={MAIN_COLORS.black} size="small" />
                                    ) : (
                                        <FontAwesome5
                                            name="check"
                                            size={13}
                                            color={
                                                hasUsernameChanges
                                                    ? MAIN_COLORS.black
                                                    : MAIN_COLORS.mediumGrey
                                            }
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <SettingsRow
                            icon="envelope"
                            title="Email"
                            detail={profile?.email ?? "Unavailable"}
                        >
                            <Text
                                className="text-[11px] font-semibold uppercase font-sans"
                                style={{ color: MAIN_COLORS.mediumGrey }}
                            >
                                Read only
                            </Text>
                        </SettingsRow>
                    </SettingsSection>

                    <SettingsSection title="Preferences">
                        <SettingsRow icon="weight-hanging" title="Units" detail="Training loads">
                            <View className="flex-row rounded-lg overflow-hidden border border-[#2A2A2A]">
                                {(["kg", "lb"] as const).map((unit) => {
                                    const isSelected = preferences.units === unit;

                                    return (
                                        <TouchableOpacity
                                            key={unit}
                                            onPress={() =>
                                                updatePreferences({ ...preferences, units: unit })
                                            }
                                            className="px-3 py-2"
                                            style={{
                                                backgroundColor: isSelected
                                                    ? MAIN_COLORS.primary
                                                    : "#111111",
                                            }}
                                            activeOpacity={0.8}
                                            accessibilityRole="button"
                                            accessibilityLabel={`Use ${unit}`}
                                        >
                                            <Text
                                                className="text-[12px] font-bold font-sans uppercase"
                                                style={{
                                                    color: isSelected
                                                        ? MAIN_COLORS.black
                                                        : MAIN_COLORS.mediumGrey,
                                                }}
                                            >
                                                {unit}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </SettingsRow>

                        <SettingsRow
                            icon="bell"
                            title="Workout reminders"
                            detail={preferences.remindersEnabled ? "Enabled" : "Disabled"}
                        >
                            <Switch
                                value={preferences.remindersEnabled}
                                onValueChange={(remindersEnabled) =>
                                    updatePreferences({ ...preferences, remindersEnabled })
                                }
                                thumbColor={MAIN_COLORS.white}
                                trackColor={{
                                    false: "#2A2A2A",
                                    true: MAIN_COLORS.primary,
                                }}
                            />
                        </SettingsRow>

                        <SettingsRow icon="moon" title="Theme" detail="Dark">
                            <Text
                                className="text-[12px] font-bold font-sans"
                                style={{ color: MAIN_COLORS.primary }}
                            >
                                Active
                            </Text>
                        </SettingsRow>
                    </SettingsSection>

                    <SettingsSection title="Session">
                        <TouchableOpacity
                            onPress={handleLogout}
                            disabled={loggingOut}
                            activeOpacity={0.8}
                            accessibilityRole="button"
                            accessibilityLabel="Log out"
                        >
                            <SettingsRow
                                icon="sign-out-alt"
                                title={loggingOut ? "Logging out..." : "Log out"}
                                detail="End this device session"
                            >
                                <FontAwesome5
                                    name="chevron-right"
                                    size={11}
                                    color={MAIN_COLORS.mediumGrey}
                                />
                            </SettingsRow>
                        </TouchableOpacity>
                    </SettingsSection>
                </>
            )}
        </View>
    );
}
