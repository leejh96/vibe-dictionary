import type { ComponentType } from 'react';
import { DollyZoomDemo } from './DollyZoomDemo';
import { OrbitCameraDemo } from './OrbitCameraDemo';
import { DutchRollDemo } from './DutchRollDemo';
import { ProjectionModeDemo } from './ProjectionModeDemo';
import { StationaryPanDemo } from './StationaryPanDemo';
import { VerticalTiltDemo } from './VerticalTiltDemo';
import { LateralTruckDemo } from './LateralTruckDemo';
import { PedestalRoofDemo } from './PedestalRoofDemo';
import { LensShiftDemo } from './LensShiftDemo';
import { RadialLensDemo } from './RadialLensDemo';

export const CAMERA_ADDITION_DEMOS: Record<string, ComponentType> = {
  'mg-dolly-zoom-perspective': DollyZoomDemo,
  'mg-orbit-camera-view': OrbitCameraDemo,
  'mg-dutch-camera-roll': DutchRollDemo,
  'mg-projection-mode-switch': ProjectionModeDemo,
  'mg-stationary-camera-pan': StationaryPanDemo,
  'mg-vertical-camera-tilt': VerticalTiltDemo,
  'mg-lateral-camera-truck': LateralTruckDemo,
  'mg-pedestal-roof-reveal': PedestalRoofDemo,
  'mg-architectural-lens-shift': LensShiftDemo,
  'mg-radial-lens-distortion': RadialLensDemo,
};
