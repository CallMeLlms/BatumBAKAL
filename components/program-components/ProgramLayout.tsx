import {View, ScrollView, KeyboardAvoidingView} from "react-native"; 

export default function ProgramLayout ({children} : {children : React.ReactNode}) {
    return (
        <KeyboardAvoidingView 
            className="flex-1"
        >
            <View className="flex-1 mt-verticalSpacing mx-horizontalSpacing">
             <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
             >
                {/* <View className="flex-1"> */}
                    {children}
                 {/* </View> */}
             </ScrollView>
             </View>
         </KeyboardAvoidingView>
    )
}