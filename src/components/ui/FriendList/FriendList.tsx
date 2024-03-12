import { User } from '@/types';
import { FunctionComponent, ReactNode } from 'react';
import styles from './FriendList.module.css';
import FriendItem from '../FriendItem/FriendItem';

type Props = { friends: User[] };

const FriendList: FunctionComponent<Props> = ({ friends }): ReactNode => {
	return (
		<div className={styles.friends}>
			{!!friends &&
				friends.map((friend, i) => (
					<FriendItem
						key={`${i}_${friend.first_name}_${friend.last_name}`}
						{...friend}
					/>
				))}
		</div>
	);
};

export default FriendList;
