import { Outlet } from "react-router-dom";
import Navbar from '../../components/navbar/index'
import Sidebar from '../../components/sidebar/index'
export default function WebLayout({children}) {

	return (
		<div className="bg-secondary">
			<Navbar className="bg-secondary"/>
			<div className=" w-full  grid grid-cols-5 md:grid-cols-6 sm:grid-cols-1 gap-4">
				<span className="sm:hidden col-span-1 md:col-span-2 "><Sidebar/></span>
				<main className='flex-grow min-h-screen p-5 sm:m-3 col-span-4 md:col-span-4'>
				{children}
				<Outlet /> 
				</main>
			</div>
		
	  </div>
	)
}