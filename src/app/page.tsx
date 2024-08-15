'use client'
import DynamicForm from '@/components/form/dynamic-form'
import { useFormContext } from '@/context/form-context'
import { useEffect, useState } from 'react'
import { FormConfig } from '@/types/form'
import { useWatch } from 'react-hook-form'
import useFormWatch from '@/hooks/use-form-watch'

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
	const value  = useFormWatch("1")
	const handleClick = (id: string) => {
		const value = getFormValue(id, 'username')
		console.log({ value })
	}

	console.log({value})
	


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
