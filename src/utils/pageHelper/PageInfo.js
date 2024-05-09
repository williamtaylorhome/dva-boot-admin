import $$ from 'cmn-utils';
import PageHelper from './index';
/**
 * Pagination objects
 */
export default class PageInfo {
  // Page number, starting with 1
  pageNum = 1;

  // Number per page
  pageSize = 10;

  // The number of current pages
  size = 0;

  // Total number of records
  total = 0;

  // Total number of pages
  totalPages = 0;

  // Result set
  list = [];

  // Filters {Name: 'John'}
  filters = {};

  // Sort criteria {name: 'asc', age: 'desc'}
  sorts = {};

  /**
   * You want the user to enter a page that is not legal (outside the first to the last page)
   * If you can correctly respond to the correct result page, then you can configure reasonable to true,
   * In this case, if pageNum<1, the first page will be queried, and if pageNum > the total number of pages, the last page will be queried
   */
  reasonable = false;

  /**
   * Assemble pagination information
   * @param {number} pageNum page number, default 1
   * @param {number} pageSize page size, default 10
   */
  startPage(pageNum = 1, pageSize = 10) {
    this.pageNum = pageNum;
    this.pageSize = pageSize;
    this.size = 0;
    this.total = 0;
    this.totalPages = 0;
    this.list = [];
    this.filters = {};
    this.sorts = {};
    return this;
  }

  /**
   * Assemble pagination information
   * @param {number} pageNum page number
   * @param {number} pageSize page size
   */
  jumpPage(pageNum, pageSize) {
    if ((pageNum && pageNum <= Math.ceil(this.totalPages)) || pageNum === 1) {
      this.pageNum = pageNum;
      if (pageSize) this.pageSize = pageSize;
    }
    return this;
  }

  /**
   * Stitch filters
   * @param {object} q Filters {name: 'jonn', sex: 1}
   * @param {boolean} merge Whether to merge the new condition with the existing condition
   */
  filter(q, merge) {
    if ($$.isObject(q)) {
      if (merge) {
        this.filters = {...this.filters, ...q};
      } else {
        this.filters = q;
      }
    }
    return this;
  }

  /**
   * Splice sort criteria
   * @param {object} q Sort fields {name: 'asc', age: 'desc'}
   */
  sortBy(q) {
    if ($$.isObject(q)) {
      this.sorts = q;
    }
    return this;
  }

  /**
   * Next page or specify the number of pages
   * @param {number} pageNum
   */
  nextPage(pageNum) {
    if (this.totalPages !== -1) {
      if (pageNum && pageNum <= Math.ceil(this.totalPages)) {
        this.pageNum = pageNum;
      } else if (this.pageNum + 1 <= Math.ceil(this.totalPages)) {
        this.pageNum ++;
      }
    } else {
      this.pageNum = this.totalPages;
    }
    return this;
  }

  /**
   * Previous
   */
  prevPage() {
    if (this.totalPages !== -1) {
      if (this.pageNum - 1 > 0) {
        this.pageNum --;
      }
    } else {
      this.pageNum = 1;
    }
    return this;
  }

  // Deprecated
  send(url, options) {
    const self = this;
    const { pageNum, pageSize, filters, sorts } = this;
    let data = { pageNum, pageSize, filters, sorts };

    if ($$.isFunction(PageHelper.requestFormat)) {
      data = PageHelper.requestFormat(this);
    }
    return $$.send(url, { data, ...options }).then(resp => {
      if ($$.isFunction(PageHelper.responseFormat)) {
        const newPageInfo = PageHelper.responseFormat(resp);
        return Object.assign(self, newPageInfo);
      }
    })
  }
} 