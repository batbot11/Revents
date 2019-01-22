import React from "react";
import {Form, Label, Select} from "semantic-ui-react";

const SelectInput = ({input, type, placeholder, multiple, options, meta: {touched, error}}) =>
(
    <Form.Field error={touched && !!error} >
        <Select  value={input.value || null}
        options={options}
        onChange={(e,data)=> input.onChange(data.value)}
        multiple={multiple}
        placeholder={placeholder}
        />
        {touched && error && <Label basic color='red'>{error}</Label>}
    </Form.Field>
);

export default SelectInput;