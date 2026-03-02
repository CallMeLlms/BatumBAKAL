import { View, Dimensions } from "react-native";
import { Card } from "../ui/card"
import {useSharedValue, useDerivedValue} from "react-native-reanimated";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const width = SCREEN_WIDTH * 0.4;
const height = SCREEN_HEIGHT * 0.2;
const r = width * 0.33;

const data = [10, 40, 25, 60, 30, 90, 55, 1, 1, 1, 1, 1, 1, 1 ];

export default function LineChart() {
    const path = Skia.Path.Make();

    const stepX = width / (data.length - 1);
    const maxValue = Math.max(...data);

    data.forEach((value, index) => {
        const x = index * stepX;
        const y = height - (value / maxValue) * height;

        if (index === 0) {
            path.moveTo(x, y);
        } else {
            path.lineTo(x, y);
        }
    });

    return (
        <Card className="bg-slate-500">
            <Canvas style={{ width: "100%", height, backgroundColor: "red" }}
             
            >
                <Path
                    path={path}
                    style="stroke"

                    strokeWidth={2}
                />
            </Canvas>
        </Card>
    )
}