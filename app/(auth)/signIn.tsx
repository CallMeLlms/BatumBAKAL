import { View, KeyboardAvoidingView, ScrollView, Text, Dimensions, TextInput, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FONT_SIZES } from "@/constants/Fonts";
import { router } from "expo-router";
import { signInUser } from "@/api/authService";
import { MAIN_COLORS } from "@/constants/MainColors";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: any) => {
        try {
            const response = await signInUser(data.email, data.password);
            if (!response) {
                console.log("Sign in failed");
            }
            router.replace('/(tabs)')
        } catch (error: any) {
            Alert.alert('Sign In Error', 'Invalid email or password');
            console.error(error)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <Text style={styles.title}>BatumBAKAL</Text>
                            <Text style={styles.subtitle}>Welcome back</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <Controller
                                control={control}
                                name="email"
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email address'
                                    }
                                }}
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <View>
                                        <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                                            <Feather name="mail" size={18} color={MAIN_COLORS.mediumGrey} style={styles.inputIcon} />
                                            <TextInput
                                                placeholder="your@email.com"
                                                placeholderTextColor={MAIN_COLORS.mediumGrey}
                                                onBlur={onBlur}
                                                style={styles.input}
                                                value={value}
                                                onChangeText={onChange}
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                            />
                                        </View>
                                        {errors.email && (
                                            <Text style={styles.errorText}>{errors.email.message}</Text>
                                        )}
                                    </View>
                                )}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <Controller
                                control={control}
                                name="password"
                                rules={{
                                    required: 'Password is required',
                                }}
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <View>
                                        <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                                            <Feather name="lock" size={18} color={MAIN_COLORS.mediumGrey} style={styles.inputIcon} />
                                            <TextInput
                                                placeholder="Enter your password"
                                                placeholderTextColor={MAIN_COLORS.mediumGrey}
                                                onBlur={onBlur}
                                                style={styles.input}
                                                value={value}
                                                onChangeText={onChange}
                                                secureTextEntry={!showPassword}
                                            />
                                            <TouchableOpacity
                                                onPress={() => setShowPassword(!showPassword)}
                                                style={styles.eyeButton}
                                            >
                                                <Feather
                                                    name={showPassword ? "eye" : "eye-off"}
                                                    size={18}
                                                    color={MAIN_COLORS.mediumGrey}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        {errors.password && (
                                            <Text style={styles.errorText}>{errors.password.message}</Text>
                                        )}
                                    </View>
                                )}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={handleSubmit(onSubmit)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.primaryButtonText}>Sign In</Text>
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/(auth)/signUp')}>
                                <Text style={styles.footerLink}>Create one</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
        backgroundColor: MAIN_COLORS.black,
    },
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: MAIN_COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    card: {
        width: SCREEN_WIDTH * 0.9,
        maxWidth: 400,
        backgroundColor: MAIN_COLORS.darkGrey,
        borderRadius: 12,
        padding: 32,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: FONT_SIZES.XXL,
        fontWeight: '700',
        color: MAIN_COLORS.white,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: FONT_SIZES.large,
        color: MAIN_COLORS.mediumGrey,
        fontWeight: '500',
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: FONT_SIZES.medium,
        fontWeight: '600',
        color: MAIN_COLORS.white,
        marginBottom: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: MAIN_COLORS.black,
        borderWidth: 2,
        borderColor: MAIN_COLORS.mediumGrey,
        borderRadius: 12,
        paddingHorizontal: 16,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        color: MAIN_COLORS.white,
        fontWeight: '500',
    },
    inputError: {
        borderColor: MAIN_COLORS.secondary,
    },
    eyeButton: {
        padding: 4,
    },
    errorText: {
        color: MAIN_COLORS.secondary,
        fontSize: 12,
        marginTop: 8,
        fontWeight: '500',
    },
    primaryButton: {
        backgroundColor: MAIN_COLORS.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 32,
    },
    primaryButtonText: {
        color: MAIN_COLORS.black,
        fontSize: FONT_SIZES.large,
        fontWeight: '700',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: MAIN_COLORS.mediumGrey,
        fontSize: 14,
    },
    footerLink: {
        color: MAIN_COLORS.primary,
        fontSize: 14,
        fontWeight: '700',
    },
});
