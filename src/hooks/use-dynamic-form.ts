import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useFormContext } from '../context/form-context'
import { FormConfig, Option } from '../types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodType } from 'zod'

const useDynamicForm = <T extends Record<string, unknown>>(
	id: string,
	config: FormConfig<T>,
	schema: ZodType<any, any, any>
) => {
	const { addForm } = useFormContext<T>()
	const methods = useForm<T>(
		schema ? { shouldUnregister: true, resolver: zodResolver(schema) } : { shouldUnregister: true }
	)

	useEffect(() => {
		addForm(id, methods)
	}, [id, methods])

	return { ...methods, config }
}

export default useDynamicForm
