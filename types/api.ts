export interface ClientTag {
  id: string;
  name: string;
}

export interface ClientPerson {
  id: string;
  name: string;
  bio: string;
  country: {
    code: string;
    name: string;
  };
}

export interface ClientFragment {
  id: string;
  title: string;
  duration: number;
  playerUrl: string;
  thumbnailUrl: string;
  person: ClientPerson | null;
  tags: ClientTag[];
}

export interface FragmentsPagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface FragmentsResponse {
  data: ClientFragment[];
  pagination: FragmentsPagination;
}

export interface ApiLanguage {
  id: string;
  name: string;
  code: string;
}

export type TagCategory = {
  id: string;
  name: string;
  tags: {
    id: string;
    name: string;
  }[];
};

export type TagCategoriesResponse = {
  tagCategories: TagCategory[];
};
