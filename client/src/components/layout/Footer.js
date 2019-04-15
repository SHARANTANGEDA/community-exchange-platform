import React from 'react'

export default () => {
  return (
    <footer className=" text-white mt-5 p-4 text-center " style={{background: 'black', height:'60px'}}>
      Copyright &copy; {new Date().getFullYear()} GhotDen
    </footer>
  );
};
