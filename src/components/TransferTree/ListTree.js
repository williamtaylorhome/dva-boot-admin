import React from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import { Tree, Spin } from 'antd';

function noop() {}

export default class ListTree extends React.Component {
  static defaultProps = {
    dataSource: [],
    titleText: '',
    treeKey: 'key',
    treeTitleKey: 'title',
    showSearch: false,
    handleClear: noop,
    handleFilter: noop,
    handleSelect: noop,
    handleSelectAll: noop
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    treeData: PropTypes.array,
    selectedKeys: PropTypes.array,
    showSearch: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
    titleText: PropTypes.string,
    treeKey: PropTypes.string,
    treeTitleKey: PropTypes.string,
    style: PropTypes.object,
    handleClear: PropTypes.func,
    notFoundContent: PropTypes.string,
    filter: PropTypes.string,
    handleFilter: PropTypes.func,
    render: PropTypes.func,
    loading: PropTypes.bool,
    flatTreeData: PropTypes.array
  };

  state = {
    expandedKeys: [],
    autoExpandParent: true,
    searchList: []
  };

  handleFilter = value => {
    this.renderFilterResult(value);
    this.props.handleFilter(value);
  };

  handleClear = () => {
    this.renderFilterResult('');
    this.props.handleFilter('');
  };

  renderTreeNodes = data => {
    const { treeKey, treeTitleKey, render } = this.props;

    return data.map(item => {
      const treeProps = {
        ...item,
        key: item[treeKey],
        title: render ? render(item) : item[treeTitleKey],
        dataRef: item
      };

      if (item.children) {
        return (
          <Tree.TreeNode {...treeProps}>
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode {...treeProps} />;
    });
  };

  renderFilterResult = filter => {
    const { flatTreeData, treeTitleKey, asyncSearch } = this.props;
    if (asyncSearch) {
      const promise = asyncSearch(filter);
      if (promise.then) {
        promise.then(listItem => {
          this.setState({
            searchList: listItem
          });
        });
      }
    } else {
      this.setState({
        searchList: flatTreeData.filter(
          item => item[treeTitleKey].indexOf(filter) >= 0
        )
      });
    }
  };

  renderSearchItem = searchList => {
    const { render } = this.props;

    return searchList.map((item, index) => (
      <li
        className="list-comp-item"
        title={item[this.props.treeTitleKey]}
        key={item[this.props.treeKey]}
        onClick={() => this.handleSelect({ ...item, dataRef: item })}
      >
        <span className="list-comp-item-body">
          {render ? render(item) : item[this.props.treeTitleKey]}
        </span>
      </li>
    ));
  };

  handleSelect = selectedItem => {
    const { selectedKeys, selectedNodes, treeKey } = this.props;
    let _selectedNodes = selectedNodes ? [...selectedNodes] : [];

    if (
      selectedKeys &&
      selectedKeys.some(key => key === selectedItem[treeKey])
    ) {
      _selectedNodes = _selectedNodes.filter(
        item => item[treeKey] !== selectedItem[treeKey]
      );
    } else {
      _selectedNodes.push(selectedItem);
    }
    this.props.onTreeSelected(_selectedNodes);
  };

  onSelect = (_selectedKeys, info) => {
    const {
      selectedNodes,
      selectedKeys,
      loadData,
      onTreeSelected,
      treeKey,
      treeTitleKey
    } = this.props;
    if (info.selected && info.node.props.dataRef) {
      if (loadData && !info.node.props.dataRef.isLeaf) {
        return;
      } else if (
        info.node.props.dataRef.children &&
        info.node.props.dataRef.children.length
      ) {
        this.onExpand([info.node.props.eventKey], info);
        return;
      }
    }

    let targetNodes = info.selectedNodes.map(node => ({
      [treeKey]: node[treeKey],
      [treeTitleKey]: node[treeTitleKey],
      // ... node.props,
      ...node.dataRef
    }));

    // If the data is asynchronous, it needs to be stitched and deduplicated with the old data
    if (loadData) {
      let _selectedNodes = selectedNodes ? [...selectedNodes] : [];
      if (!info.selected) {
        // If the tree node is deselected, it is filtered out first
        _selectedNodes = _selectedNodes.filter(
          item => item[treeKey] !== info.node.props.eventKey
        );
      }
      const newNodes = selectedKeys
        ? _selectedNodes.concat(
            targetNodes.filter(item => selectedKeys.indexOf(item[treeKey]) < 0)
          )
        : targetNodes;
      onTreeSelected(newNodes);
    } else {
      onTreeSelected(targetNodes);
    }
  };

  onExpand = (expandedKeys, info) => {
    if (info.event && info.node.props.children) {
      let concatKeys = [
        expandedKeys,
        this.state.expandedKeys
      ].reduce((prev, next) =>
        prev.filter(item => next.indexOf(item) === -1).concat(next)
      );

      if (
        this.state.expandedKeys.some(item => item === info.node.props.eventKey)
      ) {
        concatKeys = concatKeys.filter(
          item => item !== info.node.props.eventKey
        );
      }

      this.setState({ expandedKeys: concatKeys, autoExpandParent: false });
    } else {
      this.setState({ expandedKeys, autoExpandParent: false });
    }
  };

  render() {
    const {
      prefixCls,
      loading,
      treeData,
      titleText,
      loadData,
      filter,
      showSearch,
      style,
      selectedKeys
    } = this.props;

    const { expandedKeys, autoExpandParent, searchList } = this.state;

    let { searchPlaceholder, notFoundContent } = this.props;

    const showTree = (
      <Tree
        loadData={loadData}
        onSelect={this.onSelect}
        onExpand={this.onExpand}
        selectedKeys={selectedKeys || []}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        multiple
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );

    return (
      <div className={prefixCls} style={style}>
        <div className={`${prefixCls}-header tree-title`}>{titleText}</div>
        <div
          className={
            showSearch
              ? `${prefixCls}-body ${prefixCls}-body-with-search`
              : `${prefixCls}-body`
          }
        >
          {showSearch ? (
            <div className={`${prefixCls}-body-search-wrapper`}>
              <Search
                prefixCls={`${prefixCls}-search`}
                onChange={this.handleFilter}
                handleClear={this.handleClear}
                placeholder={searchPlaceholder || 'Please enter your search'}
              />
            </div>
          ) : null}
          <div className={`${prefixCls}-body-content tree-content`}>
            {filter ? (
              <ul className="tree-filter-result">
                {this.renderSearchItem(searchList)}
              </ul>
            ) : null}
            {treeData.length ? (
              showTree
            ) : (
              <div className={`${prefixCls}-body-content-not-found`}>
                {loading ? (
                  <Spin spinning={loading} />
                ) : (
                  notFoundContent || 'The list is empty'
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
