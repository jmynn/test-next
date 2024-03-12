import { Group } from '@/types';
import { FunctionComponent, ReactNode, useState } from 'react';
import FriendList from '../FriendList/FriendList';
import styles from './GroupItem.module.css';

type Props = {} & Group;

const GroupItem: FunctionComponent<Props> = ({
	closed,
	members_count,
	name,
	avatar_color,
	friends,
}): ReactNode => {
	const [isVisible, setVisible] = useState<boolean>(false);
	const handleChangeVisible = () => setVisible((prev) => !prev);
	return (
		<li>
			<div className={styles.row}>
				<div className={styles.column}>
				{!!avatar_color && (
						<div className={styles.img}>
							<div
								className={styles.avatar}
								style={{
									backgroundColor: avatar_color,
								}}></div>
						</div>
				)}
				</div>
				<div className={styles.column}>
					<div className={styles.title}>{name}</div>
					<div className={styles.status}>
						Тип группы: {closed ? 'Закрытая' : 'Открытая'}
					</div>
					<div className={styles.count}>
						Кол-во участников: {members_count}
					</div>
					{!!friends && (
						<div className={styles.friends}>
							<div className={styles.count}>
								Кол-во друзей: {friends.length}
							</div>
							<button onClick={handleChangeVisible}>
								Показать друзей
							</button>
							{isVisible && <FriendList friends={friends} />}
						</div>
					)}
				</div>
			</div>
		</li>
	);
};

export default GroupItem;
