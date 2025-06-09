import { Button } from '@/components/ui/button';
import { FormatPrice } from '@/lib/format';
import React from 'react'

interface CourseEnrollButtonProps{
    price: number;
    courseId: string
}

const CourseEnrollButton = ({price, courseId}: CourseEnrollButtonProps) => {
  return (
    <Button className='w-full md:w-auto' size="sm">
        Enroll for {FormatPrice(price)}
    </Button>
  )
}

export default CourseEnrollButton