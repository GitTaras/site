import React, { useState } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import PropTypes from 'prop-types';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './Sidebar.sass';
import image from '../../constants/images';

const Sidebar = (props) => {
  const { location, history, user } = props;
  const [expanded, setShow] = useState(false);
  const buyer = user && user.role === 'buyer';
  const creative = user && user.role === 'creative';
  return (
    <SideNav
      expanded={expanded}
      onToggle={() => setShow(!expanded)}
      onSelect={(selected) => {
        const to = `/dashboard/${selected}`;
        if (location.pathname !== to) {
          history.push(to);
        }
        setShow(false);
      }}>
      <SideNav.Toggle />
      <SideNav.Nav>
        <NavItem eventKey="active">
          <NavIcon>
            <img src={image.square} alt="square" className="icon"/>
          </NavIcon>
          <NavText>
            Active contests
          </NavText>
        </NavItem>
        {buyer
        && (
        <NavItem eventKey="inactive">
          <NavIcon>
            <img src={image.checkBox} alt="checkBox" className="icon" />
          </NavIcon>
          <NavText>
            Completed contests
          </NavText>
        </NavItem>
        )}
        {buyer
        && (
        <NavItem eventKey="packageGroup">
          <NavIcon>
            <img src={image.package} alt="checkBox" className="icon" />
          </NavIcon>
          <NavText>
            Packages
          </NavText>
        </NavItem>
        )}
        {buyer
        && (
        <NavItem eventKey="draft">
          <NavIcon>
            <img src={image.flask} alt="checkBox" className="icon" />
          </NavIcon>
          <NavText>
            Drafts
          </NavText>
        </NavItem>
        )}
        {creative
        && (
        <NavItem eventKey="entries">
          <NavIcon>
            <img src={image.bookmark} alt="checkBox" className="icon" />
          </NavIcon>
          <NavText>
            My entries
          </NavText>
        </NavItem>
        )}
        {creative
        && (
        <NavItem eventKey="favorite">
          <NavIcon>
            <img src={image.heart} alt="checkBox" className="icon" />
          </NavIcon>
          <NavText>
            Favorite contests
          </NavText>
        </NavItem>
        )}
        <NavItem eventKey="account">
          <NavIcon>
            <img src={image.briefcase} alt="briefcase" className="icon" />
          </NavIcon>
          <NavText>
            Account
          </NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

Sidebar.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Sidebar;
