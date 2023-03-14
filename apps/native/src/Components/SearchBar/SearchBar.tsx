import { AntDesign } from '@expo/vector-icons';
import { Input } from '@ui-kitten/components';
import React, { FC } from 'react';

interface SearchBarProps {
  value: string;
  onChangeText(text: string): void;
}

export const SearchBar: FC<SearchBarProps> = ({ value, onChangeText }) => (
  <Input
    value={value}
    onChangeText={onChangeText}
    accessoryRight={(props: any) => (
      <AntDesign name="search1" color={props.style.tintColor} />
    )}
  />
);
