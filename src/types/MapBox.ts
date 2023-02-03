export type MapBoxSuggestion = {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text_fr: string;
  place_name_fr: string;
  text: string;
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: Geometry;
  context: Context[];
};

type Context = {
  id: string;
  wikidata: string;
  text_fr: string;
  language_fr: string;
  text: string;
  language: string;
  short_code?: string;
};

type Geometry = {
  type: string;
  coordinates: number[];
};

type Properties = {
  wikidata?: string;
};
