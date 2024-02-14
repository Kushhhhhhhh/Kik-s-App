import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {

	const { loading, conversations } = useGetConversation()
	console.log(conversations);

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, index) => (
				<Conversation key={conversation._id} conversation={conversation}
				emoji={getRandomEmoji()}
				lastIndex={index === conversations.length - 1}
				/>
			))}
			{loading ? <span className="loading loading-spinner mx-auto"></span>: null}
		</div>
	);
};
export default Conversations;