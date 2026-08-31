export type LocationSearchType =
    | 'noPreference'
    | 'within'
    | 'onlyInside';

export interface ProviderSearchCriteria {
    locationSearchType: LocationSearchType;
    distanceMiles: number;
    zipCode: string;
    useCurrentLocation: boolean;
}

