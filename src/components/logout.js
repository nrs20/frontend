/*Name: Natalia Smith
Date: 11/30/2023
Course: IT302
Section: 001
Assignment: Unit 11
Email: nrs5@njit.edu
*/
import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = (props) => {
  const history = useHistory();

  const logout = () => {
    localStorage.setItem('userLoggedOut', 'true');
    window.location.reload();
  };

  React.useEffect(() => {
    const isLoggedOut = localStorage.getItem('userLoggedOut') === 'true';

    if (isLoggedOut) {
      localStorage.removeItem('userLoggedOut');
      history.push('/');
    }
  }, [history]);

  return (
    <div>
      <p>Are you sure you want to logout?</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;
