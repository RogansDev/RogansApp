import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to Rogans_module.web.ts
// and on native platforms to Rogans_module.ts
import Rogans_moduleModule from './src/Rogans_moduleModule';
import Rogans_moduleView from './src/Rogans_moduleView';
import { ChangeEventPayload, Rogans_moduleViewProps } from './src/Rogans_module.types';

// Get the native constant value.
export const PI = Rogans_moduleModule.PI;

export function hello(): string {
  return Rogans_moduleModule.hello();
}

export async function setValueAsync(value: string) {
  return await Rogans_moduleModule.setValueAsync(value);
}

const emitter = new EventEmitter(Rogans_moduleModule ?? NativeModulesProxy.Rogans_module);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { Rogans_moduleView, Rogans_moduleViewProps, ChangeEventPayload };
