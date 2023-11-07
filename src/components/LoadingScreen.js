import React from 'react';
import ReactLoading from 'react-loading'

const LoadingScreen = () => {
  return (
    <div className='loading-screen'>
      
      <ReactLoading
        type={"cylon"}
        color={"#03fc4e"}
        height={150}
        width={150}
      />
      
    </div>
  );
}

export default LoadingScreen;
