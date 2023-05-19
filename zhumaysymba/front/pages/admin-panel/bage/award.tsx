import { SetStateAction, useState } from 'react';
import { Card, Button, Typography } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const users = ["Alice","Bob","Charlie", "David", "Emma", "Frank", "George", "Helen",  "Ivan", "John","Alice","Bob","Charlie", "David", "Emma", "Frank", "George", "Helen",  "Ivan", "John","Alice","Bob","Charlie", "David", "Emma", "Frank", "George", "Helen",  "Ivan", "John"];
const rewards = [ "Gold medal", "Silver medal", "Bronze medal", "Platinum trophy", "Gold trophy", "Silver trophy", "Bronze trophy"];

const EventForm = () => {
	const [selectedUser, setSelectedUser] = useState('');
	const [selectedReward, setSelectedReward] = useState('');

	const handleUserChange = (event: { target: { value: SetStateAction<string>; }; }) => {
		setSelectedUser(event.target.value);
	};

	const handleRewardChange = (event: { target: { value: SetStateAction<string>; }; }) => {
		setSelectedReward(event.target.value);
	};

	return (
		<Card color="white" className="p-8 max-w-md mx-auto rounded-lg">
			<Typography variant="h4" className="text-center mb-6">
				Add Badge
			</Typography>
			<Typography className="text-center mb-8">
				Enter your details to give badge.
			</Typography>
			<form className="flex flex-col gap-6">
				<Select
					value={selectedUser}
					onChange={handleUserChange}
					displayEmpty
					color="primary"
				>
					<MenuItem value="" disabled>
						Select user
					</MenuItem>
					{users.map((user) => (
						<MenuItem key={user} value={user}>
							{user}
						</MenuItem>
					))}
				</Select>
				<Select
					value={selectedReward}
					onChange={handleRewardChange}
					displayEmpty
					color="primary"
				>
					<MenuItem value="" disabled>
						Select reward
					</MenuItem>
					{rewards.map((reward) => (
						<MenuItem key={reward} value={reward}>
							{reward}
						</MenuItem>
					))}
				</Select>
				<Button size="large" className="mt-6 bg-blue-400">
					Give badge
				</Button>
			</form>
		</Card>
	);
};

export default EventForm;
