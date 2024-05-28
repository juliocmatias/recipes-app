# :hamburger: Welcome RecipeApp Repository :clinking_glasses:

***Responsive Recipes Application for Mobile Devices - Front-End***

## :writing_hand: Summary

***This is a responsive web application for mobile devices, developed during my training at [trybe](https://www.betrybe.com/). Its purpose is to search for food and drink recipes, as well as a page to follow a recipe step by step and favorite it. It also has a login page to access the application.***
***Using the APIs:***
***[Meals](https://www.themealdb.com/api.php) e [Cocktail](https://www.thecocktaildb.com/api.php)***

***This project was developed in a sprint, where my class was divided into a group of 6 people. We had to organize ourselves to deliver the project on time, in addition to trying to maintain organization. In a learning environment this can be tricky, but we can do it. To do this, we use Kanban on Trello and communicate a lot through the Slack application.***

***After we started looking for a challenge, I decided to develop it alone to test my abilities and this was the result.***

## :rocket: ****Technology used****

  ### :speaking_head: ***Kanban Trello***

  <details>
  <summary><strong>See about</strong></summary>

  - *We used Kanban Trello as an agile methodology to better organize the tasks that each person would perform, this gave us an idea of what a real sprint would be like in the workplace.*

    ![Trello](./public/images/Trello.png)

  </details>

<div style="display: inline_block">
  <img align="center" alt="julio-ts" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" title="TypeScript">
  <img align="center" alt="julio-node" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" title="NodeJs">
  <img align="center" alt="julio-react" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" title="React">
  <img align="center" alt="julio-HTML" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" title="HTML">
  <img align="center" alt="julio-CSS" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" title="CSS">
  <img align="center" alt="julio-Vitest" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vitest/vitest-original.svg" title="Vitest">
  <img align="center" alt="julio-Git" height="40" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" title="Git">
</div>

## :desktop_computer: Opening Application

- copy the repository to a local folder using the terminal and passing the command:
  ```bash
  git clone git@github.com:juliomatiastrybe/recipes-app.git
  ```

  If you don't have git installed, you can install it using this command in the shell and bash terminal:

  Debian/Ubuntu bash:
  ```bash
  apt-get install git
  ```

  other kernel follow the instructions on the website [Git](https://git-scm.com/download/linux).

  windows/powershell:
  ```shell
  winget install --id Git.Git -e --source winget
  ```

  Or you can follow the website [git](https://git-scm.com/downloads) documentation for more installation means.

> ### 🔍️ navigate to the folder created in the clone, and open the terminal.
- install the dependencies:
  ```bash
  npm install
  ```
  > This method of installing pending issues only works if the node installation package is npm, if you use another one, just switch to npm for the package used

  you need to have node installed to be able to install the dependency packages
  If you don't have it, you can run the command if your operating system is Linux:
  ```bash
  sudo apt update sudo apt install nodejs sudo apt install npm
  ```

  If not, follow the installation instructions on the [Node.js](https://nodejs.org/en/download) website.

>*:warning: For the application to run correctly, the node version must be >= 16.*

<details> 
  <summary><strong>🌐 Browser</strong></summary>
  

 - *After you have installed the dependencies. In the terminal, open the application in the browser with the command:*

    ```bash
    npm run dev
    ```

    > using this command application will open in the browser. 

</details>

<details>
  <summary><strong>📍 Url</strong></summary>

  *If you want the option to view the application more easily and quickly, click on [APP](https://recipes-app-jcdev-nu.vercel.app/) to see the deployed project*
  
</details>

## :camera_flash: Application

<details>
  <summary><strong>See about</strong></summary>

  - ### :key: Login

    <details>
    <summary><strong>See about</strong></summary>

    ![Login](./public/images/login.png)
    </details>

  - ### :tropical_drink: Drinks

    <details>
    <summary><strong>See about</strong></summary>

    ![Drinks](./public/images/Drinks.png)
    </details>

  - ### :custard: Meals

    <details>
    <summary><strong>See about</strong></summary>

    ![Meals](./public/images/Meals.png)
    </details>

  - ### :information_source: Recipe Infos

    <details>
    <summary><strong>See about</strong></summary>

    ![RecipeInfos](./public/images/RecipeInfos.png)
    </details>

  - ### :eight_pointed_black_star: Started Recipe

    <details>
    <summary><strong>See about</strong></summary>

    ![StartedRecipe](./public/images/StartedRecipe.png)
    </details>

  - ### :white_check_mark: Finish Recipe

    <details>
    <summary><strong>See about</strong></summary>

    ![FinishRecipe](./public/images/FinishRecipe.png)
    </details>

  - ### :ballot_box_with_check: Done Recipes

    <details>
    <summary><strong>See about</strong></summary>

    ![DoneRecipes](./public/images/DoneRecipes.png)
    </details>

  - ### :heart: Favorite Recipes

    <details>
    <summary><strong>See about</strong></summary>

    ![FavoriteRecipes](./public/images/FavoriteRecipes.png)
    </details>

  - ### :bust_in_silhouette: Profile

    <details>
    <summary><strong>See about</strong></summary>

    ![Profile](./public/images/Profile.png)
    </details>

</details>

## :test_tube: Tests


  <details>
    <summary><strong>See about</strong></summary>

  ### :dna: ***Testing Integration Using RTL***

- *The application has integration test coverage, using Vitest with RTL. To see it, simply execute the command in the terminal:*

  ```bash
  npm run test
  ```

  ![Tests](./public/images/Tests.png)

  </details>

## 👊 Authors and acknowledgment

*This project was followed by requirements pre-established by [Trybe](https://www.betrybe.com/), only the implementations are my own.*

- *Although this application, after finishing the evaluation period, I did it alone, a good part of the styling and even some ideas about the codes I got from my teammates who helped me during the development. I leave here a caveat for everyone.*

  [Karina Bezerra](https://www.linkedin.com/in/karina-bezerra-408751200/)\
  [Karine Bueno](https://www.linkedin.com/in/karine-bueno-dev/)\
  [Lucas Costa](https://www.linkedin.com/in/lucascbmelo/)\
  [Leornado Kila](https://www.linkedin.com/in/leonardo-kila-00a9a62a9/)

## 🔒️ License ©️

[ISC](https://choosealicense.com/licenses/isc/)


