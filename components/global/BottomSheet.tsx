import React, { useEffect, useRef } from 'react';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useBottomSheetStore } from '@/stores/bottomSheetStore';
import { StyleSheet } from 'react-native';

export default function GlobalBottomSheet() {
  const ref = useRef<BottomSheetModal>(null);
  const { setBottomSheetRef, content, snapPoints } = useBottomSheetStore();

  // Register the ref into the store once on mount
  useEffect(() => {
    setBottomSheetRef(ref);
  }, []);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={styles.container}>
        {content}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});