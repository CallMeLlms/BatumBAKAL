import {View, ScrollView} from "react-native"; 

export default function ProgramLayout ({children} : {children : React.ReactNode}) {

    return (
        <View className="flex-1">
             <ScrollView showsVerticalScrollIndicator={false}>
                 {children}
             </ScrollView>
         </View>
    )

}