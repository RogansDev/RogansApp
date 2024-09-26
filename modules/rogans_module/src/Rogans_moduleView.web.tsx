import * as React from 'react';

import { Rogans_moduleViewProps } from './Rogans_module.types';

export default function Rogans_moduleView(props: Rogans_moduleViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
