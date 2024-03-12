'use client';
import { GroupContext } from '@/providers/GroupProvider';
import { AllColors, FilterBoolean, FilterSelect } from '@/types';
import axios from 'axios';
import { ReactNode, useContext, useEffect, useState } from 'react';
import styles from './FilterPanel.module.css';

const FilterPanel = (): ReactNode => {
	const { handleChangeFilter, filter } = useContext(GroupContext);
	const [filters, setFilters] = useState<FilterSelect>();

	useEffect(() => {
		const request = async () => {
			const { data }: { data: FilterSelect } = await axios(
				'/api/group/filters'
			);
			setFilters(data);
		};
		request();
	}, []);

	return (
		<div className={styles.filters}>
			<select name='avatarColor' defaultValue={'null'} onChange={({target: {value: targetValue}}) => handleChangeFilter('avatarColor', targetValue === 'null' ? null : targetValue as AllColors)}>
				{!!filters &&
					filters.avatarColor?.map((color, i) => (
						<option
							key={`${i}_${color}`}
							value={color === null ? 'null' : color}>
							{color === null ? 'Все цвета' : (color as string)}
						</option>
					))}
			</select>
			<select name='isClosed' defaultValue={'null'} onChange={({target: {value: targetValue}}) => handleChangeFilter('isClosed', targetValue === 'null' ? null : targetValue as FilterBoolean)}>
				{!!filters &&
					filters.isClosed?.map((closed, i) => (
						<option
							key={`${i}_${closed}`}
							value={`${closed === null ? closed : +closed}`}>
							{closed === null ? 'Закрытые и открытые' : (!!closed ? 'Закрытая' : 'Открытая')}
						</option>
					))}
			</select>
			<select name='hasFriends' defaultValue={'null'} onChange={({target: {value: targetValue}}) => handleChangeFilter('hasFriends', targetValue === 'null' ? null : targetValue as FilterBoolean)}>
      {!!filters &&
					filters.hasFriends?.map((friend, i) => (
						<option
							key={`${i}_${friend}`}
							value={`${friend === null ? friend : +friend}`}>
							{friend === null ? 'С друзьями и без' : (!!friend ? 'Есть друзья' : 'Без друзей')}
						</option>
					))}
      </select>
		</div>
	);
};

export default FilterPanel;
