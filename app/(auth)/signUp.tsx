import { View, KeyboardAvoidingView, ScrollView, Text, Dimensions, TextInput, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FONT_SIZES } from "@/constants/Fonts";
import { router } from "expo-router";
import { signUpUser } from "@/api/services/authService";
import { MAIN_COLORS } from "@/constants/MainColors";
import SignUpInputField from "@/components/auth/SignUpInputField";
import AuthForm from "@/components/auth/AuthForm";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SignUp() {
    return (
       <AuthForm>
            <SignUpInputField/>
       </AuthForm>
    );
}

