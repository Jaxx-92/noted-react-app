import React, { lazy } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import ProfileIcon from '../assets/icons/Profile.svg';
import DropwDownIcon from '../assets/icons/InvertedTriangle.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { unsetUser } from '../actions/auth.action';
import { get } from 'lodash';

const BrandLogoSvg = lazy(() => import('./BrandLogoSvg'));

const Topnav = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const pageLocation = history.location.pathname;

  const guestViews = [
    '/',
    '/login',
    '/join',
    '/forgot-password',
    '/reset-password',
    '/request-permission/',
    '/request-permission',
    '/code',
    '/code/',
  ];
  const {
    location: { pathname },
  } = useHistory();
  const user = useSelector(({ auth: { user } }) => user);
  const showShadow = guestViews.includes(pathname) ? '' : 'shadow-sm';

  const logout = async () => {
    try {
      await Auth.signOut();
      dispatch(unsetUser());
      history.push('/login');
    } catch (error) {
      console.log('Error Signing Out: ', error);
    }
  };

  return (
    <Navbar
      expand={`lg ${showShadow}`}
      style={{
        border: 'none',
        backgroundColor: guestViews.includes(pathname) ? '#FAF8FA' : '',
      }}
    >
      <Navbar.Brand
        href={`${guestViews.indexOf(pageLocation) != -1 ? '/' : '/dashboard'}`}
        className='ml-4 mr-1'
      >
        <BrandLogoSvg />
      </Navbar.Brand>
      {['/dashboard', '/view-scan'].includes(pathname) && (
        <>
          <Container className='ml-3'>
            <input
              type='name'
              className='form-control search'
              aria-describedby='name'
              placeholder='Search purchases'
            />
          </Container>
          <div className='row select-dropdown'>
            <div className='col-6'>
              <button className='btn p-0' onClick={logout}>
                <img src={ProfileIcon} />
              </button>
            </div>

            <div className='col-6'>
              <div className='btn p-0'>
                <img src={DropwDownIcon} />
              </div>
            </div>
          </div>
        </>
      )}
    </Navbar>
  );
};

export default Topnav;
