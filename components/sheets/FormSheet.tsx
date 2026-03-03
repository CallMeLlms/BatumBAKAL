import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet';

export default function FormSheet () {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  
  bottomSheetRef.current?.present()
  // renders
  return (
    // <View style={styles.container}>
      <BottomSheetModal
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        index={0}
        snapPoints={['90%']}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    zIndex: 1000,
    alignItems: 'center',
  },
});