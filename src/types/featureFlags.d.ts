export interface FeatureFlag {
  _links: Links;
  _version: number;
  archived: boolean;
  clientSideAvailability: {
    usingEnvironmentId: boolean;
    usingMobileKey: boolean;
  };
  creationDate: number;
  defaults: FlagDefaults;
  description: string;
  key: string;
  kind: string;
  name: string;
  tags?: null[] | null;
  variationJsonSchema?: null;
  environments: {
    staging: {
      on: boolean;
    };
  };
}
export interface Links {
  parent: LinksEntity;
  self: LinksEntity;
}
export interface LinksEntity {
  href: string;
  type: string;
}
export interface FlagDefaults {
  offVariation: number;
  onVariation: number;
}
export interface Summary {
  prerequisites: number;
  variations: any;
}
