import data from "@/data";
import { FilterGroup, Group } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const filter = {
        isClosed: searchParams.get('c'),
        avatarColor: searchParams.get('a'),
        hasFriends: searchParams.get('f'),
    } as FilterGroup

    if (!filter.isClosed && !filter.avatarColor && !filter.hasFriends) return NextResponse.json(data)

    const filtered: Group[] = []
    data.forEach(group => {
        const boolAvatar = filter.avatarColor === null ? true : group.avatar_color === filter.avatarColor
        const boolClosed = filter.isClosed === null ? true : +group.closed === +filter.isClosed
        const boolFriends = filter.hasFriends === null ? true : +!!group?.friends?.length === +filter.hasFriends

        if (boolAvatar && boolClosed && boolFriends) filtered.push(group)

        return
    })

    return NextResponse.json(filtered)
}