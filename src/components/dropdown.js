import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const Dropdown = ({ options, selectedOption, onSelect, isVisible, onClose }) => {
  const renderDropdownItem = (item) => (
    <TouchableOpacity
      key={item.value}
      onPress={() => {
        onSelect(item.value);
        onClose();
      }}
      style={styles.dropdownItem}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {options.map(renderDropdownItem)}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
  dropdownItem: {
    padding: 15,
  },
});

export default Dropdown;
