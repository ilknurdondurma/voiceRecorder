import { Outlet } from "react-router-dom";
import Navbar from '../../components/navbar/index'
import Sidebar from '../../components/sidebar/index'
export default function WebLayout({children}) {

	return (
		<div>
			<Navbar className="bg-secondary"/>
			<div className=" w-full  grid grid-cols-5 sm:grid-cols-1 gap-4">
				<span className="sm:hidden col-span-1 md:col-span-2 "><Sidebar/></span>
				<main className='flex-grow min-h-screen m-2 sm:m-3'>
				{children}
				<Outlet /> 
				</main>
			</div>
		
	  </div>
	)
}