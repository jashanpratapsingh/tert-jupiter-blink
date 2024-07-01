import type { NextApiRequest, NextApiResponse } from "next";
// index.ts
document.addEventListener('DOMContentLoaded', () => {
    // Create a button element
    const button = document.createElement('button');
    button.textContent = 'Click me';
  
    // Create a span to display the click count
    const clickCountDisplay = document.createElement('span');
    clickCountDisplay.textContent = ' Click count: 0';
    
    // Initialize click count
    let clickCount = 0;
  
    // Add an event listener to the button
    button.addEventListener('click', () => {
      clickCount++;
      clickCountDisplay.textContent = ` Click count: ${clickCount}`;
    });
  
    // Append the button and click count display to the body
    document.body.appendChild(button);
    document.body.appendChild(clickCountDisplay);
  });
  