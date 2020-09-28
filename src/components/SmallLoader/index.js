import React from 'react';
import PropTypes from 'prop-types';

import { WrapperStyled } from './style';

const SmallLoader = ({
  customStyles
}) => (
  <WrapperStyled customStyles={customStyles}>
    <div className="loader-wrapper">
      <div className="loader">
        <div className="roller"></div>
        <div className="roller"></div>
      </div>
      
      <div id="loader2" className="loader">
        <div className="roller"></div>
        <div className="roller"></div>
      </div>
      
      <div id="loader3" className="loader">
        <div className="roller"></div>
        <div className="roller"></div>
      </div>
    </div>
  </WrapperStyled>
);

SmallLoader.propTypes = {
  customStyles: PropTypes.string
};

SmallLoader.defaultProps = {
  customStyles: ''
};

export default SmallLoader;
