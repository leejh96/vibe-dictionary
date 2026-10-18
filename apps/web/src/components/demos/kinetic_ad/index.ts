import type { ComponentType } from 'react';
import { ProductTypeFramingDemo } from './ProductTypeFramingDemo';
import { TypeProductMatchCutDemo } from './TypeProductMatchCutDemo';
import { CopyCorrectionDemo } from './CopyCorrectionDemo';
import { ProductOccludedTypeDemo } from './ProductOccludedTypeDemo';
import { MultiFormatReframeDemo } from './MultiFormatReframeDemo';
import { LandscapeFilledTypeDemo } from './LandscapeFilledTypeDemo';
import { SemanticTypeExpansionDemo } from './SemanticTypeExpansionDemo';
import { DifferenceBlendTypeDemo } from './DifferenceBlendTypeDemo';
import { RotationalAmbigramDemo } from './RotationalAmbigramDemo';
import { RebusGlyphMorphDemo } from './RebusGlyphMorphDemo';

export const KINETIC_AD_ADDITION_DEMOS: Record<string, ComponentType> = {
  'vd-product-type-framing': ProductTypeFramingDemo,
  'vd-type-product-match-cut': TypeProductMatchCutDemo,
  'vd-proofreader-copy-correction': CopyCorrectionDemo,
  'vd-product-occluded-type': ProductOccludedTypeDemo,
  'vd-multiformat-copy-reframe': MultiFormatReframeDemo,
  'vd-landscape-filled-type': LandscapeFilledTypeDemo,
  'vd-semantic-type-expansion': SemanticTypeExpansionDemo,
  'vd-difference-blend-type': DifferenceBlendTypeDemo,
  'vd-rotational-ambigram': RotationalAmbigramDemo,
  'vd-rebus-glyph-morph': RebusGlyphMorphDemo,
};
