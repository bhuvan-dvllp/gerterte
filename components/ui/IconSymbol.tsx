
// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;

// Add mappings for common college app icons
const MAPPING: IconMapping = {
  // College app specific icons
  'school': 'school',
  'search': 'search',
  'notifications': 'notifications',
  'person': 'person',
  'home': 'home',
  'bar-chart': 'bar-chart',
  'lightbulb': 'lightbulb',
  'tune': 'tune',
  'location-on': 'location-on',
  'favorite': 'favorite',
  'favorite-border': 'favorite-border',
  'arrow-forward': 'arrow-forward',
  'star': 'star',
  'star-border': 'star-border',
  'compare-arrows': 'compare-arrows',
  'filter-list': 'filter-list',
  'sort': 'sort',
  'bookmark': 'bookmark',
  'bookmark-border': 'bookmark-border',
  'info': 'info',
  'share': 'share',
  'phone': 'phone',
  'email': 'email',
  'web': 'language',
  'edit': 'edit',
  'delete': 'delete',
  'add': 'add',
  'remove': 'remove',
  'check': 'check',
  'close': 'close',
  'menu': 'menu',
  'more-vert': 'more-vert',
  'calendar': 'event',
  'clock': 'access-time',
  'dollar': 'attach-money',
  'graduation': 'school',
  'building': 'business',
  'map': 'map',
  'thumb-up': 'thumb-up',
  'thumb-down': 'thumb-down',
  'visibility': 'visibility',
  'download': 'download',
  'upload': 'upload',
  'refresh': 'refresh',
  'settings': 'settings',
  'help': 'help',
  'warning': 'warning',
  'error': 'error',
  'success': 'check-circle',

  // Navigation icons
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'house': 'home',
  'paperplane': 'send',
  'chevron.left': 'chevron-left',
  'chevron.down': 'expand-more',
  'chevron.up': 'expand-less',
} as const;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms.
 *
 * @param name The name of the icon
 * @param size The size of the icon
 * @param color The color of the icon
 * @param style Additional styles
 * @param weight The weight of the icon (iOS only)
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
