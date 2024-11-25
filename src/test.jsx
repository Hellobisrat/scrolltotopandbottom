

import React, { useRef } from 'react';
import useFetch from './index.jsx'; // Ensure correct path

export default function ScrollToTopAndBottom() {
  const [data, error, pending] = useFetch('https://dummyjson.com/users?limit=10', {}); // Adjust the URL if needed
  const bottomRef =useRef(null)
  if (pending) {
    return <h1>Loading! Please Wait...</h1>;
  }
  if (error) {
    return <h1>Error occurred: {error}</h1>;
  }
 
  function handleScrollToTop(){
    window.scrollTo({
      top:0, left:0, behavior:'smooth'
    })
  }

  function handleScrollToBottom(){
     bottomRef.current.scrollIntoView({behavior:'smooth'})
  }




  return (
    <div>
      <h1>Scroll To Top And Bottom Feature</h1>
      <h3>This is the top section</h3>
      <button onClick={handleScrollToBottom}>Scroll To Bottom</button>
      <ul style={{ listStyle: 'none' }}>
        {data && data.users && data.users.length
          ? data.users.map((item) => (
              <li key={item.id}>{item.firstName} {item.lastName}</li> // Adjust based on the correct property
            ))
          : null}
      </ul>
      <button onClick={handleScrollToTop}>Scroll To Top</button>
      <h3>This is the bottom of the page</h3>
      <div ref={bottomRef}></div>
    </div>
  );
}
