import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const DatePicker = ({
    mode,
    isDateVisible,
    minimumDate,
    maximumDate,
    handleDateConfirm,
    onCancel,
}) => {

    return (
        <DateTimePickerModal
            mode={mode}
            isVisible={isDateVisible}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            display="default"
            onConfirm={handleDateConfirm}
            onCancel={onCancel}
        />
    );
};

export default DatePicker;