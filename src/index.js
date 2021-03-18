import React, { useState } from 'react';
// { useState } needs to be added in order to later use inside our code, wich will be explained later
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
// import ConditionalStyle from './Components/conditional-styling';
// import React, { useState } from 'react';


// This will create a div with text in it
const render = () => {
  ReactDOM.render(        // Function responsible for rendering stuff. Takes two parameters: what to render, and where to render it to
    React.createElement(  // Creates a React element
      'div',              // Creates a React div element
      null,               // ..With no attributes (null)
      'Hello React',      // .. With a "child" saying Hello React
      React.createElement('input', null), // Creates an input tag with no attributes
      React.createElement('pre', null, new Date().toLocaleTimeString()) // created a time
    ),
    document.getElementById('mountNode') // 2nd parameter for ReactDOM.render(). This appends it to index.html with an ID of 'mountNode'
  );
};

// NOTE!! React is smart, and only refreshes what needs to be. In this case, only the element tag of "pre" is refreshed every second
setInterval(render, 1000); // Runs the function every second



// This will make a save button with no functionality
function Button(props) { // makes a function that takes props (short for properties) as a parameter
  return React.createElement( // Creates a button element
    "button",
    { type: "submit", class: "button" }, // Assigns a type and ID to said button
    props.label,
    // Allows it to inherit its own label. This allows each button to have its own assigned label that will not be the same for all buttons
  );
}

ReactDOM.render( // renders the button function to the element for a ID of mountNode2
  React.createElement(Button, { label: "Save", }), // This button has its own label. 
  document.getElementById('mountNode2')
);



// Creates a random number generator.
const RandomValue = () => ( // Within JSX, only expressions can be inside curly brackets
  <div>
    { Math.floor(Math.random() * 100)} is my random number!
  </div>
);

ReactDOM.render(<RandomValue />, document.getElementById('mountNode3')); // renders the JSX element to the element with an ID of mountNode2. This needs the "<>" around since it isn't a function



// Displays a custom error message

// JavaScript object literals are also expressions 
const ErrorDisplay = ({ message }) => ( // JS objects can be inside curly brackets 
  // Creates a custom error message with inline CSS, which needs double curly brackets
  // "{{ }}"
  <div style={{ color: 'red', backgroundColor: 'yellow' }}>
    {message}
  </div>
  // This uses an object "{message}" as its value which will be defined later
);

ReactDOM.render(
  <ErrorDisplay
    message="These aren't the droids you're looking for..." // when this renders, this will be its inner html because again, {message} is defined by the actual variable
  />,
  document.getElementById('mountNode4')
);




// Creates text with randomized colors and backgrounds using a random number generator
class ConditionalStyle extends React.Component {
  render() {
    return (
      // Another example of using object literals to use inline CSS
      <div style={{ color: Math.random() < 0.5 ? 'green' : 'red' }}>
        This text will be green about 50% of the time, and red for the remainder!
      </div>
    );
  }
}

ReactDOM.render(
  <ConditionalStyle />,
  document.getElementById('mountNode5'),
);



// Creates a button that, when clicked, displays its value and adds 1 to it
const OnclickButton = () => {
  // "useState", "useCallback", and other functions that begin with "use" are hooks
  
  // The useState function returns an array with exactly 2 items. The first item is a value (getter) which can be a string, number, array, or other types. 
  
  // The second item is a function (setter) which will change the value of the state element when invoked (and it will trigger DOM processing if needed). This is helpful to track state updates and trigger virtual DOM diffing and real DOM reconciliation
  const [count, setCount] = useState(0);
  // we needed to initialize that number with 0 to start our counter at 0 

  // [name, setName] is the conventional setup

  return (
    // Unlike the DOM version of the onClick attribute (which uses a string) the React’s onClick attribute uses a function reference. You specify that inside curly brackets.
    <button onClick={() => setCount(count + 1)} className="button">
      {count}
    </button>
  );
};

ReactDOM.render(<OnclickButton />, document.getElementById('mountNode6'));




// HOW TO RENDER MULTIPLE ELEMENTS
// const Display = () => (
//   <pre>COUNT VALUE HERE...</pre>
// );

// // METHOD 1:
// ReactDOM.render(
//   <div>
//     <Button />
//     <Display />
//   </div>,
//   document.getElementById('mountNode7')
// );

// // METHOD 2:
// ReactDOM.render([<Button />, <Display />], document.getElementById('mountNode7'));

// // METHOD 3:
// ReactDOM.render(
//   <React.Fragment>
//     <Button />
//     <Display />
//   </React.Fragment>,
//   document.getElementById('mountNode7')
// );

// // METHOD 4:
// ReactDOM.render(
//   <>
//     <Button />
//     <Display />
//   </>,
//   mountNode
// );





// This will create 3 buttons that have their own click value, separate from the previous button

// Every time you define a variable in your code you will be introducing a state and every time you change the value of that variable you are mutating that state. Keep that in mind.

// Function to create the button with an onClick function
const IncrementButton = ({ clickValue, clickAction }) => {
  return (
    // Allows a button to be made with an onClick function & its own custom clickValue
    <button className="button" onClick={() => clickAction(clickValue)}> 
      +{clickValue}
    </button>
  );
};

// this creates a div to display the content
const Display = ({ content }) => ( 
  <pre>{content}</pre>
);

// Since this new parent component will host a Display with a Button that increments the displayed count, we can think of it as the count value manager. 
const CountManager = () => {
  // Both IncrementButton & Display need access to "useState(0)". This allows us to "flow" data from parent to child using component props. Display will display the current state, and the button will update it.
  const [count, setCount] = useState(0);

  // Since the count state element is now in the CountManager component, we need a function on that level to handle updating it.
  const incrementCounter = (increment) => 
    setCount(count + increment);

  return (
    // To make something customizable in a React component we introduce a new prop (which the parent component can control) and make the component use its value. For our example, we can make the Button component receive the amount to increment (1, 5, 10) as a new prop. 
    <div>
      <IncrementButton clickAction={incrementCounter} clickValue={1} />
      <IncrementButton clickAction={incrementCounter} clickValue={5} />
      <IncrementButton clickAction={incrementCounter} clickValue={10} />
      <Display content={count} />
    </div>
    // The Button component does not need to be aware of the meaning of its click event. It just needs to pass this clickValue along when its click event is triggered. 
  );
}

ReactDOM.render(<CountManager />, document.getElementById('mountNode7'));




// Creates a text area with a character counter
const CharacterCounter = () => {
  // inputValue is the value, which is set to be blank because of "useState('')". 
  // setInputValue is what is going to change the inputValue
  const [inputValue, setInputValue] = useState(''); 
  
  // Function that sets up variables to be used
  const handleChange = (event) => {
    const element = event.target; // element if the targeted element
    setInputValue(element.value); // setInputValue is going to be the "value" of the element variable
  };
  
  return (
    <div>
      <textarea cols={80} rows={10} value={inputValue} onChange={handleChange} />
      <div>Character Count: {inputValue.length}</div>
    </div>
    // the value of the text area is the inputValue so that React can track it
    // {inputValue.length} is the literal length of the tracked inputValue, giving us the counter
    // onChange is an eventHandler, which is set to run the handleChange. This means the function will run every time the element "changes", giving us a constant update of the word count.
  );
};

ReactDOM.render(<CharacterCounter />, document.getElementById('mountNode8'));



reportWebVitals();