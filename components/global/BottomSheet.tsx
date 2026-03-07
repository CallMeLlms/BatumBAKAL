import React, { useEffect, useRef } from 'react';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useBottomSheetStore } from '@/stores/bottomSheetStore';

export default function GlobalBottomSheet() {
  const ref = useRef<BottomSheetModal>(null);

  const { content, snapPoints, isOpen} = useBottomSheetStore();
  
  useEffect(() => {
    if (isOpen) {
      ref.current?.present();
    } else {
      ref.current?.dismiss();
    }
  }, [isOpen]);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onDismiss={() => {
        useBottomSheetStore.setState({
          isOpen: false,
          content: null
        })
      }}
    >
      <BottomSheetView className="flex-1 p-6">
        {content}
      </BottomSheetView>
    </BottomSheetModal>
  );
}
