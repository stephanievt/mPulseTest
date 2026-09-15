// TODO: You know, these could live with the page that they serve?
export type LocationSearchType =
    | 'noPreference'
    | 'within'
    | 'onlyInside';

export type DistanceMilesOptions  =
    | '5 Miles'
    | '10 Miles'
    | '20 Miles'
    | '50 Miles'
    | 'Any range';

export interface ProviderSearchCriteria {
    locationSearchType: LocationSearchType;
    distanceMiles: DistanceMilesOptions;
    zipCode: string;
    useCurrentLocation: boolean;
}

