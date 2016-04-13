# Angular Validators

Basic form validators

#Installing
#### Bower
```javascript
    bower install angular-form-validators
    <script src="bower_components/angular-form-validators/dist/scripts/scripts.js"></script>
```


## Directives
####number-only : directive which accepts only number as input.

*Example*
```html
<input type="text" ng-model="price" number-only decimal-limit=2 negative="true">
```

| Attribute     | type    | Description |
|:--------|:---------|:-------|
| decimal-limit  | `string`/`number`   | decimal limit to limit the input value to specified decimal limits |
| negative | `boolean`(default: false) |  mark true to allow negative values (or - sign) |

*Validator*

| Validator    | Description |
|:--------|:---------|:-------|
| invalidNumber   | sets to true if the number is invalid(if it exceeds the decimal limit or placing of negative sign at invalid places |

*Note*
This directive works even if you copy paste the content and not just on `keypress`

###alphabet-only : directive which accepts only alphabets as input. (a-z and A-Z)

*Example*
```html
<input type="text" ng-model="name" alphabet-only>
```


*Validator*
No validator is being set as this directive limits the entry of characters that doesn't fit in alphabet family

###max-value : directive which checks whether it exceeds the max value specified

*Example*
```html
<input type="text" ng-model="commission" number-only max-value=100>
```

or we can even specify the model
```html
<input type="text" ng-model="price" number-only>
<input type="text" ng-model="commission" number-only max-value="{{price}}">
```

*Validator*

| Validator    | Description |
|:--------|:---------|:-------|
| maxValue   | sets to true if the value exceeds the max value specified |

###min-value : directive which checks whether it is less than the minimum value specified

*Example*
```html
<input type="text" ng-model="pirce" number-only min-value=1>
```

or we can even specify the model
```html
<input type="text" ng-model="commission" number-only>
<input type="text" ng-model="price" number-only min-value="{{commission}}">
```

*Validator*

| Validator    | Description |
|:--------|:---------|:-------|
| minValue   | sets to true if the value is less than the max value specified |

###email-validator : directive which validates the email value

*Example*
```html
<input type="text" ng-model="email" email-validator>
```

*Validator*

| Validator    | Description |
|:--------|:---------|:-------|
| invalidEmail   | sets to true if the email is invalid |

