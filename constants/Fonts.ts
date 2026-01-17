import { Dimensions } from "react-native";


const {width: SCREEN_WIDTH} = Dimensions.get('window')
const baseWidth = 375;

export const FONT_SIZES = {
    small: (SCREEN_WIDTH / baseWidth) * 12,
    medium: (SCREEN_WIDTH / baseWidth) * 16,
    large: (SCREEN_WIDTH / baseWidth) * 20,
    XL: (SCREEN_WIDTH / baseWidth) * 24,
    XXL: (SCREEN_WIDTH / baseWidth) * 32,
}