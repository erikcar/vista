import { Form } from "antd";
import React from "react";

export default function Validator({ schema, children }) {
  if (schema && children.type.Item && children.type.Item.name === "FormItem") {
      console.log("VALIDATOR IS FORM", children.props)
    return (
      <Form {...children.props}>
        {React.Children.map(children.props.children, (child) => {
          console.log(child);

          return child && child.type.name === Form.Item.name && child.props.name && schema.fields[child.props.name]
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  rules: [({ getFieldValue }) => ({validator(_, value) {let obj ={}; obj[child.props.name] = value; return schema.validateAt(child.props.name, obj);},}),],
                },
              })
            : child;
        })}
      </Form>
    );
  } else {
    return(children);
  }
}