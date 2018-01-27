import React from 'react';
import { NavLink } from 'react-router-dom';
import PageViewer from './PageViewer';

import Simple from './Simple';
import Trane from './Trane';

const pages = [
  {
    name: 'Simple',
    component: Simple,
    url: 'Simple/index',
    slug: 'webgl_simple',
  },
  {
    name: 'Trane',
    component: Trane,
    url: 'Trane/index',
    slug: 'trane',
  }
];

const PageBrowser = ({ match }) => {
  const { params } = match;
  const activePage = params.slug && pages.find(page => page.slug === params.slug);
  return (
    <div>
      <div id="panel" className="collapsed">
        <h1><a href="/">john marinelli</a></h1>
        <a onClick={e => { e.preventDefault(); document.querySelector('#panel').classList.toggle('collapsed'); }}id="expandButton" href="#">
          <span></span>
          <span></span>
          <span></span>
        </a>
        <div id="navContent">
          <div>
            <h2>webgl</h2>
            {pages.map((page, index) => {
              if (page.separator) {
                return (<h2 key={index}>{page.name}</h2>);
              }

              if (page.advanced) {
                return (<div key={index}>
                  <a href={page.page} target="blank">{page.name}</a> (new tab)
                </div>);
              }

              return (<NavLink
                to={`/${page.slug}`}
                key={index}
                className="link"
                activeClassName="selected"
              >
                {page.name}
              </NavLink>);
            })}
          </div>
        </div>
      </div>
      <PageViewer page={activePage} />
    </div>
  );
};

PageBrowser.propTypes = {
  match: React.PropTypes.object.isRequired,
};

export default PageBrowser;
