# fuse
Easier but creative way of JavaScript form validation

```javascript
var rulelist = [{
  rule:"AND",
  param:[{
    'require','email'
  }],
  message:'required and email-address-like is allowed'
},{
  rule:'range',
  param:[6,30],
  message:'watch the size of text'
}]

fuse.check(rulelist)

```
