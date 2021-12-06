export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum OrderField {
  ItemName = 'ITEM_NAME',
  Price = 'PRICE',
  Stock = 'STOCK'
}

export enum ItemType {
  Product = 'PRODUCT',
  Document = 'DOCUMENT',
  Folder = 'FOLDER'
}

export enum LogicalOperator {
  Or = 'OR',
  And = 'AND'
}

export enum StockLocationsLogicalOperator {
  Or = 'OR'
}

export type KeyValuePair = {
  __typename?: 'KeyValuePair';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type Item = {
  id: Scalars['ID'];
  tenantId: Scalars['ID'];
  type: Scalars['String'];
  language: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  topics: Array<Topic>;
};

export type Product = Item & {
  __typename?: 'Product';
  id: Scalars['ID'];
  tenantId: Scalars['ID'];
  type: Scalars['String'];
  language: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  topics: Array<Topic>;
  variants: Array<ProductVariant>;
  matchingVariant: ProductVariant;
};

export type Folder = Item & {
  __typename?: 'Folder';
  id: Scalars['ID'];
  tenantId: Scalars['ID'];
  type: Scalars['String'];
  language: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  topics: Array<Topic>;
};

export type Document = Item & {
  __typename?: 'Document';
  id: Scalars['ID'];
  tenantId: Scalars['ID'];
  type: Scalars['String'];
  language: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  topics: Array<Topic>;
};

export type Image = {
  __typename?: 'Image';
  key: Scalars['String'];
  mimeType: Scalars['String'];
  url: Scalars['String'];
  altText?: Maybe<Scalars['String']>;
  variants?: Maybe<Array<ImageVariant>>;
};

export type ImageVariant = {
  __typename?: 'ImageVariant';
  width: Scalars['Int'];
  key: Scalars['String'];
  url: Scalars['String'];
};

export type PriceVariant = {
  __typename?: 'PriceVariant';
  identifier: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type StockLocation = {
  __typename?: 'StockLocation';
  identifier: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  stock?: Maybe<Scalars['Int']>;
  meta?: Maybe<Array<KeyValuePair>>;
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  id: Scalars['ID'];
  name: Scalars['String'];
  sku: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  priceVariants?: Maybe<Array<PriceVariant>>;
  stock?: Maybe<Scalars['Int']>;
  stockLocations?: Maybe<Array<StockLocation>>;
  isDefault: Scalars['Boolean'];
  attributes: Array<VariantAttribute>;
  images?: Maybe<Array<Image>>;
};

export type Topic = {
  __typename?: 'Topic';
  id: Scalars['String'];
  name: Scalars['String'];
  hierarchy: Scalars['String'];
  path: Scalars['String'];
};

export type VariantAttribute = {
  __typename?: 'VariantAttribute';
  attribute: Scalars['String'];
  value: Scalars['String'];
};

export type OrderBy = {
  field: OrderField;
  direction: OrderDirection;
};

export type PriceRangeFilter = {
  min?: InputMaybe<Scalars['Float']>;
  max?: InputMaybe<Scalars['Float']>;
};

export type StockLocationsFilter = {
  logicalOperator?: InputMaybe<StockLocationsLogicalOperator>;
  locations?: InputMaybe<Array<Scalars['String']>>;
  min: Scalars['Int'];
};

export type StockFilter = {
  location?: InputMaybe<Scalars['String']>;
  min: Scalars['Int'];
};

export type TopicHierarchyFilterFields = {
  value: Scalars['String'];
};

export type TopicPathsFilterFields = {
  value: Scalars['String'];
};

export type TopicHierarchyFilterSection = {
  logicalOperator?: InputMaybe<LogicalOperator>;
  fields: Array<TopicHierarchyFilterFields>;
};

export type TopicHierarchyFilter = {
  logicalOperator?: InputMaybe<LogicalOperator>;
  sections: Array<TopicHierarchyFilterSection>;
};

export type TopicPathsFilterSection = {
  logicalOperator?: InputMaybe<LogicalOperator>;
  fields: Array<TopicPathsFilterFields>;
};

export type TopicPathsFilter = {
  logicalOperator?: InputMaybe<LogicalOperator>;
  sections: Array<TopicPathsFilterSection>;
};

export type ItemFilterFields = {
  itemIds?: InputMaybe<Array<Scalars['String']>>;
  productVariantIds?: InputMaybe<Array<Scalars['String']>>;
  skus?: InputMaybe<Array<Scalars['String']>>;
  shapeIdentifiers?: InputMaybe<Array<Scalars['String']>>;
  paths?: InputMaybe<Array<Scalars['String']>>;
  topicPaths?: InputMaybe<TopicPathsFilter>;
};

export type ProductVariantsFilter = {
  isDefault?: InputMaybe<Scalars['Boolean']>;
  priceRange?: InputMaybe<PriceRangeFilter>;
  stock?: InputMaybe<StockFilter>;
  stockLocations?: InputMaybe<StockLocationsFilter>;
  attributes?: InputMaybe<Array<VariantAttributeFilter>>;
};

export type CatalogueSearchFilter = {
  searchTerm?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ItemType>;
  include?: InputMaybe<ItemFilterFields>;
  exclude?: InputMaybe<ItemFilterFields>;
  productVariants?: InputMaybe<ProductVariantsFilter>;
  priceVariant?: InputMaybe<Scalars['String']>;
  stockLocation?: InputMaybe<Scalars['String']>;
};

export type VariantAttributeFilter = {
  attribute: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
  totalNodes: Scalars['Int'];
};

export type CatalogueSearchConnectionEdge = {
  __typename?: 'CatalogueSearchConnectionEdge';
  cursor: Scalars['String'];
  node: Item;
};

export type PriceAggregation = {
  __typename?: 'PriceAggregation';
  min: Scalars['Float'];
  max: Scalars['Float'];
};

export type VariantAttributesAggregation = {
  __typename?: 'VariantAttributesAggregation';
  attribute: Scalars['String'];
  value: Scalars['String'];
  count: Scalars['Int'];
};

export type TopicsAggregation = {
  __typename?: 'TopicsAggregation';
  hierarchy: Scalars['String'];
  name: Scalars['String'];
  count: Scalars['Int'];
  path: Scalars['String'];
};

export type CatalogueSearchAggregations = {
  __typename?: 'CatalogueSearchAggregations';
  totalResults: Scalars['Int'];
  price: PriceAggregation;
  variantAttributes?: Maybe<Array<VariantAttributesAggregation>>;
  topics?: Maybe<Array<TopicsAggregation>>;
};

export type CatalogueSearchConnection = {
  __typename?: 'CatalogueSearchConnection';
  aggregations: CatalogueSearchAggregations;
  pageInfo: PageInfo;
  edges?: Maybe<Array<CatalogueSearchConnectionEdge>>;
};

export type Query = {
  __typename?: 'Query';
  search: CatalogueSearchConnection;
};


export type QuerySearchArgs = {
  language?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderBy>;
  filter?: InputMaybe<CatalogueSearchFilter>;
};
