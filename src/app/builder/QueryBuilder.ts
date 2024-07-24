import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }
  // search query
  search(searchableField: string[]) {
    const searchTerm = this?.query?.searchTerm as string;
    if (searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchableField.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  // filter query
  filter() {
    const queryObj = { ...this.query };
    const excludingFields = ['searchTerm', 'sort', 'limit', 'page'];
    excludingFields.forEach((elm) => delete queryObj[elm]);

    if (queryObj.minPrice || queryObj.maxPrice) {
      const priceFilter: { $gte?: number; $lte?: number } = {};
      if (queryObj.minPrice) priceFilter.$gte = Number(queryObj.minPrice);
      if (queryObj.maxPrice) priceFilter.$lte = Number(queryObj.maxPrice);
      queryObj.price = priceFilter;
      delete queryObj.minPrice;
      delete queryObj.maxPrice;
    }
    if (queryObj.categories) {
      const categoriesArray = (queryObj.categories as string)
        .split(',')
        .map((id) => id.trim());
      queryObj.category = { $in: categoriesArray };
      delete queryObj.categories;
    }

    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);
    return this;
  }
  // sort query
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.queryModel = this.queryModel.sort(sort as string);

    return this;
  }
  // paginate query
  paginate() {
    const limit = Number(this?.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit;

    this.queryModel = this.queryModel.skip(skip).limit(limit);

    return this;
  }
}

export default QueryBuilder;
