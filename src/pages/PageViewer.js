import React from 'react';
import sizeMe from 'react-sizeme';

const PageViewer = ({ page, size }) => {
  let sourceButton = null;
  let pageContent = null;

  if (page) {
    const {
      component: PageComponent,
      url,
    } = page;
    pageContent = (<PageComponent width={size.width} height={size.height} />);
    sourceButton = (<div key="src" id="button">
      <a
        href={`https://github.com/toxicFork/react-three-renderer-page/blob/master/src/examples/${url}.js`}
        target="_blank"
      >
        View source
      </a>
    </div>);
  }

  return (
    <div id="viewer">
      {pageContent}
      {sourceButton}
    </div>
  );
};

PageViewer.propTypes = {
  page: React.PropTypes.object,
  size: React.PropTypes.object,
};

export default sizeMe({ monitorHeight: true, refreshRate: 200 })(PageViewer);
