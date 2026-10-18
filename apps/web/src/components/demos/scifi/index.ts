import type { ComponentType } from 'react';
import { ContourTerrainDemo } from './ContourTerrainDemo';
import { XrayDeviceDemo } from './XrayDeviceDemo';
import { PinchedCheckerDemo } from './PinchedCheckerDemo';
import { CopperTraceDemo } from './CopperTraceDemo';
import { HiddenLineDemo } from './HiddenLineDemo';
import { ImpossibleTribarDemo } from './ImpossibleTribarDemo';
import { OrthographicViewsDemo } from './OrthographicViewsDemo';
import { BallStickMoleculeDemo } from './BallStickMoleculeDemo';
import { KochSnowflakeDemo } from './KochSnowflakeDemo';
import { MobiusRibbonDemo } from './MobiusRibbonDemo';

export const SCIFI_ADDITION_DEMOS: Record<string, ComponentType> = {
  'st-mobius-half-twist-ribbon': MobiusRibbonDemo,
  'st-koch-fractal-outline': KochSnowflakeDemo,
  'st-tetrahedral-ball-stick': BallStickMoleculeDemo,
  'st-third-angle-multiview': OrthographicViewsDemo,
  'st-penrose-impossible-tribar': ImpossibleTribarDemo,
  'st-hidden-line-isometric': HiddenLineDemo,
  'st-pcb-copper-traces': CopperTraceDemo,
  'st-opart-pinched-checker': PinchedCheckerDemo,
  'st-xray-device-shell': XrayDeviceDemo,
  'st-holographic-contour-terrain': ContourTerrainDemo,
};
