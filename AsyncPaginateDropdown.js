import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text } from 'react-native';

const AsyncPaginateDropdown = ({ items, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [dropdownItems, setDropdownItems] = useState([]);

  const hcst = (searchText) => {
    let uniqueMakes = [];
    const filteredItems = items.filter((item) => {
      if (item.make.toLowerCase().includes(searchText.toLowerCase()) && !uniqueMakes.includes(item.make)) {
        uniqueMakes.push(item.make);
        return true;
      }
      return false;
    });

    setDropdownItems(filteredItems.map(item => ({
      label: item.make,
      value: item.make
    })));

   
  }

  useEffect(() => {
    setDropdownItems(items.map(item => ({
      label: item.make,
      value: item.make
    })));
  }, [items]);
  
  const handleChange = (value) => {
    setValue(value)
  }

  useEffect(() => {
    if (value) {
      const filtered = items.filter((item) => item.make === value);
      onSelect(filtered);
    }
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={dropdownItems}
      setOpen={setOpen}
      setValue={handleChange}
      searchable={true}
      onChangeSearchText={hcst}
    />
  );
}

export default AsyncPaginateDropdown;
