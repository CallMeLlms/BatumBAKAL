import {View} from "react-native";

interface AuthHeaderProps {
    headerContainerClassName?: string
}

export default function AuthHeader ({headerContainerClassName} : AuthHeaderProps) {
    return (
        <>
            <View className={`${headerContainerClassName}`}>
                {/* <Text style={styles.title}>BatumBAKAL</Text> */}
                {/* <Text style={styles.subtitle}>Welcome back</Text> */}
            </View>
        </>
    )
}