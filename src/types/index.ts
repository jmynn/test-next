import { DataType } from 'csstype';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type AllColors = DataType.NamedColor | RGB | RGBA | HEX;

export interface GetGroupsResponse {
    result: 1 | 0,
    data?: Group[]
}

export interface Group {
    "id": number,
    "name": string,
    "closed": boolean,
    "avatar_color"?: AllColors,
    "members_count": number,
    "friends"?: User[]
}

export interface User {
    "first_name": string,
    "last_name": string
}

export type FilterBoolean = null | '1' | '0'

export type FilterGroup = {
    isClosed: FilterBoolean
    avatarColor: null | AllColors
    hasFriends: FilterBoolean
}

export type FilterSelect = {
    isClosed: (null | true | false)[]
    avatarColor: null | AllColors[]
    hasFriends: (null | true | false)[]
}

export type FilterSetOption = {
    isClosed: Set<null | true | false>
    avatarColor: Set<null | AllColors>
    hasFriends: Set<null | true | false>
}