import {View, Text} from "react-native";

interface AuthHeaderProps {
    headerContainerClassName?: string
}

export default function AuthHeader ({headerContainerClassName} : AuthHeaderProps) {
    return (
        <>
            <View className={`${headerContainerClassName}`}>
                <Text>BatumBAKAL</Text>
                <Text>Welcome back</Text>
            </View>
        </>
    )
}