![skull-coordinates](https://socialify.git.ci/nevan-dsouza/skull-coordinates/image?description=1&descriptionEditable=A%20dentistry%20project%20to%20help%20test%20medical%20students&font=Source%20Code%20Pro&forks=1&language=1&logo=https%3A%2F%2Fi.postimg.cc%2F8CNk0HXS%2FUntitled-design-1.png&name=1&owner=1&pattern=Circuit%20Board&stargazers=1&theme=Dark)

## User Stories

**As a** Teacher,  
**I want to** be able to select any number of skull coordinates by their names,  
**So that** I can generate a unique test for my students to evaluate their understanding of these points.

**Acceptance Criteria:**

* When I log into the application, I should see an option to create a new skull coordinate test.
* When I select this option, I should be presented with a list of all available skull coordinates by their names.
* I should be able to select any number of these points for inclusion in the test.
* After selecting the desired points, I should be able to submit the test, which will then be available for my students. 


**As a** Student,  
**I want to** be presented with the list of skull coordinate names selected by my teacher,  
**So that** I can attempt to plot these points as part of my test.

**Acceptance Criteria:**

* When I log into the application, I should see any available tests created by my teacher.
* Upon selecting a test, I should be presented with the names of the skull coordinates that I need to plot.
* I should be able to plot these points and then submit my test for grading.
* In case I don't plot the right number of coordinates, the application must warn me.
* I must also have the option of undoing a plotted point and not starting all over again.


**As a** Student,  
**I want to** see a comparison between my plots and the teacher's plots, along with the delta differences in the coordinates,  
**So that** I can understand where I made errors and learn from them.

**Acceptance Criteria:**

* After I submit my test, the application should generate a comparison screen.
* On this screen, I should see my plots and the teacher's plots side by side for each skull coordinate in the test.
* For each coordinate, I should also see the delta difference between my plot and the teacher's plot.
* I should have the option to review this comparison as many times as I need to improve my understanding.
## Features

* **Teacher's Section** - automatic accurate plotting
* **Student's Section** - supports manual plotting
* **Comparison feature** - renders final images and compares the coordinates


## Installation

Once you clone this repo and are in the skull-coordinates directory, do the following:

```bash
  npm i && npm start
```
    
## Tech Stack

* **Client:** React, CSS

* **Libraries:** Konva, Lodash


## Future Plans/Additions

* **Landing page:** explain about the application
* **dark mode feature:** accessibility reasons
* **Undo feature for the teacher section:** User-friendly
