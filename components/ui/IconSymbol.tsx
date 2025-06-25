// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, ViewStyle } from "react-native";
import { Icon } from "@expo/vector-icons/build/createIconSet";

export function MaterialSymbol({
  name,
  size = 24,
  color,
}: {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color: string | OpaqueColorValue;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={name} />;
}
export function AntSymbol({
  name,
  size = 24,
  color,
}: {
  name: keyof typeof AntDesign.glyphMap;
  size?: number;
  color: string | OpaqueColorValue;
  weight?: SymbolWeight;
}) {
  return <AntDesign color={color} size={size} name={name} />;
}
