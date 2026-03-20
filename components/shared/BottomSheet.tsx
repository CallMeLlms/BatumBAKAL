import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useBottomSheetStore } from '@/stores/bottomSheetStore';
import { View } from 'react-native';

export default function GlobalBottomSheet() {
    const ref = useRef<BottomSheetModal>(null);
    const { content, snapPoints, isOpen, config } = useBottomSheetStore();

    useEffect(() => {
        if (isOpen) {
            ref.current?.present();
        } else {
            ref.current?.dismiss();
        }
    }, [isOpen]);

    const handleDismiss = useCallback(() => {
        useBottomSheetStore.setState({
            isOpen: false,
            content: null
        });
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.6}
                pressBehavior="none"
            />
        ),
        []
    );

    const handleIndicatorStyle = useMemo(() => ({
        backgroundColor: config.handleColor,
        width: 40,
        height: 4,
        marginTop: 8,
        opacity: config.showHandle ? 1 : 0,
    }), [config.handleColor, config.showHandle]);

    const backgroundStyle = useMemo(() => ({
        backgroundColor: config.backgroundColor,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    }), [config.backgroundColor]);

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            index={0}
            enablePanDownToClose={false}
            enableHandlePanningGesture={false}
            onDismiss={handleDismiss}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={handleIndicatorStyle}
            backgroundStyle={backgroundStyle}
            enableDynamicSizing={false}
        >
            <View style={{ flex: 1, backgroundColor: config.backgroundColor }}>
                {content}
            </View>
        </BottomSheetModal>
    );
}
