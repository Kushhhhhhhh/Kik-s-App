import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import useConversation from "../../zustand/useConversation.js";
import useGetConversation from "../../hooks/useGetConversation.js";
import toast from "react-hot-toast";

const SearchInput = () => {

const [search, setSearch] = useState('');
const { setSelectedConversation } = useConversation();
const { conversations } = useGetConversation();

const handleSubmit = (e) => {
	e.preventDefault();
	if(!search) return;
	if(search.length < 3) toast.error('Search term must be at least 3 characters long');

	const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
	if(conversation) {
		setSelectedConversation(conversation);
		setSearch('');
	} else {
		toast.error('No such User found!');
	}
};

	return (
		<form 
		className='flex items-center gap-2' 
		onSubmit={handleSubmit}>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full'
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-5 h-5 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;