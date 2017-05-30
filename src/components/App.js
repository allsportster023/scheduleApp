import React from 'react';
import {Link} from 'react-router';
import {version} from '../../package.json';
import AppMain from './AppMain';


const App = ({children}) => (
  <div>
    <header>
      <img className="logoSize" src="../../images/APPdata_logo.png"></img>
    </header>
    <section>
      <AppMain/>
    </section>
  </div>
);

App.propTypes = {children: React.PropTypes.object};

export default App;
