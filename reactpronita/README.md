# REPO FOR PRONITA : AN APP FOR PRODUCT TESTING
## AUTHOR
OLUSHOLA ADEDOKUN

## TABLE OF CONTENTS
- Run the App
- Technology
- Developer's Introduction
- Testing
- Heroku
- CI

## RUN THE App
- install nodejs
- run npm install
- run npm start

## TECHNOLOGY
- Front-end implementation: React, Redux
- APIs implemented        : Google map api, Google place api, Google map geocoding api

## Developer's Introduction
- Dump Component property description
    - Icon : all icons used for this app are mostly from front-awesome, therefore, their naming syntax was adpted, below are the property (props) description
    * icon: suffix of the icon name i.e if icon name is 'fa-star' this property name will only be 'start'
    * size: size of the icon ranges between: lg, md, sm. default size is sm.
    * type: incase of special styling, you can include a type that will be directly applied to the class of the icon

## Testing
- Open project directory on command Line
- run 'npm run test'
- Test runner starts with Jest and enzyme

## Heroku
- run 'npm run build' to create a build folder
- install heroku CLI
- auth heroku CLI
- run 'heroku apps:create'[appname] e.g tourist app
- run 'git add .'
- run 'git commit -m '[commit message]
- run 'git push heroku master'
