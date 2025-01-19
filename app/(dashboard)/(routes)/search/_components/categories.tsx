"use client"

import { Category } from "@prisma/client"
import { FcMultipleDevices, FcSalesPerformance, FcSportsMode } from "react-icons/fc"
import { IconType } from "react-icons/lib"
import { CategoryItem } from "./category-item"

interface categoriesProps {
    items: Category[]
}
const iconMap: Record<Category["name"], IconType>={
    "Computer Science":FcMultipleDevices,
    "Fitness": FcSportsMode,
    "Accounting": FcSalesPerformance,
}
export const Categories = ({items}:categoriesProps) =>{
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item)=>(
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}