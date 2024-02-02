import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Dropdown = ({ options, selectedOption, onSelect, isVisible, onClose }) => {
  const renderDropdownItem = (item) => (
    <TouchableOpacity
      key={item.value}
      onPress={() => {
        onSelect(item.value);
        onClose();
      }}
      style={[
        styles.dropdownItem,
        selectedOption === item.value && styles.selectedItem,
      ]}
    >
      <Text style={[styles.optionText, selectedOption === item.value && styles.selectedText]}>{item.label}</Text>
      {selectedOption === item.value && (
        <Icon
          name="check"
          style={styles.icon}
        />
      )}
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
        <View style={styles.overlay} />

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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
  dropdownItem: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText:{
    fontSize:16,
  },
  selectedItem: {
    backgroundColor: '#209E81',
    borderRadius:5,
  },
  selectedText: {
    color: '#fff',
  },
  icon: {
    marginRight: 10,
    color: '#fff', 
    fontSize: 20,
    fontWeight: "normal", 
    marginLeft:10,
  },
});

export default Dropdown;
