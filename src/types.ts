/**
 * The list of all divisions should cover all land without overlap.
 *
 * Where appropriate, to keep things intuitive, some divisions may be grouped together (e.g. just
 * 제주 which covers 제주시 and 서귀포시).
 *
 * There are also special cases where we may want to have a separate entry (e.g. for 독도), or
 * where a 광역시 contains a 군.
 */
export type DivisionType = '특별시' | '광역시' | '시' | '군' | '특별자치도' | '특별자치시' | '리'

/**
 * The first-level administrative division, i.e. the 광역자치단체.
 *
 * @see {@link http://nationalatlas.ngii.go.kr/pages/page_3796.php}
 * @see {@link https://namu.wiki/w/광역자치단체}
 */
export type FirstLevelDivision =
  | '강원도'
  | '경기도'
  | '경상남도'
  | '경상북도'
  | '광주광역시'
  | '대구광역시'
  | '대전광역시'
  | '부산광역시'
  | '서울특별시'
  | '세종특별자치시'
  | '울산광역시'
  | '인천광역시'
  | '전라남도'
  | '전라북도'
  | '제주특별자치도'
  | '충청남도'
  | '충청북도'

/**
 * @see {@link https://kosis.kr}
 * @see {@link https://en.wikipedia.org/wiki/List_of_cities_in_South_Korea}
 */
export interface Division {
  id: number

  name: string
  population: number

  /**
   * Area in km².
   */
  area: number
  image?: string
  imageAttribution?: string

  link: string
  highlight?: string
  info?: string

  lat?: number
  lon?: number

  type: DivisionType
  firstLevelDivision: FirstLevelDivision
}

export interface Divisions {
  $schema?: string
  divisions: Division[]
}
