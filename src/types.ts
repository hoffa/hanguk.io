/**
 * @see {@link https://kosis.kr}
 * @see {@link https://en.wikipedia.org/wiki/List_of_cities_in_South_Korea}
 */
export interface Division {
  name: string
  population: number

  /**
   * Area in km².
   */
  area: number
  image?: string
  imageAttribution?: string
  highlights?: string[]

  /**
   * The list of all divisions should cover all land without overlap. Where appropriate, to keep
   * things intuitive, some divisions may be grouped together (e.g. just 제주 which covers 제주시 and
   * 서귀포시).
   */
  type: '특별시' | '광역시' | '시' | '군' | '특별자치도' | '특별자치시'
}

export interface Divisions {
  $schema?: string
  divisions: Division[]
}
