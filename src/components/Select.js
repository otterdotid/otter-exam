import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ data, label, ...props }) => {
  return (
    <React.Fragment>
      <label>{label}</label>
      <select {...props} defaultValue='-'>
        <option defaultValue='-' disabled>
          -
        </option>
        {data ? (
          data.map((list) => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))
        ) : (
          <option value='null'>No data available</option>
        )}
      </select>
    </React.Fragment>
  );
};

Select.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string,
};

export default Select;
