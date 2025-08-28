import { CategoryType } from '@/server/db/types/enum/category-type';
import { SizeUnit } from '@/types/enum/size-unit';

export const sizeUnits = Object.values(SizeUnit);

const sneakersEuSizesInAdidas = [
  '36',
  '36 2/3',
  '37 1/3',
  '38',
  '38 2/3',
  '39 1/3',
  '40',
  '40 2/3',
  '41 1/3',
  '42',
  '42 2/3',
  '43 1/3',
  '44',
  '44 2/3',
  '45 1/3',
  '46',
  '46 2/3',
  '47 1/3',
  '48',
  '48 2/3',
  '49 1/3',
  '50',
  '50 2/3',
  '51 1/3',
];

const sneakersEUStandardSizes = [
  '35',
  '35.5',
  '36',
  '36.5',
  '37',
  '37.5',
  '38',
  '38.5',
  '39',
  '39.5',
  '40',
  '40.5',
  '41',
  '41.5',
  '42',
  '42.5',
  '43',
  '43.5',
  '44',
  '44.5',
  '45',
  '45.5',
  '46',
  '46.5',
  '47',
  '47.5',
  '48',
  '48.5',
  '49',
  '49.5',
  '50',
];

const getSneakersEuSizes = (type: 'adidas' | 'standard') => {
  if (type === 'adidas') {
    return sneakersEuSizesInAdidas;
  }
  return sneakersEUStandardSizes;
};

export const getSneakersSizesByUnit = (type: 'adidas' | 'standard'): Record<SizeUnit, string[]> => {
  return {
    [SizeUnit.EU]: getSneakersEuSizes(type),
    [SizeUnit.US]: [
      '4',
      '4,5',
      '5',
      '5.5',
      '6',
      '6.5',
      '7',
      '7.5',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '12.5',
      '13',
      '13.5',
      '14',
      '14.5',
    ],
    [SizeUnit.UK]: [
      '3',
      '3.5',
      '4',
      '4.5',
      '5',
      '5.5',
      '6',
      '6.5',
      '7',
      '7.5',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '12.5',
      '13',
      '13.5',
      '14',
    ],
    [SizeUnit.CM]: [
      '22',
      '22.5',
      '23',
      '23.5',
      '24',
      '24.5',
      '25',
      '25.5',
      '26',
      '26.5',
      '27',
      '27.5',
      '28',
      '28.5',
      '29',
      '29.5',
      '30',
      '30.5',
      '31',
      '31.5',
      '32',
      '32.5',
    ],
  };
};

export const clothingSizes: Record<SizeUnit, string[]> = {
  [SizeUnit.EU]: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  [SizeUnit.US]: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  [SizeUnit.UK]: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  [SizeUnit.CM]: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
};

const oneSize = ['One size'];

const oneSizeByUnit: Record<SizeUnit, string[]> = {
  [SizeUnit.EU]: oneSize,
  [SizeUnit.US]: oneSize,
  [SizeUnit.UK]: oneSize,
  [SizeUnit.CM]: oneSize,
};

export const sizesByCategories = {
  [CategoryType.CLOTHING]: clothingSizes,
  [CategoryType.COLLECTIBLES]: oneSizeByUnit,
  [CategoryType.ACCESSORIES]: oneSizeByUnit,
  [CategoryType.OTHER]: oneSizeByUnit,
};

export const getSizesByCategories = (
  category: CategoryType,
  type: 'adidas' | 'standard',
): Record<SizeUnit, string[]> => {
  if (category === CategoryType.SNEAKERS) {
    return getSneakersSizesByUnit(type);
  }

  return sizesByCategories[category];
};
