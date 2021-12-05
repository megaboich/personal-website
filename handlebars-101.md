### Handlebars syntax 101.

https://handlebarsjs.com/guide/expressions.html

### Partials

https://handlebarsjs.com/guide/partials.html#partials

The syntax `{{>name}}` is for partials.

`{{{name}}}` is for including data without escaping it. If you wanted the data to be escaped, you'd use `{{name}}`.

### Partial blocks
The normal behavior when attempting to render a partial that is not found is for the implementation to throw an error. If failover is desired instead, partials may be called using the block syntax.
Block syntax may also be used to pass templates to the partial.

https://handlebarsjs.com/guide/partials.html#partial-blocks

```
{{#>head-bottom-content}}
{{/head-bottom-content}}
```


### Inline partials

https://handlebarsjs.com/guide/partials.html#inline-partials

```
{{#*inline "myPartial"}}
  My Content
{{/inline}}
```

