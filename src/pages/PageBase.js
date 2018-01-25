import React from 'react';

import PropTypes from 'prop-types';

class PageBase extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };
}

export default PageBase;
