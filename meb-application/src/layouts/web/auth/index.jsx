import { Outlet } from "react-router-dom";
import Navbar from '../../../components/navbar/index'
export default function AuthLayout({children}) {

	return (
		<div className="bg-secondary">
			<Navbar className="bg-secondary"/>
			<div className=" w-full">
				<main className='flex-grow min-h-screen p-5 sm:m-3'>
				{children}
				<Outlet /> 
				</main>
			</div>
		
	  </div>
	)
}