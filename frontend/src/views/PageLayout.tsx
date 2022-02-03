import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import MyNavbar from '../components/Navbar';
import MyFooter from '../components/Footer';
import MySidebar from '../components/Sidebar';
import { routes, MyRoute } from '../routes/routes';

class Page extends React.Component {
  componentDidUpdate() {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement != null)
      document.scrollingElement.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  getRoutes = (routes: MyRoute[]) => {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    });
  };

  render() {
    return (
      <div className="main-content">
        <div className="main-content" ref="mainContent">
          <MyNavbar {...this.props} />
          <Switch>{this.getRoutes(routes)}</Switch>
          <Container fluid>
            <MyFooter />
          </Container>
        </div>
      </div>
    );
  }
}

export default Page;
