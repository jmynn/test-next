'use client';
import { GroupContext } from '@/providers/GroupProvider';
import { ReactNode, useContext } from 'react';
import GroupItem from '../GroupItem/GroupItem';
import styles from './GroupList.module.css'

const GroupList = (): ReactNode => {
	const {
		data: { data: groups, result },
	} = useContext(GroupContext);
	return (
		<>
			{!!groups && !!result && (
				<ul className={styles.groupList}>
					{groups.map((group) => (
						<GroupItem
							{...group}
							key={`${group.id}_${group.name}_${group.members_count}`}
						/>
					))}
				</ul>
			)}
			{!result && <h1 className={styles.error}>Ничего нет</h1>}
		</>
	);
};

export default GroupList;
