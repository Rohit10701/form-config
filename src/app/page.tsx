'use client'
import { useFormContext } from '@/context/form-context'
import { useEffect, useState } from 'react'
import { FormConfig } from '@/types/form'
import { useWatch } from 'react-hook-form'
import useFormWatch from '@/hooks/use-form-watch'
import { z } from 'zod'
import DynamicForm from '@/components/form/_index'
import testFormConfig from '@/utils/constant'

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
				on : ["email", "email2"],
				condition: (value) => value.email === "rohit@gmail.com" && value.email2 === "a"
			}
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
	email2: z.string().email().optional().or(z.literal('')),
	username: z.string().min(4).optional()
})

const Home = () => {
	const { forms, getFormValue } = useFormContext()
	const [toggleDark, setToggleDark] = useState(false)

	const toggleHandler = () => {
		setToggleDark(!toggleDark)
	}
	// const value  = useFormWatch("2")
	const handleClick = (id: string) => {
		const value = getFormValue(id, 'username')
		console.log({ value })
	}

	const result = form2Schema.safeParse({
		email: 'test@example.com',
		email2: ''
	})

	console.log(result)
	// console.log({value})
	return (
		<>
			{/* <button onClick={() => handleClick('1')}>Click</button>
			<DynamicForm
				id='1'
				config={formConfig1}
			/> */}
			<button onClick={toggleHandler}>Toogle theme</button>

			<DynamicForm
				id='2'
				config={formConfig2}
				schema={form2Schema}
				darkMode={toggleDark}
			/>
		</>
	)
}

export default Home
