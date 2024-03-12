import { User } from '@/types';
import { FunctionComponent, ReactNode } from 'react';
import styles from './FriendItem.module.css'

type Props = User;

const FriendItem: FunctionComponent<Props> = ({first_name, last_name}): ReactNode => {
	return (
		<div className={styles.friend}>
			<div className={styles.firstName}>{first_name}</div>
			<div className={styles.lastName}>{last_name}</div>
		</div>
	);
};

export default FriendItem;
