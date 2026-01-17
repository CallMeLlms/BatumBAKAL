import { View, KeyboardAvoidingView, ScrollView, Text, Dimensions, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FONT_SIZES } from "@/constants/Fonts";
import { router } from "expo-router";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function signIn() {
    const { handleSubmit, control, register, formState: { errors } } = useForm();

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.Container}>
                        <View style={styles.InnerContainer}>
                            <Text style={styles.Title}>BatumBAKAL</Text>
                            <View style={styles.InputFieldContainer}>
                                <Text style={styles.FormLabel}>email</Text>
                                <Controller
                                    control={control}
                                    name="email"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            placeholder="Email"
                                            style={{ borderColor: "black", borderWidth: 2 }}
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    )}
                                />
                            </View>

                            <View style={styles.InputFieldContainer}>
                                <Text style={styles.FormLabel}>password</Text>
                                <Controller
                                    control={control}
                                    name="password"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            editable
                                            multiline
                                            maxLength={40}
                                            style={{ borderColor: "black", borderWidth: 2 }}
                                            placeholder="Password"
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    )}
                                />
                            </View>

                                <TouchableOpacity style={{ backgroundColor: "grey" }}
                                    onPress={() => router.push('/(auth)/signUp')}
                                >
                                    <Text>
                                        Create a account
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgb(28,28,28)',
        justifyContent: "center",
        alignItems: "center"
    },
    InnerContainer: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.5,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "grey",
        padding: 12,
        borderRadius: 4
    },
    Title: {
        fontSize: FONT_SIZES.XL
    },
    InputFieldContainer: {
        
    },
    FormLabel: {
        fontSize: FONT_SIZES.large
    }
})