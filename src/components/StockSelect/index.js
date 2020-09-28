import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import Select from 'react-select';

const height = 35;

const MenuList = ({
  options,
  children,
  maxHeight,
  getValue
}) => {
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
};

MenuList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  maxHeight: PropTypes.number,
  getValue: PropTypes.func
};

MenuList.defaultProps = {
  options: [],
  children: '',
  maxHeight: 500,
  getValue: () => {}
};

const StockSelect = ({
 data,
 onChange,
 loading,
 ...props
}) => {
  return (
    <Select
      components={{ MenuList }}
      options={data}
      formatOptionLabel={option => (
        <div>
        {`${option.displaySymbol} | ${option.description}`}
        </div>
      )}
      onChange={onChange}
      isLoading={loading}
      styles={{
        control: (styles, select) => ({
          ...styles,
          borderWidth: '0 0 2px 0',
          borderColor: '#000',
          borderRadius: '4px 4px 0 0',
          backgroundColor: 'transparent',
          boxShadow: select.isFocused ? 0 : 0,
          minHeight: '40px'
        }),
      }}
      isClearable
      isMulti
      {...props}
    />
  );
};

StockSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  onChange: PropTypes.any
};

StockSelect.defaultProps = {
  data: [],
  onChange: () => {}
};

export default StockSelect;
