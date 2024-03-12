'use client';
import { FilterGroup, GetGroupsResponse } from '@/types';
import axios from 'axios';
import {
	FunctionComponent,
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react';
type Props = {
	children: ReactNode;
};

type Context = {
	data: GetGroupsResponse;
	filter: FilterGroup;
	handleChangeFilter: <T extends keyof FilterGroup>(filter: T, value: FilterGroup[T]) => void
};

export const GroupContext = createContext<Context>({} as Context);

const GroupProvider: FunctionComponent<Props> = ({ children }): ReactNode => {
	const [data, setData] = useState<GetGroupsResponse>({ result: 0 });
	const [filter, setFilter] = useState<FilterGroup>({
		isClosed: null,
		avatarColor: null,
		hasFriends: null,
	});

	const handleRequest = useCallback(async () => {
		const { data: response } = await axios('/api/group', {
			params: {
				c: filter.isClosed,
				a: filter.avatarColor,
				f: filter.hasFriends
			}
		});
		if (!!response.length) {
			setData({ result: 1, data: response });
			return;
		}
		setData({ result: 0 });
	}, [filter])

	const handleChangeFilter = useCallback(<T extends keyof FilterGroup>(filter: T, value: FilterGroup[T]) => {
		setFilter(prev => {
			const copy = {...prev}
			for(let field in copy) {
				if(field === filter) copy[filter] = value
			}
			return copy
		})
	}, [])
	
	useEffect(() => {
		handleRequest()
		// const req = async () => {
		// 	const { data: response } = await axios('/api/group');
		// 	if (!!response.length) {
		// 		setData({ result: 1, data: response });
		// 		return;
		// 	}
		// 	setData({ result: 0 });
		// };
		// req();
	}, []);

	useEffect(() => {
		handleRequest()
	}, [filter])

	const contextValue: Context = useMemo(
		() => ({
			data,
			filter,
			handleChangeFilter
		}),
		[data, filter, handleChangeFilter]
	);

	return (
		<GroupContext.Provider value={contextValue}>
			{children}
		</GroupContext.Provider>
	);
};

export default GroupProvider;
