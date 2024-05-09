import PageInfo from './PageInfo';
import config from '@/config';

/**
 * Universal pagination assistant
 */
export default class　PageHelper {
  static create = () => {
    const pageInfo = new PageInfo();
    return pageInfo;
  }

  /**
   * You can set this function to format the parameters sent to the backend
   * 
   * For example, the parameters required for the back-end paging interface are:
   * {
   *    currentPage: 1,
   *    showCount: 10,
   *    paramMap: {name: 'jonn'}
   * }
   * Pagination information can be formatted by setting this parameter
   * 例如：
   * pageHelper.requestFormat(({pageNum, pageSize}) => ({
   *  currentPage: pageNum,
   *  showCount: pageSize
   * }))
  */
  static requestFormat(pageInfo) {
    return config.pageHelper.requestFormat(pageInfo);
  };
   

  /**
   * Format the data that is reversed from the server and place it in the PageInfo object.
   * Prepare for the next pagination
   * page pageNum;
     number of pages per pageSize;
     the number of current pages size;
     total number of records;
     Total Pages;
     result set list;
   * @param {object} resp
  */
  static responseFormat(resp) {
    return config.pageHelper.responseFormat(resp);
  }
}