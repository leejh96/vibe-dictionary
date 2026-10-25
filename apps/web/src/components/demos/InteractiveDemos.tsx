import type { FC } from 'react';
import { DEMO_REGISTRY } from './demoRegistry';

interface DemoProps {
  techniqueId: string;
}

export const InteractiveDemo: FC<DemoProps> = ({ techniqueId }) => {
  const Demo = DEMO_REGISTRY.get(techniqueId);
  return Demo ? <Demo /> : null;
};
