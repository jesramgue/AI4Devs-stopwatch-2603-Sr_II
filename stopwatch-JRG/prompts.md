# Stopwatch and Countdown - JRG
Create a stopwatch and countdown. Reference: https://www.online-stopwatch.com/ (see stopwatch.png for design reference).
 ## Tech Stack
 - HTML
 - Vanilla Javascript
 ## Folder structure
 root:
 (folder)stopwatch-JRG
 - index.html
 - script.js
 - styles.css
 - prompts.md (it will include the content of this prompt)
 ## Seeds
 - index.html is - base html
 - stopwatch.png- example screen to follow the style
 ## Functionalities
 - The application is composed by 4 screens (horizontal slider): Main screen (initial screen), Stopwatch and Countodwn and Countdown Set. All of them with white background.
  ### Main screen
    - Is the entry point, it will be shown at start, of index.html, it will include a table with hidden lines with the following elements:
  #### Index table elements
        - At the top the title of the application "Stopwatch and Countdown - JRG" centered white bold text and blue background. It should span horizontally 2 cells.
        - Below the title it will show 2 big buttons centered on the screen (400x300px each) one next to the other.
        - The second button (on the right, 1 table cell) will show a the title "Countdown" (on top) and below that a red arrow pointing down. On click it will show a transtion moving the conteng to the right to show "Countdown Function" screen
        - The arrows of the buttons should follow the same style as described in stopwatch.png
        - At the bottom the empty text, a blue background (same colour as the title). It should span horizontally 2 cells.
  ### Stopwatch Function
     - The screen will show a table with hidden lines with the following elements:
   #### Stopwatch table elements
        - At the top the title of the application "Stopwatch and Countdown - JRG" centered white bold text and blue background. It should span horizontally 2 cells.
        - Below the title it will show a big counter with (800x800px) with the value 00:00:00 (hh:mm:ss) and below at the bottom right of the seconds (000) (miliseconds).
        - Below the counter and miliseconds it will show 2 buttons 400x200px one next to the other.
        - The first one on the left with Green background it will display the text: "Start" bold, centered and black text.
        - The second one on the right with Red background it will display the text: "Clear" bold, centered and black text.
        - At the bottom there will be footer (full-span) with background blue. In this foother, in the left side, will be a green bold arrow pointing to the left, with the text "Back" at the right. The text will be white and bold.
        - On green arrow or "Back" button click it will show a transition moving the content to the left and showing the main page.
        - On "Start" button click, will start counting the time in the counter display including miliseconds, seconds, minutes and hours. The button will turn into another button with the same aspect but with the text "Pause".
        On "Pause" click, will pause the counter, and the button will turn into another button with the same aspect but with a degragated blue background (bright blue on top and dard blue at the bottom) with the text "Continue". On "Continue" click it will show again "Pause" button with the same behaviour described before.
        - On "Clear" button click it will stop the counter and reset the counter back to 00:00:00 and miliseconds to 000
  ### Countdown Function
     - The screen will show a table with hidden lines with the following elements:
   #### Stopwatch table elements
        - At the top the title of the application "Stopwatch and Countdown - JRG" centered white bold text and blue background. It should span horizontally 2 cells.
        - Below the title it will show a big counter with (800x800px) with the value 00:00:00 (hh:mm:ss) and below at the bottom right of the seconds (000) (miliseconds).
        - Below a list of buttons [5,6,7,8,9] with green background and black text. Next to them a button with the same style with the label "Set". Add margin (or padding) of 1px between each button.
        - In the next row below, a list of buttons [0,1,2,3,4] with green background and black text. Next to them a button with grey background and black text with the label "Clear". Add margin (or padding) of 1px between each button.
   ##### Buttons functionalities
            - The numeric buttons will, starting from the right, set the number that it's being pressed until all placeholders (initial 00:00:00 numbers) aren't filled.
            - The "Clear" button will reset the counter to 00:00:00:000
            - "Set" button should show a page like "Stopwatch" screen (see "Coundtown set functionality") but with the counter values set using the numeric buttons. Avoid entering countdown-run screen with 00:00:00.
            - At the bottom there will be footer (full-span) with background blue. In this foother, in the left side, will be a green bold arrow pointing to the left, with the text "Back" at the right. The text will be white and bold.
            - On green arrow or "Back" button click it will show a transition moving the content to the left and showing the main page.
    ###### Countdown set functionality
                - In that new screen the new "Start" button will countdown the time until reaching 00:00:00.
                - The new "Clear" button must stop the countdown and reset it to 00:00:00 and miliseconds to 000.
                - The new "Pause" button will behave exactly the same as Stopwatch screen pasing the countdown.
                - At the bottom there will be footer (full-span) with background blue. In this foother, in the left side, will be a green bold arrow pointing to the left, with the text "Back" at the right. The text will be white and bold.
                - On green arrow or "Back" button click it will show a transition moving the content to the left and showing the Countdown screen.
 ## Mandatory Guidelines
- All screens must follow the same style as the one in the "stopwatch.png" image included
- The solution must be responsive.
- All functionality must be implemented.
- Indexes must be under control, limited the values available, robustize the solution.
- Transitions must be visible
- Follow coding best practices, separation of concerns: script.js for functionality, styles.css for styles and index.html for content structure. Consider adding a new image folder for any additional image you may consider.
- It is not an iterative task; all must be completed at once without any further step.
- Don't guess on the functionality, test it before sending the output.

 ## Output
Compress the whole folder structure into a zip file with the name "Stopwatch-JRG"
