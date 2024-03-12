import FilterPanel from '@/components/ui/FilterPanel/FilterPanel';
import GroupList from '@/components/ui/GroupList/GroupList';
import { ReactNode } from 'react';
import styles from './Groups.module.css'

const Groups = (): ReactNode => {
	return (
		<div className={styles.groups}>
			<FilterPanel />
			<GroupList />
		</div>
	);
};

export default Groups;
