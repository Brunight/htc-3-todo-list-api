import * as Yup from 'yup'

export const createUserSchema = Yup.object().shape({
	name: Yup.string().required(),
	email: Yup.string().required(),
	password: Yup.string().required(),

	confirmPassword: Yup.string()
		.required()
		.test('password-confirmation', 'Passwords must match', (value, context) => {
      return context.parent.password === value
    })
})
