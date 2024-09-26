import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { Rogans_moduleViewProps } from './Rogans_module.types';

const NativeView: React.ComponentType<Rogans_moduleViewProps> =
  requireNativeViewManager('Rogans_module');

export default function Rogans_moduleView(props: Rogans_moduleViewProps) {
  return <NativeView {...props} />;
}
