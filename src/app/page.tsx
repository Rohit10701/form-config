'use client'
import DynamicForm from '@/components/form/dynamic-form'
import { useFormContext } from '@/context/form-context'
import { FormConfig } from '@/types/form'
import { useEffect, useState } from 'react'

const formConfig1: FormConfig<any> = {
	form: {
		id: '1',
		submitText: 'submit',
		onSubmit: (data) => {
			console.log('form1', data)
		}
	},
	fields: [
		{ name: 'username', label: 'Username', type: 'text', required: true, placeholder :"Username", defaultValue : "rohit" },
		{ name: 'email', label: 'Email', type: 'email', required: true, placeholder : "Username2", defaultValue : "gello world" }
	]
}

const formConfig2: FormConfig<any> = {
	form: {
		id: '2',
		submitText: 'submit',
		onSubmit: (data) => {
			console.log('form2', data)
		}
	},
	fields: [
		{ name: 'password', label: 'Password', type: 'password', required: true },
		{ name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true }
	]
}

const Home = () => {

	return (
		<>
			<DynamicForm
				id='form1'
				config={formConfig1}
			/>
			<DynamicForm
				id='form2'
				config={formConfig2}
			/>
		</>
	)
}

export default Home
