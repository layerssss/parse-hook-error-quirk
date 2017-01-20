# parse-hook-error-quirk

When a hook yields an error in `beforeSave` hook. The change to an object is not applied. Call `Query.find` in browser again. API from parse-server are returning unchanged attributes of the object. But the `Query.find` is returning the changed obect.

Expect: `Query.find` should return the unchanged object.

Parse-server version: 2.3.2

Parse-JS-SDK: 1.9.2

## To run

```
npm install && node main.js
open http://localhost:3000/
# then open console
```

![image](https://cloud.githubusercontent.com/assets/1559832/22132030/555ead9c-df1c-11e6-9813-db06279aefd2.png)
