import data from "@/data";
import { FilterSelect, FilterSetOption } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
    const filters: FilterSetOption = {
        avatarColor: new Set([null]),
        isClosed: new Set([null]),
        hasFriends: new Set([null])
    }
    
    data.forEach(group => {
        group.avatar_color && filters.avatarColor.add(group.avatar_color)
        filters.isClosed.add(group?.closed)
        filters.hasFriends.add(!!group.friends)
    })

    const response: FilterSelect = {} as FilterSelect
    for(let field in filters) {
        response[field as keyof FilterSelect] = [...filters[field as keyof FilterSelect]] as any
    }

    return NextResponse.json(response)
}