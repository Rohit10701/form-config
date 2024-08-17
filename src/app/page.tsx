'use client'
import { useFormContext } from '@/context/form-context'
import { useEffect, useState } from 'react'
import { FormConfig } from '@/types/form'
import { useWatch } from 'react-hook-form'
import useFormWatch from '@/hooks/use-form-watch'
import { z } from 'zod'
import testFormConfig from '@/utils/constant'
import DynamicForm from '@/components/form/_index'

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
			value: 'rohit@gmail.com'
		}
	]
}
const formConfig2: FormConfig<any> = {
	form: {
		id: '1',
		submitText: 'submit',
		onSubmit: (data) => {
			console.log('form2', data)
		}
	},
	fields: [
		{
			name: 'username',
			label: 'Username',
			type: 'text',
			placeholder: 'Username',
			value: 'rohit',
			dependency: {
				on : ["email", "email2"], 
				condition: (value) => value.email === "rohit@gmail.com" && value.email2 === "rohit@gmail.com"
			}
		},
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			required: true,
			placeholder: 'Email',
			value: 'rohit@gmail.com',
		},
		{
			name: 'email2',
			label: 'Email2',
			type: 'email',
			required: true,
			placeholder: 'Email2',
			value: 'rohit@gmail.com'
		}
	]
}
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
	email2: z.string().email().optional(),
	username: z.string().min(4)
  })

const Home = () => {
	const { forms, getFormValue } = useFormContext()
	const value  = useFormWatch("2")
	const handleClick = (id: string) => {
		const value = getFormValue(id, 'username')
		console.log({ value })
	}

	console.log({value})
	


	return (
		<>
			{/* <button onClick={() => handleClick('1')}>Click</button>
			<DynamicForm
				id='1'
				config={formConfig1}
			/> */}
			<button onClick={() => handleClick('2')}>Click</button>

			<DynamicForm
				id='2'
				config={formConfig3}
				// schema={form2Schema}
			/>
		</>
	)
}

export default Home
