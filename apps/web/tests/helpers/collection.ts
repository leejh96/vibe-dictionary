import { UI_COLLECTION_DEMOS } from '../../src/components/demos/collection/UiCollection';
import { MOTION_COLLECTION_DEMOS } from '../../src/components/demos/collection/MotionCollection';
import { LAYOUT_COLLECTION_DEMOS } from '../../src/components/demos/collection/LayoutCollection';
import { STYLE_COLLECTION_DEMOS } from '../../src/components/demos/collection/StyleCollection';
import { VIDEO_COLLECTION_DEMOS } from '../../src/components/demos/collection/VideoCollection';

export const COLLECTION_REGISTRIES = [UI_COLLECTION_DEMOS, MOTION_COLLECTION_DEMOS, LAYOUT_COLLECTION_DEMOS, STYLE_COLLECTION_DEMOS, VIDEO_COLLECTION_DEMOS];
export const COLLECTION_IDS = new Set(COLLECTION_REGISTRIES.flatMap(registry => Object.keys(registry)));
