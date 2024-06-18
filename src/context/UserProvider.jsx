/* eslint-disable react/prop-types */

import { useState } from 'react';
import { UserContext } from './UserContext';

const UserProvider = ({ children }) => {
	const [registeredUsers, setRegisteredUsers] = useState([
		{
			document: 100,
			email: 'jorge@gmail.com',
			password: 'jorge',
		},
		{
			document: 101,
			email: 'diego@gmail.com',
			password: 'diego',
		},
		{
			document: 102,
			email: 'luisa@gmail.com',
			password: 'luisa',
		},
	]);

	const [user, setUser] = useState();

	const [isLogin, setIsLogin] = useState(false);
	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				setRegisteredUsers,
				registeredUsers,
				setIsLogin,
				isLogin,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
export default UserProvider;
