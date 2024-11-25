# scrolling top and bottom project

# Creating the Reference:
const bottomRef = useRef(null);

useRef(null) initializes bottomRef with null.

After the component mounts, bottomRef.current will point to the div element it is assigned to.

# Assigning the Reference:
<div ref={bottomRef}></div>
This div will be referenced by bottomRef. React will update bottomRef.
current to point to this div after the component renders.

# Scrolling to the Element:
function handleScrollToBottom() {
  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}

When handleScrollToBottom is called, it checks if bottomRef.current is not null.

If it points to the div, bottomRef.current.scrollIntoView({ behavior: 'smooth' }) is called.

The scrollIntoView method scrolls the div into the visible area with a smooth scrolling animation.

# summary to scroll bottom 
const bottomRef = useRef(null);

function handleScrollToBottom() {
  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}

// In your render method/component return:
<div ref={bottomRef}></div>


# scrolling to the top

  function handleScrollToTop(){
    window.scrollTo({
      top:0, left:0, behavior:'smooth'
    })
  }


  # Nov 25 2024 Dallas,tx

  # Bisrat