<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@department-of-veterans-affairs/va-forms-system-core](./va-forms-system-core.md) &gt; [ArrayField](./va-forms-system-core.arrayfield.md)

## ArrayField variable

The ArrayField accepts a template and a schema and renders them for each entry in whichever array field is specified in props.name. This component provides a wrapper so end users do not have to manage looping through their array, or working with Formik helpers, instead allowing them to just focus on what their React components will look like.

<b>Signature:</b>

```typescript
ArrayField: <T extends Record<string, unknown>>(props: ArrayFieldProps<T>) => JSX.Element
```