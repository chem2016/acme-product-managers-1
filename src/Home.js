import React from 'react';
import { connect } from 'react-redux';
import { openings } from './utils';

const Home = ({ openings })=> {
  return (
    <div>
      We've { openings ? 'HAVE' : 'DONT HAVE' } openings for Product Managers!
    </div>
  );
};


const mapStateToProps = (state)=> {
  return {
    openings: openings(state) 
  };
};
export default connect(mapStateToProps)(Home);
