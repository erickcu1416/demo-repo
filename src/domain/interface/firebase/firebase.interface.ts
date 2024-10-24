interface Filter {
  attr: string;
  operation: FirebaseFirestore.WhereFilterOp;
  value: any;
}

interface Sort {
  attr: string;
  asc: boolean;
  limit?: number; 
}

interface QueryParams {
  filters?: Filter[];
  sort?: Sort;
}