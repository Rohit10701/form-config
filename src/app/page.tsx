'use client'
import { useFormContext } from '@/context/form-context'
import { useEffect, useState } from 'react'
import { FormConfig } from '@/types/form'
import { FieldValue, useWatch } from 'react-hook-form'
import useFormWatch from '@/hooks/use-form-watch'
import { z } from 'zod'
import DynamicForm from '@/components/form/_index'
import testFormConfig from '@/utils/constant'

type FormType = {
	email: string
	email2: string
	username: string
}
const formConfig2: FormConfig<FormType> = {
	form: {
		id: '1',
		submitText: 'submit',
		onSubmit: (data) => {
			console.log(data)
		}
	},
	fields: [
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			required: true,
			placeholder: 'Email',
			value: 'rohit@gmail.com'
		},
		{
			name: 'email2',
			label: 'Email2',
			type: 'email',
			placeholder: 'Email2',
			value: ''
		},
		{
			name: 'username',
			label: 'Username',
			type: 'text',
			placeholder: 'Username',
			value: 'rohit',
			required: true,
			dependency: {
				on: ['email', 'email2'],
				condition: (value) => value.email === 'rohit@gmail.com'
			}
		}
	]
}

const Home = () => {
	const { forms, getFormValue } = useFormContext()

	const defaultValues = {
		email: 'rohit@kumar.com'
	}
	// const value  = useFormWatch("2")
	const handleClick = (id: string) => {
		const value = getFormValue(id, 'username')
		console.log({ value })
	}
	// console.log({value})
	return (
		<>
			{/* <button onClick={() => handleClick('1')}>Click</button>
			<DynamicForm
				id='1'
				config={formConfig1}
			/> */}

			<DynamicForm
				id='2'
				config={formConfig2}
				defaultValues={defaultValues}
			/>
		</>
	)
}

export default Home

const formConfig3: FormConfig<any> = {
	form: {
		id: '1',
		submitText: 'submit',
		onSubmit: (data) => {
			console.log('form2', data)
		}
	},
	fields: [...testFormConfig]
}

const form2Schema = z.object({
	email: z.string().email(),
	email2: z.string().email().optional().or(z.literal('')),
	username: z.string().min(4).optional()
})
