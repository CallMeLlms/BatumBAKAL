import { View, Text, TextInput, KeyboardType } from "react-native";
import { authValidationRules } from "@/utils/auth/authUtils";
import { FieldErrors, Control, useForm, } from "react-hook-form";
import { Controller } from "react-hook-form";
import { MAIN_COLORS } from "@/constants/MainColors";
import { Feather } from "@expo/vector-icons";


interface AuthInputFieldTypes {
    control: Control<any>;
    errors: FieldErrors;
    rules: object;
    name: string;
    label: string;
    placeholder: string;
    icon: undefined;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardType;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export const AuthInputField = ({
     control, 
     errors, 
     rules, 
     name, 
     label, 
     placeholder, 
     icon, 
     secureTextEntry = false, 
     keyboardType = "default", 
     autoCapitalize = "none",
    }: AuthInputFieldTypes) => {

    return (
        <View className="mb-[24px]">
            <Text style={styles.label}>{label}</Text>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value, onBlur } }) => (
                    <View>
                        <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                            <Feather name={icon} size={18} color={MAIN_COLORS.mediumGrey} style={styles.inputIcon} />
                            <TextInput
                                placeholder={placeholder}
                                placeholderTextColor={MAIN_COLORS.mediumGrey}
                                onBlur={onBlur}
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                keyboardType={keyboardType}
                                autoCapitalize={autoCapitalize}
                                secureTextEntry={secureTextEntry}
                            />
                        </View>
                        {errors.email && (
                            <Text style={styles.errorText}>{errors.email.message}</Text>
                        )}
                    </View>
                )}
            />
        </View>
    );
}

// export default function AuthInput() {
//     const { handleSubmit, control, errors} = sign_in_auth_form({email: "test", password: "test"});

//     return (
//         <View className="mb-[24px]">
//             <Text style={styles.label}>Email</Text>
//             <Controller
//                 control={control}
//                 name="email"
//                 rules={{
//                     required: 'Email is required',
//                     pattern: {
//                         value: /^\S+@\S+$/i,
//                         message: 'Invalid email address'
//                     }
//                 }}
//                 render={({ field: { onChange, value, onBlur } }) => (
//                     <View>
//                         <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
//                             <Feather name="mail" size={18} color={MAIN_COLORS.mediumGrey} style={styles.inputIcon} />
//                             <TextInput
//                                 placeholder="your@email.com"
//                                 placeholderTextColor={MAIN_COLORS.mediumGrey}
//                                 onBlur={onBlur}
//                                 style={styles.input}
//                                 value={value}
//                                 onChangeText={onChange}
//                                 keyboardType="email-address"
//                                 autoCapitalize="none"
//                             />
//                         </View>
//                         {errors.email && (
//                             <Text style={styles.errorText}>{errors.email.message}</Text>
//                         )}
//                     </View>
//                 )}
//             />
//         </View>

// <View style={styles.inputGroup}>
//     <Text style={styles.label}>Password</Text>
//     <Controller
//         control={control}
//         name="password"
//         rules={{
//             required: 'Password is required',
//         }}
//         render={({ field: { onChange, value, onBlur } }) => (
//             <View>
//                 <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
//                     <Feather name="lock" size={18} color={MAIN_COLORS.mediumGrey} style={styles.inputIcon} />
//                     <TextInput
//                         placeholder="Enter your password"
//                         placeholderTextColor={MAIN_COLORS.mediumGrey}
//                         onBlur={onBlur}
//                         style={styles.input}
//                         value={value}
//                         onChangeText={onChange}
//                         secureTextEntry={!showPassword}
//                     />
//                     <TouchableOpacity
//                         onPress={() => setShowPassword(!showPassword)}
//                         style={styles.eyeButton}
//                     >
//                         <Feather
//                             name={showPassword ? "eye" : "eye-off"}
//                             size={18}
//                             color={MAIN_COLORS.mediumGrey}
//                         />
//                     </TouchableOpacity>
//                 </View>
//                 {errors.password && (
//                     <Text style={styles.errorText}>{errors.password.message}</Text>
//                 )}
//             </View>
//         )}
//     />
// </View>
// )
// }
