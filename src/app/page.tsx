"use client"
import DynamicForm from "@/components/form/dynamic-form";
import { FormProvider, useFormContext } from "@/context/form-context";
import { FormConfig } from "@/types/form";
import { useEffect, useState } from "react";

const formConfig1: FormConfig<any> = {
  form: {
		id: "1",
		submitText: "submit",
		onSubmit: (data)=>{console.log("form1", data)}
	},
  fields: [
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
  ],
};

const formConfig2: FormConfig<any> = {
  form: {
		id: "2",
		submitText: "submit",
		onSubmit: (data)=>{console.log("form2", data)}
	},
  fields: [
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
  ],
};

const Home = () => {
  const {  getFormValue, watchFormValue } = useFormContext();
  // useEffect(() => {
  //   setFormValue('form2', 'password', '123');
  // }, [setFormValue]);

  const handleChange = () => {
    console.log(getFormValue("form1", "username"))
  }
  const [state, setState] = useState()
  const handleSomething = value => {
handleSomething
  }
  const value = watchFormValue("form1", "username")
  console.log(value)
  return (
    <>
    <button onClick={handleChange}>Click</button>
      <DynamicForm id="form1" config={formConfig1} handler={handleSomething}/>
      <DynamicForm id="form2" config={formConfig2} />
    </>
  );
};

export default Home;


