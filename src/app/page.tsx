'use client'
import DynamicForm from '@/components/form/dynamic-form'
import { useFormContext } from '@/context/form-context'
import { useEffect, useState } from 'react'
import { FormConfig } from '@/types/form'

const formConfig1: FormConfig<any> = {
	form: {
		id: '1',
		submitText: 'submit',
		onSubmit: (data) => {
			console.log('form1', data)
		}
	},
	fields: [
		{
			name: 'username',
			label: 'Username',
			type: 'text',
			required: true,
			placeholder: 'Username',
			value: 'rohit'
		},
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			required: true,
			placeholder: 'Email',
			value: 'hello@sadds'
		}
	]
}

const Home = () => {
	const { forms, getFormValue, watchFormValue } = useFormContext()

	const handleClick = (id: string) => {
		const value = getFormValue(id, 'username')
		console.log({ value })
	}

	useEffect(() => {
		const subscription = watchFormValue("1", ["username"], (values) =>
			console.log(values)
		)
		return () => subscription()
	}, [watchFormValue])
	


	return (
		<>
			<button onClick={() => handleClick('1')}>Click</button>
			<DynamicForm
				id='1'
				config={formConfig1}
			/>
			<button onClick={() => handleClick('2')}>Click</button>

			<DynamicForm
				id='2'
				config={formConfig1}
			/>
		</>
	)
}

export default Home
