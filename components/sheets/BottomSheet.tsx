import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet';

interface FormSheetTypes {
  
  snapPoints:  Array<string | number>
  refProp: any
  children: React.ReactNode
}

export default function BottomFormSheet ({snapPoints, refProp, children} : FormSheetTypes) {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
      <BottomSheetModal
        ref={refProp}
        snapPoints={snapPoints}
      >

        <BottomSheetView style={styles.contentContainer}>
          {children}
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